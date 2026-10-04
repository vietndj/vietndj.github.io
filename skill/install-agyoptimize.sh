#!/usr/bin/env bash
# Script cài đặt Kỹ Năng Tối Ưu Hệ Thống (agy-optimize) cho Hệ Thống AI
# Dùng:  curl -sSL https://fedu.vn/skill/install-agyoptimize.sh | bash

set -u

GREEN="\033[1;32m"; CYAN="\033[0;36m"; RED="\033[1;31m"; NC="\033[0m"

echo -e "${GREEN}BẮT ĐẦU CÀI ĐẶT KỸ NĂNG: TỐI ƯU HỆ THỐNG (AGY-OPTIMIZE)${NC}"

SKILL_DIR="$HOME/.gemini/config/skills/agy-optimize"
SCRIPTS_DIR="$SKILL_DIR/scripts"

# Mirror chính (fedu.vn) trước, GitHub raw (nhánh master) làm dự phòng
BASES=(
  "https://fedu.vn/skill"
  "https://raw.githubusercontent.com/vietndj/vietndj.github.io/master/skill"
)

if ! command -v curl >/dev/null 2>&1; then
  echo -e "${RED}❌ Máy chưa có curl. Cài curl rồi chạy lại.${NC}"; exit 1
fi
if ! command -v python3 >/dev/null 2>&1; then
  echo -e "${RED}❌ Máy chưa có python3 (cần cho context_audit.py). Cài python3 rồi chạy lại.${NC}"; exit 1
fi

mkdir -p "$SCRIPTS_DIR" || { echo -e "${RED}❌ Không tạo được thư mục $SCRIPTS_DIR${NC}"; exit 1; }

# download <tên file trên server> <đường dẫn đích>
download() {
  local name="$1" dest="$2" tmp base
  tmp="$(mktemp)"
  for base in "${BASES[@]}"; do
    if curl -fsSL --retry 2 --max-time 30 "$base/$name" -o "$tmp" && [ -s "$tmp" ]; then
      mv "$tmp" "$dest"; return 0
    fi
  done
  rm -f "$tmp"; return 1
}

echo -e "${CYAN}[1/2] Đang tải SKILL.md ...${NC}"
if ! download "SKILL_agyoptimize.md" "$SKILL_DIR/SKILL.md"; then
  echo -e "${RED}❌ Không tải được SKILL.md (kiểm tra mạng rồi chạy lại).${NC}"; exit 1
fi
if ! head -1 "$SKILL_DIR/SKILL.md" | grep -q '^---'; then
  echo -e "${RED}❌ File SKILL.md tải về không hợp lệ.${NC}"; rm -f "$SKILL_DIR/SKILL.md"; exit 1
fi

echo -e "${CYAN}[2/2] Đang tải context_audit.py ...${NC}"
if ! download "context_audit.py" "$SCRIPTS_DIR/context_audit.py"; then
  echo -e "${RED}❌ Không tải được context_audit.py.${NC}"; exit 1
fi
chmod +x "$SCRIPTS_DIR/context_audit.py"
python3 -m py_compile "$SCRIPTS_DIR/context_audit.py" || { echo -e "${RED}❌ context_audit.py lỗi cú pháp.${NC}"; exit 1; }
rm -rf "$SCRIPTS_DIR/__pycache__"

echo -e "\n${GREEN}✅ CÀI ĐẶT THÀNH CÔNG!${NC}  ($SKILL_DIR)"
echo -e "${CYAN}Hãy mở Hệ Thống AI và gõ 'OPTIMIZE' hoặc 'DỌN RÁC AGY' để bắt đầu tối ưu hệ thống.${NC}"
