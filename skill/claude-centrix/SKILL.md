---
name: claude-centrix
description: Giao việc kỹ thuật (code, sửa lỗi, test, phân tích) cho Claude qua CetriX API. Kích hoạt khi tin nhắn bắt đầu bằng CLAUDE:, CLAUDE1: hoặc OPUS:. Hỗ trợ nhận và lưu API Key trực tiếp trong chat.
---

# Mantra: CLAUDE: / CLAUDE1: / OPUS:

## 1. Nguyên Tắc Hoạt Động
1. Khi tin nhắn bắt đầu bằng `CLAUDE:`, `CLAUDE1:`, `Claude:`, `OPUS:`, `Opus:` → giao TOÀN BỘ phần việc kỹ thuật cho Claude, không tự đọc/sửa file hay chạy lệnh thay Claude.
2. Gọi công cụ `call_mcp_tool` với:
   - `ServerName`: `"claude-centrix"`
   - `ToolName`: `"run_task"`
   - `Arguments`:
     ```json
     {
       "task": "<Yêu cầu chi tiết của người dùng>",
       "context": "<Tóm tắt 1-3 câu bối cảnh hoặc danh sách file liên quan>",
       "conversation_id": "<CONVERSATION_ID hiện tại>",
       "workdir": "<Thư mục làm việc hiện tại>",
       "model": "opus"
     }
     ```
3. Mô hình mặc định là `opus` (`claude-opus-5-5`). Nếu người dùng yêu cầu sonnet hoặc haiku thì truyền tương ứng (`sonnet`, `haiku`).
4. Với tác vụ dài/chạy ngầm: Dùng `start_task` (nhận `job_id`), theo dõi qua `get_status`, dừng bằng `cancel_task`.
5. Báo cáo lại kết quả `result` và file xem trước `artifact_path` nếu có.

## 2. Tự Động Nhận & Lưu API Key Trực Tiếp Trong Khung Chat
- **Khi người dùng dán hoặc gửi API Key** (chuỗi bắt đầu bằng `sk-` hoặc kèm lời nhắn "key của tôi là...", "lưu key..."):
  1. Trích xuất chuỗi key hợp lệ (bắt đầu bằng `sk-` và có tối thiểu 20 ký tự).
  2. Tự động lưu key vào file `~/.claude_centrix/settings.json` bằng cách chạy lệnh Python ngầm:
     ```bash
     python3 -c '
     import json, os
     p = os.path.expanduser("~/.claude_centrix/settings.json")
     os.makedirs(os.path.dirname(p), exist_ok=True)
     try: d = json.load(open(p))
     except Exception: d = {}
     env = d.setdefault("env", {})
     env["ANTHROPIC_BASE_URL"] = "https://agent.cetrix.app"
     env["ANTHROPIC_API_KEY"] = "KEY_O_DAY"
     env["ANTHROPIC_AUTH_TOKEN"] = "KEY_O_DAY"
     env["ANTHROPIC_DEFAULT_OPUS_MODEL"] = "claude-opus-5-5"
     env["ANTHROPIC_DEFAULT_SONNET_MODEL"] = "claude-sonnet-5-5"
     env["ANTHROPIC_DEFAULT_HAIKU_MODEL"] = "claude-haiku-5-5"
     with open(p, "w") as f: json.dump(d, f, indent=2)
     os.chmod(p, 0o600)
     '
     ```
  3. Báo cho người dùng: *"✅ Đã lưu API Key CetriX thành công! Bây giờ bạn chỉ cần gõ `CLAUDE: <nhiệm vụ>` để bắt đầu làm việc."*

## 3. Xử Lý Lỗi (Đọc trường `error_code`)
- `NO_API_KEY`: Trả lời thân thiện:
  *"Bạn chỉ cần mở link https://cetrix.app/chat/hub/keys bấm nút **Reveal** để copy API Key (bắt đầu bằng `sk-...`), rồi gửi trực tiếp vào đây cho mình là xong nhé!"*
- `AUTH_FAILED`: Key không hợp lệ hoặc hết hạn. Báo người dùng:
  *"CetriX báo API Key không hợp lệ hoặc đã hết hạn mức. Bạn vào lại https://cetrix.app/chat/hub/keys lấy key mới rồi dán vào đây cho mình nhé!"*
- `NO_CLAUDE_CLI`: Máy chưa có Claude Code CLI. Tự động chạy lệnh cài đặt cho người dùng:
  `curl -fsSL https://claude.ai/install.sh | bash`
- Lỗi khác: Gọi công cụ `doctor(live=false)` để lấy thông tin chẩn đoán chính xác.
