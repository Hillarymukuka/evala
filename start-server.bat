@echo off
title Evala Dev Servers
color 0A
echo.
echo ========================================
echo   Starting Evala Development Servers
echo ========================================
echo.
echo Starting Cloudflare Worker on http://localhost:8787
start "Evala Worker" cmd /k "cd workers && set CLOUDFLARE_API_TOKEN=LIEUJ6HRrL-NO81xhGeqjgYbKFLPAJwlD1E5RnlO && npm run dev"
timeout /t 3 /nobreak > nul
echo.
echo Starting React Frontend on http://localhost:5173
echo.
echo Press Ctrl+C to stop the frontend server
echo Worker will run in a separate window
echo.

cd /d "%~dp0"
npm run dev

pause
