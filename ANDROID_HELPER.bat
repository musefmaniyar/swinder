@echo off
echo ============================================
echo   SWINDER - ANDROID CAPACITOR COMMANDS
echo ============================================
echo.
echo This script helps you run Capacitor commands
echo without PowerShell script execution issues.
echo.
echo ============================================
echo.

:menu
echo Choose an option:
echo.
echo 1. Sync Android (copy web files to Android)
echo 2. Open Android Studio
echo 3. Build production (Next.js)
echo 4. Sync ALL and Open Android Studio
echo 5. Exit
echo.
set /p choice="Enter your choice (1-5): "

if "%choice%"=="1" goto sync
if "%choice%"=="2" goto open
if "%choice%"=="3" goto build
if "%choice%"=="4" goto syncall
if "%choice%"=="5" goto end

echo Invalid choice! Please try again.
echo.
goto menu

:sync
echo.
echo Syncing Android platform...
echo.
call npm.cmd run build
echo.
echo Build complete! Now syncing to Android...
echo.
node node_modules/@capacitor/cli/bin/capacitor sync android
echo.
echo ✓ Sync complete!
echo.
pause
goto menu

:open
echo.
echo Opening Android Studio...
echo.
node node_modules/@capacitor/cli/bin/capacitor open android
echo.
pause
goto menu

:build
echo.
echo Building Next.js production...
echo.
call npm.cmd run build
echo.
echo ✓ Build complete!
echo.
pause
goto menu

:syncall
echo.
echo Building and syncing everything...
echo.
call npm.cmd run build
echo.
node node_modules/@capacitor/cli/bin/capacitor sync android
echo.
echo Opening Android Studio...
echo.
node node_modules/@capacitor/cli/bin/capacitor open android
echo.
pause
goto menu

:end
echo.
echo Goodbye!
echo.
exit
