#!/usr/bin/env bash
# ==============================================================================
# BỘ CÀI ĐẶT 1 CHẠM: KỸ NĂNG EDIT VIDEO CHO SPA (SPA-EDIT V7.2 MASTER)
# Sử dụng trên máy mới:
#   curl -sSL https://fedu.vn/skill/install-spa-edit.sh | bash
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

echo -e "${GREEN}╔══════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║   BẮT ĐẦU CÀI ĐẶT KỸ NĂNG: EDIT VIDEO CHO SPA (SPA-EDIT V7.2)    ║${NC}"
echo -e "${GREEN}╚══════════════════════════════════════════════════════════════════╝${NC}"

# 1. Cài đặt nền tảng MFX V3.2 (Python venv, OpenCV, Pillow, Fonts, 8 SFX) nếu chưa có
if [ ! -x "$VENV_DIR/bin/python" ] || [ ! -d "$HOME/.gemini/config/skills/aiedit" ]; then
  info "[1/3] Đang cài đặt nền tảng Core Engine MFX V3.2 (Fonts + 8 SFX + OpenCV)..."
  curl -sSL https://fedu.vn/skill/install-aiedit.sh | bash -s -- --no-smoke || warn "Tiếp tục thiết lập gói Spa-Edit..."
else
  info "[1/3] Đã phát hiện Core Engine MFX V3.2 sẵn sàng tại $RUNTIME_DIR."
fi

# 2. Tạo cấu trúc thư mục spa-edit và tải Preset + Brand + Scripts
info "[2/3] Đang tải gói cấu hình Chủ đề Spa (presets/spa_clinic.json + brands/tham_tho_beauty.json)..."
mkdir -p "$SKILL_DIR/presets" "$SKILL_DIR/brands" "$SKILL_DIR/scripts"

BASES=(
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
  "brands/tham_tho_beauty.json"
  "scripts/spa_edit_cli.py"
  "scripts/verify_6gates.py"
)

for rel in "${FILES[@]}"; do
  download_rel "$rel" "$SKILL_DIR/$rel" || warn "Bỏ qua tải $rel (sử dụng bản cục bộ nếu có)"
done

chmod +x "$SKILL_DIR"/scripts/*.py 2>/dev/null || true

# Tạo symlink đa đường dẫn để Antigravity nhận diện ngay lập tức
mkdir -p "$HOME/.gemini/skills"
ln -sfn "$SKILL_DIR" "$HOME/.gemini/skills/$SKILL_NAME" 2>/dev/null || true
if [ -d "$HOME/.gemini/antigravity" ]; then
  mkdir -p "$HOME/.gemini/antigravity/skills"
  ln -sfn "$SKILL_DIR" "$HOME/.gemini/antigravity/skills/$SKILL_NAME" 2>/dev/null || true
fi

info "[3/3] Hoàn tất liên kết Kỹ năng SPA-EDIT vào Antigravity!"
echo -e "\n${GREEN}✅ CÀI ĐẶT KỸ NĂNG SPA-EDIT V7.2 THÀNH CÔNG!${NC} ($SKILL_DIR)"
echo -e "${CYAN}Cách sử dụng ngay trong Antigravity (Tốn ít token nhất):${NC}"
echo -e "  • Gõ câu lệnh ngắn gọn: ${GREEN}EDIT SPA${NC} (kèm file video gốc + 3 cảnh trám)"
echo -e "  • Hoặc mở trang tài liệu đầy đủ tại: ${GREEN}https://videoai.fedu.vn/09-edit-video-spa.html${NC}"
