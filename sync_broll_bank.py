#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
ONE-CLICK B-ROLL BANK MASTER SYNC PIPELINE
Tự động hóa 100%: Quét video mới -> Tạo thumbnail -> Upload YouTube -> Cập nhật Database & HTML -> Push GitHub Pages.
"""

import os
import sys
import subprocess
import json

REPO_DIR = '/Users/vietmac/Documents/CODE/vietndj.github.io'
VIDEO_DIR = '/Users/vietmac/Documents/BROLL BANK'
NOTIFY_SCRIPT = '/Users/vietmac/Documents/CODE/Quản gia/telegram_notify.py'

print("==================================================")
print("🚀 BẮT ĐẦU ĐỒNG BỘ B-ROLL BANK (ONE-CLICK SYNC)")
print("==================================================")

# 1. Trích xuất thumbnails cho video mới
print("\n[1/4] Kiểm tra và trích xuất thumbnails...")
thumb_cmd = f"""python3 -c "
import os, subprocess
video_dir = '{VIDEO_DIR}'
thumb_dir = '{REPO_DIR}/broll_thumbnails'
os.makedirs(thumb_dir, exist_ok=True)
files = sorted([f for f in os.listdir(video_dir) if f.lower().endswith(('.mp4', '.mov'))])
for i, f in enumerate(files):
    thumb_path = os.path.join(thumb_dir, f'thumb_{{i+1:03d}}.jpg')
    if not os.path.exists(thumb_path):
        video_path = os.path.join(video_dir, f)
        cmd = ['ffmpeg', '-y', '-ss', '1.5', '-i', video_path, '-vframes', '1', '-q:v', '3', '-vf', 'scale=640:-1', thumb_path]
        subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        print(f'  + Đã tạo thumb mới: thumb_{{i+1:03d}}.jpg cho {{f}}')
" """
subprocess.run(thumb_cmd, shell=True)

# 2. Upload video mới lên YouTube
print("\n[2/4] Kiểm tra và tải video mới lên YouTube Playlist 'Broll bank'...")
upload_cmd = f"python3 -c \"\nimport os, sys, json, pickle, time\nfrom googleapiclient.discovery import build\nfrom googleapiclient.http import MediaFileUpload\nfrom google.auth.transport.requests import Request\n\nTOKEN = os.path.expanduser('~/.config/youtube_full_token.pickle')\nwith open(TOKEN, 'rb') as f:\n    creds = pickle.load(f)\nif creds.expired and creds.refresh_token:\n    creds.refresh(Request())\n    with open(TOKEN, 'wb') as f:\n        pickle.dump(creds, f)\nservice = build('youtube', 'v3', credentials=creds)\n\nPLAYLIST_ID = 'PLPs82ezbs9Lo'\nCATALOG = '/Users/vietmac/Documents/CODE/Quản gia/broll_youtube_catalog.json'\ntry:\n    with open(CATALOG, 'r') as f:\n        cat = json.load(f)\nexcept:\n    cat = {}\n\nfiles = sorted([f for f in os.listdir('{VIDEO_DIR}') if f.lower().endswith(('.mp4', '.mov'))])\nfor i, f in enumerate(files):\n    if f not in cat:\n        path = os.path.join('{VIDEO_DIR}', f)\n        title = f'B-Roll: ' + os.path.splitext(f)[0]\n        body = {{'snippet': {{'title': title[:100], 'description': 'Thư viện B-roll Nguyễn Đức Việt', 'categoryId': '27'}}, 'status': {{'privacyStatus': 'unlisted'}}}}\n        media = MediaFileUpload(path, chunksize=5*1024*1024, resumable=True, mimetype='video/mp4')\n        req = service.videos().insert(part='snippet,status', body=body, media_body=media)\n        res = None\n        while res is None:\n            _, res = req.next_chunk()\n        vid_id = res['id']\n        service.playlistItems().insert(part='snippet', body={{'snippet': {{'playlistId': PLAYLIST_ID, 'resourceId': {{'kind': 'youtube#video', 'videoId': vid_id}}}}}}).execute()\n        cat[f] = {{'video_id': vid_id, 'youtube_url': f'https://www.youtube.com/watch?v={{vid_id}}', 'title': title}}\n        with open(CATALOG, 'w') as f_out:\n            json.dump(cat, f_out, ensure_ascii=False, indent=2)\n        print(f'  + Đã upload thành công: {{f}} -> {{vid_id}}')\n\"\n"
subprocess.run(upload_cmd, shell=True)

# 3. Tái tạo database & build trang HTML
print("\n[3/4] Tái tạo Master Database & Build trang web brollbank.html...")
subprocess.run(f"python3 {REPO_DIR}/generate_broll_database.py", shell=True)
subprocess.run(f"python3 {REPO_DIR}/build_brollbank_html.py", shell=True)

# 4. Commit và push lên GitHub Pages
print("\n[4/4] Đẩy mã nguồn lên GitHub Pages...")
subprocess.run(f"cd {REPO_DIR} && git add -A && git commit -m 'Auto-sync B-Roll Bank update' && git push origin master", shell=True)

# Gửi thông báo Telegram
if os.path.exists(NOTIFY_SCRIPT):
    msg = "🎬 [B-ROLL BANK] ĐÃ ĐỒNG BỘ CẬP NHẬT XONG!\nTrang web: https://fedu.vn/brollbank.html\nPlaylist: https://www.youtube.com/playlist?list=PLPs82ezbs9Lo"
    subprocess.run(f'python3 "{NOTIFY_SCRIPT}" --msg "{msg}"', shell=True)

print("\n==================================================")
print("🎉 HOÀN TẤT ĐỒNG BỘ 100%! TRANG WEB ĐÃ SẴN SÀNG:")
print("🔗 https://fedu.vn/brollbank.html")
print("==================================================")
