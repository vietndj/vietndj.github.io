---
name: aiedit
description: "Tự động cắt dựng & hậu kỳ video Talking-Head chuẩn MFX V3.2 (Khóa tâm mặt chính giữa, Chữ 2 dòng phát sáng, Cảnh trám B-Roll 9:16, Bản vẽ Khoa Học 2D Atlas, Animation Map trục dọc MG-B02 và Âm thanh 8 SFX 10%). Kích hoạt khi người dùng yêu cầu 'EDIT VIDEO', 'edit video này', gửi file .mp4/.mov hoặc dán mã EDL JSON."
---

# 🎬 KỸ NĂNG AI EDIT VIDEO TỰ ĐỘNG V3.2 (ZERO-STOP EXECUTION)

**Mantra Triggers:** `EDIT VIDEO`, `AI EDIT`, `RENDER V3`, `/aiedit`, `/render-v3`, hoặc khi người dùng gửi file `.mp4`/`.mov` / dán khối JSON `"version": "3.2-mfx-v3-auto"`.

> **⚡ QUY TẮC TỐI THƯỢNG (ZERO-FRICTION / ZERO-STOP):**
> 1. **TUYỆT ĐỐI KHÔNG DỪNG LẠI** giữa chừng để tóm tắt kịch bản rồi hỏi người dùng *"Bạn muốn làm gì ở bước tiếp theo?"*.
> 2. **CHẠY THẲNG MỘT MẠCH** đến khi xuất xong file video hoàn chỉnh `<tên_video>_edit_v3.mp4`, bộ ảnh xem trước `mockups/` và gói chữ trong suốt `capcut_png_pack/`.
> 3. Luôn ưu tiên gọi Python trong môi trường ảo đã cài sẵn:
>    - macOS / Linux: `PY_BIN="$HOME/.mfx_v3/venv/bin/python"; [ -x "$PY_BIN" ] || PY_BIN="python3"`
>    - Thư mục chứa skill: `SKILL_DIR="$HOME/.gemini/config/skills/aiedit"`

---

## LUỒNG 1: KHI NGƯỜI DÙNG GỬI TRỰC TIẾP VIDEO (`.MP4` / `.MOV`) VÀ YÊU CẦU EDIT

Khi người dùng thả hoặc chỉ định một file video (`.mp4`, `.mov`, `.m4v`) và nói *"Edit video này"*, *"EDIT VIDEO"*, *"Lên kế hoạch và dựng video này"*:

### Bước 1: Chạy `edl_bootstrap.py` để bóc thông số, tạo `contact_sheet.jpg` & khung `edl_v3.json`
```bash
PY_BIN="$HOME/.mfx_v3/venv/bin/python"; [ -x "$PY_BIN" ] || PY_BIN="python3"
"$PY_BIN" "$HOME/.gemini/config/skills/aiedit/scripts/edl_bootstrap.py" --video "<đường_dẫn_video>"
```
- Lệnh này tự động đo chính xác `duration`, `fps`, xuất tấm ảnh `<tên_video>_contact_sheet.jpg` (6 khung hình đại diện) và khởi tạo file `edl_v3.json` (tự động bóc lời thoại tiếng Việt nếu máy có `faster-whisper`).
- Nếu người dùng đã gửi kèm lời thoại trong tin nhắn, truyền trực tiếp qua cờ `--clauses "DÒNG 1 NHỊP 1|dòng 2 nhịp 1; DÒNG 1 NHỊP 2|dòng 2 nhịp 2"`.

### Bước 2: Tinh chỉnh `edl_v3.json` & Sinh ảnh B-Roll / Bản vẽ Khoa học 2D (`#V1, #V2...`)
- Đọc file `edl_v3.json` vừa tạo. Đảm bảo toàn bộ thời lượng từ `0.00s` đến hết video được chia thành các nhịp vế câu liên tiếp (`1.5s – 3.2s / nhịp`), mỗi nhịp có:
  - `line1` (`Y=1388`, chữ IN HOA `FD Integral Heavy`, từ khóa chính tô màu `#FFCC00` hoặc `#00F2FE`).
  - `line2` (`Y=1472`, chữ thường in nghiêng `FD Tiempos Regular Italic`, trễ `+0.12s`).
  - `icon` (`Y=1320`, chọn 1 trong 5 mã: `TARGET_FOCUS`, `CALENDAR_BOLT`, `SHIELD_STAR`, `CINEMA_CAMERA`, `MIC_STUDIO`).
  - `camera_mode`: Luân phiên giữa:
    + `"base_1x"`: Góc gốc đã khóa cứng tâm mặt chính giữa (`face_lock_center: true`).
    + `"punch_in_108"`: Phóng nhẹ `1.08x` tạo nhịp điệu thị giác.
    + `"broll_kenburns"`: Cảnh trám hình ảnh dọc `9:16` (`#V1, #V2...`) kèm hiệu ứng `shutter_flash: true`. Dùng công cụ tạo ảnh (`generate_image` / `image-generator`) sinh ảnh dọc `9:16` theo `broll_prompt` và lưu vào `broll/v1_scene.png`...
    + `"atlas_2d"`: Bản vẽ Khoa Học 2D trên nền giấy y khoa `#F5F2EB` phẳng tuyệt đối + đường dẫn vuông góc `[1]..[4]` (dành cho video Chuyên gia / Y khoa / Da liễu / Nha khoa). Có thể tạo riêng bằng:
      ```bash
      "$PY_BIN" "$HOME/.gemini/config/skills/aiedit/scripts/atlas_2d_helper.py" \
        --title "Cấu trúc giải phẫu & Cơ chế tác động" \
        --labels "Lớp bề mặt::Stratum corneum|Cổ nang::Infundibulum|Mô đệm::Dermal matrix|Tái tạo::Basal lock" \
        --note "Thiết đồ mô học 2D minh họa vị trí tác động trọng tâm." \
        --out "broll/v1_scene.png"
      ```
    + `"spine_map"`: Lộ trình 4 bước theo trục dọc thẳng đứng `X=158` chuẩn Swiss Dark (`MG-B02 V2`).

### Bước 3: Kết xuất thẳng ra Video `.mp4` hoàn chỉnh
```bash
PY_BIN="$HOME/.mfx_v3/venv/bin/python"; [ -x "$PY_BIN" ] || PY_BIN="python3"
"$PY_BIN" "$HOME/.gemini/config/skills/aiedit/scripts/mfx_v3_universal_engine.py" --edl edl_v3.json
```

---

## LUỒNG 2: KHI NGƯỜI DÙNG DÁN KHỐI `EDL JSON` (`"version": "3.2-mfx-v3-auto"`)

Khi người dùng dán khối mã JSON có `"version": "3.2-mfx-v3-auto"` (từ Gemini Web / Gem) vào khung chat:

1. **Bước 1 — Lưu file `edl_v3.json`:** Dùng `write_file` lưu nguyên vẹn khối JSON vào file `edl_v3.json` tại thư mục làm việc hiện tại. (Không hỏi tên file video gốc vì Engine đã có thuật toán `Auto-Locate` tự động tìm đúng file `.mp4`/`.mov` trong thư mục hiện tại, `Downloads`, `Desktop`, `Documents`).
2. **Bước 2 — Sinh đủ ảnh B-Roll dọc `9:16` (`#V1, #V2...`):** Với mọi nhịp có `"camera_mode": "broll_kenburns"`, nếu chưa có file ảnh trong `./broll/`, gọi công cụ tạo ảnh sinh ảnh dọc `9:16` theo `"broll_prompt"` (hoặc dùng `atlas_2d_helper.py` / `spine_map_mgb02.py`) và lưu vào `broll/v1_scene.png`, `broll/v2_scene.png`...
3. **Bước 3 — Chạy Engine Kết Xuất `.mp4`:**
   ```bash
   PY_BIN="$HOME/.mfx_v3/venv/bin/python"; [ -x "$PY_BIN" ] || PY_BIN="python3"
   "$PY_BIN" "$HOME/.gemini/config/skills/aiedit/scripts/mfx_v3_universal_engine.py" --edl edl_v3.json
   ```

---

## BÁO CÁO KẾT QUẢ SAU KHI XUẤT XONG `.MP4`
Sau khi lệnh ở Bước 3 in ra dòng `✅ Hoàn tất xuất video MFX V3.2: ... (.mp4)`, trình bày kết quả cho người dùng gồm:
1. **File video hoàn chỉnh:** `<tên_video>_edit_v3.mp4` (`1080x1920`, H.264 + AAC, đã khóa tâm mặt, phủ chữ 2 dòng + Icon phát sáng + B-Roll + 8 SFX 10%).
2. **Thư mục ảnh xem trước từng nhịp:** `mockups/beat_01.png, beat_02.png...` (hiển thị preview cho người dùng xem ngay).
3. **Gói lớp phủ PNG trong suốt cho CapCut:** `capcut_png_pack/` (đặt tên sẵn theo mốc giây `01_T1_0.00s.png` để kéo thả vào CapCut nếu muốn chỉnh thêm).
