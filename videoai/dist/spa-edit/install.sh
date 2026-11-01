#!/bin/bash
# ==============================================================================
# BỘ CÀI ĐẶT & CẬP NHẬT 1 DÒNG (0 TOKEN): Kỹ Năng Edit Video Spa & Nha Khoa V10
# Chạy được nhiều lần (Idempotent): Chưa có thì Cài mới, có rồi thì Cập nhật!
# ==============================================================================
set -e

CHANNEL="spa"
CDN_URL="https://media.fedu.vn/skills/spa"
SKILLS_DIR="$HOME/.gemini/config/skills"
VENV_DIR="$HOME/.mfx_v3/venv"
BRAND_BACKUP="/tmp/fedu_default_brand_backup.json"

echo "=================================================================="
echo "🚀 ĐANG CÀI ĐẶT / CẬP NHẬT: Kỹ Năng Edit Video Spa & Nha Khoa V10 (0 TOKEN)"
echo "=================================================================="

# 1. Bảo toàn cấu hình Thương hiệu riêng của máy (nếu đã có)
if [ -f "$SKILLS_DIR/spa-edit/brands/student_default_brand.json" ]; then
  cp "$SKILLS_DIR/spa-edit/brands/student_default_brand.json" "$BRAND_BACKUP" 2>/dev/null || true
fi

# 2. Tải & giải nén gói kỹ năng từ Cloudflare CDN
echo "📦 [1/5] Đang tải gói kỹ năng mới nhất từ $CDN_URL ..."
mkdir -p "$SKILLS_DIR"
mkdir -p "$HOME/.gemini/skills"
TMP_TAR="/tmp/fedu_${CHANNEL}_latest.tar.gz"
curl -fsSL "$CDN_URL/latest.tar.gz?t=$(date +%s)" -o "$TMP_TAR"
tar -xzf "$TMP_TAR" -C "$SKILLS_DIR"
rm -f "$TMP_TAR"

# Lưu manifest phiên bản phục vụ OTA Auto-Update
curl -fsSL "$CDN_URL/manifest.json?t=$(date +%s)" -o "$SKILLS_DIR/.fedu_${CHANNEL}_manifest.json" 2>/dev/null || true

# Khôi phục thương hiệu riêng của học viên
if [ -f "$BRAND_BACKUP" ]; then
  mkdir -p "$SKILLS_DIR/spa-edit/brands"
  cp "$BRAND_BACKUP" "$SKILLS_DIR/spa-edit/brands/student_default_brand.json" 2>/dev/null || true
  rm -f "$BRAND_BACKUP"
fi

# Chuẩn hóa đường dẫn tuyệt đối sang đúng $HOME của máy hiện tại & cấp quyền thực thi
if [ "$HOME" != "/Users/vietmac" ]; then
  python3 -c '
import os, pathlib
home = os.path.expanduser("~")
root = pathlib.Path(home) / ".gemini" / "config" / "skills"
for p in root.rglob("*"):
    if p.is_file() and p.suffix in ('.py', '.sh', '.json', '.md', '.ts', '.tsx'):
        try:
            txt = p.read_text(encoding="utf-8")
            if "/Users/vietmac" in txt:
                p.write_text(txt.replace("/Users/vietmac", home), encoding="utf-8")
        except Exception:
            pass
' 2>/dev/null || true
fi

find "$SKILLS_DIR" -path "*/scripts/*.py" -exec chmod +x {} + 2>/dev/null || true
find "$SKILLS_DIR" -path "*/scripts/*.sh" -exec chmod +x {} + 2>/dev/null || true

# Tạo symlink tương thích cho mọi phiên bản Antigravity
for d in "$SKILLS_DIR"/*/; do
  sname="$(basename "$d")"
  ln -sfn "$SKILLS_DIR/$sname" "$HOME/.gemini/skills/$sname" 2>/dev/null || true
done

# 3. Thiết lập môi trường Python độc lập (~/.mfx_v3/venv) + FFmpeg + Whisper
echo "⚙️  [2/5] Đang kiểm tra môi trường Python & thư viện xử lý Video/Audio..."
PY_SYS="$(command -v python3 || true)"
if [ -z "$PY_SYS" ]; then
  echo "⚠️ Máy chưa có python3. Đang kích hoạt cài đặt Command Line Tools..."
  xcode-select --install || true
  exit 1
fi

if [ ! -x "$VENV_DIR/bin/python" ]; then
  mkdir -p "$HOME/.mfx_v3"
  "$PY_SYS" -m venv "$VENV_DIR"
fi

"$VENV_DIR/bin/pip" install --upgrade pip --quiet
"$VENV_DIR/bin/pip" install numpy opencv-python-headless pillow imageio-ffmpeg faster-whisper scipy --quiet

# 5. Tạo nút bấm Cập nhật & Edit Video 0-Token ngoài Desktop
echo "🖥️  [4/5] Đang tạo nút bấm nhanh ngoài màn hình Desktop..."
cat > "$HOME/Desktop/Edit_Video_Spa_0_Token.command" << 'EOF'
#!/bin/bash
PY_BIN="$HOME/.mfx_v3/venv/bin/python"; [ -x "$PY_BIN" ] || PY_BIN="python3"
"$PY_BIN" "$HOME/.gemini/config/skills/spa-edit/scripts/interactive_wizard.py"
EOF
chmod +x "$HOME/Desktop/Edit_Video_Spa_0_Token.command" 2>/dev/null || true

cat > "$HOME/Desktop/Cap_Nhat_Ky_Nang_FEDU.command" << 'EOF'
#!/bin/bash
curl -fsSL https://media.fedu.vn/skills/spa/install.sh | bash
read -r -p "Nhấn Enter để đóng cửa sổ..."
EOF
chmod +x "$HOME/Desktop/Cap_Nhat_Ky_Nang_FEDU.command" 2>/dev/null || true

# 6. Chạy System Doctor kiểm định
echo "🩺 [5/5] Đang chạy kiểm tra sức khỏe hệ thống (System Doctor)..."
if [ -f "$SKILLS_DIR/spa-edit/scripts/doctor.py" ]; then
  "$VENV_DIR/bin/python" "$SKILLS_DIR/spa-edit/scripts/doctor.py" || true
fi

echo "=================================================================="
echo "🎉 HOÀN TẤT 100% (Kỹ Năng Edit Video Spa & Nha Khoa V10) — TỐN 0 TOKEN!"
echo "👉 Tự động cập nhật: Mỗi khi chạy kỹ năng, máy sẽ tự kiểm tra bản mới."
echo "👉 Cập nhật thủ công 1 chạm: Bấm 'Cap_Nhat_Ky_Nang_FEDU.command' ngoài Desktop"
echo "   hoặc chạy lại: curl -fsSL https://media.fedu.vn/skills/spa/install.sh | bash"
echo "=================================================================="
