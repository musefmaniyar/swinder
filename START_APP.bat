@echo off
echo =========================================
echo   SWINDER - Starting Development Server
echo =========================================
echo.
echo Installing dependencies...
call npm install
echo.
echo Starting app...
echo Open browser to: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.
call npm run dev
