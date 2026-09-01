/**
 * ==============================================================================
 * SUPABASE CLIENT & SERVICE LAYER (GitHub Pages Compatible)
 * Universal static frontend integration for Supabase Auth, DB, Storage & Edge Functions
 * ==============================================================================
 */

(function (window) {
  "use strict";

  // Default / environment credentials
  // NOTE: SUPABASE_URL and SUPABASE_ANON_KEY are safe to expose in client-side code on GitHub Pages.
  // Sensitive service-role and AI keys live exclusively in Supabase Edge Functions.
  const DEFAULT_CONFIG = {
    supabaseUrl: "https://your-project-id.supabase.co",
    supabaseAnonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your-anon-key",
  };

  function getStoredConfig() {
    try {
      const stored = localStorage.getItem("ai_chat_supabase_config");
      if (stored) {
        return { ...DEFAULT_CONFIG, ...JSON.parse(stored) };
      }
    } catch (e) {
      console.warn("Could not read stored Supabase config:", e);
    }
    return DEFAULT_CONFIG;
  }

  let config = getStoredConfig();
  let client = null;

  function initClient() {
    if (window.supabase && config.supabaseUrl && !config.supabaseUrl.includes("your-project-id")) {
      try {
        client = window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey, {
          auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true,
          },
        });
      } catch (err) {
        console.error("Supabase client init error:", err);
      }
    }
    return client;
  }

  // Initialize client if library loaded
  initClient();

  const SupabaseService = {
    /**
     * Update client configuration
     */
    setConfig(url, anonKey) {
      config.supabaseUrl = url.trim();
      config.supabaseAnonKey = anonKey.trim();
      localStorage.setItem("ai_chat_supabase_config", JSON.stringify(config));
      initClient();
    },

    getConfig() {
      return { ...config };
    },

    isConfigured() {
      return Boolean(client && config.supabaseUrl && !config.supabaseUrl.includes("your-project-id"));
    },

    getClient() {
      if (!client) initClient();
      return client;
    },

    /* =========================================================
       1. AUTHENTICATION SERVICE
       ========================================================= */
    auth: {
      async getSession() {
        if (!client) return null;
        const { data, error } = await client.auth.getSession();
        if (error) throw error;
        return data.session;
      },

      async getUser() {
        if (!client) return null;
        const { data: { user }, error } = await client.auth.getUser();
        if (error) return null;
        return user;
      },

      async signUp(email, password, fullName) {
        if (!client) throw new Error("Supabase is not configured yet.");
        const { data, error } = await client.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
          },
        });
        if (error) throw error;
        return data;
      },

      async signIn(email, password) {
        if (!client) throw new Error("Supabase is not configured yet.");
        const { data, error } = await client.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        return data;
      },

      async signOut() {
        if (!client) return;
        const { error } = await client.auth.signOut();
        if (error) throw error;
      },

      async resetPassword(email) {
        if (!client) throw new Error("Supabase is not configured yet.");
        const { data, error } = await client.auth.resetPasswordForEmail(email, {
          redirectTo: window.location.origin + window.location.pathname,
        });
        if (error) throw error;
        return data;
      },

      onAuthStateChange(callback) {
        if (!client) return { data: { subscription: { unsubscribe: () => {} } } };
        return client.auth.onAuthStateChange(callback);
      },
    },

    /* =========================================================
       2. USER PROFILE SERVICE
       ========================================================= */
    profile: {
      async get(userId) {
        if (!client) return null;
        const { data, error } = await client
          .from("profiles")
          .select("*")
          .eq("id", userId)
          .single();
        if (error) throw error;
        return data;
      },

      async update(userId, updates) {
        if (!client) return null;
        const { data, error } = await client
          .from("profiles")
          .update(updates)
          .eq("id", userId)
          .select()
          .single();
        if (error) throw error;
        return data;
      },
    },

    /* =========================================================
       3. CONVERSATIONS SERVICE
       ========================================================= */
    conversations: {
      async list(userId) {
        if (!client) return [];
        const { data, error } = await client
          .from("conversations")
          .select("*")
          .eq("user_id", userId)
          .order("updated_at", { ascending: false });
        if (error) throw error;
        return data || [];
      },

      async create(userId, title = "New chat", model = "meta-llama/Llama-3.3-70B-Instruct") {
        if (!client) return null;
        const { data, error } = await client
          .from("conversations")
          .insert({
            user_id: userId,
            title,
            model_used: model,
          })
          .select()
          .single();
        if (error) throw error;
        return data;
      },

      async update(conversationId, updates) {
        if (!client) return null;
        const { data, error } = await client
          .from("conversations")
          .update(updates)
          .eq("id", conversationId)
          .select()
          .single();
        if (error) throw error;
        return data;
      },

      async delete(conversationId) {
        if (!client) return;
        const { error } = await client
          .from("conversations")
          .delete()
          .eq("id", conversationId);
        if (error) throw error;
      },
    },

    /* =========================================================
       4. MESSAGES SERVICE
       ========================================================= */
    messages: {
      async list(conversationId) {
        if (!client) return [];
        const { data, error } = await client
          .from("messages")
          .select("*")
          .eq("conversation_id", conversationId)
          .order("created_at", { ascending: true });
        if (error) throw error;
        return data || [];
      },

      async insert(conversationId, userId, role, content, metadata = {}) {
        if (!client) return null;
        const { data, error } = await client
          .from("messages")
          .insert({
            conversation_id: conversationId,
            user_id: userId,
            role,
            content,
            metadata,
          })
          .select()
          .single();
        if (error) throw error;
        return data;
      },
    },

    /* =========================================================
       5. STORAGE & FILES SERVICE
       ========================================================= */
    files: {
      async upload(userId, file, conversationId = null) {
        if (!client) throw new Error("Supabase client is not configured.");
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
        const filePath = `${userId}/${fileName}`;

        // 1. Upload binary file to Storage Bucket
        const { error: uploadError } = await client.storage
          .from("user-files")
          .upload(filePath, file, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) throw uploadError;

        // 2. Insert record into public.files table
        const { data: fileRecord, error: dbError } = await client
          .from("files")
          .insert({
            user_id: userId,
            conversation_id: conversationId,
            file_name: file.name,
            file_path: filePath,
            file_type: file.type || fileExt,
            file_size: file.size,
          })
          .select()
          .single();

        if (dbError) throw dbError;

        // 3. Create signed URL for secure viewing
        const { data: signedData } = await client.storage
          .from("user-files")
          .createSignedUrl(filePath, 3600);

        return {
          ...fileRecord,
          signedUrl: signedData?.signedUrl || null,
        };
      },

      async list(userId) {
        if (!client) return [];
        const { data, error } = await client
          .from("files")
          .select("*")
          .eq("user_id", userId)
          .order("created_at", { ascending: false });
        if (error) throw error;
        return data || [];
      },

      async getSignedUrl(filePath, expiresIn = 3600) {
        if (!client) return null;
        const { data, error } = await client.storage
          .from("user-files")
          .createSignedUrl(filePath, expiresIn);
        if (error) throw error;
        return data?.signedUrl || null;
      },

      async delete(fileId, filePath) {
        if (!client) return;
        // Delete from storage
        await client.storage.from("user-files").remove([filePath]);
        // Delete from table
        await client.from("files").delete().eq("id", fileId);
      },
    },

    /* =========================================================
       6. SECURE EDGE FUNCTIONS CLIENT CALLER
       ========================================================= */
    functions: {
      async chat(payload) {
        if (!client) throw new Error("Supabase is not configured.");
        const { data: { session } } = await client.auth.getSession();
        if (!session) throw new Error("Authentication required to use AI Chat.");

        const response = await fetch(`${config.supabaseUrl}/functions/v1/chat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.access_token}`,
            "apikey": config.supabaseAnonKey,
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errText = await response.text();
          let parsed;
          try { parsed = JSON.parse(errText); } catch(e){}
          throw new Error(parsed?.error || `Edge Function returned HTTP ${response.status}`);
        }

        return await response.json();
      },

      async webSearch(query, maxResults = 5) {
        if (!client) throw new Error("Supabase is not configured.");
        const { data: { session } } = await client.auth.getSession();
        if (!session) throw new Error("Authentication required for Web Search.");

        const response = await fetch(`${config.supabaseUrl}/functions/v1/web-search`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.access_token}`,
            "apikey": config.supabaseAnonKey,
          },
          body: JSON.stringify({ query, maxResults }),
        });

        if (!response.ok) {
          const errText = await response.text();
          throw new Error(`Web search error: ${errText}`);
        }

        return await response.json();
      },
    },
  };

  window.SupabaseService = SupabaseService;
})(window);
