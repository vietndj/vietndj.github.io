---
name: so-do-motion
description: "Kỹ năng chuyên biệt tạo Video Sơ Đồ Chuyển Động 60fps (Explainer Flowchart Motion 1080x1920 @ 60fps) kèm Phụ đề 5B, 4 lớp SFX Studio và Vòng Lặp Tự Học Lồng Tiếng Khóa Vi Nhịp (4 Cổng Verifier). Tự động phân nhánh 2 chế độ giọng đọc: (1) Gọi bình thường -> tạo giọng đọc từ Gemini TTS (gemini-3.8-flash-tts Studio điềm tĩnh); (2) Thêm cụm 'giọng của tôi' -> lấy mẫu giọng thật của người dùng qua Google AI Studio Voice Design + Real-Voice F0 Acoustic Transfer. Kích hoạt bằng câu tự nhiên ('tạo sơ đồ motion...', 'tạo sơ đồ motion ... giọng của tôi') hoặc mantra: SO DO MOTION."
---

# 📊 KỸ NĂNG SƠ ĐỒ MOTION 60FPS (`SO-DO-MOTION` — EXPLAINER FLOWCHART & BEAT-LOCKED VOICEOVER)

## 🗣️ 0. TÊN KỸ NĂNG & CÁCH GỌI TỰ NHIÊN (2 CHẾ ĐỘ GIỌNG ĐỌC)
- **Tên kỹ năng hệ thống:** `so-do-motion` (**Element Sơ Đồ Chuyển Động 60fps trong Edit Video & Motion Graphic**).
- **Khi nào sử dụng?**
  Khi cần giải thích một **quy trình nhiều bước**, **cơ chế hoạt động**, **sơ đồ tư duy nhân quả**, hoặc **so sánh luồng công việc Cũ vs. Mới** bằng một đoạn video đồ họa chuyển động `60fps` sắc nét (có thể dùng làm video độc lập 20s hoặc chèn làm 1 Element đắt giá vào giữa video Talking-Head).
- **2 Cách gọi tự nhiên (Tự động chọn chế độ giọng đọc):**
  1. **Chế độ Mặc Định (Gọi bình thường $\rightarrow$ Giọng tạo từ Gemini TTS Studio):**
     - *"Tạo sơ đồ motion 60fps giải thích quy trình 4 bước..."*
     - *"SO DO MOTION: quy trình đưa AI vào edit video"*
     - $\rightarrow$ Hệ thống tự động gọi **`gemini-3.8-flash-tts`** tạo giọng đọc Studio điềm tĩnh, khóa khớp từng vi nhịp sáng đèn của sơ đồ.
  2. **Chế độ Cá Nhân Hóa (Thêm cụm từ `"giọng của tôi"` $\rightarrow$ Lấy giọng của bạn bằng AI Studio):**
     - *"Tạo sơ đồ motion 60fps giải thích quy trình... bằng giọng của tôi"*
     - *"SO DO MOTION giọng của tôi: [nội dung sơ đồ]"*
     - $\rightarrow$ Hệ thống trích mẫu giọng thật của bạn (từ hồ sơ `~/.so-do-motion/voice_profile.json` hoặc file video/audio của bạn), kết hợp **Google AI Studio (`gemini-3.8-flash-tts` Voice Design)** và **Real-Voice Acoustic Transfer (`rubberband --formant` khớp tần số cơ bản `F0` & màu âm phổ)** để tạo ra bản lồng tiếng mang đúng màu giọng thật của bạn.

---

## 🏗️ 1. KIẾN TRÚC 2 BƯỚC & VÒNG LẶP TỰ HỌC 4 CỔNG VERIFIER

### Bước 1: Kết xuất Đồ họa Sơ Đồ 60fps + Phụ Đề 5B + 4 Lớp SFX (`build_diagram_motion_60fps.py`)
- **Khung hình:** `1080×1920 @ 60fps` (`H.264 High Profile`, `CRF 16`).
- **Hiệu ứng mở sáng từng phần (Progressive Node Reveal):** Sơ đồ không hiện ra phẳng lì cùng lúc mà bung mở từng hộp, chạy hạt sáng dọc dây dẫn và nổ con số thống kê (`~80%`) khớp chính xác với **10 Vi Nhịp (`Beats #01 → #10`)**.
- **Phụ đề 5B khóa `x-height 1:1`:** Đặt tại vùng an toàn đáy (`Y = 1612..1770px`), cách đáy sơ đồ `>= 100px`, kèm thanh gạch chân Cam Đỏ quét mở dưới từ khóa nhấn.
- **4 Lớp SFX Voice-Safe (`48kHz Stereo`):** `Soft Sub Whoosh`, `Mechanical UI Tick`, `Warm Brass Impact`, và `Crystal Chime`.

### Bước 2: Vòng Lặp Tự Học Lồng Tiếng Khóa Vi Nhịp (`self_learning_voice_loop.py`)
Mọi bản thu âm (dù ở chế độ `--voice gemini` hay `--voice mine`) đều bắt buộc đi qua **4 Cổng Kiểm Định Tất Định (`verifier_4gates.py`)**:
1. **Cổng 1 — Khớp Thời Lượng Từng Vi Nhịp (`Beat Window Gate`):** Mỗi câu đọc phải nằm gọn trong cửa sổ `[start + 0.06s, end - 0.10s]` của Vi Nhịp tương ứng (tự động điều chỉnh `atempo` mượt trong dải tự nhiên `0.92x – 1.18x`).
2. **Cổng 2 — Chất Giọng Điềm Tĩnh & Trầm Ấm (`Studio Warm Mastering Gate`):** Áp dụng bộ lọc cắt tần số chói `> 7.5kHz`, nâng nhẹ dải ấm `160–220Hz`, nén động lực nhẹ và chuẩn hóa âm lượng tại **`-16 LUFS`**.
3. **Cổng 3 — Độ Sạch Sóng Âm (`Waveform Cleanliness Gate`):** Không bị cắt cụt đuôi từ ở cuối mỗi nhịp (`tail silence >= 80ms`) và không vượt ngưỡng đỉnh (`peak <= -1.0 dBFS`).
4. **Cổng 4 — Ghép Master Audio + Video 60fps (`Master Mux Gate`):** Trộn giọng đọc (`100%`) với 4 lớp SFX (`~8.5%` Voice-Safe) và đóng gói vào video `60fps` hoàn chỉnh.

---

## ⚡ 2. CÁC LỆNH CLI TẤT ĐỊNH (`so_do_motion_cli.py`)

### 2.1. Kiểm tra môi trường máy (`doctor`)
```bash
python3 ~/.gemini/config/skills/so-do-motion/scripts/so_do_motion_cli.py doctor
```

### 2.2. Đăng ký mẫu giọng cá nhân 1 lần (`enroll-voice`) — Dùng cho chế độ `"giọng của tôi"`
```bash
python3 ~/.gemini/config/skills/so-do-motion/scripts/so_do_motion_cli.py enroll-voice \
  --input "/đường/dẫn/video_của_bạn.mp4"
```
- Lệnh này trích `14 giây` giọng nói sạch nhất từ video của bạn, đo tần số cơ bản trung vị (`median F0`, ví dụ `165.5Hz`), dải biến thiên cao độ và lưu vào `~/.so-do-motion/voice_profile.json` (dữ liệu riêng của bạn, không bị mất khi cập nhật skill).

### 2.3. Kết xuất Sơ Đồ Motion 60fps — Chế độ 1: Gọi bình thường (Giọng Gemini TTS Studio)
```bash
python3 ~/.gemini/config/skills/so-do-motion/scripts/so_do_motion_cli.py render \
  --spec ~/.gemini/config/skills/so-do-motion/templates/spec.example.json \
  --voice gemini \
  --output ./so_do_motion_60fps_gemini.mp4
```

### 2.4. Kết xuất Sơ Đồ Motion 60fps — Chế độ 2: Thêm `"giọng của tôi"` (Lấy giọng qua AI Studio + Acoustic Transfer)
```bash
python3 ~/.gemini/config/skills/so-do-motion/scripts/so_do_motion_cli.py render \
  --spec ~/.gemini/config/skills/so-do-motion/templates/spec.example.json \
  --voice mine \
  --ref-video "/đường/dẫn/video_của_bạn.mp4" \
  --output ./so_do_motion_60fps_my_voice.mp4
```

---

## 📦 3. CÀI ĐẶT 1 CHẠM CHO HỌC VIÊN ANTIGRAVITY

Học viên dùng Antigravity trên máy Mac chỉ cần mở Terminal (hoặc dán thẳng vào Antigravity) lệnh cài đặt 1 chạm:
```bash
curl -sSL https://fedu.vn/skill/install-so-do-motion.sh | bash
```
- Script tự động kiểm tra `ffmpeg`, `rubberband`, tạo môi trường `~/.so-do-motion/`, tải trọn bộ skill về `~/.gemini/config/skills/so-do-motion/`, hỏi `GEMINI_API_KEY` (lưu an toàn tại `~/.so-do-motion/config.env` với quyền `600`) và chạy `doctor` nghiệm thu.
