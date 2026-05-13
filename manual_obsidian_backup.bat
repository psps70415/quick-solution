@echo off
setlocal

:: ==========================================
:: CONFIGURATION (Change these paths)
:: ==========================================
set "SOURCE_DIR=E:\New folder\aut D aut nihil"
set "DEST_DIR=C:\Users\priya\Downloads\ObsidianBackup"
:: ==========================================

:: 1. Get the current timestamp in YYYYMMDD_HH_MM_SS format
for /f "usebackq tokens=*" %%i in (`powershell -NoProfile -Command "Get-Date -Format 'yyyyMMdd_HH_mm_ss'"`) do set "TIMESTAMP=%%i"

set "ZIP_FILENAME=backup_obsidian_vault_%TIMESTAMP%.zip"
set "FULL_DEST_PATH=%DEST_DIR%\%ZIP_FILENAME%"

echo [1/3] Creating backup zip for: %SOURCE_DIR%

:: Ensure the destination directory exists
if not exist "%DEST_DIR%" mkdir "%DEST_DIR%"

:: 2. Zip the folder using native PowerShell
powershell -NoProfile -Command "Compress-Archive -Path '%SOURCE_DIR%' -DestinationPath '%FULL_DEST_PATH%' -Force"

if %ERRORLEVEL% EQU 0 (
    echo [2/3] Backup created successfully: %ZIP_FILENAME%
) else (
    echo ERROR: Failed to create zip file.
    pause
    exit /b %ERRORLEVEL%
)

:: 3. Delete files matching the naming convention older than 7 days
echo [3/3] Checking for backups older than 7 days...
forfiles /p "%DEST_DIR%" /m "backup_obsidian_vault_*.zip" /d -7 /c "cmd /c del /q @path" 2>nul

echo Done! Backup process complete.
:: timeout /t 5