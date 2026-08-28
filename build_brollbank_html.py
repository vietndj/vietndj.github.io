#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Build ultra-robust, pre-rendered brollbank.html with inline YouTube embeds.
"""

import json
import os

DB_PATH = '/Users/vietmac/Documents/CODE/vietndj.github.io/broll_bank_master.json'
HTML_OUT = '/Users/vietmac/Documents/CODE/vietndj.github.io/brollbank.html'

with open(DB_PATH, 'r', encoding='utf-8') as f:
    db = json.load(f)

json_data_str = json.dumps(db, ensure_ascii=False)
videos = db.get('videos', [])

def render_card_html(v):
    yt_id = v.get('video_id', '')
    orient_label = '📱 Dọc 9:16' if v['orientation'] == 'vertical' else '🖥️ Ngang 16:9'
    aspect_class = 'aspect-[9/16] max-h-[380px]' if v['orientation'] == 'vertical' else 'aspect-video'
    
    # Download link from Google Drive
    gdrive_dl = v.get('gdrive_download_url', '')
    gdrive_view = v.get('gdrive_view_url', '')
    dl_href = gdrive_dl if gdrive_dl else (gdrive_view if gdrive_view else "https://drive.google.com/open?id=1R4Wyl_c8MxLPqBJRR-5Dc5I3P3Hb7tSA")
    
    # Pre-render card
    return f'''
    <div class="glass-card rounded-2xl overflow-hidden flex flex-col group border border-slate-800 hover:border-purple-500/60 transition shadow-lg bg-slate-900/90" id="card-{v['id']}" data-cat="{v['category_id']}" data-orient="{v['orientation']}">
        <!-- Video Box / Embed -->
        <div class="relative bg-black {aspect_class} overflow-hidden flex items-center justify-center" id="player-box-{v['id']}">
            <!-- Responsive Iframe Embed -->
            <iframe src="https://www.youtube.com/embed/{yt_id}?enablejsapi=1&rel=0" 
                    title="{v['title']}" 
                    loading="lazy"
                    class="w-full h-full border-0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen></iframe>
        </div>

        <!-- Card Info -->
        <div class="p-4 flex-1 flex flex-col justify-between space-y-3 bg-gradient-to-b from-slate-900 to-slate-950">
            <div>
                <div class="flex items-center justify-between gap-2 mb-1.5">
                    <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold badge-{v['category_id']}">
                        {v['category_icon']} {v['category_badge']}
                    </span>
                    <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {orient_label} • {v['duration']}
                    </span>
                </div>
                <h3 class="text-sm font-bold text-white line-clamp-1 group-hover:text-purple-300 transition">
                    {v['id']}. {v['title']}
                </h3>
                <div class="text-[11px] text-slate-400 mt-1 flex items-center gap-1.5 truncate">
                    <span>{v['shot_type']}</span>
                    <span>•</span>
                    <span class="truncate">{v['location']}</span>
                </div>
                <p class="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {v['director_note']}
                </p>
            </div>

            <!-- Dialogue Sample Cue & Actions -->
            <div class="pt-2.5 border-t border-slate-800/80 space-y-2">
                <div class="text-[10px] text-slate-500 font-semibold uppercase">🎯 Khớp câu thoại:</div>
                <p class="text-[11px] text-purple-300/90 italic line-clamp-2 bg-purple-950/20 p-2 rounded-lg border border-purple-900/30">
                    "{v['dialogue_cues'][0] if v['dialogue_cues'] else 'Thao tác thực chiến...'}"
                </p>
                <div class="flex items-center justify-between gap-1.5 pt-1">
                    <div class="flex items-center gap-1.5">
                        <a href="https://www.youtube.com/watch?v={yt_id}" target="_blank" class="px-2 py-1 rounded-lg bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/30 text-[11px] font-semibold transition flex items-center gap-1">
                            <svg class="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                            YouTube
                        </a>
                        <a href="{dl_href}" target="_blank" class="px-2 py-1 rounded-lg bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/30 text-[11px] font-semibold transition flex items-center gap-1" title="Tải file video MP4 gốc sạch từ Google Drive (không logo Shorts)">
                            <svg class="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z"/></svg>
                            Tải Drive
                        </a>
                    </div>
                    <button onclick="openModal({v['id']})" class="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-purple-600 text-slate-200 hover:text-white border border-slate-700 text-[11px] font-semibold transition flex items-center gap-1">
                        Chi tiết
                    </button>
                </div>
            </div>
        </div>
    </div>
    '''

cards_pre_rendered = '\n'.join([render_card_html(v) for v in videos])

html_content = f'''<!DOCTYPE html>
<html lang="vi" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>B-Roll Bank Master | Kho Cảnh Trám Chuẩn Điện Ảnh Fedu</title>
    <meta name="description" content="Thư viện quản lý cảnh trám thông minh của Nguyễn Đức Việt (VietMac) - Phân loại theo 8 loại B-roll Fedu Master và Hệ thống ráp kịch bản thoại tự động.">
    
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {{
            darkMode: 'class',
            theme: {{
                extend: {{
                    colors: {{
                        brand: {{
                            500: '#8b5cf6',
                            600: '#7c3aed',
                            700: '#6d28d9'
                        }},
                        dark: {{
                            900: '#0b0f19',
                            800: '#111827',
                            700: '#1f2937'
                        }}
                    }}
                }}
            }}
        }}
    </script>
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
    
    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>
    
    <style>
        body {{
            font-family: 'Plus Jakarta Sans', sans-serif;
            background-color: #0b0f19;
            color: #f3f4f6;
        }}
        .font-mono {{
            font-family: 'JetBrains Mono', monospace;
        }}
        .glass {{
            background: rgba(17, 24, 39, 0.85);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.08);
        }}
        .glass-card {{
            background: rgba(31, 41, 55, 0.7);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            transition: all 0.25s ease;
        }}
        .tab-btn.active {{
            background: linear-gradient(135deg, #7c3aed, #4f46e5);
            color: #ffffff;
            box-shadow: 0 4px 14px rgba(124, 58, 237, 0.4);
        }}
        .cat-pill.active {{
            border-color: #8b5cf6;
            background: rgba(139, 92, 246, 0.25);
            color: #c4b5fd;
            font-weight: 700;
        }}
        ::-webkit-scrollbar {{
            width: 8px;
            height: 8px;
        }}
        ::-webkit-scrollbar-track {{
            background: #0b0f19;
        }}
        ::-webkit-scrollbar-thumb {{
            background: #374151;
            border-radius: 4px;
        }}
        .badge-cutaway {{ background: rgba(59, 130, 246, 0.2); color: #93c5fd; border: 1px solid rgba(59, 130, 246, 0.4); }}
        .badge-sequence {{ background: rgba(168, 85, 247, 0.2); color: #d8b4fe; border: 1px solid rgba(168, 85, 247, 0.4); }}
        .badge-pov {{ background: rgba(20, 184, 166, 0.2); color: #5eead4; border: 1px solid rgba(20, 184, 166, 0.4); }}
        .badge-in_situ {{ background: rgba(239, 68, 68, 0.2); color: #fca5a5; border: 1px solid rgba(239, 68, 68, 0.4); }}
        .badge-intercut {{ background: rgba(99, 102, 241, 0.2); color: #a5b4fc; border: 1px solid rgba(99, 102, 241, 0.4); }}
        .badge-metaphor {{ background: rgba(245, 158, 11, 0.2); color: #fcd34d; border: 1px solid rgba(245, 158, 11, 0.4); }}
        .badge-negative_space {{ background: rgba(148, 163, 184, 0.2); color: #cbd5e1; border: 1px solid rgba(148, 163, 184, 0.4); }}
        .badge-archival {{ background: rgba(16, 185, 129, 0.2); color: #6ee7b7; border: 1px solid rgba(16, 185, 129, 0.4); }}
    </style>
</head>
<body class="min-h-screen selection:bg-purple-500 selection:text-white flex flex-col bg-[#0b0f19]">

    <!-- TOP NAVIGATION -->
    <nav class="sticky top-0 z-40 glass border-b border-slate-800 px-4 lg:px-8 py-3.5 flex items-center justify-between">
        <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-500/20 text-white font-extrabold text-lg">
                B
            </div>
            <div>
                <div class="flex items-center gap-2">
                    <span class="font-extrabold text-lg tracking-tight text-white">B-ROLL BANK</span>
                    <span class="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-semibold">{len(videos)} CLIPS NHÚNG YOUTUBE & DRIVE</span>
                </div>
                <p class="text-xs text-slate-400">Thư viện cảnh trám điện ảnh • Nguyễn Đức Việt (VietMac)</p>
            </div>
        </div>

        <!-- Links -->
        <div class="flex items-center gap-3">
            <a href="{db.get('gdrive_folder_url', 'https://drive.google.com/open?id=1R4Wyl_c8MxLPqBJRR-5Dc5I3P3Hb7tSA')}" target="_blank" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-xs font-bold shadow-lg shadow-blue-600/30 transition">
                <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z"/></svg>
                Google Drive Folder ({len(videos)})
            </a>
            <a href="https://www.youtube.com/playlist?list=PLPs82ezbs9Lo" target="_blank" class="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700 text-xs font-bold shadow-lg shadow-red-600/30 transition">
                <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                Playlist YouTube
            </a>
            <a href="https://fedu.vn/course/slide-8-loai-broll-video-course.html" target="_blank" class="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 hover:bg-indigo-600 hover:text-white text-xs font-semibold transition">
                8 Loại B-Roll Fedu
            </a>
        </div>
    </nav>

    <!-- HERO HEADER -->
    <header class="relative px-4 lg:px-8 py-10 overflow-hidden bg-gradient-to-b from-purple-950/40 via-slate-900 to-[#0b0f19] border-b border-slate-800">
        <div class="max-w-7xl mx-auto">
            <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div>
                    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-xs font-semibold mb-3">
                        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        100% Video Đã Nhúng Trực Tiếp • Xem & Tải Gốc Google Drive Ngay Trên Trang
                    </div>
                    <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                        Kho Cảnh Trám <span class="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-300 to-amber-300">B-Roll Bank Master</span>
                    </h1>
                    <p class="mt-2 text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
                        Phân loại chuẩn 8 nhóm B-Roll Fedu Master. Bấm Play xem trực tiếp từng video, bấm <strong>Tải Drive</strong> để lấy file gốc không dính logo Shorts, hoặc dán kịch bản để AI tự động ráp phân cảnh.
                    </p>
                </div>

                <!-- Metrics -->
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:w-auto">
                    <div class="glass p-3.5 rounded-xl border border-slate-800 text-center">
                        <div class="text-2xl font-black text-white font-mono">{len(videos)}</div>
                        <div class="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Tổng Video</div>
                    </div>
                    <div class="glass p-3.5 rounded-xl border border-slate-800 text-center">
                        <div class="text-2xl font-black text-purple-400 font-mono">{len([x for x in videos if x['orientation'] == 'vertical'])}</div>
                        <div class="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Dọc 9:16 Shorts</div>
                    </div>
                    <div class="glass p-3.5 rounded-xl border border-slate-800 text-center">
                        <div class="text-2xl font-black text-indigo-400 font-mono">{len([x for x in videos if x['orientation'] == 'horizontal'])}</div>
                        <div class="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Ngang 16:9 4K</div>
                    </div>
                    <div class="glass p-3.5 rounded-xl border border-slate-800 text-center">
                        <div class="text-2xl font-black text-emerald-400 font-mono">8/8</div>
                        <div class="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Nhóm Fedu</div>
                    </div>
                </div>
            </div>

            <!-- TABS -->
            <div class="mt-8 flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-slate-900 border border-slate-800 w-fit">
                <button onclick="switchMainTab('library')" id="tab-btn-library" class="tab-btn active px-4 py-2 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-2 transition">
                    📺 Xem Toàn Bộ 90 Video Nhúng
                </button>
                <button onclick="switchMainTab('script-matcher')" id="tab-btn-script" class="tab-btn px-4 py-2 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-2 text-slate-300 hover:text-white transition">
                    ✨ Ráp Kịch Bản Thoại Thông Minh (AI)
                </button>
                <button onclick="switchMainTab('handbook')" id="tab-btn-handbook" class="tab-btn px-4 py-2 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-2 text-slate-300 hover:text-white transition">
                    🎓 Sổ Tay 8 Loại B-Roll Fedu
                </button>
            </div>
        </div>
    </header>

    <!-- TAB 1: THƯ VIỆN B-ROLL -->
    <main id="tab-content-library" class="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-8 space-y-6">
        
        <!-- SEARCH & FILTER TOOLBAR -->
        <div class="glass p-5 rounded-2xl border border-slate-800 space-y-4">
            <!-- Search Bar -->
            <div class="relative">
                <input type="text" id="search-input" oninput="handleSearch()" placeholder="🔍 Tìm kiếm nhanh: gõ phím, nước cam, cafe nhỏ giọt, ban công, FPT, bế tắc, câu thoại..." 
                       class="w-full bg-slate-900 text-white pl-4 pr-10 py-3 rounded-xl border border-slate-700 focus:outline-none focus:border-purple-500 text-sm placeholder-slate-500 transition">
                <button onclick="clearSearch()" id="clear-search-btn" class="hidden absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">✕</button>
            </div>

            <!-- 8 B-Roll Category Pills -->
            <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none" id="cat-pills-container">
                <button onclick="filterCategory('all')" class="cat-pill active shrink-0 px-3.5 py-1.5 rounded-lg border border-slate-700 text-xs font-semibold transition" data-cat="all">
                    Tất cả (90)
                </button>
                <button onclick="filterCategory('cutaway')" class="cat-pill shrink-0 px-3.5 py-1.5 rounded-lg border border-slate-800 text-xs text-slate-400 hover:text-slate-200 transition" data-cat="cutaway">
                    ✂️ 1. Cutaway (22)
                </button>
                <button onclick="filterCategory('sequence')" class="cat-pill shrink-0 px-3.5 py-1.5 rounded-lg border border-slate-800 text-xs text-slate-400 hover:text-slate-200 transition" data-cat="sequence">
                    🎞️ 2. Sequence (18)
                </button>
                <button onclick="filterCategory('pov')" class="cat-pill shrink-0 px-3.5 py-1.5 rounded-lg border border-slate-800 text-xs text-slate-400 hover:text-slate-200 transition" data-cat="pov">
                    👁️ 3. Góc POV (10)
                </button>
                <button onclick="filterCategory('in_situ')" class="cat-pill shrink-0 px-3.5 py-1.5 rounded-lg border border-slate-800 text-xs text-slate-400 hover:text-slate-200 transition" data-cat="in_situ">
                    🎬 4. Thoại In-situ (11)
                </button>
                <button onclick="filterCategory('intercut')" class="cat-pill shrink-0 px-3.5 py-1.5 rounded-lg border border-slate-800 text-xs text-slate-400 hover:text-slate-200 transition" data-cat="intercut">
                    ⚖️ 5. Dựng Intercut (9)
                </button>
                <button onclick="filterCategory('metaphor')" class="cat-pill shrink-0 px-3.5 py-1.5 rounded-lg border border-slate-800 text-xs text-slate-400 hover:text-slate-200 transition" data-cat="metaphor">
                    ♟️ 6. Metaphor (12)
                </button>
                <button onclick="filterCategory('negative_space')" class="cat-pill shrink-0 px-3.5 py-1.5 rounded-lg border border-slate-800 text-xs text-slate-400 hover:text-slate-200 transition" data-cat="negative_space">
                    ⏸️ 7. Negative Space (5)
                </button>
                <button onclick="filterCategory('archival')" class="cat-pill shrink-0 px-3.5 py-1.5 rounded-lg border border-slate-800 text-xs text-slate-400 hover:text-slate-200 transition" data-cat="archival">
                    ⏳ 8. Archival (3)
                </button>
            </div>

            <!-- Multi-axis Selectors -->
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-800">
                <div>
                    <label class="block text-[11px] font-semibold text-slate-400 mb-1">Tỉ lệ khung hình</label>
                    <select id="filter-orientation" onchange="applyFilters()" class="w-full bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-lg px-2.5 py-2">
                        <option value="all">Tất cả định dạng</option>
                        <option value="vertical">📱 Dọc 9:16 (Shorts/Reel - 82)</option>
                        <option value="horizontal">🖥️ Ngang 16:9 (Cinematic 4K - 8)</option>
                    </select>
                </div>
                <div>
                    <label class="block text-[11px] font-semibold text-slate-400 mb-1">Bối cảnh / Vị trí</label>
                    <select id="filter-location" onchange="applyFilters()" class="w-full bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-lg px-2.5 py-2">
                        <option value="all">Tất cả địa điểm</option>
                        <option value="Home Studio">🏠 Home Studio (Bàn gỗ)</option>
                        <option value="Ban công">🌿 Ban công Times City</option>
                        <option value="FPT">🎓 Giảng đường FPT</option>
                        <option value="Bếp">☕ Bếp / Barista / Nước cam</option>
                        <option value="Lương Yên">🎬 Ngoại cảnh Lương Yên</option>
                        <option value="Gym">💪 Phòng Gym / Lái xe</option>
                    </select>
                </div>
                <div class="col-span-2 sm:col-span-1">
                    <label class="block text-[11px] font-semibold text-slate-400 mb-1">Góc máy / Cự ly</label>
                    <select id="filter-shot" onchange="applyFilters()" class="w-full bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-lg px-2.5 py-2">
                        <option value="all">Tất cả góc quay</option>
                        <option value="Close-up">🔍 Cận cảnh (CU / ECU)</option>
                        <option value="Medium">👤 Trung cảnh (MCU / MS)</option>
                        <option value="POV">👁️ Góc nhìn thứ nhất (POV)</option>
                        <option value="Top-down">📐 Góc từ trên xuống (Top-down)</option>
                    </select>
                </div>
            </div>
        </div>

        <!-- STATUS BAR -->
        <div class="flex items-center justify-between text-xs text-slate-400 px-1">
            <div>
                Đang hiển thị <span id="filtered-count" class="font-bold text-purple-400">90</span> / 90 video cảnh trám
            </div>
        </div>

        <!-- VIDEO GRID CONTAINER (PRE-RENDERED) -->
        <div id="video-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards_pre_rendered}
        </div>

        <!-- EMPTY STATE -->
        <div id="empty-state" class="hidden text-center py-20 glass rounded-2xl border border-slate-800">
            <h3 class="text-lg font-bold text-slate-300">Không tìm thấy cảnh trám phù hợp</h3>
            <p class="text-xs text-slate-500 mt-1 max-w-sm mx-auto">Hãy thử xóa từ khóa tìm kiếm để hiển thị toàn bộ 90 video.</p>
            <button onclick="resetAllFilters()" class="mt-4 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold transition">
                Đặt lại bộ lọc
            </button>
        </div>
    </main>

    <!-- TAB 2: AI SCRIPT-TO-BROLL MATCHER -->
    <main id="tab-content-script" class="hidden flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-8 space-y-6">
        <div class="glass p-6 sm:p-8 rounded-2xl border border-purple-500/40">
            <div class="max-w-3xl">
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-semibold mb-3">
                    ✨ Công Cụ AI Đạo Diễn
                </span>
                <h2 class="text-2xl sm:text-3xl font-extrabold text-white">Ráp Cảnh Trám Thông Minh Theo Kịch Bản Thoại</h2>
                <p class="text-sm text-slate-300 mt-1">
                    Dán bất kỳ kịch bản thoại nào của anh Việt vào đây. Hệ thống tự động phân tích ngữ cảnh từng câu thoại và nhúng ngay video B-roll demo tương ứng để xem trực tiếp!
                </p>
            </div>

            <!-- PRESET PROMPTS -->
            <div class="mt-6">
                <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Thử nhanh kịch bản mẫu:</label>
                <div class="flex flex-wrap gap-2">
                    <button onclick="loadSampleScript(1)" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-purple-600/30 text-slate-300 hover:text-white border border-slate-700 text-xs transition">
                        🎯 Kịch bản 1: "Thoát Bẫy Quá Tải & Xây Dựng Hệ Thống"
                    </button>
                    <button onclick="loadSampleScript(2)" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-purple-600/30 text-slate-300 hover:text-white border border-slate-700 text-xs transition">
                        ⚡ Kịch bản 2: "Kỷ Luật Sáng Sớm & Năng Lượng Deep Work"
                    </button>
                    <button onclick="loadSampleScript(3)" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-purple-600/30 text-slate-300 hover:text-white border border-slate-700 text-xs transition">
                        🎬 Kịch bản 3: "Bí Quyết Chuyển Cảnh Triệu View Fedu"
                    </button>
                </div>
            </div>

            <!-- TEXT AREA INPUT -->
            <div class="mt-4 space-y-3">
                <textarea id="script-input" rows="5" placeholder="Dán kịch bản thoại của bạn vào đây..."
                          class="w-full bg-slate-900 text-white p-4 rounded-xl border border-slate-700 focus:outline-none focus:border-purple-500 text-sm leading-relaxed placeholder-slate-500 font-sans"></textarea>
                
                <div class="flex flex-wrap items-center justify-between gap-3">
                    <div class="text-xs text-slate-400">
                        💡 Gợi ý: Mỗi câu thoại xuống 1 dòng để AI chia nhịp cắt cảnh chuẩn nhất.
                    </div>
                    <div class="flex items-center gap-2">
                        <button onclick="clearScript()" class="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition">
                            Xóa trắng
                        </button>
                        <button onclick="analyzeAndMatchScript()" class="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-purple-500/25 flex items-center gap-2 transition">
                            ⚡ Phân Tích & Ráp B-Roll Ngay
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- MATCHING RESULTS CONTAINER -->
        <div id="script-results-container" class="space-y-4">
            <!-- Rendered by JS -->
        </div>
    </main>

    <!-- TAB 3: SỔ TAY 8 LOẠI B-ROLL FEDU -->
    <main id="tab-content-handbook" class="hidden flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-8 space-y-8">
        <div class="glass p-8 rounded-2xl border border-indigo-500/30">
            <div class="max-w-3xl">
                <span class="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 text-xs font-bold">
                    GIÁO TRÌNH ĐIỆN ẢNH MASTER
                </span>
                <h2 class="text-3xl font-extrabold text-white mt-3">Bộ Khung 8 Loại B-Roll Chuẩn Fedu</h2>
                <p class="text-sm text-slate-300 mt-2 leading-relaxed">
                    Được đúc kết từ khoa học thần kinh (Neuroscience) và tâm lý học nhận thức của Allan Paivio (Thuyết mã hóa kép) kết hợp kinh nghiệm đạo diễn thực chiến của Nguyễn Đức Việt.
                </p>
            </div>

            <!-- 8 CARDS GRID -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <!-- 1 -->
                <div class="p-6 rounded-2xl bg-slate-900 border border-blue-500/30 space-y-2">
                    <div class="flex items-center justify-between">
                        <span class="text-2xl">✂️</span>
                        <span class="text-xs px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 font-bold border border-blue-500/30">LOẠI 1</span>
                    </div>
                    <h3 class="text-xl font-bold text-white">1. Cutaway (Insert Shot)</h3>
                    <p class="text-xs text-blue-300 font-semibold">"Nói gì, hình nấy" • Cảnh chèn minh họa trực diện</p>
                    <p class="text-xs text-slate-300 leading-relaxed">Cảnh quay cận đặc tả chi tiết vật thể, thao tác ngón tay bấm phím, hoa, cốc nước để giấu vết cắt và neo thị giác.</p>
                </div>
                <!-- 2 -->
                <div class="p-6 rounded-2xl bg-slate-900 border border-purple-500/30 space-y-2">
                    <div class="flex items-center justify-between">
                        <span class="text-2xl">🎞️</span>
                        <span class="text-xs px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30">LOẠI 2</span>
                    </div>
                    <h3 class="text-xl font-bold text-white">2. Sequence (Montage)</h3>
                    <p class="text-xs text-purple-300 font-semibold">"Băng chuyền hành động" • Chuỗi quy trình liên hoàn</p>
                    <p class="text-xs text-slate-300 leading-relaxed">Nhiều góc máy khác nhau nối tiếp nhau miêu tả trọn vẹn quy trình (vắt cam, nén cà phê, nấu mỳ, gõ máy) giữ retention >70%.</p>
                </div>
                <!-- 3 -->
                <div class="p-6 rounded-2xl bg-slate-900 border border-teal-500/30 space-y-2">
                    <div class="flex items-center justify-between">
                        <span class="text-2xl">👁️</span>
                        <span class="text-xs px-2.5 py-1 rounded-full bg-teal-500/20 text-teal-300 font-bold border border-teal-500/30">LOẠI 3</span>
                    </div>
                    <h3 class="text-xl font-bold text-white">3. Góc POV (Point Of View)</h3>
                    <p class="text-xs text-teal-300 font-semibold">"Mượn mắt khán giả" • Góc nhìn thứ nhất</p>
                    <p class="text-xs text-slate-300 leading-relaxed">Máy quay đặt ngang tầm mắt chĩa xuống đôi tay (lái xe, viết sổ, tập gym) kích hoạt nơ-ron gương tăng chuyển đổi.</p>
                </div>
                <!-- 4 -->
                <div class="p-6 rounded-2xl bg-slate-900 border border-red-500/30 space-y-2">
                    <div class="flex items-center justify-between">
                        <span class="text-2xl">🎬</span>
                        <span class="text-xs px-2.5 py-1 rounded-full bg-red-500/20 text-red-300 font-bold border border-red-500/30">LOẠI 4</span>
                    </div>
                    <h3 class="text-xl font-bold text-white">4. Thoại In-Situ (Walk-and-Talk)</h3>
                    <p class="text-xs text-red-300 font-semibold">"Vừa làm vừa nói" • Thoại hiện trường sống động</p>
                    <p class="text-xs text-slate-300 leading-relaxed">Người nói trực tiếp thực hiện công việc (giảng bài tại FPT, xếp cây, đứng ban công) tăng Social Proof uy tín.</p>
                </div>
                <!-- 5 -->
                <div class="p-6 rounded-2xl bg-slate-900 border border-indigo-500/30 space-y-2">
                    <div class="flex items-center justify-between">
                        <span class="text-2xl">⚖️</span>
                        <span class="text-xs px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">LOẠI 5</span>
                    </div>
                    <h3 class="text-xl font-bold text-white">5. Dựng Intercut (Docu-Style)</h3>
                    <p class="text-xs text-indigo-300 font-semibold">"Nửa tĩnh, nửa động" • Dựng luân phiên</p>
                    <p class="text-xs text-slate-300 leading-relaxed">Cắt xen kẽ giữa người nói chính và thao tác kỹ thuật hiện trường, phá vỡ sự nhàm chán.</p>
                </div>
                <!-- 6 -->
                <div class="p-6 rounded-2xl bg-slate-900 border border-amber-500/30 space-y-2">
                    <div class="flex items-center justify-between">
                        <span class="text-2xl">♟️</span>
                        <span class="text-xs px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">LOẠI 6</span>
                    </div>
                    <h3 class="text-xl font-bold text-white">6. Metaphor (Ẩn Dụ Thị Giác)</h3>
                    <p class="text-xs text-amber-300 font-semibold">"Mượn vật thay lời" • Biểu tượng hóa ý niệm</p>
                    <p class="text-xs text-slate-300 leading-relaxed">Mượn hình ảnh biểu tượng gián tiếp (cà phê nhỏ giọt = thời gian/bế tắc; note lộn xộn = quá tải) để neo cảm xúc sâu sắc.</p>
                </div>
                <!-- 7 -->
                <div class="p-6 rounded-2xl bg-slate-900 border border-slate-500/30 space-y-2">
                    <div class="flex items-center justify-between">
                        <span class="text-2xl">⏸️</span>
                        <span class="text-xs px-2.5 py-1 rounded-full bg-slate-500/20 text-slate-300 font-bold border border-slate-500/30">LOẠI 7</span>
                    </div>
                    <h3 class="text-xl font-bold text-white">7. Negative Space (Khoảng Lặng)</h3>
                    <p class="text-xs text-slate-300 font-semibold">"Khoảng lặng đắt giá" • Thư giãn thị giác</p>
                    <p class="text-xs text-slate-300 leading-relaxed">Khung hình tĩnh lặng (ban công, sân uống nước cam) tạo điểm nghỉ cho não bộ tiêu hóa bài học.</p>
                </div>
                <!-- 8 -->
                <div class="p-6 rounded-2xl bg-slate-900 border border-emerald-500/30 space-y-2">
                    <div class="flex items-center justify-between">
                        <span class="text-2xl">⏳</span>
                        <span class="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">LOẠI 8</span>
                    </div>
                    <h3 class="text-xl font-bold text-white">8. Archival / Timeline (Tư Liệu)</h3>
                    <p class="text-xs text-emerald-300 font-semibold">"Cỗ máy thời gian" • Tư liệu thực chứng</p>
                    <p class="text-xs text-slate-300 leading-relaxed">Màn hình Timeline CapCut/Premiere đang chạy, thao tác kéo layer, chứng minh luận điểm chắc chắn.</p>
                </div>
            </div>
        </div>
    </main>

    <!-- FOOTER -->
    <footer class="mt-auto border-t border-slate-800 py-8 px-4 text-center text-xs text-slate-500 bg-slate-950">
        <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
                © 2026 <strong class="text-slate-300">B-Roll Bank Master</strong> • Nguyễn Đức Việt (VietMac).
            </div>
            <div class="flex items-center gap-4">
                <a href="https://fedu.vn/brollbank.html" class="hover:text-purple-400 transition">fedu.vn/brollbank.html</a>
                <a href="https://www.youtube.com/playlist?list=PLPs82ezbs9Lo" target="_blank" class="hover:text-red-400 transition">YouTube Playlist</a>
            </div>
        </div>
    </footer>

    <!-- MODAL CHI TIẾT ĐẠO DIỄN -->
    <div id="video-modal" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-md hidden flex items-center justify-center p-4 sm:p-6 opacity-0 transition-opacity duration-300">
        <div class="glass max-w-3xl w-full max-h-[90vh] rounded-2xl border border-slate-700 flex flex-col overflow-hidden shadow-2xl bg-slate-900">
            <!-- Modal Header -->
            <div class="p-4 sm:px-6 border-b border-slate-800 flex items-center justify-between bg-slate-950">
                <div class="flex items-center gap-3">
                    <span id="modal-category-badge" class="px-2.5 py-1 rounded-full text-xs font-bold badge-cutaway">Cutaway</span>
                    <h3 id="modal-title" class="text-base sm:text-lg font-bold text-white truncate max-w-md">Tiêu đề B-Roll</h3>
                </div>
                <button onclick="closeModal()" class="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white border border-slate-700 transition">✕</button>
            </div>

            <!-- Modal Body -->
            <div class="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
                <!-- Video Player Container -->
                <div class="bg-black rounded-xl overflow-hidden aspect-video relative flex items-center justify-center border border-slate-800" id="modal-player-container">
                    <!-- Embedded YouTube Player -->
                </div>

                <!-- Modal Actions Row -->
                <div class="flex items-center gap-2.5">
                    <a id="modal-gdrive-btn" href="#" target="_blank" class="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition flex items-center justify-center gap-2">
                        <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z"/></svg>
                        📥 Tải Video MP4 Gốc (Google Drive)
                    </a>
                    <a id="modal-yt-btn" href="#" target="_blank" class="py-2.5 px-4 rounded-xl bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/30 font-bold text-xs transition flex items-center justify-center gap-1.5">
                        <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                        Mở YouTube
                    </a>
                </div>

                <!-- Info Grid -->
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div class="p-3 rounded-xl bg-slate-950 border border-slate-800">
                        <div class="text-slate-400 text-[10px] font-semibold uppercase">Định Dạng</div>
                        <div class="font-bold text-white mt-0.5" id="modal-orientation">Dọc 9:16</div>
                    </div>
                    <div class="p-3 rounded-xl bg-slate-950 border border-slate-800">
                        <div class="text-slate-400 text-[10px] font-semibold uppercase">Thời Lượng</div>
                        <div class="font-bold text-white font-mono mt-0.5" id="modal-duration">00:15</div>
                    </div>
                    <div class="p-3 rounded-xl bg-slate-950 border border-slate-800">
                        <div class="text-slate-400 text-[10px] font-semibold uppercase">Góc Quay</div>
                        <div class="font-bold text-white mt-0.5" id="modal-shot">Close-up</div>
                    </div>
                    <div class="p-3 rounded-xl bg-slate-950 border border-slate-800">
                        <div class="text-slate-400 text-[10px] font-semibold uppercase">Bối Cảnh</div>
                        <div class="font-bold text-white mt-0.5 truncate" id="modal-location">Home Studio</div>
                    </div>
                </div>

                <!-- Director's Breakdown Note -->
                <div class="p-4 rounded-xl bg-purple-950/40 border border-purple-900/60 space-y-1.5">
                    <div class="text-xs font-bold text-purple-300">
                        🎬 Lời Khuyên Của Đạo Diễn (Tâm Lý Học Tiếp Nhận):
                    </div>
                    <p class="text-xs text-purple-100/90 leading-relaxed" id="modal-director-note">
                        Mô tả chi tiết.
                    </p>
                </div>

                <!-- Dialogue Cues -->
                <div class="space-y-2">
                    <div class="text-xs font-bold text-slate-300">
                        🎯 Mẫu Câu Thoại Khớp Nhất Trong Kịch Bản:
                    </div>
                    <div class="space-y-1.5" id="modal-dialogue-cues"></div>
                </div>
            </div>
        </div>
    </div>

    <!-- TOAST -->
    <div id="toast" class="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl glass border border-purple-500 text-xs font-semibold text-white shadow-2xl transform translate-y-20 opacity-0 transition-all duration-300 flex items-center gap-2">
        <span id="toast-msg">Đã sao chép!</span>
    </div>

    <!-- CLIENT SCRIPT -->
    <script>
        const MASTER_DATA = {json_data_str};
        let activeCategory = 'all';

        function switchMainTab(tabId) {{
            document.getElementById('tab-content-library').classList.add('hidden');
            document.getElementById('tab-content-script').classList.add('hidden');
            document.getElementById('tab-content-handbook').classList.add('hidden');

            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active', 'text-white'));
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.add('text-slate-300'));

            if (tabId === 'library') {{
                document.getElementById('tab-content-library').classList.remove('hidden');
                document.getElementById('tab-btn-library').classList.add('active');
            }} else if (tabId === 'script-matcher') {{
                document.getElementById('tab-content-script').classList.remove('hidden');
                document.getElementById('tab-btn-script').classList.add('active');
            }} else if (tabId === 'handbook') {{
                document.getElementById('tab-content-handbook').classList.remove('hidden');
                document.getElementById('tab-btn-handbook').classList.add('active');
            }}
        }}

        function filterCategory(catId) {{
            activeCategory = catId;
            document.querySelectorAll('.cat-pill').forEach(btn => {{
                if (btn.getAttribute('data-cat') === catId) {{
                    btn.classList.add('active');
                }} else {{
                    btn.classList.remove('active');
                }}
            }});
            applyFilters();
        }}

        function handleSearch() {{
            const val = document.getElementById('search-input').value.trim();
            const clearBtn = document.getElementById('clear-search-btn');
            if (val) {{
                clearBtn.classList.remove('hidden');
            }} else {{
                clearBtn.classList.add('hidden');
            }}
            applyFilters();
        }}

        function clearSearch() {{
            document.getElementById('search-input').value = '';
            document.getElementById('clear-search-btn').classList.add('hidden');
            applyFilters();
        }}

        function applyFilters() {{
            const query = document.getElementById('search-input').value.toLowerCase().trim();
            const orient = document.getElementById('filter-orientation').value;
            const loc = document.getElementById('filter-location').value;
            const shot = document.getElementById('filter-shot').value;

            let visibleCount = 0;

            MASTER_DATA.videos.forEach(v => {{
                const el = document.getElementById(`card-${{v.id}}`);
                if (!el) return;

                let show = true;
                if (activeCategory !== 'all' && v.category_id !== activeCategory) show = false;
                if (orient !== 'all' && v.orientation !== orient) show = false;
                if (loc !== 'all' && !v.location.toLowerCase().includes(loc.toLowerCase())) show = false;
                if (shot !== 'all' && !v.shot_type.toLowerCase().includes(shot.toLowerCase())) show = false;
                if (query) {{
                    const fullText = (v.title + ' ' + v.filename + ' ' + v.action + ' ' + v.location + ' ' + v.mood + ' ' + v.director_note + ' ' + v.dialogue_cues.join(' ') + ' ' + v.keywords.join(' ')).toLowerCase();
                    if (!fullText.includes(query)) show = false;
                }}

                if (show) {{
                    el.classList.remove('hidden');
                    visibleCount++;
                }} else {{
                    el.classList.add('hidden');
                }}
            }});

            document.getElementById('filtered-count').innerText = visibleCount;
            const empty = document.getElementById('empty-state');
            if (visibleCount === 0) {{
                empty.classList.remove('hidden');
            }} else {{
                empty.classList.add('hidden');
            }}
        }}

        function resetAllFilters() {{
            document.getElementById('search-input').value = '';
            document.getElementById('clear-search-btn').classList.add('hidden');
            document.getElementById('filter-orientation').value = 'all';
            document.getElementById('filter-location').value = 'all';
            document.getElementById('filter-shot').value = 'all';
            filterCategory('all');
        }}

        function openModal(id) {{
            const v = MASTER_DATA.videos.find(x => x.id === id);
            if (!v) return;

            document.getElementById('modal-title').innerText = `${{v.id}}. ${{v.title}}`;
            const badge = document.getElementById('modal-category-badge');
            badge.className = `px-2.5 py-1 rounded-full text-xs font-bold badge-${{v.category_id}}`;
            badge.innerHTML = `${{v.category_icon}} ${{v.category_name}}`;

            document.getElementById('modal-orientation').innerText = v.orientation === 'vertical' ? '📱 Dọc 9:16 (Shorts)' : '🖥️ Ngang 16:9 (Cinematic 4K)';
            document.getElementById('modal-duration').innerText = `${{v.duration}} (${{v.duration_sec}}s)`;
            document.getElementById('modal-shot').innerText = v.shot_type;
            document.getElementById('modal-location').innerText = v.location;
            document.getElementById('modal-director-note').innerText = v.director_note;

            const gdriveLink = v.gdrive_download_url || v.gdrive_view_url || 'https://drive.google.com/open?id=1R4Wyl_c8MxLPqBJRR-5Dc5I3P3Hb7tSA';
            document.getElementById('modal-gdrive-btn').href = gdriveLink;
            document.getElementById('modal-yt-btn').href = v.youtube_url || `https://www.youtube.com/watch?v=${{v.video_id}}`;

            const playerBox = document.getElementById('modal-player-container');
            playerBox.innerHTML = `
                <iframe src="https://www.youtube.com/embed/${{v.video_id}}?autoplay=1&rel=0" 
                        title="${{v.title}}" 
                        class="w-full h-full border-0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen></iframe>
            `;

            const cuesBox = document.getElementById('modal-dialogue-cues');
            cuesBox.innerHTML = v.dialogue_cues.map(c => `
                <div onclick="copyText('${{c.replace(/'/g, "\\\\'")}}')" class="p-2.5 rounded-lg bg-slate-950 hover:bg-purple-950/60 border border-slate-800 hover:border-purple-500/50 cursor-pointer text-xs text-slate-200 flex items-center justify-between gap-2 group transition">
                    <span class="italic">"${{c}}"</span>
                    <span class="text-[10px] text-purple-400 opacity-0 group-hover:opacity-100 transition">Sao chép</span>
                </div>
            `).join('');

            const modal = document.getElementById('video-modal');
            modal.classList.remove('hidden');
            setTimeout(() => modal.classList.remove('opacity-0'), 10);
        }}

        function closeModal() {{
            const modal = document.getElementById('video-modal');
            modal.classList.add('opacity-0');
            setTimeout(() => {{
                modal.classList.add('hidden');
                document.getElementById('modal-player-container').innerHTML = '';
            }}, 300);
        }}

        function copyText(txt) {{
            navigator.clipboard.writeText(txt).then(() => showToast('Đã sao chép câu thoại vào Clipboard!'));
        }}

        function showToast(msg) {{
            const toast = document.getElementById('toast');
            document.getElementById('toast-msg').innerText = msg;
            toast.classList.remove('translate-y-20', 'opacity-0');
            setTimeout(() => toast.classList.add('translate-y-20', 'opacity-0'), 2500);
        }}

        // SCRIPT MATCHER
        const SAMPLE_SCRIPTS = {{
            1: `Có bao giờ bạn mở máy tính lên và bị ngập trong hàng tá tab trình duyệt cùng lúc?
Sự nhiễu loạn thông tin đang âm thầm bào mòn khả năng tập trung sâu của bạn.
Trước khi bắt đầu, tôi luôn dành 5 phút viết cấu trúc kịch bản ra sổ tay.
Bắt tay vào gõ những dòng mã đầu tiên của hệ thống tự động hóa.
Đôi khi, việc dừng lại bước ra ban công nhìn toàn cảnh quan trọng hơn là cứ cắm đầu chạy tiếp.
Một ly cà phê nhỏ giọt là lời nhắc nhở rằng mọi thành quả lớn đều bắt đầu từ sự tích lũy kiên nhẫn.`,
            2: `Mỗi sáng thức dậy bằng một thói quen nhỏ giúp tái nạp 100% năng lượng.
Tôi tự tay thái lát và ép một cốc nước cam tươi mát lành.
Cầm vô lăng lái xe đến phòng tập rèn luyện kỷ luật thân thể trước giờ làm việc.
Khi bước vào trạng thái dòng chảy Deep Work, thời gian dường như dừng lại.
Bí quyết để duy trì phong độ đỉnh cao là cân bằng giữa hiệu suất cao và sự thư giãn chủ động.`,
            3: `Khi tôi đứng lớp chia sẻ cho hàng trăm bạn sinh viên tại FPT về kỹ thuật làm video ngắn.
Sai lầm lớn nhất của các bạn là dựng phim bị giật cục và thiếu điểm nối vô hình.
Chỉ cần một phím tắt duy nhất phím B trên bàn phím, toàn bộ nhịp điệu video sẽ thay đổi hoàn toàn.
Nhìn vào dòng Timeline này, bạn sẽ thấy cách tôi sắp xếp từng lớp âm thanh và hình ảnh.
Hãy kiểm chứng điều này qua bài thực hành thực tế ngay hôm nay.`
        }};

        function loadSampleScript(idx) {{
            document.getElementById('script-input').value = SAMPLE_SCRIPTS[idx] || '';
            analyzeAndMatchScript();
        }}

        function clearScript() {{
            document.getElementById('script-input').value = '';
            document.getElementById('script-results-container').innerHTML = '';
        }}

        function analyzeAndMatchScript() {{
            const text = document.getElementById('script-input').value.trim();
            if (!text) {{
                showToast('Vui lòng dán kịch bản thoại vào ô!');
                return;
            }}

            const rawLines = text.split(/\\n+|(?<=[.!?])\\s+/).map(l => l.trim()).filter(l => l.length > 5);
            if (rawLines.length === 0) return;

            const matched = rawLines.map((line, idx) => {{
                const lineLower = line.toLowerCase();
                let best = null;
                let maxScore = -1;

                MASTER_DATA.videos.forEach(v => {{
                    let s = 0;
                    v.keywords.forEach(kw => {{ if (lineLower.includes(kw.toLowerCase())) s += 6; }});
                    v.dialogue_cues.forEach(cue => {{
                        cue.toLowerCase().split(/\\s+/).forEach(w => {{
                            if (w.length > 3 && lineLower.includes(w)) s += 2;
                        }});
                    }});
                    if ((lineLower.includes('ban công') || lineLower.includes('dừng lại')) && v.keywords.includes('ban công')) s += 12;
                    if ((lineLower.includes('nước cam') || lineLower.includes('vắt cam')) && v.keywords.includes('nước cam')) s += 12;
                    if ((lineLower.includes('cà phê') || lineLower.includes('nhỏ giọt')) && v.keywords.includes('cà phê')) s += 12;
                    if ((lineLower.includes('gõ phím') || lineLower.includes('laptop') || lineLower.includes('mã')) && v.keywords.includes('gõ phím')) s += 12;
                    if ((lineLower.includes('sổ') || lineLower.includes('viết')) && v.keywords.includes('viết sổ')) s += 12;
                    if ((lineLower.includes('fpt') || lineLower.includes('sinh viên')) && v.keywords.includes('fpt')) s += 12;
                    if ((lineLower.includes('chuyển cảnh') || lineLower.includes('phím b') || lineLower.includes('timeline')) && v.keywords.includes('chuyển cảnh')) s += 12;
                    if ((lineLower.includes('tập') || lineLower.includes('lái xe')) && v.keywords.includes('tập gym')) s += 12;

                    if (s > maxScore) {{
                        maxScore = s;
                        best = v;
                    }}
                }});

                if (!best || maxScore <= 0) {{
                    best = MASTER_DATA.videos[idx % MASTER_DATA.videos.length];
                }}

                return {{ beat: idx + 1, sentence: line, video: best }};
            }});

            const container = document.getElementById('script-results-container');
            container.innerHTML = `
                <div class="glass p-6 rounded-2xl border border-slate-800 space-y-6">
                    <div class="flex items-center justify-between border-b border-slate-800 pb-4">
                        <div>
                            <div class="text-xs font-bold text-emerald-400 uppercase">Bảng Phân Cảnh B-Roll Chi Tiết</div>
                            <h3 class="text-xl font-black text-white mt-0.5">Ráp Khớp ${{matched.length}} Phân Đoạn Kịch Bản</h3>
                        </div>
                        <button onclick="copyStoryboardShotlist()" class="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-lg transition">
                            📋 Sao Chép Toàn Bộ Shotlist
                        </button>
                    </div>

                    <div class="space-y-6">
                        ${{matched.map(item => `
                            <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-purple-500/50 transition flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
                                <div class="flex items-start gap-3.5 flex-1 min-w-0">
                                    <div class="w-8 h-8 rounded-full bg-purple-600/30 border border-purple-500/50 text-purple-300 font-bold flex items-center justify-center text-xs shrink-0 font-mono">
                                        ${{item.beat}}
                                    </div>
                                    <div class="space-y-1.5 min-w-0">
                                        <div class="text-sm font-bold text-white leading-relaxed">
                                            "${{item.sentence}}"
                                        </div>
                                        <div class="flex flex-wrap items-center gap-2 text-xs">
                                            <span class="px-2 py-0.5 rounded badge-${{item.video.category_id}} font-bold text-[10px]">
                                                ${{item.video.category_icon}} ${{item.video.category_name}}
                                            </span>
                                            <span class="text-slate-400 text-[11px]">${{item.video.shot_type}}</span>
                                            <span class="text-slate-500">•</span>
                                            <span class="text-slate-400 text-[11px]">${{item.video.location}}</span>
                                        </div>
                                        <div class="text-[11px] text-purple-300/80 italic">
                                            💡 Đạo diễn: ${{item.video.director_note}}
                                        </div>
                                    </div>
                                </div>

                                <!-- Inline YouTube Video Player on Matched Beat -->
                                <div class="w-full lg:w-72 aspect-video bg-black rounded-xl overflow-hidden shrink-0 border border-slate-800">
                                    <iframe src="https://www.youtube.com/embed/${{item.video.video_id}}?rel=0" 
                                            title="${{item.video.title}}" 
                                            loading="lazy"
                                            class="w-full h-full border-0" 
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                            allowfullscreen></iframe>
                                </div>
                            </div>
                        `).join('')}}
                    </div>
                </div>
            `;
            window.latestStoryboard = matched;
        }}

        function copyStoryboardShotlist() {{
            if (!window.latestStoryboard) return;
            const text = window.latestStoryboard.map(b => 
                `BEAT ${{b.beat}}: "${{b.sentence}}"\n  -> B-ROLL: [${{b.video.category_name}}] ${{b.video.title}}\n  -> FILE: ${{b.video.filename}} (${{b.video.duration}})\n  -> GÓC MÁY: ${{b.video.shot_type}} | BỐI CẢNH: ${{b.video.location}}\n  -> LINK DEMO: https://www.youtube.com/watch?v=${{b.video.video_id}}\n`
            ).join('\n');
            navigator.clipboard.writeText(text).then(() => showToast('Đã sao chép toàn bộ Shotlist phân cảnh B-Roll!'));
        }}
    </script>
</body>
</html>
'''

with open(HTML_OUT, 'w', encoding='utf-8') as f:
    f.write(html_content)

print(f"Generated pre-rendered HTML with {len(videos)} inline YouTube embeds & GDrive download links: {HTML_OUT} ({len(html_content)} bytes)")
