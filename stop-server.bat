@echo off
title Stop Evala Server
color 0C
echo.
echo ========================================
echo   Stopping Evala Development Server
echo ========================================
echo.

:: Kill all Node.js processes (be careful with this on shared systems)
echo Stopping all Node.js processes...
taskkill /F /IM node.exe 2>nul

if %errorlevel% equ 0 (
    echo.
    echo [SUCCESS] Server stopped successfully!
    echo.
) else (
    echo.
    echo [INFO] No running server found.
    echo.
)

timeout /t 3
