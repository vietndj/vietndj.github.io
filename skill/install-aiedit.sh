#!/usr/bin/env bash
# Script cài đặt Kỹ Năng AI Edit Video V3.2 (aiedit + render-v3) cho Hệ Thống AI / Antigravity
# Sử dụng:  curl -sSL https://fedu.vn/skill/install-aiedit.sh | bash
# Cờ hỗ trợ: --no-smoke | --uninstall [--purge]
# Biến môi trường: AIEDIT_BASE_URL (dùng khi test local hoặc custom mirror)

set -u

GREEN="\033[1;32m"; CYAN="\033[0;36m"; YELLOW="\033[1;33m"; RED="\033[1;31m"; NC="\033[0m"
ok(){ echo -e "${GREEN}✅ $*${NC}"; }
info(){ echo -e "${CYAN}$*${NC}"; }
warn(){ echo -e "${YELLOW}⚠ $*${NC}"; }
die(){ echo -e "${RED}❌ $*${NC}"; exit 1; }

SKILL_NAME="aiedit"
SKILL_DIR="$HOME/.gemini/config/skills/$SKILL_NAME"
RUNTIME_DIR="$HOME/.mfx_v3"
VENV_DIR="$RUNTIME_DIR/venv"

MODE="install"
RUN_SMOKE=1
for arg in "$@"; do
  case "$arg" in
    --uninstall) MODE="uninstall" ;;
    --no-smoke)  RUN_SMOKE=0 ;;
  esac
done

if [ "$MODE" = "uninstall" ]; then
  # Chỉ gỡ symlink trỏ về aiedit — KHÔNG đụng thư mục render-v3 thật đã có sẵn
  for l in "$HOME/.gemini/config/skills/render-v3" "$HOME/.gemini/skills/$SKILL_NAME" \
           "$HOME/.gemini/skills/render-v3" "$HOME/.gemini/antigravity/skills/$SKILL_NAME"; do
    [ -L "$l" ] && rm -f "$l"
  done
  rm -rf "$SKILL_DIR"
  for a in "$@"; do [ "$a" = "--purge" ] && rm -rf "$RUNTIME_DIR"; done
  ok "Đã gỡ cài đặt Kỹ Năng AI Edit Video ($SKILL_DIR)."
  exit 0
fi

echo -e "${GREEN}╔══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║   BẮT ĐẦU CÀI ĐẶT KỸ NĂNG: AI EDIT VIDEO V3.2 (ZERO-STOP)   ║${NC}"
echo -e "${GREEN}╚══════════════════════════════════════════════════════════════╝${NC}"

BASES=()
if [ -n "${AIEDIT_BASE_URL:-}" ]; then
  BASES+=("${AIEDIT_BASE_URL%/}")
fi
BASES+=(
  "https://fedu.vn/skill/aiedit-v3"
  "https://raw.githubusercontent.com/vietndj/vietndj.github.io/master/skill/aiedit-v3"
)

command -v curl >/dev/null 2>&1 || die "Máy chưa có curl. Hãy cài curl rồi chạy lại."

find_py39(){
  local c
  for c in python3.13 python3.12 python3.11 python3.10 python3 /opt/homebrew/bin/python3 /usr/local/bin/python3 /usr/bin/python3; do
    command -v "$c" >/dev/null 2>&1 || continue
    "$c" -c 'import sys; sys.exit(0 if sys.version_info >= (3,9) else 1)' 2>/dev/null && { command -v "$c"; return 0; }
  done
  return 1
}

PY_SYS="$(find_py39)" || die "Máy chưa có Python 3.9+. Hãy cài Python 3 rồi chạy lại."
info "[1/5] Đã tìm thấy Python: $PY_SYS ($("$PY_SYS" --version 2>&1))"

# 1. Tạo môi trường ảo độc lập ~/.mfx_v3/venv (Tránh triệt để lỗi PEP 668 trên macOS Homebrew)
info "[2/5] Đang thiết lập môi trường xử lý Video & Âm thanh ($VENV_DIR)..."
mkdir -p "$RUNTIME_DIR"
if [ ! -x "$VENV_DIR/bin/python" ]; then
  "$PY_SYS" -m venv "$VENV_DIR" || warn "Không tạo được venv, sẽ sử dụng Python hệ thống."
fi

PY_BIN="$VENV_DIR/bin/python"
if [ ! -x "$PY_BIN" ]; then
  PY_BIN="$PY_SYS"
fi

if ! "$PY_BIN" -c "import cv2, PIL, numpy, imageio_ffmpeg; assert hasattr(cv2, 'CascadeClassifier')" >/dev/null 2>&1; then
  info "      Đang cài đặt thư viện opencv-python-headless, Pillow, numpy, imageio-ffmpeg..."
  "$PY_BIN" -m pip install --quiet --disable-pip-version-check --upgrade pip >/dev/null 2>&1 || true
  "$PY_BIN" -m pip install --quiet --disable-pip-version-check \
    "opencv-python-headless<5" Pillow numpy imageio-ffmpeg || \
  "$PY_BIN" -m pip install --quiet --disable-pip-version-check --user \
    "opencv-python-headless<5" Pillow numpy imageio-ffmpeg || \
    die "Không thể cài đặt thư viện xử lý video."
fi
ok "Đã sẵn sàng môi trường Python + OpenCV + Pillow + FFmpeg Engine."

# 2. Tải toàn bộ file trong gói aiedit-v3
mkdir -p "$SKILL_DIR/scripts" "$SKILL_DIR/resources/fonts" "$SKILL_DIR/resources/sfx" || die "Không tạo được thư mục $SKILL_DIR"

download_rel(){
  local rel="$1" dest="$2" tmp base
  tmp="$(mktemp)"
  for base in "${BASES[@]}"; do
    if curl -fsSL --retry 2 --max-time 45 "$base/$rel" -o "$tmp" && [ -s "$tmp" ]; then
      mv "$tmp" "$dest"
      return 0
    fi
  done
  rm -f "$tmp"
  return 1
}

FILES=(
  "SKILL.md"
  "MANIFEST.sha256"
  "scripts/mfx_v3_universal_engine.py"
  "scripts/edl_bootstrap.py"
  "scripts/atlas_2d_helper.py"
  "scripts/spine_map_mgb02.py"
  "resources/styles_db.json"
  "resources/fonts/FDIntegralCF-Heavy.ttf"
  "resources/fonts/FDIntegralCF-Bold.ttf"
  "resources/fonts/FDTiemposHeadline-RegularItalic.otf"
  "resources/fonts/FDTiemposText-Regular.otf"
  "resources/fonts/FDTiemposText-RegularItalic.otf"
  "resources/fonts/FDAeonikExtended-Bold.otf"
  "resources/fonts/SVN-Aeonik-Bold.ttf"
  "resources/fonts/SVN-Aeonik-Regular.ttf"
  "resources/sfx/whoosh_clean_soft.wav"
  "resources/sfx/pop_soft_bubble.wav"
  "resources/sfx/shutter_flash_click.wav"
  "resources/sfx/sub_bass_hit_clean.wav"
  "resources/sfx/whoosh_fast_air.wav"
  "resources/sfx/click_mechanical_warm.wav"
  "resources/sfx/riser_short_silk.wav"
  "resources/sfx/chime_warm_luxury.wav"
)

info "[3/5] Đang tải bộ Engine MFX V3.2, 8 Font chữ & 8 SFX phòng thu (~1.9MB)..."
for rel in "${FILES[@]}"; do
  download_rel "$rel" "$SKILL_DIR/$rel" || die "Không tải được file: $rel (hãy kiểm tra kết nối mạng)."
done

chmod +x "$SKILL_DIR"/scripts/*.py

# 3. Kiểm định toàn vẹn SHA-256 & Biên dịch cú pháp Python
info "[4/5] Đang kiểm tra tính toàn vẹn SHA-256 & biên dịch kịch bản..."
if command -v shasum >/dev/null 2>&1; then SHA_CHECK="shasum -a 256 -c"; else SHA_CHECK="sha256sum -c"; fi
( cd "$SKILL_DIR" && $SHA_CHECK MANIFEST.sha256 >/dev/null 2>&1 ) || die "Kiểm tra SHA-256 thất bại! File tải về bị lỗi."

for pyf in "$SKILL_DIR"/scripts/*.py; do
  "$PY_BIN" -m py_compile "$pyf" || die "Lỗi cú pháp tại $pyf"
done
rm -rf "$SKILL_DIR/scripts/__pycache__"

# Đồng bộ sang ~/.mfx_v3/resources và tạo symlink đa đường dẫn để Antigravity luôn nhận diện
mkdir -p "$RUNTIME_DIR/resources"
cp -R "$SKILL_DIR/resources/"* "$RUNTIME_DIR/resources/" 2>/dev/null || true

# Tạo symlink render-v3 (nếu chưa phải thư mục thật) và symlink sang ~/.gemini/skills
if [ ! -e "$HOME/.gemini/config/skills/render-v3" ] || [ -L "$HOME/.gemini/config/skills/render-v3" ]; then
  ln -sfn "$SKILL_DIR" "$HOME/.gemini/config/skills/render-v3"
fi
mkdir -p "$HOME/.gemini/skills"
link_if_free(){ { [ ! -e "$1" ] || [ -L "$1" ]; } && ln -sfn "$SKILL_DIR" "$1"; return 0; }
link_if_free "$HOME/.gemini/skills/$SKILL_NAME"
link_if_free "$HOME/.gemini/skills/render-v3"
if [ -d "$HOME/.gemini/antigravity" ]; then
  mkdir -p "$HOME/.gemini/antigravity/skills"
  ln -sfn "$SKILL_DIR" "$HOME/.gemini/antigravity/skills/$SKILL_NAME"
fi
ok "Đã xác thực SHA-256 & liên kết kỹ năng toàn hệ thống."

# 4. Smoke Test kết xuất thử 1 giây
if [ "$RUN_SMOKE" = "1" ]; then
  info "[5/5] Đang chạy Smoke Test kiểm định Engine + Font + SFX + FFmpeg..."
  "$PY_BIN" "$SKILL_DIR/scripts/mfx_v3_universal_engine.py" --smoke || die "Smoke test không vượt qua."
else
  info "[5/5] Bỏ qua Smoke Test (--no-smoke)."
fi

echo -e "\n${GREEN}✅ CÀI ĐẶT THÀNH CÔNG!${NC}  ($SKILL_DIR)"
echo -e "${CYAN}Cách sử dụng ngay trong Hệ Thống AI / Antigravity:${NC}"
echo -e "  • Cách 1: Kéo thả video .mp4 / .mov vào khung chat và gõ: ${GREEN}\"EDIT VIDEO\"${NC} hoặc ${GREEN}\"Edit video này cho tôi\"${NC}"
echo -e "  • Cách 2: Dán khối mã ${GREEN}EDL JSON${NC} từ Gemini Web vào khung chat — AI sẽ tự động render ra file .mp4 hoàn chỉnh!"
