#!/usr/bin/env bash
# Tiện ích nhập/đổi API Key CetriX cho plugin claude-centrix
set -eu

G="\033[1;32m"; C="\033[0;36m"; Y="\033[1;33m"; R="\033[1;31m"; N="\033[0m"

CFG_DIR="$HOME/.claude_centrix"
SETTINGS="$CFG_DIR/settings.json"
BASE_URL="https://agent.cetrix.app"

echo -e "${C}=== THIẾT LẬP API KEY CETRIX CHO CLAUDE ===${N}"
echo -e "1. Mở trình duyệt đăng nhập vào: ${G}https://cetrix.app${N}"
echo -e "2. Vào ${G}Settings (Cài đặt) -> API Keys${N} (hoặc link ${G}https://cetrix.app/chat/hub/keys${N})"
echo -e "3. Bấm nút ${G}Reveal 👁️${N} để hiển thị và copy key (bắt đầu bằng ${G}sk-...${N})"
echo

if [ ! -t 0 ]; then
  echo -e "${R}❌ Lệnh này cần chạy trực tiếp trong Terminal để nhập key ẩn an toàn.${N}"
  exit 1
fi

KEY=""
for i in 1 2 3; do
  read -r -s -p "Dán API Key CetriX (bắt đầu bằng sk-..., gõ ẩn) rồi bấm Enter: " k
  echo
  k="$(printf '%s' "$k" | tr -d '[:space:]')"
  if ! printf '%s' "$k" | grep -Eq '^sk-[A-Za-z0-9_-]{20,}$'; then
    echo -e "${Y}⚠ Key không đúng định dạng (phải bắt đầu bằng sk- và có ít nhất 20 ký tự).${N}"
    continue
  fi

  echo -e "${C}Đang xác minh key với máy chủ CetriX...${N}"
  CODE="$(printf 'header = "Authorization: Bearer %s"\n' "$k" | curl -s -o /dev/null -m 15 -w '%{http_code}' -K - "$BASE_URL/v1/models" 2>/dev/null || echo "000")"
  
  if [ "$CODE" = "401" ] || [ "$CODE" = "403" ]; then
    echo -e "${R}❌ Máy chủ CetriX từ chối key này (HTTP $CODE). Vui lòng kiểm tra lại tài khoản.${N}"
  else
    KEY="$k"
    break
  fi
done

if [ -z "$KEY" ]; then
  echo -e "${R}❌ Không nhận được API Key hợp lệ. Quá trình dừng lại.${N}"
  exit 1
fi

mkdir -p "$CFG_DIR"
chmod 700 "$CFG_DIR"

CX_KEY="$KEY" CX_BASE="$BASE_URL" python3 - "$SETTINGS" <<'PY'
import json, os, sys
p = sys.argv[1]
try:
    d = json.load(open(p))
except Exception:
    d = {}
env = d.setdefault("env", {})
env.update({
    "ANTHROPIC_BASE_URL": os.environ["CX_BASE"],
    "API_TIMEOUT_MS": env.get("API_TIMEOUT_MS", "600000"),
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "claude-opus-5-5",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "claude-sonnet-5-5",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "claude-haiku-5-5",
    "ANTHROPIC_MODEL": env.get("ANTHROPIC_MODEL", "claude-opus-5-5"),
    "ANTHROPIC_API_KEY": os.environ["CX_KEY"],
    "ANTHROPIC_AUTH_TOKEN": os.environ["CX_KEY"]
})
fd = os.open(p + ".tmp", os.O_WRONLY | os.O_CREAT | os.O_TRUNC, 0o600)
with os.fdopen(fd, "w", encoding="utf-8") as f:
    json.dump(d, f, ensure_ascii=False, indent=2)
os.replace(p + ".tmp", p)
os.chmod(p, 0o600)
PY

echo -e "${G}✅ ĐÃ LƯU API KEY THÀNH CÔNG!${N} (Đã phân quyền an toàn 600 tại $SETTINGS)"
echo -e "${C}Bây giờ bạn có thể mở Antigravity và gõ: ${G}CLAUDE: xin chào${N}"
