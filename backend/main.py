import os
import json
import httpx
from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client, Client
from pydantic import BaseModel
from typing import List, Optional
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

supabase = None

if not SUPABASE_URL or not SUPABASE_SERVICE_ROLE_KEY:
    print("Warning: Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment variables")
else:
    try:
        supabase = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
    except Exception as e:
        print("Error initializing supabase:", e)


class Attachment(BaseModel):
    name: str
    type: str
    url: Optional[str] = None

class ChatRequestBody(BaseModel):
    conversationId: Optional[str] = None
    message: str
    model: str = "meta-llama/Llama-3.3-70B-Instruct"
    provider: Optional[str] = "huggingface"
    endpoint: Optional[str] = None
    systemPrompt: str = "You are a helpful, knowledgeable, and precise AI assistant."
    temperature: float = 0.7
    maxTokens: int = 1024
    attachments: List[Attachment] = []
    webSearchEnabled: bool = False
    userApiKey: Optional[str] = None
    tavilyApiKey: Optional[str] = None

@app.get("/")
async def root():
    return {"status": "ok", "service": "AI Chat Backend", "supabase_configured": supabase is not None}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "supabase_configured": supabase is not None}

@app.post("/chat")
async def chat_endpoint(request: Request, body: ChatRequestBody):

    auth_header = request.headers.get("Authorization")
    user = None
    if auth_header:
        token = auth_header.replace("Bearer ", "")
        try:
            auth_response = supabase.auth.get_user(token)
            if auth_response and auth_response.user:
                user = auth_response.user
        except Exception:
            pass

    message = body.message
    attachments = body.attachments
    if not message and len(attachments) == 0:
        raise HTTPException(status_code=400, detail="Bad Request: message or attachment is required.")

    history = []
    conversation_id = body.conversationId

    if user:
        if conversation_id:
            conv = supabase.table("conversations").select("id", "user_id").eq("id", conversation_id).eq("user_id", user.id).maybe_single().execute()
            if not conv.data:
                raise HTTPException(status_code=403, detail="Forbidden: Conversation not found or access denied.")
        else:
            title = message[:36] + ("..." if len(message) > 36 else "") if message else "New chat"
            new_conv = supabase.table("conversations").insert({
                "user_id": user.id,
                "title": title,
                "model_used": body.model,
            }).execute()
            if not new_conv.data:
                raise HTTPException(status_code=500, detail="Failed to create conversation.")
            conversation_id = new_conv.data[0]["id"]

        # Save User Message
        user_msg_meta = {
            "attachments": [a.model_dump() for a in attachments],
            "webSearchEnabled": body.webSearchEnabled
        }
        user_msg = supabase.table("messages").insert({
            "conversation_id": conversation_id,
            "user_id": user.id,
            "role": "user",
            "content": message,
            "metadata": user_msg_meta
        }).execute()

        if not user_msg.data:
            raise HTTPException(status_code=500, detail="Failed to save user message.")

        # Get conversation history
        history_res = supabase.table("messages")\
            .select("role, content")\
            .eq("conversation_id", conversation_id)\
            .order("created_at", desc=False)\
            .limit(10)\
            .execute()
        history = history_res.data or []
    else:
        history = [{"role": "user", "content": message}]

    # Build AI request
    ai_response_text = ""
    token_usage = {"prompt_tokens": round(len(message) / 4), "completion_tokens": 0}
    sources = []

    env_api_key = os.getenv("AI_API_KEY") or os.getenv("HUGGINGFACE_API_KEY") or os.getenv("OPENAI_API_KEY") or ""
    ai_api_key = body.userApiKey or env_api_key

    if not ai_api_key:
        ai_response_text = f"[Simulated response from {body.model}]: I received your message: \"{message}\". To enable live server inference, configure AI_API_KEY."
        token_usage["completion_tokens"] = round(len(ai_response_text) / 4)
    else:
        prompt_context = ""
        if body.webSearchEnabled:
            tavily_key = body.tavilyApiKey or os.getenv("TAVILY_API_KEY") or os.getenv("WEB_SEARCH_API_KEY")
            if tavily_key:
                try:
                    async with httpx.AsyncClient() as client:
                        search_res = await client.post("https://api.tavily.com/search", json={
                            "api_key": tavily_key,
                            "query": message,
                            "search_depth": "basic",
                            "include_answer": False,
                            "max_results": 3
                        })
                        if search_res.status_code == 200:
                            search_data = search_res.json()
                            if search_data.get("results"):
                                prompt_context += "[Web Search Results:]\n"
                                for r in search_data["results"]:
                                    prompt_context += f"Title: {r['title']}\nURL: {r['url']}\nContent: {r['content']}\n\n"
                                    sources.append({"title": r["title"], "url": r["url"]})
                                prompt_context += "Use the above search results to answer the user's query if relevant. Do not invent facts or sources. If the search results do not contain enough information, state that the available sources were insufficient.\n\n"
                            else:
                                prompt_context += "[Web Search Active: No results found for the query.]\n\n"
                        else:
                            prompt_context += "[Web Search Error: Failed to retrieve results from Tavily.]\n\n"
                except Exception as e:
                    prompt_context += "[Web Search Error: Network failure calling Tavily.]\n\n"

        if attachments:
            file_names = ", ".join([a.name for a in attachments])
            prompt_context += f"[Attached files: {file_names}]\n\n"

        full_prompt = f"{body.systemPrompt}\n\n"
        for m in history:
            role = "User" if m["role"] == "user" else "Assistant"
            full_prompt += f"{role}: {m['content']}\n"
        full_prompt += "Assistant:"

        target_provider = (body.provider or "huggingface").lower()
        target_endpoint = body.endpoint or ""

        if not target_endpoint:
            if target_provider == "huggingface":
                target_endpoint = f"https://api-inference.huggingface.co/models/{body.model}"
            elif target_provider == "openai":
                target_endpoint = "https://api.openai.com/v1/chat/completions"
            elif target_provider == "ollama":
                target_endpoint = "http://localhost:11434/v1/chat/completions"

        headers = {"Content-Type": "application/json"}
        if ai_api_key:
            headers["Authorization"] = f"Bearer {ai_api_key}"

        payload = {}
        if target_provider == "huggingface":
            final_input = f"{prompt_context}{full_prompt}" if prompt_context else full_prompt
            payload = {
                "inputs": final_input,
                "parameters": {
                    "temperature": body.temperature,
                    "max_new_tokens": body.maxTokens,
                    "return_full_text": False
                }
            }
        else:
            messages = [{"role": "system", "content": body.systemPrompt}]
            for m in history:
                messages.append({"role": m["role"], "content": m["content"]})
            if prompt_context:
                messages.append({"role": "user", "content": f"{prompt_context}{message}"})

            payload = {
                "model": body.model or "gpt-4o-mini",
                "messages": messages,
                "temperature": body.temperature,
                "max_tokens": body.maxTokens
            }

        try:
            async with httpx.AsyncClient(timeout=60.0) as client:
                ai_res = await client.post(target_endpoint, headers=headers, json=payload)

                if ai_res.status_code != 200:
                    print("AI Provider error:", ai_res.status_code, ai_res.text)
                    raise HTTPException(status_code=502, detail=f"AI Provider returned HTTP {ai_res.status_code}: {ai_res.text[:120]}")

                ai_data = ai_res.json()
                if isinstance(ai_data, list) and len(ai_data) > 0 and "generated_text" in ai_data[0]:
                    ai_response_text = ai_data[0]["generated_text"].strip()
                elif isinstance(ai_data, dict) and "generated_text" in ai_data:
                    ai_response_text = ai_data["generated_text"].strip()
                elif isinstance(ai_data, dict) and "choices" in ai_data and len(ai_data["choices"]) > 0:
                    choice = ai_data["choices"][0]
                    if "message" in choice and "content" in choice["message"]:
                        ai_response_text = choice["message"]["content"].strip()
                    elif "text" in choice:
                        ai_response_text = choice["text"].strip()
                elif isinstance(ai_data, dict) and "response" in ai_data:
                    ai_response_text = ai_data["response"].strip()
                else:
                    ai_response_text = json.dumps(ai_data)

            token_usage["completion_tokens"] = round(len(ai_response_text) / 4)
        except HTTPException:
            raise
        except Exception as e:
            print("Error connecting to AI Provider:", e)
            raise HTTPException(status_code=502, detail=f"Error connecting to AI Provider: {str(e)}")

    # Save Assistant Response
    asst_meta = {
        "model": body.model,
        "usage": token_usage,
    }
    if sources:
        asst_meta["sources"] = sources

    if user:
        supabase.table("messages").insert({
            "conversation_id": conversation_id,
            "user_id": user.id,
            "role": "assistant",
            "content": ai_response_text,
            "metadata": asst_meta
        }).execute()

    res_body = {
        "content": ai_response_text,
        "usage": token_usage,
    }
    if sources:
        res_body["sources"] = sources

    return res_body
