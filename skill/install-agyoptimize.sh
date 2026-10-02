#!/usr/bin/env bash
# Script cài đặt Kỹ Năng Tối Ưu Hệ Thống (agy-optimize) cho Hệ Thống AI

echo -e "\033[1;32mBẮT ĐẦU CÀI ĐẶT KỸ NĂNG: TỐI ƯU HỆ THỐNG HỆ THỐNG AI (AGY-OPTIMIZE)\033[0m"

SKILL_DIR="$HOME/.gemini/config/skills/agy-optimize"

mkdir -p "$SKILL_DIR"

echo -e "\033[0;36mĐang tải cấu hình kỹ năng...\033[0m"
curl -sSL "https://raw.githubusercontent.com/vietndj/vietndj.github.io/main/skill/SKILL_agyoptimize.md" -o "$SKILL_DIR/SKILL.md"

echo -e "\n\033[1;32m✅ CÀI ĐẶT THÀNH CÔNG!\033[0m"
echo -e "\033[0;36mHãy mở Hệ Thống AI và gõ 'OPTIMIZE' hoặc 'DỌN RÁC AGY' để bắt đầu tối ưu hệ thống.\033[0m"
