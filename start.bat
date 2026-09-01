@echo off
echo =======================================
echo    Starting AI Chat Application
echo =======================================

:: Check if virtual environment exists, create if missing
if not exist ".venv\Scripts\activate.bat" (
    echo [INFO] Creating Python virtual environment...
    python -m venv .venv
)

:: Activate the virtual environment
echo [INFO] Activating virtual environment...
call .venv\Scripts\activate.bat

:: Inform user about Supabase Edge Functions
echo [INFO] Note: Backend uses Supabase Edge Functions.
echo [INFO] Ensure your Supabase project is active or run "supabase start" if hosting locally.

:: Start a local Python HTTP server on port 8001 for the frontend
echo [INFO] Starting Python FastAPI backend on port 8000...
echo [INFO] Starting local web server for the frontend on port 8001...
echo [INFO] You can access the app at: http://localhost:8001
echo =======================================

:: Start backend in a new window so they run concurrently
start "AI Chat Backend" cmd /c "cd backend && ..\.venv\Scripts\uvicorn main:app --reload --port 8000"

:: Start frontend on port 8001
python -m http.server 8001
