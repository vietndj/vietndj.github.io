#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Build brollbank.html for vietndj.github.io
"""

import json
import os

DB_PATH = '/Users/vietmac/Documents/CODE/vietndj.github.io/broll_bank_master.json'
HTML_OUT = '/Users/vietmac/Documents/CODE/vietndj.github.io/brollbank.html'

with open(DB_PATH, 'r', encoding='utf-8') as f:
    db = json.load(f)

json_data_str = json.dumps(db, ensure_ascii=False)

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
                            50: '#f5f3ff',
                            100: '#ede9fe',
                            500: '#8b5cf6',
                            600: '#7c3aed',
                            700: '#6d28d9',
                            900: '#4c1d95'
                        }},
                        dark: {{
                            900: '#0b0f19',
                            800: '#111827',
                            700: '#1f2937',
                            600: '#374151'
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
            background: rgba(17, 24, 39, 0.75);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.08);
        }}
        .glass-card {{
            background: rgba(31, 41, 55, 0.6);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.06);
            transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }}
        .glass-card:hover {{
            transform: translateY(-4px);
            border-color: rgba(139, 92, 246, 0.4);
            box-shadow: 0 16px 32px -8px rgba(139, 92, 246, 0.15);
        }}
        .tab-btn.active {{
            background: linear-gradient(135deg, #7c3aed, #4f46e5);
            color: #ffffff;
            box-shadow: 0 4px 14px rgba(124, 58, 237, 0.4);
        }}
        .cat-pill.active {{
            border-color: #8b5cf6;
            background: rgba(139, 92, 246, 0.2);
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
        ::-webkit-scrollbar-thumb:hover {{
            background: #4b5563;
        }}
        .badge-cutaway {{ background: rgba(59, 130, 246, 0.15); color: #93c5fd; border: 1px solid rgba(59, 130, 246, 0.3); }}
        .badge-sequence {{ background: rgba(168, 85, 247, 0.15); color: #d8b4fe; border: 1px solid rgba(168, 85, 247, 0.3); }}
        .badge-pov {{ background: rgba(20, 184, 166, 0.15); color: #5eead4; border: 1px solid rgba(20, 184, 166, 0.3); }}
        .badge-in_situ {{ background: rgba(239, 68, 68, 0.15); color: #fca5a5; border: 1px solid rgba(239, 68, 68, 0.3); }}
        .badge-intercut {{ background: rgba(99, 102, 241, 0.15); color: #a5b4fc; border: 1px solid rgba(99, 102, 241, 0.3); }}
        .badge-metaphor {{ background: rgba(245, 158, 11, 0.15); color: #fcd34d; border: 1px solid rgba(245, 158, 11, 0.3); }}
        .badge-negative_space {{ background: rgba(148, 163, 184, 0.15); color: #cbd5e1; border: 1px solid rgba(148, 163, 184, 0.3); }}
        .badge-archival {{ background: rgba(16, 185, 129, 0.15); color: #6ee7b7; border: 1px solid rgba(16, 185, 129, 0.3); }}
    </style>
</head>
<body class="min-h-screen selection:bg-purple-500 selection:text-white flex flex-col">

    <!-- TOP NAVIGATION -->
    <nav class="sticky top-0 z-40 glass border-b border-slate-800/80 px-4 lg:px-8 py-3.5 flex items-center justify-between">
        <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-500/20 text-white font-extrabold text-lg">
                B
            </div>
            <div>
                <div class="flex items-center gap-2">
                    <span class="font-extrabold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-purple-300">B-ROLL BANK</span>
                    <span class="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-semibold">FEDU MASTER</span>
                </div>
                <p class="text-xs text-slate-400">Thư viện cảnh trám điện ảnh • Nguyễn Đức Việt</p>
            </div>
        </div>

        <!-- Mode / Links -->
        <div class="flex items-center gap-3">
            <a href="https://www.youtube.com/playlist?list=PLPs82ezbs9Lo" target="_blank" class="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600/20 text-red-300 border border-red-500/30 hover:bg-red-600/30 text-xs font-semibold transition">
                <i data-lucide="youtube" class="w-3.5 h-3.5 text-red-400"></i> Playlist YouTube
            </a>
            <a href="https://fedu.vn/course/slide-8-loai-broll-video-course.html" target="_blank" class="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-600/30 text-xs font-semibold transition">
                <i data-lucide="book-open" class="w-3.5 h-3.5 text-indigo-400"></i> 8 Loại B-Roll Fedu
            </a>
            <button onclick="toggleTheme()" class="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition" title="Đổi giao diện">
                <i data-lucide="moon" id="theme-icon" class="w-4 h-4"></i>
            </button>
        </div>
    </nav>

    <!-- HERO HEADER -->
    <header class="relative px-4 lg:px-8 py-10 overflow-hidden bg-gradient-to-b from-purple-950/40 via-dark-900 to-dark-900 border-b border-slate-800/60">
        <div class="max-w-7xl mx-auto">
            <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div>
                    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 text-xs font-medium mb-3">
                        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        90 Video Sẵn Sàng Sản Xuất • Phân Loại Đa Trục
                    </div>
                    <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                        Quản Lý & Khai Thác <span class="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-300 to-amber-300">B-Roll Chuẩn Điện Ảnh</span>
                    </h1>
                    <p class="mt-2 text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
                        Hệ thống định danh 8 loại cảnh trám theo tâm lý học tiếp nhận thị giác. Tra cứu siêu tốc theo bối cảnh, góc máy, hoặc dán kịch bản thoại để tự động bóc tách phân cảnh.
                    </p>
                </div>

                <!-- Live Metrics -->
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:w-auto">
                    <div class="glass p-3.5 rounded-xl border border-slate-800 text-center">
                        <div class="text-2xl font-black text-white font-mono" id="stat-total">90</div>
                        <div class="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Tổng Cảnh Trám</div>
                    </div>
                    <div class="glass p-3.5 rounded-xl border border-slate-800 text-center">
                        <div class="text-2xl font-black text-purple-400 font-mono" id="stat-vertical">82</div>
                        <div class="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Dọc 9:16 Shorts</div>
                    </div>
                    <div class="glass p-3.5 rounded-xl border border-slate-800 text-center">
                        <div class="text-2xl font-black text-indigo-400 font-mono" id="stat-horizontal">8</div>
                        <div class="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Ngang 16:9 4K</div>
                    </div>
                    <div class="glass p-3.5 rounded-xl border border-slate-800 text-center">
                        <div class="text-2xl font-black text-emerald-400 font-mono">8/8</div>
                        <div class="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Nhóm B-Roll</div>
                    </div>
                </div>
            </div>

            <!-- MAIN NAVIGATION TABS -->
            <div class="mt-8 flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-slate-900/90 border border-slate-800 w-fit">
                <button onclick="switchMainTab('library')" id="tab-btn-library" class="tab-btn active px-4 py-2 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-2 transition">
                    <i data-lucide="layout-grid" class="w-4 h-4"></i> Thư Viện Cảnh Trám (90)
                </button>
                <button onclick="switchMainTab('script-matcher')" id="tab-btn-script" class="tab-btn px-4 py-2 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-2 text-slate-300 hover:text-white transition">
                    <i data-lucide="sparkles" class="w-4 h-4 text-amber-400"></i> Ráp Kịch Bản Thoại Thông Minh (AI)
                </button>
                <button onclick="switchMainTab('handbook')" id="tab-btn-handbook" class="tab-btn px-4 py-2 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-2 text-slate-300 hover:text-white transition">
                    <i data-lucide="graduation-cap" class="w-4 h-4 text-indigo-400"></i> Sổ Tay 8 Loại B-Roll Fedu
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
                <i data-lucide="search" class="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2"></i>
                <input type="text" id="search-input" oninput="handleSearch()" placeholder="Tìm kiếm nhanh: tên cảnh, hành động (gõ phím, nước cam, cafe), bối cảnh (ban công, FPT), mẫu câu thoại, từ khóa..." 
                       class="w-full bg-slate-900/80 text-white pl-12 pr-10 py-3 rounded-xl border border-slate-700/80 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-sm placeholder-slate-500 transition">
                <button onclick="clearSearch()" id="clear-search-btn" class="hidden absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                    <i data-lucide="x" class="w-4 h-4"></i>
                </button>
            </div>

            <!-- 8 B-Roll Category Pills -->
            <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none" id="cat-pills-container">
                <button onclick="filterCategory('all')" class="cat-pill active shrink-0 px-3.5 py-1.5 rounded-lg border border-slate-700 text-xs font-semibold transition" data-cat="all">
                    Tất cả (90)
                </button>
                <button onclick="filterCategory('cutaway')" class="cat-pill shrink-0 px-3.5 py-1.5 rounded-lg border border-slate-800 text-xs text-slate-400 hover:text-slate-200 transition" data-cat="cutaway">
                    ✂️ 1. Cutaway (Insert)
                </button>
                <button onclick="filterCategory('sequence')" class="cat-pill shrink-0 px-3.5 py-1.5 rounded-lg border border-slate-800 text-xs text-slate-400 hover:text-slate-200 transition" data-cat="sequence">
                    🎞️ 2. Sequence (Montage)
                </button>
                <button onclick="filterCategory('pov')" class="cat-pill shrink-0 px-3.5 py-1.5 rounded-lg border border-slate-800 text-xs text-slate-400 hover:text-slate-200 transition" data-cat="pov">
                    👁️ 3. Góc POV
                </button>
                <button onclick="filterCategory('in_situ')" class="cat-pill shrink-0 px-3.5 py-1.5 rounded-lg border border-slate-800 text-xs text-slate-400 hover:text-slate-200 transition" data-cat="in_situ">
                    🎬 4. Thoại In-situ
                </button>
                <button onclick="filterCategory('intercut')" class="cat-pill shrink-0 px-3.5 py-1.5 rounded-lg border border-slate-800 text-xs text-slate-400 hover:text-slate-200 transition" data-cat="intercut">
                    ⚖️ 5. Dựng Intercut
                </button>
                <button onclick="filterCategory('metaphor')" class="cat-pill shrink-0 px-3.5 py-1.5 rounded-lg border border-slate-800 text-xs text-slate-400 hover:text-slate-200 transition" data-cat="metaphor">
                    ♟️ 6. Metaphor (Ẩn dụ)
                </button>
                <button onclick="filterCategory('negative_space')" class="cat-pill shrink-0 px-3.5 py-1.5 rounded-lg border border-slate-800 text-xs text-slate-400 hover:text-slate-200 transition" data-cat="negative_space">
                    ⏸️ 7. Negative Space
                </button>
                <button onclick="filterCategory('archival')" class="cat-pill shrink-0 px-3.5 py-1.5 rounded-lg border border-slate-800 text-xs text-slate-400 hover:text-slate-200 transition" data-cat="archival">
                    ⏳ 8. Archival / Timeline
                </button>
            </div>

            <!-- Multi-axis Selectors & Sort -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-800/80">
                <div>
                    <label class="block text-[11px] font-semibold text-slate-400 mb-1">Tỉ lệ khung hình</label>
                    <select id="filter-orientation" onchange="applyFilters()" class="w-full bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-lg px-2.5 py-2 focus:outline-none focus:border-purple-500">
                        <option value="all">Tất cả định dạng</option>
                        <option value="vertical">📱 Dọc 9:16 (Shorts/Reel)</option>
                        <option value="horizontal">🖥️ Ngang 16:9 (Cinematic)</option>
                    </select>
                </div>
                <div>
                    <label class="block text-[11px] font-semibold text-slate-400 mb-1">Bối cảnh / Vị trí</label>
                    <select id="filter-location" onchange="applyFilters()" class="w-full bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-lg px-2.5 py-2 focus:outline-none focus:border-purple-500">
                        <option value="all">Tất cả địa điểm</option>
                        <option value="Home Studio">🏠 Home Studio (Bàn gỗ)</option>
                        <option value="Ban công">🌿 Ban công Times City</option>
                        <option value="FPT">🎓 Giảng đường FPT</option>
                        <option value="Bếp">☕ Bếp / Barista / Nước cam</option>
                        <option value="Lương Yên">🎬 Ngoại cảnh Lương Yên</option>
                        <option value="Gym">💪 Phòng Gym / Lái xe</option>
                    </select>
                </div>
                <div>
                    <label class="block text-[11px] font-semibold text-slate-400 mb-1">Góc máy / Cự ly</label>
                    <select id="filter-shot" onchange="applyFilters()" class="w-full bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-lg px-2.5 py-2 focus:outline-none focus:border-purple-500">
                        <option value="all">Tất cả góc quay</option>
                        <option value="Close-up">🔍 Cận cảnh (CU / ECU)</option>
                        <option value="Medium">👤 Trung cảnh (MCU / MS)</option>
                        <option value="POV">👁️ Góc nhìn thứ nhất (POV)</option>
                        <option value="Top-down">📐 Góc từ trên xuống (Top-down)</option>
                        <option value="Movement">⚡ Chuyển động (Movement Cut)</option>
                    </select>
                </div>
                <div>
                    <label class="block text-[11px] font-semibold text-slate-400 mb-1">Sắp xếp theo</label>
                    <select id="sort-by" onchange="applyFilters()" class="w-full bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-lg px-2.5 py-2 focus:outline-none focus:border-purple-500">
                        <option value="id_asc">Mặc định (ID 1-90)</option>
                        <option value="dur_desc">Thời lượng (Dài -> Ngắn)</option>
                        <option value="dur_asc">Thời lượng (Ngắn -> Dài)</option>
                        <option value="title_asc">Tên cảnh (A -> Z)</option>
                    </select>
                </div>
            </div>
        </div>

        <!-- STATUS BAR -->
        <div class="flex items-center justify-between text-xs text-slate-400 px-1">
            <div>
                Đang hiển thị <span id="filtered-count" class="font-bold text-purple-400">90</span> / 90 clip B-roll
            </div>
            <div class="flex items-center gap-2">
                <button onclick="setViewMode('grid')" id="view-grid-btn" class="p-1.5 rounded-lg bg-purple-600/30 text-purple-300 border border-purple-500/40">
                    <i data-lucide="grid" class="w-4 h-4"></i>
                </button>
                <button onclick="setViewMode('list')" id="view-list-btn" class="p-1.5 rounded-lg bg-slate-800 text-slate-400 border border-slate-700 hover:text-white">
                    <i data-lucide="list" class="w-4 h-4"></i>
                </button>
            </div>
        </div>

        <!-- VIDEO GRID CONTAINER -->
        <div id="video-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            <!-- Rendered by JS -->
        </div>

        <!-- EMPTY STATE -->
        <div id="empty-state" class="hidden text-center py-20 glass rounded-2xl border border-slate-800">
            <i data-lucide="film" class="w-12 h-12 text-slate-600 mx-auto mb-3"></i>
            <h3 class="text-lg font-bold text-slate-300">Không tìm thấy cảnh trám phù hợp</h3>
            <p class="text-xs text-slate-500 mt-1 max-w-sm mx-auto">Hãy thử xóa từ khóa tìm kiếm hoặc bỏ chọn bớt bộ lọc để hiển thị toàn bộ 90 video.</p>
            <button onclick="resetAllFilters()" class="mt-4 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold transition">
                Đặt lại toàn bộ bộ lọc
            </button>
        </div>
    </main>

    <!-- TAB 2: AI SCRIPT-TO-BROLL MATCHER -->
    <main id="tab-content-script" class="hidden flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-8 space-y-6">
        <div class="glass p-6 sm:p-8 rounded-2xl border border-purple-500/30 relative overflow-hidden">
            <div class="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-purple-600/10 blur-3xl pointer-events-none"></div>
            
            <div class="max-w-3xl">
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-semibold mb-3">
                    <i data-lucide="sparkles" class="w-3.5 h-3.5"></i> Công Cụ AI Đạo Diễn
                </span>
                <h2 class="text-2xl sm:text-3xl font-extrabold text-white">Ráp Cảnh Trám Thông Minh Theo Kịch Bản Thoại</h2>
                <p class="text-sm text-slate-300 mt-1">
                    Dán bất kỳ đoạn thoại nào của anh Việt vào đây. Thuật toán sẽ tự động phân tích ngữ cảnh, bóc tách từng câu, đối soát với 90 clip B-roll và đề xuất bảng phân cảnh chính xác nhất kèm link demo.
                </p>
            </div>

            <!-- PRESET PROMPTS / SCRIPTS -->
            <div class="mt-6">
                <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Hoặc thử nhanh kịch bản mẫu:</label>
                <div class="flex flex-wrap gap-2">
                    <button onclick="loadSampleScript(1)" class="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-purple-600/20 text-slate-300 hover:text-purple-200 border border-slate-700 text-xs transition">
                        🎯 Kịch bản 1: "Thoát Bẫy Quá Tải & Xây Dựng Hệ Thống"
                    </button>
                    <button onclick="loadSampleScript(2)" class="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-purple-600/20 text-slate-300 hover:text-purple-200 border border-slate-700 text-xs transition">
                        ⚡ Kịch bản 2: "Kỷ Luật Sáng Sớm & Năng Lượng Deep Work"
                    </button>
                    <button onclick="loadSampleScript(3)" class="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-purple-600/20 text-slate-300 hover:text-purple-200 border border-slate-700 text-xs transition">
                        🎬 Kịch bản 3: "Bí Quyết Chuyển Cảnh Triệu View Fedu"
                    </button>
                </div>
            </div>

            <!-- TEXT AREA INPUT -->
            <div class="mt-4 space-y-3">
                <textarea id="script-input" rows="6" placeholder="Dán kịch bản thoại của bạn vào đây (ví dụ: Mỗi sáng tôi đều dành 10 phút uống một cốc nước cam tươi. Sau đó mở laptop bắt tay vào viết những dòng note ý tưởng đầu tiên. Đừng để sự chần chừ và mớ tab hỗn loạn cản bước bạn...)"
                          class="w-full bg-slate-900/90 text-white p-4 rounded-xl border border-slate-700 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 text-sm leading-relaxed placeholder-slate-500 font-sans"></textarea>
                
                <div class="flex flex-wrap items-center justify-between gap-3">
                    <div class="text-xs text-slate-400 flex items-center gap-2">
                        <i data-lucide="info" class="w-4 h-4 text-purple-400"></i>
                        Gợi ý: Xuống dòng giữa các câu để AI phân đoạn chính xác nhất theo từng nhịp thở thoại.
                    </div>
                    <div class="flex items-center gap-2">
                        <button onclick="clearScript()" class="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition">
                            Xóa trắng
                        </button>
                        <button onclick="analyzeAndMatchScript()" class="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-purple-500/25 flex items-center gap-2 transition">
                            <i data-lucide="wand-2" class="w-4 h-4"></i> Phân Tích & Ráp B-Roll Ngay
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- MATCHING RESULTS CONTAINER -->
        <div id="script-results-container" class="space-y-4">
            <!-- Rendered by JS after analysis -->
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
                <!-- Card 1 -->
                <div class="p-6 rounded-2xl bg-slate-900/80 border border-blue-500/30 space-y-3">
                    <div class="flex items-center justify-between">
                        <span class="text-2xl">✂️</span>
                        <span class="text-xs px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 font-bold border border-blue-500/30">LOẠI 1</span>
                    </div>
                    <h3 class="text-xl font-bold text-white">1. Cutaway (Insert Shot)</h3>
                    <p class="text-xs text-blue-300 font-semibold">"Nói gì, hình nấy" • Cảnh chèn minh họa trực diện</p>
                    <p class="text-xs text-slate-300 leading-relaxed">
                        Cảnh quay tĩnh hoặc cận cảnh chi tiết vật thể, thao tác ngón tay bấm phím, hoa, cốc nước. Chèn ngay khi nhắc đến từ khóa để giảm tải lượng nhận thức cho vỏ não trước trán.
                    </p>
                    <div class="p-3 rounded-lg bg-blue-950/40 border border-blue-900 text-[11px] text-blue-200">
                        <strong>Tác dụng:</strong> Giảm rủi ro thoát video (Drop-off) 20% trong 3-5 giây đầu tiên.
                    </div>
                </div>

                <!-- Card 2 -->
                <div class="p-6 rounded-2xl bg-slate-900/80 border border-purple-500/30 space-y-3">
                    <div class="flex items-center justify-between">
                        <span class="text-2xl">🎞️</span>
                        <span class="text-xs px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30">LOẠI 2</span>
                    </div>
                    <h3 class="text-xl font-bold text-white">2. Sequence (Montage)</h3>
                    <p class="text-xs text-purple-300 font-semibold">"Băng chuyền hành động" • Chuỗi quy trình liên hoàn</p>
                    <p class="text-xs text-slate-300 leading-relaxed">
                        Nhiều góc máy khác nhau (Rộng - Trung - Cận) nối tiếp nhau nhịp nhàng để miêu tả trọn vẹn một hành động (như vắt nước cam, nén cà phê, nấu mỳ, gõ máy tính).
                    </p>
                    <div class="p-3 rounded-lg bg-purple-950/40 border border-purple-900 text-[11px] text-purple-200">
                        <strong>Tác dụng:</strong> Hiệu ứng ASMR & Dopamine vi phạm kỳ vọng, giữ tỷ lệ xem hết (Completion Rate) vượt 70%.
                    </div>
                </div>

                <!-- Card 3 -->
                <div class="p-6 rounded-2xl bg-slate-900/80 border border-teal-500/30 space-y-3">
                    <div class="flex items-center justify-between">
                        <span class="text-2xl">👁️</span>
                        <span class="text-xs px-2.5 py-1 rounded-full bg-teal-500/20 text-teal-300 font-bold border border-teal-500/30">LOẠI 3</span>
                    </div>
                    <h3 class="text-xl font-bold text-white">3. Góc POV (Point Of View)</h3>
                    <p class="text-xs text-teal-300 font-semibold">"Mượn mắt khán giả" • Góc nhìn thứ nhất</p>
                    <p class="text-xs text-slate-300 leading-relaxed">
                        Máy quay đặt ngang tầm mắt chĩa xuống đôi tay (lái xe, viết sổ, cầm vô lăng). Người xem cảm giác mình chính là người đang trực tiếp hành động.
                    </p>
                    <div class="p-3 rounded-lg bg-teal-950/40 border border-teal-900 text-[11px] text-teal-200">
                        <strong>Tác dụng:</strong> Kích hoạt nơ-ron gương (Mirror Neurons), tăng 40% tỷ lệ chuyển đổi (Conversion Rate).
                    </div>
                </div>

                <!-- Card 4 -->
                <div class="p-6 rounded-2xl bg-slate-900/80 border border-red-500/30 space-y-3">
                    <div class="flex items-center justify-between">
                        <span class="text-2xl">🎬</span>
                        <span class="text-xs px-2.5 py-1 rounded-full bg-red-500/20 text-red-300 font-bold border border-red-500/30">LOẠI 4</span>
                    </div>
                    <h3 class="text-xl font-bold text-white">4. Thoại In-Situ (Walk-and-Talk)</h3>
                    <p class="text-xs text-red-300 font-semibold">"Vừa làm vừa nói" • Thoại hiện trường sống động</p>
                    <p class="text-xs text-slate-300 leading-relaxed">
                        Người nói trực tiếp thực hiện công việc (vừa giảng bài tại FPT, vừa xếp cây, vừa đứng ban công ngắm phố) thỉnh thoảng tương tác ánh mắt với máy quay.
                    </p>
                    <div class="p-3 rounded-lg bg-red-950/40 border border-red-900 text-[11px] text-red-200">
                        <strong>Tác dụng:</strong> Xóa bỏ cảm giác quảng cáo lộ liễu, biến nội dung thành trải nghiệm tự nhiên và nâng tầm Social Proof.
                    </div>
                </div>

                <!-- Card 5 -->
                <div class="p-6 rounded-2xl bg-slate-900/80 border border-indigo-500/30 space-y-3">
                    <div class="flex items-center justify-between">
                        <span class="text-2xl">⚖️</span>
                        <span class="text-xs px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">LOẠI 5</span>
                    </div>
                    <h3 class="text-xl font-bold text-white">5. Dựng Intercut (Docu-Style)</h3>
                    <p class="text-xs text-indigo-300 font-semibold">"Nửa tĩnh, nửa động" • Dựng luân phiên A-roll/B-roll</p>
                    <p class="text-xs text-slate-300 leading-relaxed">
                        Cắt xen kẽ liên tục giữa người nói chính (A-roll tĩnh) và các thao tác kỹ thuật, điều chỉnh đèn studio, phỏng vấn thực địa.
                    </p>
                    <div class="p-3 rounded-lg bg-indigo-950/40 border border-indigo-900 text-[11px] text-indigo-200">
                        <strong>Tác dụng:</strong> Phá vỡ sự đơn điệu của video Talking Head truyền thống, tạo nhịp thở điện ảnh phóng sự.
                    </div>
                </div>

                <!-- Card 6 -->
                <div class="p-6 rounded-2xl bg-slate-900/80 border border-amber-500/30 space-y-3">
                    <div class="flex items-center justify-between">
                        <span class="text-2xl">♟️</span>
                        <span class="text-xs px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">LOẠI 6</span>
                    </div>
                    <h3 class="text-xl font-bold text-white">6. Metaphor (Ẩn Dụ Thị Giác)</h3>
                    <p class="text-xs text-amber-300 font-semibold">"Mượn vật thay lời" • Biểu tượng hóa ý niệm</p>
                    <p class="text-xs text-slate-300 leading-relaxed">
                        Mượn hình ảnh biểu tượng gián tiếp (cà phê nhỏ giọt = thời gian trôi/sự bế tắc; bàn làm việc ngập note = áp lực quá tải não bộ; phóng máy bay = hiện thực hóa ý tưởng).
                    </p>
                    <div class="p-3 rounded-lg bg-amber-950/40 border border-amber-900 text-[11px] text-amber-200">
                        <strong>Tác dụng:</strong> Khắc sâu thông điệp triết lý, neo cảm xúc mạnh mẽ vào tiềm thức người xem.
                    </div>
                </div>

                <!-- Card 7 -->
                <div class="p-6 rounded-2xl bg-slate-900/80 border border-slate-500/30 space-y-3">
                    <div class="flex items-center justify-between">
                        <span class="text-2xl">⏸️</span>
                        <span class="text-xs px-2.5 py-1 rounded-full bg-slate-500/20 text-slate-300 font-bold border border-slate-500/30">LOẠI 7</span>
                    </div>
                    <h3 class="text-xl font-bold text-white">7. Negative Space (Khoảng Lặng)</h3>
                    <p class="text-xs text-slate-300 font-semibold">"Khoảng lặng đắt giá" • Thư giãn thị giác</p>
                    <p class="text-xs text-slate-300 leading-relaxed">
                        Khung hình có nhiều khoảng trống (bầu trời, ban công tĩnh, góc phòng yên ả, uống nước cam thư thái). Không có chuyển động dồn dập.
                    </p>
                    <div class="p-3 rounded-lg bg-slate-950/40 border border-slate-800 text-[11px] text-slate-300">
                        <strong>Tác dụng:</strong> Tạo điểm nghỉ cho não bộ kịp tiêu hóa bài học quan trọng trước khi sang phân đoạn tiếp theo.
                    </div>
                </div>

                <!-- Card 8 -->
                <div class="p-6 rounded-2xl bg-slate-900/80 border border-emerald-500/30 space-y-3">
                    <div class="flex items-center justify-between">
                        <span class="text-2xl">⏳</span>
                        <span class="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">LOẠI 8</span>
                    </div>
                    <h3 class="text-xl font-bold text-white">8. Archival / Timeline (Tư Liệu)</h3>
                    <p class="text-xs text-emerald-300 font-semibold">"Cỗ máy thời gian" • Tư liệu thực chứng</p>
                    <p class="text-xs text-slate-300 leading-relaxed">
                        Màn hình Timeline CapCut/Premiere đang chạy, thao tác kéo layer, tài liệu lịch sử, số liệu thống kê chứng minh cho câu nói.
                    </p>
                    <div class="p-3 rounded-lg bg-emerald-950/40 border border-emerald-900 text-[11px] text-emerald-200">
                        <strong>Tác dụng:</strong> Bằng chứng không thể chối cãi, bảo chứng độ tin cậy tuyệt đối cho phương pháp giảng dạy.
                    </div>
                </div>
            </div>
        </div>
    </main>

    <!-- FOOTER -->
    <footer class="mt-auto border-t border-slate-800/80 py-8 px-4 text-center text-xs text-slate-500 bg-slate-950">
        <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
                © 2026 <strong class="text-slate-300">B-Roll Bank Master</strong> • Phát triển bởi <span class="text-purple-400 font-semibold">Nguyễn Đức Việt (VietMac)</span> & Antigravity.
            </div>
            <div class="flex items-center gap-4">
                <a href="https://vietndj.github.io" class="hover:text-purple-400 transition">vietndj.github.io</a>
                <a href="https://fedu.vn" target="_blank" class="hover:text-purple-400 transition">Fedu.vn</a>
                <a href="https://www.youtube.com/playlist?list=PLPs82ezbs9Lo" target="_blank" class="hover:text-red-400 transition">YouTube Playlist</a>
            </div>
        </div>
    </footer>

    <!-- VIDEO DETAIL DRAWER / MODAL -->
    <div id="video-modal" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-md hidden flex items-center justify-center p-4 sm:p-6 opacity-0 transition-opacity duration-300">
        <div class="glass max-w-4xl w-full max-h-[90vh] rounded-2xl border border-slate-700 flex flex-col overflow-hidden shadow-2xl">
            <!-- Modal Header -->
            <div class="p-4 sm:px-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
                <div class="flex items-center gap-3">
                    <span id="modal-category-badge" class="px-2.5 py-1 rounded-full text-xs font-bold badge-cutaway">Cutaway</span>
                    <h3 id="modal-title" class="text-base sm:text-lg font-bold text-white truncate max-w-md sm:max-w-xl">Tiêu đề B-Roll</h3>
                </div>
                <button onclick="closeModal()" class="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white border border-slate-700 transition">
                    <i data-lucide="x" class="w-4 h-4"></i>
                </button>
            </div>

            <!-- Modal Body -->
            <div class="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
                <!-- Video / Player Container -->
                <div class="bg-black rounded-xl overflow-hidden aspect-video relative flex items-center justify-center border border-slate-800" id="modal-player-container">
                    <!-- Embedded YouTube Player or Thumbnail Preview -->
                </div>

                <!-- Info Grid -->
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div class="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                        <div class="text-slate-400 text-[10px] font-semibold uppercase">Định Dạng</div>
                        <div class="font-bold text-white mt-0.5" id="modal-orientation">Dọc 9:16 (Shorts)</div>
                    </div>
                    <div class="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                        <div class="text-slate-400 text-[10px] font-semibold uppercase">Thời Lượng</div>
                        <div class="font-bold text-white font-mono mt-0.5" id="modal-duration">00:15</div>
                    </div>
                    <div class="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                        <div class="text-slate-400 text-[10px] font-semibold uppercase">Góc Quay</div>
                        <div class="font-bold text-white mt-0.5" id="modal-shot">Close-up (CU)</div>
                    </div>
                    <div class="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                        <div class="text-slate-400 text-[10px] font-semibold uppercase">Bối Cảnh</div>
                        <div class="font-bold text-white mt-0.5 truncate" id="modal-location">Home Studio</div>
                    </div>
                </div>

                <!-- Director's Breakdown Note -->
                <div class="p-4 rounded-xl bg-purple-950/30 border border-purple-900/60 space-y-1.5">
                    <div class="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                        <i data-lucide="clapperboard" class="w-3.5 h-3.5"></i> Lời Khuyên Của Đạo Diễn (Tâm Lý Học Tiếp Nhận)
                    </div>
                    <p class="text-xs text-purple-100/90 leading-relaxed" id="modal-director-note">
                        Mô tả chi tiết cách dùng cảnh này trong kịch bản.
                    </p>
                </div>

                <!-- Dialogue Cues -->
                <div class="space-y-2">
                    <div class="text-xs font-bold text-slate-300 flex items-center justify-between">
                        <span>🎯 Các Câu Thoại Khớp Nhất Trong Kịch Bản:</span>
                        <span class="text-[10px] text-slate-500">Bấm vào câu để sao chép</span>
                    </div>
                    <div class="space-y-1.5" id="modal-dialogue-cues">
                        <!-- Cues items rendered by JS -->
                    </div>
                </div>

                <!-- Technical Details -->
                <div class="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800 text-[11px] text-slate-400 flex flex-wrap items-center justify-between gap-2">
                    <div class="flex items-center gap-2">
                        <i data-lucide="file-video" class="w-3.5 h-3.5 text-slate-500"></i>
                        <span class="font-mono" id="modal-filename">filename.mp4</span>
                    </div>
                    <div id="modal-yt-btn-container">
                        <!-- YouTube link button -->
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- TOAST NOTIFICATION -->
    <div id="toast" class="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl glass border border-purple-500 text-xs font-semibold text-white shadow-2xl transform translate-y-20 opacity-0 transition-all duration-300 flex items-center gap-2">
        <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-400"></i>
        <span id="toast-msg">Đã sao chép!</span>
    </div>

    <!-- DATASET EMBEDDED SAFELY -->
    <script>
        const MASTER_DATA = {json_data_str};
        let currentVideos = MASTER_DATA.videos || [];
        let activeCategory = 'all';
        let currentViewMode = 'grid';
        let selectedVideoId = null;

        // Init
        document.addEventListener('DOMContentLoaded', () => {{
            lucide.createIcons();
            renderVideos(currentVideos);
        }});

        function toggleTheme() {{
            const html = document.documentElement;
            if (html.classList.contains('dark')) {{
                html.classList.remove('dark');
                document.getElementById('theme-icon').setAttribute('data-lucide', 'sun');
            }} else {{
                html.classList.add('dark');
                document.getElementById('theme-icon').setAttribute('data-lucide', 'moon');
            }}
            lucide.createIcons();
        }}

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
            lucide.createIcons();
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
            const sort = document.getElementById('sort-by').value;

            let result = MASTER_DATA.videos.filter(v => {{
                // Category
                if (activeCategory !== 'all' && v.category_id !== activeCategory) return false;
                // Orientation
                if (orient !== 'all' && v.orientation !== orient) return false;
                // Location
                if (loc !== 'all' && !v.location.toLowerCase().includes(loc.toLowerCase())) return false;
                // Shot type
                if (shot !== 'all' && !v.shot_type.toLowerCase().includes(shot.toLowerCase())) return false;
                // Search query
                if (query) {{
                    const fullText = (v.title + ' ' + v.filename + ' ' + v.action + ' ' + v.location + ' ' + v.mood + ' ' + v.director_note + ' ' + v.dialogue_cues.join(' ') + ' ' + v.keywords.join(' ')).toLowerCase();
                    if (!fullText.includes(query)) return false;
                }}
                return true;
            }});

            // Sorting
            if (sort === 'dur_desc') {{
                result.sort((a, b) => b.duration_sec - a.duration_sec);
            }} else if (sort === 'dur_asc') {{
                result.sort((a, b) => a.duration_sec - b.duration_sec);
            }} else if (sort === 'title_asc') {{
                result.sort((a, b) => a.title.localeCompare(b.title));
            }} else {{
                result.sort((a, b) => a.id - b.id);
            }}

            currentVideos = result;
            document.getElementById('filtered-count').innerText = result.length;

            const empty = document.getElementById('empty-state');
            const grid = document.getElementById('video-grid');

            if (result.length === 0) {{
                grid.innerHTML = '';
                empty.classList.remove('hidden');
            }} else {{
                empty.classList.add('hidden');
                renderVideos(result);
            }}
        }}

        function resetAllFilters() {{
            document.getElementById('search-input').value = '';
            document.getElementById('clear-search-btn').classList.add('hidden');
            document.getElementById('filter-orientation').value = 'all';
            document.getElementById('filter-location').value = 'all';
            document.getElementById('filter-shot').value = 'all';
            document.getElementById('sort-by').value = 'id_asc';
            filterCategory('all');
        }}

        function setViewMode(mode) {{
            currentViewMode = mode;
            const gridBtn = document.getElementById('view-grid-btn');
            const listBtn = document.getElementById('view-list-btn');

            if (mode === 'grid') {{
                gridBtn.className = 'p-1.5 rounded-lg bg-purple-600/30 text-purple-300 border border-purple-500/40';
                listBtn.className = 'p-1.5 rounded-lg bg-slate-800 text-slate-400 border border-slate-700 hover:text-white';
                document.getElementById('video-grid').className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5';
            }} else {{
                listBtn.className = 'p-1.5 rounded-lg bg-purple-600/30 text-purple-300 border border-purple-500/40';
                gridBtn.className = 'p-1.5 rounded-lg bg-slate-800 text-slate-400 border border-slate-700 hover:text-white';
                document.getElementById('video-grid').className = 'grid grid-cols-1 gap-3';
            }}
            renderVideos(currentVideos);
        }}

        function renderVideos(list) {{
            const container = document.getElementById('video-grid');
            if (currentViewMode === 'list') {{
                container.innerHTML = list.map(v => `
                    <div class="glass-card p-3 rounded-xl flex items-center justify-between gap-4 cursor-pointer hover:border-purple-500" onclick="openModal(${{v.id}})">
                        <div class="flex items-center gap-3 min-w-0">
                            <div class="w-16 h-12 bg-slate-900 rounded-lg overflow-hidden shrink-0 relative">
                                <img src="broll_thumbnails/${{v.thumbnail}}" alt="${{v.title}}" class="w-full h-full object-cover" onerror="this.src='https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=300'">
                                <span class="absolute bottom-0.5 right-0.5 bg-black/80 text-[9px] font-mono text-white px-1 rounded">${{v.duration}}</span>
                            </div>
                            <div class="min-w-0">
                                <div class="flex items-center gap-2">
                                    <span class="text-xs font-bold text-white truncate">${{v.title}}</span>
                                    <span class="text-[10px] px-2 py-0.5 rounded-full badge-${{v.category_id}} font-semibold shrink-0">${{v.category_badge}}</span>
                                </div>
                                <div class="text-[11px] text-slate-400 truncate mt-0.5">
                                    ${{v.shot_type}} • ${{v.location}} • ${{v.orientation === 'vertical' ? '📱 9:16' : '🖥️ 16:9'}}
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center gap-2 shrink-0">
                            ${{v.video_id ? `<span class="text-[10px] text-red-400 bg-red-950/40 px-2 py-0.5 rounded border border-red-900/60 font-semibold">YouTube</span>` : ''}}
                            <button class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-purple-600 text-xs text-white font-semibold transition">Chi tiết</button>
                        </div>
                    </div>
                `).join('');
            }} else {{
                container.innerHTML = list.map(v => `
                    <div class="glass-card rounded-2xl overflow-hidden flex flex-col group cursor-pointer" onclick="openModal(${{v.id}})">
                        <!-- Thumbnail Box -->
                        <div class="relative aspect-video bg-slate-900 overflow-hidden">
                            <img src="broll_thumbnails/${{v.thumbnail}}" alt="${{v.title}}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" onerror="this.src='https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400'">
                            
                            <!-- Badges overlay -->
                            <div class="absolute top-2 left-2 flex items-center gap-1.5">
                                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-lg badge-${{v.category_id}}">
                                    ${{v.category_icon}} ${{v.category_badge}}
                                </span>
                            </div>

                            <div class="absolute top-2 right-2 flex items-center gap-1">
                                <span class="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-sm text-[10px] font-bold text-white border border-white/10">
                                    ${{v.orientation === 'vertical' ? '📱 9:16' : '🖥️ 16:9'}}
                                </span>
                            </div>

                            <!-- Duration & YT Tag -->
                            <div class="absolute bottom-2 right-2 flex items-center gap-1.5">
                                ${{v.video_id ? `<span class="px-1.5 py-0.5 rounded bg-red-600 text-[10px] font-bold text-white flex items-center gap-0.5"><i data-lucide="play" class="w-2.5 h-2.5 fill-current"></i> YT</span>` : ''}}
                                <span class="px-2 py-0.5 rounded bg-black/80 font-mono text-[11px] font-bold text-white">
                                    ${{v.duration}}
                                </span>
                            </div>

                            <!-- Hover Play Overlay -->
                            <div class="absolute inset-0 bg-purple-900/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                                <div class="w-10 h-10 rounded-full bg-white/90 text-purple-950 flex items-center justify-center shadow-xl transform scale-75 group-hover:scale-100 transition">
                                    <i data-lucide="play" class="w-5 h-5 fill-current ml-0.5"></i>
                                </div>
                            </div>
                        </div>

                        <!-- Card Body -->
                        <div class="p-4 flex-1 flex flex-col justify-between space-y-3">
                            <div>
                                <div class="text-[11px] text-slate-400 flex items-center justify-between">
                                    <span>${{v.shot_type}}</span>
                                    <span class="truncate max-w-[120px]">${{v.location}}</span>
                                </div>
                                <h3 class="text-sm font-bold text-white mt-1 line-clamp-1 group-hover:text-purple-300 transition">
                                    ${{v.title}}
                                </h3>
                                <p class="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                                    ${{v.director_note}}
                                </p>
                            </div>

                            <!-- Dialogue Sample Cue -->
                            <div class="pt-2 border-t border-slate-800/80">
                                <div class="text-[10px] text-slate-500 font-semibold uppercase">Mẫu câu thoại:</div>
                                <p class="text-[11px] text-purple-300/90 italic truncate mt-0.5">
                                    "${{v.dialogue_cues[0] || 'Phù hợp làm cảnh chuyển tiếp...'}}"
                                </p>
                            </div>
                        </div>
                    </div>
                `).join('');
            }}
            lucide.createIcons();
        }}

        function openModal(id) {{
            const v = MASTER_DATA.videos.find(x => x.id === id);
            if (!v) return;
            selectedVideoId = id;

            document.getElementById('modal-title').innerText = v.title;
            const badge = document.getElementById('modal-category-badge');
            badge.className = `px-2.5 py-1 rounded-full text-xs font-bold badge-${{v.category_id}}`;
            badge.innerHTML = `${{v.category_icon}} ${{v.category_name}}`;

            document.getElementById('modal-orientation').innerText = v.orientation === 'vertical' ? '📱 Dọc 9:16 (Shorts/Reel)' : '🖥️ Ngang 16:9 (Cinematic 4K)';
            document.getElementById('modal-duration').innerText = `${{v.duration}} (${{v.duration_sec}}s)`;
            document.getElementById('modal-shot').innerText = v.shot_type;
            document.getElementById('modal-location').innerText = v.location;
            document.getElementById('modal-director-note').innerText = v.director_note;
            document.getElementById('modal-filename').innerText = v.filename;

            // Player Setup
            const playerBox = document.getElementById('modal-player-container');
            if (v.video_id) {{
                playerBox.innerHTML = `
                    <iframe src="https://www.youtube.com/embed/${{v.video_id}}?autoplay=1&rel=0" 
                            title="${{v.title}}" 
                            class="w-full h-full" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen></iframe>
                `;
            }} else {{
                playerBox.innerHTML = `
                    <div class="relative w-full h-full flex flex-col items-center justify-center bg-slate-950 p-6 text-center">
                        <img src="broll_thumbnails/${{v.thumbnail}}" class="absolute inset-0 w-full h-full object-cover opacity-30 blur-sm">
                        <div class="relative z-10 space-y-2">
                            <i data-lucide="video" class="w-10 h-10 text-purple-400 mx-auto animate-bounce"></i>
                            <h4 class="text-sm font-bold text-white">Video Cục Bộ Sẵn Sàng Sản Xuất</h4>
                            <p class="text-xs text-slate-300 font-mono">/Users/vietmac/Documents/BROLL BANK/${{v.filename}}</p>
                            <span class="inline-block px-3 py-1 rounded-full bg-purple-600/30 text-purple-300 text-[11px] font-semibold border border-purple-500/40">Độ phân giải: ${{v.resolution}} • ${{v.size_mb}} MB</span>
                        </div>
                    </div>
                `;
            }}

            // YouTube button
            const ytBox = document.getElementById('modal-yt-btn-container');
            if (v.video_id) {{
                ytBox.innerHTML = `
                    <a href="https://www.youtube.com/watch?v=${{v.video_id}}" target="_blank" class="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-red-600/20 text-red-300 border border-red-500/40 hover:bg-red-600 text-xs font-semibold hover:text-white transition">
                        <i data-lucide="external-link" class="w-3 h-3"></i> Mở trên YouTube
                    </a>
                `;
            }} else {{
                ytBox.innerHTML = `
                    <span class="text-[11px] text-slate-500 italic">Đang đồng bộ YouTube</span>
                `;
            }}

            // Dialogue Cues
            const cuesBox = document.getElementById('modal-dialogue-cues');
            cuesBox.innerHTML = v.dialogue_cues.map(c => `
                <div onclick="copyText('${{c.replace(/'/g, "\\\\'")}}')" class="p-2.5 rounded-lg bg-slate-900/80 hover:bg-purple-950/40 border border-slate-800 hover:border-purple-500/50 cursor-pointer text-xs text-slate-200 flex items-center justify-between gap-2 group transition">
                    <span class="italic">"${{c}}"</span>
                    <i data-lucide="copy" class="w-3.5 h-3.5 text-slate-500 group-hover:text-purple-300 shrink-0"></i>
                </div>
            `).join('');

            const modal = document.getElementById('video-modal');
            modal.classList.remove('hidden');
            setTimeout(() => {{
                modal.classList.remove('opacity-0');
            }}, 10);
            lucide.createIcons();
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
            navigator.clipboard.writeText(txt).then(() => {{
                showToast('Đã sao chép câu thoại vào Clipboard!');
            }});
        }}

        function showToast(msg) {{
            const toast = document.getElementById('toast');
            document.getElementById('toast-msg').innerText = msg;
            toast.classList.remove('translate-y-20', 'opacity-0');
            setTimeout(() => {{
                toast.classList.add('translate-y-20', 'opacity-0');
            }}, 2500);
        }}

        // SCRIPT MATCHER ALGORITHM
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
                showToast('Vui lòng dán nội dung kịch bản thoại vào ô nhập!');
                return;
            }}

            // Split into sentences / paragraphs
            const rawLines = text.split(/\\n+|(?<=[.!?])\\s+/).map(l => l.trim()).filter(l => l.length > 5);
            if (rawLines.length === 0) return;

            const resultsContainer = document.getElementById('script-results-container');
            
            const matchedStoryboard = rawLines.map((line, lineIdx) => {{
                const lineLower = line.toLowerCase();
                
                // Score all 90 videos against this line
                let bestMatch = null;
                let maxScore = -1;

                MASTER_DATA.videos.forEach(v => {{
                    let score = 0;
                    // keyword hits
                    v.keywords.forEach(kw => {{
                        if (lineLower.includes(kw.toLowerCase())) score += 5;
                    }});
                    // dialogue cue hits
                    v.dialogue_cues.forEach(cue => {{
                        const words = cue.toLowerCase().split(/\\s+/);
                        words.forEach(w => {{
                            if (w.length > 3 && lineLower.includes(w)) score += 2;
                        }});
                    }});
                    // category specific heuristics
                    if ((lineLower.includes('ban công') || lineLower.includes('dừng lại') || lineLower.includes('khoảng lặng')) && v.category_id === 'negative_space') score += 10;
                    if ((lineLower.includes('nước cam') || lineLower.includes('thái cam') || lineLower.includes('vắt cam')) && v.keywords.includes('nước cam')) score += 12;
                    if ((lineLower.includes('cà phê') || lineLower.includes('nhỏ giọt') || lineLower.includes('thời gian')) && v.keywords.includes('cà phê')) score += 12;
                    if ((lineLower.includes('gõ phím') || lineLower.includes('laptop') || lineLower.includes('deep work') || lineLower.includes('mã')) && v.keywords.includes('gõ phím')) score += 10;
                    if ((lineLower.includes('sổ') || lineLower.includes('viết') || lineLower.includes('ghi chép')) && v.keywords.includes('viết sổ')) score += 10;
                    if ((lineLower.includes('fpt') || lineLower.includes('sinh viên') || lineLower.includes('đứng lớp')) && v.keywords.includes('fpt')) score += 12;
                    if ((lineLower.includes('phím b') || lineLower.includes('chuyển cảnh') || lineLower.includes('timeline') || lineLower.includes('dựng')) && v.keywords.includes('chuyển cảnh')) score += 12;
                    if ((lineLower.includes('tập') || lineLower.includes('lái xe') || lineLower.includes('gym')) && v.keywords.includes('tập gym')) score += 12;
                    if ((lineLower.includes('quá tải') || lineLower.includes('nhiễu loạn') || lineLower.includes('stress') || lineLower.includes('bế tắc')) && v.keywords.includes('quá tải')) score += 12;

                    if (score > maxScore) {{
                        maxScore = score;
                        bestMatch = v;
                    }}
                }});

                // fallback default if no specific keywords matched
                if (!bestMatch || maxScore <= 0) {{
                    const fallbackCategories = ['cutaway', 'sequence', 'in_situ', 'metaphor'];
                    const chosenCat = fallbackCategories[lineIdx % fallbackCategories.length];
                    bestMatch = MASTER_DATA.videos.find(v => v.category_id === chosenCat) || MASTER_DATA.videos[0];
                }}

                return {{
                    beatIndex: lineIdx + 1,
                    sentence: line,
                    video: bestMatch,
                    score: maxScore
                }};
            }});

            // Render Storyboard breakdown
            resultsContainer.innerHTML = `
                <div class="glass p-6 rounded-2xl border border-slate-800 space-y-6">
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                        <div>
                            <div class="text-xs font-bold text-emerald-400 uppercase tracking-wider">Kết Quả Phân Tích Kịch Bản</div>
                            <h3 class="text-xl font-black text-white mt-0.5">Bảng Phân Cảnh B-Roll Chi Tiết (${{matchedStoryboard.length}} Beats)</h3>
                        </div>
                        <div class="flex items-center gap-2">
                            <button onclick="copyStoryboardShotlist()" class="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-purple-500/20 transition">
                                <i data-lucide="copy" class="w-3.5 h-3.5"></i> Sao Chép Shotlist Dựng Phim
                            </button>
                        </div>
                    </div>

                    <div class="space-y-4">
                        ${{matchedStoryboard.map(item => `
                            <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-purple-500/40 transition flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                <div class="flex items-start gap-3.5 flex-1 min-w-0">
                                    <div class="w-8 h-8 rounded-full bg-purple-600/30 border border-purple-500/50 text-purple-300 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5 font-mono">
                                        ${{item.beatIndex}}
                                    </div>
                                    <div class="space-y-1 min-w-0">
                                        <div class="text-sm font-semibold text-white">
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

                                <!-- Recommended Video Thumbnail / Demo Button -->
                                <div class="flex items-center gap-3 shrink-0 self-end md:self-center">
                                    <div class="w-24 h-16 bg-slate-950 rounded-lg overflow-hidden relative cursor-pointer group" onclick="openModal(${{item.video.id}})">
                                        <img src="broll_thumbnails/${{item.video.thumbnail}}" class="w-full h-full object-cover group-hover:scale-110 transition" onerror="this.src='https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=200'">
                                        <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                                            <i data-lucide="play" class="w-4 h-4 text-white fill-current"></i>
                                        </div>
                                        <span class="absolute bottom-1 right-1 bg-black/80 text-[8px] font-mono text-white px-1 rounded">${{item.video.duration}}</span>
                                    </div>
                                    <button onclick="openModal(${{item.video.id}})" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-purple-600 text-xs font-semibold text-white transition">
                                        Xem Demo
                                    </button>
                                </div>
                            </div>
                        `).join('')}}
                    </div>
                </div>
            `;
            window.latestStoryboard = matchedStoryboard;
            lucide.createIcons();
        }}

        function copyStoryboardShotlist() {{
            if (!window.latestStoryboard) return;
            const text = window.latestStoryboard.map(b => 
                `BEAT ${{b.beatIndex}}: "${{b.sentence}}"\n  -> B-ROLL: [${{b.video.category_name}}] ${{b.video.title}}\n  -> FILE: ${{b.video.filename}} (${{b.video.duration}})\n  -> GÓC MÁY: ${{b.video.shot_type}} | BỐI CẢNH: ${{b.video.location}}\n  -> LINK DEMO: ${{b.video.video_id ? 'https://www.youtube.com/watch?v=' + b.video.video_id : 'Cục bộ'}}\n`
            ).join('\n');

            navigator.clipboard.writeText(text).then(() => {{
                showToast('Đã sao chép toàn bộ Shotlist phân cảnh B-Roll!');
            }});
        }}
    </script>
</body>
</html>
'''

with open(HTML_OUT, 'w', encoding='utf-8') as f:
    f.write(html_content)

print(f"Successfully generated {HTML_OUT} ({len(html_content)} bytes)")
