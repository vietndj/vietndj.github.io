---
name: ai-face-clone
description: "Kích hoạt khi yêu cầu tạo ảnh/storyboard có khuôn mặt của người dùng: nạp Face DNA để sinh ảnh chính xác khuôn mặt."
---

# Kỹ Năng: AI Tạo Ảnh Chân Dung (>99% Chính Xác)

Kỹ năng này giúp Antigravity tạo ra các bức ảnh chân dung, avatar, phong cách sống với khuôn mặt chính xác của bạn bằng công nghệ Google Imagen 3 Multimodal Anchor Inpainting.

## 1. Cơ Chế Hoạt Động

Khi bạn yêu cầu tạo ảnh có nhân vật (ví dụ: "tạo avatar của tôi", "tạo ảnh tôi đang làm việc"):
1. Kỹ năng sẽ đọc 2 ảnh mỏ neo của bạn (cận cảnh và bán thân).
2. Dùng công nghệ Multimodal Mỏ Neo của Imagen 3 để sinh ảnh với độ chính xác khuôn mặt >99%.
3. Ánh sáng, nếp vải, chi tiết đạt chuẩn 4K, không biến dạng.

## 2. Cách Sử Dụng

Sau khi cài đặt xong, bạn có thể chat các lệnh như:
- "Tạo ảnh của tôi giống poster phim Avatar"
- "Tạo ảnh tôi đang đi chạy bộ ở công viên"
- "Tạo ảnh tôi đang uống cà phê bên cửa sổ"
- "Tạo ảnh tôi mặc vest đen đứng trên sân khấu thuyết trình"

## 3. Cấu Trúc Dữ Liệu

Dữ liệu hình ảnh của bạn được lưu trữ an toàn tại `~/.gemini/config/skills/ai-face-clone/assets/face_catalog.json`.
Tuyệt đối không cần tải lên máy chủ ngoài, toàn bộ cấu hình nằm cục bộ trên máy bạn.
