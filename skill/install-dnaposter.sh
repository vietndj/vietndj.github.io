#!/usr/bin/env bash
# Script cài đặt Kỹ Năng DNA Poster — Tạo Ảnh Điện Ảnh Chống Lây Nhiễm Mặt

set -e

echo -e "\033[1;32m╔════════════════════════════════════════════╗\033[0m"
echo -e "\033[1;32m║   BẮT ĐẦU CÀI ĐẶT: DNA POSTER SKILL      ║\033[0m"
echo -e "\033[1;32m╚════════════════════════════════════════════╝\033[0m"

SKILL_DIR="$HOME/.gemini/config/skills/dna-poster"
ASSETS_DIR="$SKILL_DIR/assets"

# 1. Tạo thư mục
mkdir -p "$ASSETS_DIR"

# 2. Tải SKILL.md từ GitHub
echo -e "\n\033[0;36m[1/4] Đang tải cấu hình kỹ năng từ GitHub...\033[0m"
curl -sSL "https://raw.githubusercontent.com/vietndj/vietndj.github.io/main/skill/SKILL_dnaposter.md" -o "$SKILL_DIR/SKILL.md"
echo -e "\033[0;32m  ✓ Đã tải SKILL.md\033[0m"

# 3. Yêu cầu ảnh mỏ neo
echo -e "\n\033[1;33m[2/4] CUNG CẤP 3 ẢNH MỎ NEO ĐỂ AI NHẬN DIỆN KHUÔN MẶT:\033[0m"
echo ""
echo -e "\033[1;37m📸 Ảnh 1 — Cận mặt, cười tự nhiên:\033[0m"
echo "   Chính diện, ánh sáng rõ, hở răng trên, mắt có catchlight."
read -p "   Kéo thả hoặc nhập đường dẫn: " ANCHOR_1
ANCHOR_1=$(echo "$ANCHOR_1" | sed -e "s/^'//" -e "s/'$//")

echo ""
echo -e "\033[1;37m📸 Ảnh 2 — Cận mặt, nghiêm túc:\033[0m"
echo "   Chính diện, miệng khép, biểu cảm tự tin, ánh sáng có khối."
read -p "   Kéo thả hoặc nhập đường dẫn: " ANCHOR_2
ANCHOR_2=$(echo "$ANCHOR_2" | sed -e "s/^'//" -e "s/'$//")

echo ""
echo -e "\033[1;37m📸 Ảnh 3 — Bán thân hoặc toàn thân:\033[0m"
echo "   Cho AI thấy tỷ lệ đầu/vai/cơ thể."
read -p "   Kéo thả hoặc nhập đường dẫn: " ANCHOR_3
ANCHOR_3=$(echo "$ANCHOR_3" | sed -e "s/^'//" -e "s/'$//")

# 4. Tạo face_catalog.json (Face DNA sẽ được AI trích xuất tự động khi chạy lần đầu)
echo -e "\n\033[0;36m[3/4] Đang lưu cấu hình mỏ neo...\033[0m"
CATALOG_PATH="$ASSETS_DIR/face_catalog.json"
cat > "$CATALOG_PATH" <<EOF
{
  "subject_name": "User",
  "is_activated": true,
  "anchors": {
    "smile": "$ANCHOR_1",
    "serious": "$ANCHOR_2",
    "body": "$ANCHOR_3"
  },
  "face_dna": {
    "age_gender": "",
    "face_shape": "",
    "hair_beard": "",
    "eye_color": ""
  },
  "note": "face_dna sẽ được AI tự động trích xuất khi bạn dùng lần đầu."
}
EOF
echo -e "\033[0;32m  ✓ Đã lưu face_catalog.json\033[0m"

# 5. Hoàn tất
echo -e "\n\033[0;36m[4/4] Hoàn tất cài đặt!\033[0m"
echo ""
echo -e "\033[1;32m╔════════════════════════════════════════════╗\033[0m"
echo -e "\033[1;32m║   ✅ CÀI ĐẶT THÀNH CÔNG!                  ║\033[0m"
echo -e "\033[1;32m╚════════════════════════════════════════════╝\033[0m"
echo ""
echo -e "Bây giờ hãy mở Antigravity và chat:"
echo -e "  \033[1;36m\"Tạo ảnh tôi giống poster phim Iron Man\"\033[0m"
echo -e "  \033[1;36m\"Tạo ảnh tôi kiểu chiến binh Samurai\"\033[0m"
echo ""
echo -e "AI sẽ tự phân tích khuôn mặt từ ảnh mỏ neo và tạo ảnh chính xác."
