@echo off
echo FOMOS-NEW Setup
echo ================
cd /d %~dp0

where pnpm >nul 2>&1
if %errorlevel% == 0 (
    echo pnpm 발견 - pnpm install 실행중...
    pnpm install
    echo.
    echo 완료! pnpm dev 시작합니다...
    pnpm dev
) else (
    echo pnpm 없음 - npm 으로 설치중...
    npm install --legacy-peer-deps
    echo.
    echo 완료! npm run dev 시작합니다...
    npm run dev
)
pause
