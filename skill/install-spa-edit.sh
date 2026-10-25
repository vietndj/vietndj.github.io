#!/usr/bin/env bash
# ==============================================================================
# BỘ CÀI ĐẶT 1 CHẠM: KỸ NĂNG EDIT VIDEO SPA & NHA KHOA Y KHOA (SPA-EDIT V10 MASTER)
# Hợp nhất tinh hoa: Thắm Thỏ Spa V10 & Tiến Nha Sĩ V10 (100% Độc Lập Cho Học Viên Mới)
# Sử dụng trên máy mới:
#   curl -sSL https://fedu.vn/skill/install-spa-edit.sh | bash
# Cờ hỗ trợ: --with-whisper (cài thêm faster-whisper bóc băng tự động) | --no-smoke
# Biến môi trường: SPA_EDIT_BASE_URL, AIEDIT_BASE_URL (hỗ trợ cài offline/mirror)
# ==============================================================================

set -u

GREEN="\033[1;32m"; CYAN="\033[0;36m"; YELLOW="\033[1;33m"; RED="\033[1;31m"; NC="\033[0m"
ok(){ echo -e "${GREEN}✅ $*${NC}"; }
info(){ echo -e "${CYAN}$*${NC}"; }
warn(){ echo -e "${YELLOW}⚠ $*${NC}"; }
die(){ echo -e "${RED}❌ $*${NC}"; exit 1; }

SKILL_NAME="spa-edit"
SKILL_DIR="$HOME/.gemini/config/skills/$SKILL_NAME"
RUNTIME_DIR="$HOME/.mfx_v3"
VENV_DIR="$RUNTIME_DIR/venv"

WITH_WHISPER=0
RUN_SMOKE=1
for arg in "$@"; do
  case "$arg" in
    --with-whisper) WITH_WHISPER=1 ;;
    --no-smoke)     RUN_SMOKE=0 ;;
  esac
done

echo -e "${GREEN}╔════════════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║  BẮT ĐẦU CÀI ĐẶT KỸ NĂNG: EDIT VIDEO SPA & NHA KHOA (SPA-EDIT V10)     ║${NC}"
echo -e "${GREEN}║  (Tích hợp sẵn: Phong cách Thắm Thỏ Spa V10 & Tiến Nha Sĩ V10)         ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════════════════════╝${NC}"

# 1. Cài đặt nền tảng MFX V3.2 + 12 Fonts V10 + 8 SFX (không cần rclone!)
if [ ! -x "$VENV_DIR/bin/python" ] || [ ! -f "$RUNTIME_DIR/resources/fonts/SVN-Acta-BoldItalic.ttf" ]; then
  info "[1/4] Đang cài đặt nền tảng Core Engine MFX V3.2 (Python venv + OpenCV + 12 Fonts V10 + 8 SFX)..."
  if [ -n "${LOCAL_SKILL_REPO:-}" ] && [ -f "$LOCAL_SKILL_REPO/install-aiedit.sh" ]; then
    AIEDIT_BASE_URL="file://$LOCAL_SKILL_REPO/aiedit-v3" bash "$LOCAL_SKILL_REPO/install-aiedit.sh" --no-smoke || warn "Tiếp tục thiết lập gói Spa-Edit V10..."
  else
    curl -sSL https://fedu.vn/skill/install-aiedit.sh | bash -s -- --no-smoke || warn "Tiếp tục thiết lập gói Spa-Edit V10..."
  fi
else
  info "[1/4] Đã phát hiện Core Engine MFX V3.2 + 12 Fonts V10 sẵn sàng tại $RUNTIME_DIR."
fi

PY_BIN="$VENV_DIR/bin/python"
[ -x "$PY_BIN" ] || PY_BIN="python3"

if [ "$WITH_WHISPER" = "1" ]; then
  info "      Đang cài đặt thêm faster-whisper (tự động bóc lời thoại tiếng Việt từ video điện thoại)..."
  "$PY_BIN" -m pip install --quiet --disable-pip-version-check faster-whisper || warn "Bỏ qua faster-whisper (sẽ dùng transcript thông minh)."
fi

# 2. Tạo cấu trúc thư mục spa-edit và tải 2 Presets (Thắm Thỏ Spa + Tiến Nha Sĩ) + Brands + Scripts V10
info "[2/4] Đang tải gói Kỹ năng SPA-EDIT V10 (Thắm Thỏ Spa + Tiến Nha Sĩ + Interactive Planner)..."
mkdir -p "$SKILL_DIR/presets" "$SKILL_DIR/brands" "$SKILL_DIR/scripts"

BASES=()
if [ -n "${SPA_EDIT_BASE_URL:-}" ]; then
  BASES+=("${SPA_EDIT_BASE_URL%/}")
fi
if [ -n "${LOCAL_SKILL_REPO:-}" ] && [ -d "$LOCAL_SKILL_REPO/spa-edit" ]; then
  BASES+=("file://$LOCAL_SKILL_REPO/spa-edit")
fi
BASES+=(
  "https://fedu.vn/skill/spa-edit"
  "https://raw.githubusercontent.com/vietndj/vietndj.github.io/master/skill/spa-edit"
)

download_rel(){
  local rel="$1" dest="$2" tmp base
  tmp="$(mktemp)"
  for base in "${BASES[@]}"; do
    if curl -fsSL --retry 2 --max-time 30 "$base/$rel" -o "$tmp" && [ -s "$tmp" ]; then
      mv "$tmp" "$dest"
      return 0
    fi
  done
  rm -f "$tmp"
  return 1
}

FILES=(
  "SKILL.md"
  "presets/spa_clinic.json"
  "presets/dental_medical.json"
  "brands/tham_tho_beauty.json"
  "brands/tien_nha_si.json"
  "scripts/spa_edit_cli.py"
  "scripts/verify_6gates.py"
  "scripts/verify_readability_and_sync.py"
)

for rel in "${FILES[@]}"; do
  download_rel "$rel" "$SKILL_DIR/$rel" || die "Không tải được $rel"
done

chmod +x "$SKILL_DIR"/scripts/*.py 2>/dev/null || true

# 3. Tạo symlink đa đường dẫn để Antigravity nhận diện ngay lập tức
info "[3/4] Đang liên kết Kỹ năng SPA-EDIT V10 vào Antigravity..."
mkdir -p "$HOME/.gemini/skills"
ln -sfn "$SKILL_DIR" "$HOME/.gemini/skills/$SKILL_NAME" 2>/dev/null || true
if [ -d "$HOME/.gemini/antigravity" ]; then
  mkdir -p "$HOME/.gemini/antigravity/skills"
  ln -sfn "$SKILL_DIR" "$HOME/.gemini/antigravity/skills/$SKILL_NAME" 2>/dev/null || true
fi

# 4. Chạy kiểm định độc lập 7 Cổng (7-Gate Verifier) đảm bảo máy học viên sẵn sàng 100%
if [ "$RUN_SMOKE" = "1" ]; then
  info "[4/4] Đang chạy kiểm định 7 Cổng (7-Gate Standalone Verifier)..."
  "$PY_BIN" "$SKILL_DIR/scripts/verify_6gates.py" || die "Kiểm định 7 Cổng thất bại!"
else
  info "[4/4] Bỏ qua kiểm định (--no-smoke)."
fi

echo -e "\n${GREEN}✅ CÀI ĐẶT KỸ NĂNG SPA-EDIT & DENTAL V10 THÀNH CÔNG 100%!${NC} ($SKILL_DIR)"
echo -e "${CYAN}Cách sử dụng tự nhiên chỉ với 1 video quay điện thoại trong Antigravity:${NC}"
echo -e "  • Cách 1 (Gọi tự nhiên): ${GREEN}\"Hãy lên kế hoạch edit cho video <tên_video.mp4> theo phong cách spa (hoặc nha sĩ)\"${NC}"
echo -e "    -> AI sẽ tự tìm video, bóc lời thoại, lập bảng kế hoạch + hỏi bạn 6 câu xác nhận trước khi xuất .mp4!"
echo -e "  • Cách 2 (Mantra siêu tốc): ${GREEN}EDIT SPA${NC} (kèm file video)"
echo -e "  • Tài liệu đầy đủ: ${GREEN}https://fedu.vn/skill/spa-edit.html${NC}"
