$ErrorActionPreference = "Stop"
$Channel = "spa"
$CdnUrl = "https://media.fedu.vn/skills/spa"
$SkillsDir = Join-Path $env:USERPROFILE ".gemini\config\skills"
$VenvDir = Join-Path $env:USERPROFILE ".mfx_v3\venv"
$BrandBackup = Join-Path $env:TEMP "fedu_default_brand_backup.json"

Write-Host "==================================================================" -ForegroundColor Green
Write-Host "DANG CAI DAT / CAP NHAT: Kỹ Năng Edit Video Spa & Nha Khoa V10 (0 TOKEN)" -ForegroundColor Green
Write-Host "==================================================================" -ForegroundColor Green

$BrandPath = Join-Path $SkillsDir "spa-edit\brands\student_default_brand.json"
if (Test-Path $BrandPath) {
    Copy-Item $BrandPath $BrandBackup -Force
}

Write-Host "[1/5] Dang tai goi ky nang moi nhat tu $CdnUrl ..." -ForegroundColor Cyan
New-Item -ItemType Directory -Force -Path $SkillsDir | Out-Null
$TmpTar = Join-Path $env:TEMP "fedu_${Channel}_latest.tar.gz"
Invoke-WebRequest -Uri "$CdnUrl/latest.tar.gz?t=$([DateTimeOffset]::Now.ToUnixTimeSeconds())" -OutFile $TmpTar -UseBasicParsing
tar -xzf $TmpTar -C $SkillsDir
Remove-Item $TmpTar -Force -ErrorAction SilentlyContinue

Invoke-WebRequest -Uri "$CdnUrl/manifest.json?t=$([DateTimeOffset]::Now.ToUnixTimeSeconds())" -OutFile (Join-Path $SkillsDir ".fedu_${Channel}_manifest.json") -UseBasicParsing -ErrorAction SilentlyContinue

if (Test-Path $BrandBackup) {
    $BrandDir = Join-Path $SkillsDir "spa-edit\brands"
    New-Item -ItemType Directory -Force -Path $BrandDir | Out-Null
    Copy-Item $BrandBackup $BrandPath -Force
    Remove-Item $BrandBackup -Force -ErrorAction SilentlyContinue
}

Write-Host "[2/5] Dang kiem tra Python va cai dat thu vien xu ly Video/Audio..." -ForegroundColor Cyan
$VenvPy = Join-Path $VenvDir "Scripts\python.exe"
if (-not (Test-Path $VenvPy)) {
    python -m venv $VenvDir
}
& $VenvPy -m pip install --upgrade pip --quiet
& $VenvPy -m pip install numpy opencv-python-headless pillow imageio-ffmpeg faster-whisper scipy --quiet

Write-Host "[4/5] Dang tao nut bam nhanh ngoai Desktop..." -ForegroundColor Cyan
$DesktopDir = [Environment]::GetFolderPath("Desktop")
$UpdateBat = Join-Path $DesktopDir "Cap_Nhat_Ky_Nang_FEDU.bat"
"@echo off`r`npowershell -ExecutionPolicy Bypass -c `"irm https://media.fedu.vn/skills/spa/install.ps1 | iex`"`r`npause" | Set-Content -Path $UpdateBat -Encoding ASCII

$DoctorPy = Join-Path $SkillsDir "spa-edit\scripts\doctor.py"
if (Test-Path $DoctorPy) {
    Write-Host "[5/5] Dang chay System Doctor..." -ForegroundColor Cyan
    & $VenvPy $DoctorPy
}

Write-Host "==================================================================" -ForegroundColor Green
Write-Host "HOAN TAT 100% (Kỹ Năng Edit Video Spa & Nha Khoa V10) - TON 0 TOKEN!" -ForegroundColor Green
Write-Host "==================================================================" -ForegroundColor Green
