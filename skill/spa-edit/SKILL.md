---
name: spa-edit
description: "Kỹ năng đóng gói chuyên biệt dựng video Chuyên gia Spa / Thẩm mỹ / Da liễu (Phong cách Thắm Thỏ Spa V10) & Bác sĩ Nha khoa / Phòng khám Y khoa (Phong cách Tiến Nha Sĩ V10): Whip-Snap Keyframe Speed-Ramp 0.28s (8.5 frames) khớp nhịp lấy hơi + 90% giữ tĩnh sắc nét (Adaptive Unsharp Masking), Khóa mắt Affine Y=650px, Phụ đề 5B khóa x-height 1:1, Bản vẽ Khoa học Scientific Atlas 2D (#F5F2EB) & Sơ đồ Trục Dọc (#MG2_ROADMAP X=158), Mỗi cảnh trám chỉ dùng đúng 1 lần (Gate 6), Logo thương hiệu chỉ hiện lúc đọc CTA & Màn hình đen OUTRO 01, cùng Video Trước–Sau Nền Trắng Y Khoa #F5F2EB thoáng sạch. Hỗ trợ học viên mới chỉ cần 1 video quay điện thoại: tự động tìm file, lập Kế hoạch Edit + hỏi 6 câu hỏi xác nhận (Confirm Checklist) trước khi render. Kích hoạt tự nhiên ('edit video ... theo phong cách spa', 'edit như thắm thỏ', 'edit như tiến nha sĩ', 'lên kế hoạch edit video...') hoặc mantra: EDIT SPA."
---

# 🌿🦷 KỸ NĂNG EDIT VIDEO SPA & NHA KHOA Y KHOA (`SPA-EDIT` V10 MASTER — DÀNH CHO CẢ MÁY ANH VIỆT & HỌC VIÊN MỚI)

## 🗣️ 0. CÁCH GỌI TỰ NHIÊN CHỈ VỚI 1 VIDEO QUAY ĐIỆN THOẠI (0 MA SÁT)
Học viên mới cài Antigravity (hoặc anh Việt) chỉ cần thả 1 video quay bằng điện thoại vào máy (hoặc chỉ cần nói tên file video đang nằm ở `Downloads`, `Desktop`, `Documents`) và nói tự nhiên:
- *"Edit video `mun1.mp4` theo phong cách spa như Thắm Thỏ"*
- *"Lên kế hoạch edit cho video `nhakhoa.mov` theo phong cách Tiến Nha Sĩ"*
- *"Hãy edit video sau theo phong cách spa, thương hiệu Linh Spa Beauty, ưu đãi 399 nghìn"*
- Hoặc gõ mantra ngắn gọn: **`EDIT SPA`** (hoặc `/spa-edit`).

---

## 🔄 1. QUY TRÌNH 2 PHA THÔNG MINH (LẬP KẾ HOẠCH & HỎI CONFIRM ➔ KẾT XUẤT VIDEO `.MP4`)

### Pha 1: Tự Động Tìm Video, Bóc Lời Thoại, Lập Kế Hoạch Edit & Hỏi Học Viên Xác Nhận (`--plan`)
Ngay khi người dùng gọi kỹ năng và nói tên video (kể cả khi **chỉ có đúng 1 video quay qua điện thoại**, chưa có video cảnh trám `tram1..3.mp4`):
1. **Chạy lệnh Lập Kế Hoạch Tự Động (`--plan`):**
   ```bash
   PY_BIN="$HOME/.mfx_v3/venv/bin/python"; [ -x "$PY_BIN" ] || PY_BIN="python3"
   "$PY_BIN" ~/.gemini/config/skills/spa-edit/scripts/spa_edit_cli.py \
     --video "<tên_hoặc_đường_dẫn_video>" \
     --style [spa|dental|auto] \
     --plan
   ```
   - Script tự động tìm file video (`Auto-Locate`), đo tọa độ mắt chủ thể đưa về `(540, 650)`, dò khe lấy hơi (`breath_gaps`), bóc lời thoại tiếng Việt nguyên văn (`WER=0%`), và sinh ngay:
     + `<video>_EDIT_PLAN.md`: Bảng phân nhịp chi tiết từng giây + 3 Bản vẽ Khoa học 2D (`Scientific Atlas #F5F2EB`) + Sơ đồ Lộ trình Trục dọc (`#MG2_ROADMAP`).
     + `<video>_edl_plan.json`: Cấu hình EDL V10 đạt 7/7 cổng kiểm định.
     + `<video>_contact_sheet.jpg` & `<video>_plan_preview.jpg`: Ảnh Storyboard 4 khung xem trước.
2. **BẮT BUỘC Hỏi Học Viên Xác Nhận (`Confirm Checklist` qua tool `ask_question` hoặc hiển thị trực tiếp):**
   Khi người dùng yêu cầu **"lên kế hoạch edit"** (hoặc lần đầu gọi kỹ năng trên video mới), Agent trình bày tóm tắt Bảng Kế Hoạch Edit vừa lập kèm ảnh `<video>_plan_preview.jpg`, sau đó dùng tool `ask_question` hỏi học viên xác nhận nhanh **6 quyết định hậu kỳ cốt lõi**:
   - **Câu hỏi 1 (Phong cách & Bảng màu):** Chọn **Phong cách Thắm Thỏ Spa V10** (*Kem Y Khoa `#F5F2EB` + Đỏ Đất `#B5462F` + Vàng Champagne, làm mịn da bảo vệ môi/mắt*) hay **Phong cách Tiến Nha Sĩ V10** (*Frosted Surgical Slate `#101A26` + Bio-Cyan `#38BDF8` + Mint `#6EE7B7`, phân màu Triệu chứng ↔ Giải pháp*)?
   - **Câu hỏi 2 (Lời thoại & Từ khóa Highlight):** Giữ nguyên 100% lời thoại bóc băng tự động hay cần sửa từ chuyên ngành / từ khóa tô sáng nào?
   - **Câu hỏi 3 (Cảnh trám B-Roll & Bản vẽ Khoa học 2D):** Dùng phương án tự động vẽ **3 Bản vẽ Mô học / Giải phẫu 2D (`Scientific Atlas #F5F2EB`) + Sơ đồ Trục dọc** (dành cho người chỉ có 1 video điện thoại), hay học viên muốn bổ sung thêm video cảnh trám quay rời (`tram1.mp4`, `tram2.mp4`)?
   - **Câu hỏi 4 (Nhịp Camera Whip-Snap Zoom `0.28s`):** Xác nhận khóa mắt `Y=650px` (giữ tĩnh `>88%`) + phóng cận `Whip-Snap 0.28s (8.5 frames)` tại các từ khóa nhấn giọng?
   - **Câu hỏi 5 (Thương hiệu, Logo, Kiểu CTA & Màn hình đen Outro):** Xác nhận Tên thương hiệu / Định vị / Giá ưu đãi, chọn kiểu CTA (*Thẻ vé ưu đãi Click Ripple* kiểu Thắm Thỏ hay *Bong bóng Hỏi–Đáp Bệnh Án DM Q&A* kiểu Bác sĩ Tiến) và Màn hình đen `OUTRO 01` (*Tùy chọn 1: Chỉ Logo lớn & 3 cam kết* hay *Tùy chọn 2: Kèm CTA*)?
   - **Câu hỏi 6 (Đầu ra mong muốn):** Xuất trọn bộ **Video chính 9:16 (`.mp4`) + Video Trước–Sau Nền Trắng `#F5F2EB` (`.mp4`)**, hay chỉ lấy Bản Kế Hoạch Edit + Storyboard?

### Pha 2: Kết Xuất Hoàn Chỉnh Video `.MP4` Chuẩn V10 & Video Trước–Sau Nền Trắng `#F5F2EB` (`--render`)
Sau khi học viên confirm (hoặc nếu học viên nói *"làm luôn / chốt mặc định"* ngay từ đầu):
```bash
PY_BIN="$HOME/.mfx_v3/venv/bin/python"; [ -x "$PY_BIN" ] || PY_BIN="python3"
"$PY_BIN" ~/.gemini/config/skills/spa-edit/scripts/spa_edit_cli.py \
  --plan-file "<đường_dẫn>/<video>_edl_plan.json" \
  --render --with-before-after
```
*(Hoặc chạy thẳng 1 lệnh từ video gốc: thêm `--brand-name "TÊN SPA" --monogram "TS" --tagline "Định vị..." --price "399 NGHÌN" --render --with-before-after`).*

---

## 🔥 2. NĂM TIÊU CHUẨN CỐT LÕI ĐÃ ĐÓNG BĂNG TRONG ENGINE `V10 MASTER`

1. **Gia Tốc Chuyển Động `Whip-Snap Keyframe Speed-Ramp (0.28s = 8.5 frames)` Khớp Khe Lấy Hơi + Khử Mờ 2 Tầng:**
   - Mọi cú chuyển tiêu cự (`1.25x ↔ 1.38x ↔ 1.44x`) hoàn tất dứt khoát trong **`0.28s` (`8.5 frames`)** theo hàm mũ bậc 3.8 $E(u) = 1 - (1 - u)^{3.8}$ — đi **80.9% quãng đường ngay trong `0.10s` đầu (3 frames)** rồi đệm phanh êm trong `0.18s`.
   - Khóa tĩnh tuyệt đối **`~90%` thời lượng nói** tại tâm mắt `Y=650px` (`ΔX=0px, ΔY=0px`) kèm `LANCZOS4` + `Adaptive Unsharp Mask (amount=1.22, sigma=1.05)`.
2. **Hai Preset Chủ Đề Đóng Gói Sẵn (`Thắm Thỏ Spa` & `Tiến Nha Sĩ`):**
   - `presets/spa_clinic.json` + `brands/tham_tho_beauty.json`: Chuẩn Spa / Thẩm mỹ / Da liễu.
   - `presets/dental_medical.json` + `brands/tien_nha_si.json`: Chuẩn Bác sĩ Nha khoa / Phòng khám Y khoa.
3. **Quy Tắc Đặt Logo Thương Hiệu V10 (Chỉ Hiện Ở Nhịp `CTA` & Màn Hình Đen `OUTRO 01`):**
   - Phần Mở đầu, Thân bài, Cảnh trám và Bản vẽ Khoa học: **Sạch 100% không gắn logo ở trán** (`0% top banner`).
   - Chỉ bật Logo nhỏ (`BRAND 01`) ở vùng trán an toàn `Y = 54..144px` khi bước vào nhịp `CTA` cuối bài + phóng lớn Logo ở màn hình đen `OUTRO 01` (`3.0s–3.2s`).
4. **Video Trước–Sau So Sánh Nền Trắng Y Khoa (`#F5F2EB`) Thoáng Sạch:**
   - Có **Thanh Chủ Đề Video (Topic Hook Pill)** trên đỉnh + **Tiêu đề cụ thể** trên khung phải + **Khung trái `VIDEO GỐC` căn giữa dọc KHÔNG vẽ hộp trắng bên dưới**.
5. **Kiểm Định Tất Định 7 Cổng (`7-Gate Verifier` Độc Lập 100%):**
   ```bash
   python3 ~/.gemini/config/skills/spa-edit/scripts/verify_6gates.py [--plan <video>_edl_plan.json]
   ```
   - Kiểm tra tức thì: `RLI <= 0.85`, `Static A-Roll >= 80%`, `Fake Stats = 0`, `WER = 0.0%`, `Eye-Lock ΔY = 0.0px`, `Unique B-Roll = 1 lần/video`, `Voice Gate = 0 từ cấm`.
