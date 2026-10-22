#!/usr/bin/env bash
# ==============================================================================
# BỘ CÀI ĐẶT 1 CHẠM: KỸ NĂNG SƠ ĐỒ MOTION 60FPS (SO-DO-MOTION V1.0)
# Sử dụng trên máy học viên (Antigravity macOS):
#   curl -sSL https://fedu.vn/skill/install-so-do-motion.sh | bash
# ==============================================================================

set -u

GREEN="\033[1;32m"; CYAN="\033[0;36m"; YELLOW="\033[1;33m"; RED="\033[1;31m"; NC="\033[0m"
ok(){ echo -e "${GREEN}✅ $*${NC}"; }
info(){ echo -e "${CYAN}$*${NC}"; }
warn(){ echo -e "${YELLOW}⚠ $*${NC}"; }
die(){ echo -e "${RED}❌ $*${NC}"; exit 1; }

SKILL_NAME="so-do-motion"
SKILL_DIR="$HOME/.gemini/config/skills/$SKILL_NAME"
USER_DATA_DIR="$HOME/.so-do-motion"
RUNTIME_DIR="$HOME/.mfx_v3"
VENV_DIR="$RUNTIME_DIR/venv"

echo -e "${GREEN}╔════════════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║   BẮT ĐẦU CÀI ĐẶT KỸ NĂNG: SƠ ĐỒ MOTION 60FPS (SO-DO-MOTION V1.0)     ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════════════════════╝${NC}"

# 1. Kiểm tra Core Engine MFX V3.2 (Python venv, OpenCV, Pillow, Fonts, FFmpeg)
if [ ! -x "$VENV_DIR/bin/python" ] && ! command -v ffmpeg >/dev/null 2>&1; then
  info "[1/4] Đang cài đặt nền tảng Core Engine MFX V3.2 (Fonts + SFX + OpenCV)..."
  curl -sSL https://fedu.vn/skill/install-aiedit.sh | bash -s -- --no-smoke || warn "Tiếp tục thiết lập gói So-Do-Motion..."
else
  info "[1/4] Đã phát hiện FFmpeg & môi trường Python sẵn sàng."
fi

# 2. Tạo cấu trúc thư mục skill & dữ liệu cá nhân của học viên (~/.so-do-motion)
info "[2/4] Đang tải gói Kỹ năng Sơ Đồ Motion 60fps (SKILL.md + Templates + 4 Scripts)..."
mkdir -p "$SKILL_DIR/templates" "$SKILL_DIR/scripts" "$USER_DATA_DIR"
chmod 700 "$USER_DATA_DIR" 2>/dev/null || true

BASES=(
  "https://fedu.vn/skill/so-do-motion"
  "https://raw.githubusercontent.com/vietndj/vietndj.github.io/master/skill/so-do-motion"
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
  "templates/spec.example.json"
  "scripts/so_do_motion_cli.py"
  "scripts/build_diagram_motion_60fps.py"
  "scripts/self_learning_voice_loop.py"
  "scripts/verifier_4gates.py"
)

for rel in "${FILES[@]}"; do
  download_rel "$rel" "$SKILL_DIR/$rel" || warn "Bỏ qua tải $rel (sử dụng bản cục bộ nếu có)"
done

chmod +x "$SKILL_DIR"/scripts/*.py 2>/dev/null || true

# 3. Khởi tạo file cấu hình ~/.so-do-motion/config.env (nếu chưa có)
if [ ! -f "$USER_DATA_DIR/config.env" ]; then
  cat > "$USER_DATA_DIR/config.env" <<'EOF'
# Cấu hình riêng cho học viên (Không bị ghi đè khi cập nhật skill)
# Lấy API Key miễn phí tại: https://aistudio.google.com/apikey
GEMINI_API_KEY=""
TTS_MODEL="gemini-3.8-flash-tts"
EOF
  chmod 600 "$USER_DATA_DIR/config.env" 2>/dev/null || true
fi

# 4. Tạo symlink đa đường dẫn để Antigravity nhận diện ngay lập tức
info "[3/4] Đang liên kết Kỹ năng SO-DO-MOTION vào Antigravity..."
mkdir -p "$HOME/.gemini/skills"
ln -sfn "$SKILL_DIR" "$HOME/.gemini/skills/$SKILL_NAME" 2>/dev/null || true
if [ -d "$HOME/.gemini/antigravity" ]; then
  mkdir -p "$HOME/.gemini/antigravity/skills"
  ln -sfn "$SKILL_DIR" "$HOME/.gemini/antigravity/skills/$SKILL_NAME" 2>/dev/null || true
fi

info "[4/4] Chạy kiểm định môi trường (doctor)..."
python3 "$SKILL_DIR/scripts/so_do_motion_cli.py" doctor || true

echo -e "\n${GREEN}✅ CÀI ĐẶT KỸ NĂNG SO-DO-MOTION V1.0 THÀNH CÔNG!${NC} ($SKILL_DIR)"
echo -e "${CYAN}Cách sử dụng ngay trong Antigravity:${NC}"
echo -e "  1️⃣ ${GREEN}Chế độ Mặc định (Giọng tạo từ Gemini TTS Studio):${NC}"
echo -e "     Gõ: ${YELLOW}\"Tạo sơ đồ motion 60fps giải thích quy trình [nội dung của bạn]\"${NC}"
echo -e "  2️⃣ ${GREEN}Chế độ Giọng Cá Nhân (Lấy giọng của bạn bằng AI Studio):${NC}"
echo -e "     Gõ: ${YELLOW}\"Tạo sơ đồ motion 60fps giải thích quy trình [nội dung] bằng giọng của tôi\"${NC} (kèm 1 video của bạn)"
echo -e "  🌐 Xem tài liệu & video mẫu tại: ${GREEN}https://videoai.fedu.vn/05-buoc4-motion-cta.html#evo-element-so-do-motion-60fps${NC}"
