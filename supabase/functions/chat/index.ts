// ==============================================================================
// SUPABASE EDGE FUNCTION: /functions/v1/chat
// Secure AI Chat Pipeline (Server-side API Key & Conversation Persistence)
// ==============================================================================

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface ChatRequestBody {
  conversationId?: string;
  message: string;
  model?: string;
  systemPrompt?: string;
  temperature?: number;
  maxTokens?: number;
  attachments?: Array<{ name: string; type: string; url?: string }>;
  webSearchEnabled?: boolean;
  userApiKey?: string;
  tavilyApiKey?: string;
}

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

    if (!supabaseUrl || !supabaseServiceRoleKey) {
      return new Response(
        JSON.stringify({ error: "Server misconfiguration: Supabase credentials missing." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 1. Authenticate user from Authorization Header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Unauthorized: Missing Authorization header." }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const token = authHeader.replace("Bearer ", "");
    // Admin client with service-role for internal DB operations
    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: { persistSession: false },
    });

    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized: Invalid or expired session token." }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 2. Parse request payload
    const body: ChatRequestBody = await req.json();
    const {
      message,
      model = "meta-llama/Llama-3.3-70B-Instruct",
      systemPrompt = "You are a helpful, knowledgeable, and precise AI assistant.",
      temperature = 0.7,
      maxTokens = 1024,
      attachments = [],
      webSearchEnabled = false,
      userApiKey,
      tavilyApiKey,
    } = body;

    let conversationId = body.conversationId;

    if (!message && attachments.length === 0) {
      return new Response(
        JSON.stringify({ error: "Bad Request: message or attachment is required." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 3. Verify or Create Conversation
    if (conversationId) {
      const { data: conv, error: convErr } = await supabase
        .from("conversations")
        .select("id, user_id")
        .eq("id", conversationId)
        .eq("user_id", user.id)
        .single();

      if (convErr || !conv) {
        return new Response(
          JSON.stringify({ error: "Forbidden: Conversation not found or access denied." }),
          { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    } else {
      // Auto-create new conversation with first user message as title
      const title = message.slice(0, 36) + (message.length > 36 ? "..." : "") || "New chat";
      const { data: newConv, error: newConvErr } = await supabase
        .from("conversations")
        .insert({
          user_id: user.id,
          title,
          model_used: model,
        })
        .select("id")
        .single();

      if (newConvErr || !newConv) {
        throw new Error(`Failed to create conversation: ${newConvErr?.message}`);
      }
      conversationId = newConv.id;
    }

    // 4. Save User Message
    const { data: userMsgRecord, error: userMsgErr } = await supabase
      .from("messages")
      .insert({
        conversation_id: conversationId,
        user_id: user.id,
        role: "user",
        content: message,
        metadata: {
          attachments,
          webSearchEnabled,
        },
      })
      .select("id, created_at")
      .single();

    if (userMsgErr) {
      throw new Error(`Failed to save user message: ${userMsgErr.message}`);
    }

    // 5. Fetch Recent Conversation Context (Last 10 messages)
    const { data: history = [] } = await supabase
      .from("messages")
      .select("role, content")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true })
      .limit(10);

    // 6. Build AI Request & Call AI Provider
    let aiResponseText = "";
    let tokenUsage = { prompt_tokens: Math.round(message.length / 4), completion_tokens: 0 };
    let sources: Array<{ title: string; url: string }> = [];

    const envApiKey = Deno.env.get("AI_API_KEY") ?? Deno.env.get("HUGGINGFACE_API_KEY") ?? Deno.env.get("OPENAI_API_KEY") ?? "";
    const aiApiKey = userApiKey || envApiKey;

    if (!aiApiKey) {
      // Graceful fallback if no server API key is configured yet
      aiResponseText = `[Simulated response from ${model}]: I received your message: "${message}". To enable live server inference, configure AI_API_KEY in your Supabase project secrets.`;
      tokenUsage.completion_tokens = Math.round(aiResponseText.length / 4);
    } else {
      // Connect to AI Provider
      const isOpenAI = model.startsWith("gpt-") || model.startsWith("o1-") || model.startsWith("o3-") || model.startsWith("o4-");
      
      let promptContext = "";

      if (webSearchEnabled) {
        const tavilyKey = tavilyApiKey || Deno.env.get("TAVILY_API_KEY") || Deno.env.get("WEB_SEARCH_API_KEY");
        if (tavilyKey) {
          try {
            const searchRes = await fetch("https://api.tavily.com/search", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ api_key: tavilyKey, query: message, search_depth: "basic", include_answer: false, max_results: 3 })
            });
            if (searchRes.ok) {
              const searchData = await searchRes.json();
              if (searchData.results && searchData.results.length > 0) {
                promptContext += "[Web Search Results:]\n";
                searchData.results.forEach((r: any) => {
                  promptContext += `Title: ${r.title}\nURL: ${r.url}\nContent: ${r.content}\n\n`;
                  sources.push({ title: r.title, url: r.url });
                });
                promptContext += "Use the above search results to answer the user's query if relevant. Do not invent facts or sources. If the search results do not contain enough information, state that the available sources were insufficient.\n\n";
              } else {
                promptContext += "[Web Search Active: No results found for the query.]\n\n";
              }
            } else {
              promptContext += "[Web Search Error: Failed to retrieve results from Tavily.]\n\n";
            }
          } catch(err) {
            promptContext += "[Web Search Error: Network failure calling Tavily.]\n\n";
          }
        }
      }

      if (attachments.length > 0) {
        promptContext += `[Attached files: ${attachments.map(a => a.name).join(", ")}]\n\n`;
      }

      // Build context transcript for instruction-following models
      let fullPrompt = `${systemPrompt}\n\n`;
      if (history && history.length > 0) {
        history.forEach((m) => {
          fullPrompt += `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}\n`;
        });
      }
      fullPrompt += `Assistant:`;

      const aiResponse = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${aiApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: promptContext ? `${promptContext}${fullPrompt}` : fullPrompt,
          parameters: {
            temperature,
            max_new_tokens: maxTokens,
            return_full_text: false,
          },
        }),
      });

      if (!aiResponse.ok) {
        const errorText = await aiResponse.text();
        console.error("AI Provider error:", aiResponse.status, errorText);
        throw new Error(`AI Provider returned HTTP ${aiResponse.status}`);
      }

      const aiData = await aiResponse.json();
      if (Array.isArray(aiData) && aiData[0]?.generated_text) {
        aiResponseText = aiData[0].generated_text.trim();
      } else if (aiData?.generated_text) {
        aiResponseText = aiData.generated_text.trim();
      } else if (aiData?.choices?.[0]?.message?.content) {
        aiResponseText = aiData.choices[0].message.content.trim();
      } else {
        aiResponseText = typeof aiData === "string" ? aiData : JSON.stringify(aiData);
      }

      tokenUsage.completion_tokens = Math.round(aiResponseText.length / 4);
    }

    // 7. Save Assistant Response in Database
    const { data: assistantMsgRecord, error: asstErr } = await supabase
      .from("messages")
      .insert({
        conversation_id: conversationId,
        user_id: user.id,
        role: "assistant",
        content: aiResponseText,
        metadata: {
          model,
          usage: tokenUsage,
          sources: sources.length > 0 ? sources : undefined,
        },
      })
      .select("id, created_at")
      .single();

    if (asstErr) {
      console.warn("Failed to persist assistant message:", asstErr);
    }

    // 8. Update Conversation Timestamp
    await supabase
      .from("conversations")
      .update({ updated_at: new Date().toISOString() })
      .eq("id", conversationId);

    // 9. Return result to frontend
    return new Response(
      JSON.stringify({
        conversationId,
        role: "assistant",
        content: aiResponseText,
        model,
        usage: tokenUsage,
        messageId: assistantMsgRecord?.id ?? null,
        sources: sources.length > 0 ? sources : undefined,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (err: any) {
    console.error("Chat Edge Function error:", err);
    return new Response(
      JSON.stringify({ error: err.message || "Internal server error occurred." }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
