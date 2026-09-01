# Supabase Backend & GitHub Pages Deployment Guide

This guide provides complete instructions for setting up your Supabase database, deploying Edge Functions, and hosting your AI Chat on GitHub Pages.

---

## 1. Supabase Project Setup

1. Go to [https://supabase.com](https://supabase.com) and create a new project.
2. Note your **Project URL** and **Anon / Public API Key** from **Project Settings → API**.

---

## 2. Database & Storage Schema Migration

1. Open the **SQL Editor** in your Supabase Dashboard.
2. Copy the entire contents of [`supabase/schema.sql`](./supabase/schema.sql).
3. Paste it into the SQL Editor and click **Run**.
4. This will automatically set up:
   - `profiles`, `conversations`, `messages`, and `files` tables.
   - Row Level Security (RLS) policies for user data isolation.
   - Triggers for automatic user profile generation and timestamp updates.
   - The private `user-files` storage bucket with per-user storage isolation.

---

## 3. Deploy Supabase Edge Functions

### Prerequisites
Install the Supabase CLI:
```bash
npm install -g supabase
```

### Login & Link Project
```bash
supabase login
supabase link --project-ref your-project-ref
```

### Set Server-Side Secrets
Set your AI API Key and optional Web Search Key securely in Supabase:
```bash
supabase secrets set AI_API_KEY="hf_your_huggingface_token"
supabase secrets set WEB_SEARCH_API_KEY="tvly_your_tavily_key"
```

### Deploy Functions
Deploy the `chat` and `web-search` Edge Functions:
```bash
supabase functions deploy chat --no-verify-jwt
supabase functions deploy web-search --no-verify-jwt
```
*(Note: Authentication is verified inside the Edge Function code via `auth.getUser(token)`).*

---

## 4. Frontend Configuration for GitHub Pages

1. Open [`supabase-config.js`](./supabase-config.js) and replace the default placeholder URL and Anon key with your actual Supabase project values:
   ```javascript
   const DEFAULT_CONFIG = {
     supabaseUrl: "https://your-project-id.supabase.co",
     supabaseAnonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
   };
   ```
2. Alternatively, you can configure your Supabase URL & Anon Key directly through the application's **AI / API Settings** UI tab without editing source code.

---

## 5. GitHub Pages Deployment

1. Push your repository to GitHub.
2. Go to your GitHub repository **Settings → Pages**.
3. Under **Build and deployment**:
   - Source: **Deploy from a branch**
   - Branch: `main` (or `master`), folder: `/ (root)`
4. Click **Save**.
5. Your application will be live at `https://<username>.github.io/<repo-name>/`.

---

## 6. Security Architecture Checklist

- [x] **Client-Side Safety**: Only the Supabase public `anon` key is exposed on GitHub Pages.
- [x] **Secret Isolation**: `AI_API_KEY`, `WEB_SEARCH_API_KEY`, and `SUPABASE_SERVICE_ROLE_KEY` reside strictly inside Supabase Edge Functions.
- [x] **Row Level Security**: All tables (`profiles`, `conversations`, `messages`, `files`) have RLS policies enforcing `auth.uid() = user_id`.
- [x] **Storage Isolation**: Storage bucket files are strictly accessible only by the owner at `user-files/{user_id}/*`.
- [x] **Server-Side Validation**: Edge Functions verify ownership of conversations and files before processing requests.
