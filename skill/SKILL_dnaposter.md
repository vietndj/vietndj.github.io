---
name: dna-poster
description: "Trích xuất Face DNA từ ảnh bất kỳ và tạo Thần Chú 6 Lớp Khóa (6-Layer God Prompt) để sinh ảnh chân dung điện ảnh tuyệt đối không bị lây nhiễm (bleed) đặc điểm nhân vật."
---

# Kỹ Năng: DNA Poster — Tạo Ảnh Điện Ảnh Chống Lây Nhiễm Mặt

Kỹ năng này giúp Agent tạo ảnh chân dung điện ảnh (Cinematic Poster) cho **bất kỳ ai**, đảm bảo khuôn mặt KHÔNG bị lây nhiễm (bleed) đặc điểm nhân vật gốc (râu, tóc, sẹo, tuổi, phong cách vẽ).

## Bước 0: Kiểm tra ảnh mỏ neo (Anchor Images)

Khi người dùng kích hoạt kỹ năng này, Agent PHẢI kiểm tra file `~/.gemini/config/skills/dna-poster/assets/face_catalog.json`:
- Nếu **đã tồn tại** và có đủ ảnh → đọc thông tin và bỏ qua Bước 1.
- Nếu **chưa tồn tại** hoặc thiếu ảnh → chuyển sang Bước 1.

## Bước 1: Thu thập ảnh mỏ neo (Onboarding)

Hỏi người dùng **3 ảnh mỏ neo** theo thứ tự. Dùng tool `ask_question` để hướng dẫn rõ ràng:

> **Để AI nhận diện chính xác khuôn mặt của bạn, hãy cung cấp 3 ảnh sau:**
>
> 📸 **Ảnh 1 — Cận mặt, cười tự nhiên:** Chính diện, ánh sáng rõ, hở răng trên, mắt có catchlight.
>
> 📸 **Ảnh 2 — Cận mặt, nghiêm túc:** Chính diện, miệng khép, biểu cảm tự tin, ánh sáng có khối.
>
> 📸 **Ảnh 3 — Bán thân hoặc toàn thân:** Cho AI thấy tỷ lệ đầu/vai/cơ thể.

Sau khi nhận đủ ảnh, Agent dùng **Vision** phân tích ảnh để tự trích xuất Face DNA:
- `subject_name`: Tên người dùng (hỏi hoặc dùng "User")
- `age_gender`: Ví dụ "35-year-old Vietnamese man"
- `face_shape`: Ví dụ "Oval face shape, high cheekbones, soulful Asian monolid eyes"
- `hair_beard`: Ví dụ "Short black hair, textured modern fringe. Clean-shaven, NO beard, NO mustache"
- `eye_color`: Ví dụ "Natural dark brown eyes"

Agent tạo file `face_catalog.json` tại `~/.gemini/config/skills/dna-poster/assets/`:

```json
{
  "subject_name": "User",
  "is_activated": true,
  "anchors": {
    "smile": "/đường/dẫn/ảnh_cười.jpg",
    "serious": "/đường/dẫn/ảnh_nghiêm_túc.jpg",
    "body": "/đường/dẫn/ảnh_toàn_thân.jpg"
  },
  "face_dna": {
    "age_gender": "35-year-old Vietnamese man",
    "face_shape": "Oval face shape, high cheekbones, soulful Asian monolid eyes",
    "hair_beard": "Short black hair, textured modern fringe. Clean-shaven, NO beard, NO mustache",
    "eye_color": "Natural dark brown eyes"
  }
}
```

Sau đó, **tạo thử 1 banner ngẫu nhiên** (ví dụ: "Chiến binh Samurai") để người dùng duyệt.
- Nếu OK → Lưu và hoàn tất onboarding.
- Nếu KHÔNG OK → Hỏi người dùng muốn thay ảnh mỏ neo hay chỉnh sửa DNA.

## Bước 2: Đúc Thần Chú 6 Lớp Khóa (6-Layer God Prompt)

Khi người dùng yêu cầu tạo ảnh (ví dụ: "Tạo ảnh tôi giống Iron Man"), Agent đọc `face_catalog.json` và đúc prompt theo template sau:

```text
You are an image generation specialist. Your task is to generate a cinematic poster.
Concept: [OUTFIT_CONCEPT]
REQUIREMENTS:
1. SUBJECT & OUTFIT: A [age_gender]. OUTFIT: [outfit mô tả chi tiết].
2. BIOMETRIC LOCK: [face_shape]. The face MUST perfectly match the reference images. DO NOT morph.
3. GENDER & AGE LOCK: 100% human body, age locked to [age_gender].
4. HAIR & BEARD LOCK: [hair_beard]. NO anime hair.
5. EYE & EXPRESSION LOCK: [eye_color]. NO glowing eyes, NO glasses (unless requested). Neutral confident expression, mouth closed. NO weird or extreme facial expressions.
6. SKIN & FX LOCK: Clean skin. NO facial scars, NO face paint, NO blood, NO dirt on face.
7. STYLE LOCK: Hyper-realistic cinematic photography, photorealistic, 8k. DO NOT use anime, manga, or 3D game styles.
8. You MUST use the generate_image tool. Pass these anchor images in the ImagePaths argument:
   - [anchors.smile]
   - [anchors.serious]
9. The ImageName should be "[tên_file]". AspectRatio: "9:16".
10. Reply to me with the absolute path of the generated image.
```

## Bước 3: Khởi chạy (Dispatch)

Sử dụng `invoke_subagent` (TypeName: `self`) để gọi subagent với prompt đã đúc ở Bước 2.
Sau khi subagent trả kết quả, hiển thị ảnh cho người dùng xem và hỏi có muốn tạo thêm không.

## Bảng Tham Chiếu: 6 Loại Lây Nhiễm Đã Phát Hiện

| Lớp Khóa | Loại Lây Nhiễm | Ví Dụ |
|---|---|---|
| BIOMETRIC | Bóp/tròn mặt theo nhân vật | Captain America, Cyberpunk |
| GENDER/AGE | Trẻ hóa, nữ tính hóa | Princess Mononoke, Amélie |
| HAIR/BEARD | Mọc râu, đổi tóc, anime hair | Cast Away, Cloud Strife, Point Break |
| EYE/EXPRESSION | Đổi màu mắt, cười lố, đeo kính | The Witcher, Patch Adams, Now You See Me |
| SKIN/FX | Sẹo, bùn, tuyết, face paint | The Revenant, Lone Survivor, Joker |
| STYLE | Anime 2D, 3D game render | Princess Mononoke, Cyberpunk 2077 |
