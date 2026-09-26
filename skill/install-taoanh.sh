#!/usr/bin/env bash
# Script cài đặt Kỹ Năng AI Face Clone cho Antigravity

echo -e "\033[1;32mBẮT ĐẦU CÀI ĐẶT KỸ NĂNG: AI TẠO ẢNH CHÂN DUNG\033[0m"

SKILL_DIR="$HOME/.gemini/config/skills/ai-face-clone"
ASSETS_DIR="$SKILL_DIR/assets"

# 1. Tạo thư mục
mkdir -p "$ASSETS_DIR"

# 2. Tải SKILL.md
echo -e "\033[0;36mĐang tải cấu hình kỹ năng...\033[0m"
curl -sSL "https://raw.githubusercontent.com/vietndj/vietndj.github.io/main/skill/SKILL_taoanh.md" -o "$SKILL_DIR/SKILL.md"

# 3. Yêu cầu ảnh mỏ neo
echo -e "\n\033[1;33mHÃY CUNG CẤP 2 ẢNH MỎ NEO ĐỂ AI NHẬN DIỆN KHUÔN MẶT BẠN:\033[0m"
echo -e "Ảnh 1: Cận cảnh chính diện (Headshot) - rõ viền hàm, catchlight trong mắt, cười hở răng trên."
read -p "Kéo thả hoặc nhập đường dẫn Ảnh 1: " ANCHOR_1
ANCHOR_1=$(echo "$ANCHOR_1" | sed -e "s/^'//" -e "s/'$//") # Xóa dấu nháy đơn nếu có

echo -e "\nẢnh 2: Bán thân (Half-body) - cho AI thấy tỷ lệ đầu/vai."
read -p "Kéo thả hoặc nhập đường dẫn Ảnh 2: " ANCHOR_2
ANCHOR_2=$(echo "$ANCHOR_2" | sed -e "s/^'//" -e "s/'$//")

# 4. Tạo face_catalog.json
CATALOG_PATH="$ASSETS_DIR/face_catalog.json"
cat > "$CATALOG_PATH" <<EOF
{
  "subject_name": "User",
  "is_activated": true,
  "anchors": {
    "primary": "$ANCHOR_1",
    "secondary": "$ANCHOR_2",
    "lifestyle": ""
  },
  "pipeline": "hybrid"
}
EOF

# 5. Hoàn tất
echo -e "\n\033[1;32m✅ CÀI ĐẶT THÀNH CÔNG!\033[0m"
echo -e "Bây giờ bạn có thể mở Antigravity và chat: 'Tạo ảnh tôi đang làm việc ở quán cà phê'."
