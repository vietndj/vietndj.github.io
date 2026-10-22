// hub.js - Tự động render shell (menu, topbar, hệ sinh thái, studio modal & copy command) cho videoai.fedu.vn
document.addEventListener('DOMContentLoaded', () => {
    const pageId = document.body.getAttribute('data-page');
    if (!window.HUB || !window.HUB.pages) return;
    const page = window.HUB.pages.find(p => p.id === pageId);
    if (!page) return;
    
    // Determine relative path depth
    const depth = page.file.split('/').length - 1;
    const rel = '../'.repeat(depth);
    const homeUrl = (window.location.protocol === 'file:') ? `${rel}index.html` : '/';
    
    // Build topbar stepper
    const flowPages = window.HUB.pages.filter(p => p.group === 'flow' && !p.parent);
    const stepperHtml = flowPages.map(p => {
        const isActive = (p.id === pageId) || (page.parent === p.id);
        return `
            <a href="${rel}${p.file}" class="${isActive ? 'on' : ''}" title="${p.title}">
                <span class="n">${p.n}</span>
                <span class="t">${p.short}</span>
            </a>
        `;
    }).join('');

    // Build sidebar menu
    let menuHtml = '';
    for (const g of window.HUB.groups) {
        menuHtml += `<h6>${g.title}</h6>`;
        const gPages = window.HUB.pages.filter(p => p.group === g.id && !p.hiddenFromMenu);
        menuHtml += gPages.map(p => {
            const isSub = !!p.parent || !!p.sub;
            const isOn = (p.id === pageId) || (page.activeMenuId === p.id);
            return `
                <a href="${rel}${p.file}" class="pg ${isSub ? 'pg-sub' : ''} ${isOn ? 'on' : ''}">
                    <span class="n">${p.icon || p.n}</span>
                    <span class="t">${p.title}</span>
                </a>
            `;
        }).join('');
    }

    // Lấy nội dung gốc
    const mainEl = document.querySelector('.main');
    const tmp = document.createElement('div');
    if (mainEl) {
        const contentEl = mainEl.querySelector('.content');
        if (contentEl) {
            let combinedHtml = contentEl.innerHTML;
            let sibling = contentEl.nextElementSibling;
            while (sibling) {
                combinedHtml += sibling.outerHTML;
                sibling = sibling.nextElementSibling;
            }
            tmp.innerHTML = combinedHtml;
        } else {
            tmp.innerHTML = mainEl.innerHTML;
        }
    }
    tmp.querySelectorAll('p:empty').forEach(n => n.remove());
    let h1 = tmp.querySelector('h1');
    let titleText = h1 ? h1.textContent.trim() : page.title;
    titleText = titleText.charAt(0).toLocaleUpperCase('vi') + titleText.slice(1);
    if (h1) {
        const hero = h1.closest('.hero');
        const heroOnlyTitle = hero && hero.children.length === 1;
        (heroOnlyTitle ? hero : h1).remove();
    }

    // Wrap tables in responsive container
    tmp.querySelectorAll('table').forEach(t => {
        if (!t.closest('.tw') && !t.closest('.matrix-wrap')) {
            const w = document.createElement('div');
            w.className = 'tw';
            t.replaceWith(w);
            w.appendChild(t);
        }
    });

    // Mục lục "Trên trang này" cho cột phải: gán id cho h2/h3
    const heads = [...tmp.querySelectorAll('h2')];
    heads.forEach((h, i) => { if (!h.id) h.id = 'sec-' + (i + 1); });
    const tocHtml = heads.length > 1
        ? `<h6>Trên trang này</h6><nav class="otp">${heads.map(h => `<a href="#${h.id}">${h.textContent.trim()}</a>`).join('')}</nav>`
        : '';

    // Pager
    const navPages = window.HUB.pages.filter(p => !p.hiddenFromMenu);
    const curNavId = page.hiddenFromMenu ? (page.activeMenuId || page.parent || pageId) : pageId;
    const curIdx = navPages.findIndex(p => p.id === curNavId);
    let pagerHtml = '<nav class="pager" aria-label="Chuyển trang">';
    if (curIdx > 0) {
        const prev = navPages[curIdx - 1];
        pagerHtml += `<a href="${rel}${prev.file}" class="pv"><small>← Trang trước</small><b>${prev.title}</b></a>`;
    } else { pagerHtml += `<span></span>`; }
    if (curIdx >= 0 && curIdx < navPages.length - 1) {
        const nx = navPages[curIdx + 1];
        pagerHtml += `<a href="${rel}${nx.file}" class="nx"><small>Trang tiếp →</small><b>${nx.title}</b></a>`;
    } else { pagerHtml += `<span></span>`; }
    pagerHtml += '</nav>';

    // Topbar & Shell injection
    document.body.innerHTML = `
        <div class="topbar">
            <a href="${homeUrl}" class="brand" title="Trang chủ AI Video Edit (videoai.fedu.vn)">
                <div class="logo">AI</div>
                <div class="t">Video<small>AI Video Edit</small></div>
            </a>
            <div class="stepper">${stepperHtml}</div>
            
            <div class="hub-crosslinks" style="display:flex;align-items:center;gap:6px;flex-shrink:0;">
                <a href="https://kenh.fedu.vn" target="_blank" rel="noopener noreferrer" class="ecosystem-btn" style="text-decoration:none;" title="Chuyển sang Trung Tâm Logic Xây Kênh">
                    <span>kenh.fedu.vn</span><span style="font-size:10px;color:var(--mute)">↗</span>
                </a>
                <a href="https://mfx.fedu.vn" target="_blank" rel="noopener noreferrer" class="ecosystem-btn" style="text-decoration:none;" title="Chuyển sang MFX Motion Studio">
                    <span>mfx.fedu.vn</span><span style="font-size:10px;color:var(--mute)">↗</span>
                </a>
            </div>

            <div class="ecosystem-wrap" style="flex-shrink:0!important;">
                <button type="button" class="ecosystem-btn" id="eco-btn" style="white-space:nowrap!important;flex-shrink:0!important;" aria-haspopup="true" aria-expanded="false" title="Khám phá 14 nền tảng FEDU">
                    <span class="eco-btn-text-full">Hệ sinh thái FEDU</span><span class="eco-btn-text-short">🌐 FEDU</span>
                    <span class="eco-caret">▾</span>
                </button>
                <div class="ecosystem-menu" id="eco-menu" style="display:none;">
                    <div class="eco-header">
                        <div>
                            <div class="eco-title">Hệ Sinh Thái FEDU</div>
                            <div class="eco-sub">14 Nền tảng Đào tạo · Sáng tạo · Vận hành · Kênh</div>
                        </div>
                        <span class="eco-tag">FD ECOSYSTEM</span>
                    </div>
                    <div class="eco-grid">
                        <div class="eco-group">
                            <div class="eco-gh">🎓 ĐÀO TẠO</div>
                            <a href="https://offline.fedu.vn" target="_blank" rel="noopener noreferrer" class="eco-item">
                                <span class="eco-name">Offline Thực Chiến</span>
                                <span class="eco-desc">offline.fedu.vn · Huấn luyện trực tiếp</span>
                            </a>
                            <a href="https://k3.fedu.vn" target="_blank" rel="noopener noreferrer" class="eco-item">
                                <span class="eco-name">Giáo Trình K3</span>
                                <span class="eco-desc">k3.fedu.vn · Giáo trình video thực chiến</span>
                            </a>
                            <a href="https://video.fedu.vn" target="_blank" rel="noopener noreferrer" class="eco-item">
                                <span class="eco-name">Online CapCut</span>
                                <span class="eco-desc">video.fedu.vn · Làm chủ dựng video</span>
                            </a>
                            <a href="https://30ngayviral.fedu.vn" target="_blank" rel="noopener noreferrer" class="eco-item">
                                <span class="eco-name">30 Ngày Viral</span>
                                <span class="eco-desc">30ngayviral.fedu.vn · Kỷ luật xây kênh</span>
                            </a>
                            <a href="https://ai.fedu.vn" target="_blank" rel="noopener noreferrer" class="eco-item">
                                <span class="eco-name">AI Sáng Tạo</span>
                                <span class="eco-desc">ai.fedu.vn · Đòn bẩy AI &amp; Tự động hoá</span>
                            </a>
                        </div>

                        <div class="eco-group">
                            <div class="eco-gh">⚡ SÁNG TẠO &amp; STUDIO</div>
                            <a href="https://videoai.fedu.vn" target="_blank" rel="noopener noreferrer" class="eco-item">
                                <span class="eco-name">AI Video Edit</span>
                                <span class="eco-desc">videoai.fedu.vn · Trung tâm dựng video AI</span>
                            </a>
                            <a href="https://mfx.fedu.vn" target="_blank" rel="noopener noreferrer" class="eco-item">
                                <span class="eco-name">MFX Studio 60fps</span>
                                <span class="eco-desc">mfx.fedu.vn · Kho Motion Graphic</span>
                            </a>
                            <a href="https://brollbank.fedu.vn" target="_blank" rel="noopener noreferrer" class="eco-item">
                                <span class="eco-name">Kho B-Roll Bank</span>
                                <span class="eco-desc">brollbank.fedu.vn · Footage bản quyền</span>
                            </a>
                            <a href="https://nhac.fedu.vn" target="_blank" rel="noopener noreferrer" class="eco-item">
                                <span class="eco-name">Kho Nhạc &amp; SFX</span>
                                <span class="eco-desc">nhac.fedu.vn · Âm thanh &amp; Nhịp dựng</span>
                            </a>
                            <a href="https://ytuong.fedu.vn" target="_blank" rel="noopener noreferrer" class="eco-item">
                                <span class="eco-name">Kho Ý Tưởng</span>
                                <span class="eco-desc">ytuong.fedu.vn · Hook &amp; Kịch bản</span>
                            </a>
                        </div>

                        <div class="eco-group">
                            <div class="eco-gh">⚙️ VẬN HÀNH</div>
                            <a href="https://led.fedu.vn" target="_blank" rel="noopener noreferrer" class="eco-item">
                                <span class="eco-name">Lead Center</span>
                                <span class="eco-desc">led.fedu.vn · Quản trị chuyển đổi lead</span>
                            </a>
                            <a href="https://stu.fedu.vn" target="_blank" rel="noopener noreferrer" class="eco-item">
                                <div class="eco-name-row">
                                    <span class="eco-name">Student Hub</span>
                                    <span class="eco-badge">PIN LOCK</span>
                                </div>
                                <span class="eco-desc">stu.fedu.vn · Dữ liệu học viên</span>
                            </a>
                        </div>

                        <div class="eco-group">
                            <div class="eco-gh">🌐 KÊNH &amp; AGENCY</div>
                            <a href="https://kenh.fedu.vn" target="_blank" rel="noopener noreferrer" class="eco-item">
                                <span class="eco-name">Trung Tâm Kênh</span>
                                <span class="eco-desc">kenh.fedu.vn · Hub Logic xây kênh</span>
                            </a>
                            <a href="https://fedu.vn" target="_blank" rel="noopener noreferrer" class="eco-item">
                                <span class="eco-name">FEDU Agency</span>
                                <span class="eco-desc">fedu.vn · Giải pháp video &amp; Kênh</span>
                            </a>
                            <a href="https://vietndj.github.io" target="_blank" rel="noopener noreferrer" class="eco-item">
                                <span class="eco-name">Profile Thầy Việt</span>
                                <span class="eco-desc">vietndj.github.io · Triết lý &amp; Kết nối</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="searchbtn">TÌM KIẾM <kbd>⌘K</kbd></div>
            <div class="menubtn">☰</div>
        </div>
        <div class="shell">
            <aside class="side">
                <div class="mh">
                    <b>${window.HUB.name}</b>
                    <p>${window.HUB.sub}</p>
                </div>
                ${menuHtml}
            </aside>
            <main class="main${tocHtml ? '' : ' wide'}" style="--stage:var(--c-${page.stage})">
                <article class="content">
                    <div class="kicker">${page.q}</div>
                    <h1 class="title">${titleText}</h1>
                    ${tmp.innerHTML}
                    ${pagerHtml}
                </article>
                ${tocHtml ? `<aside class="rail">${tocHtml}</aside>` : ''}
            </main>
        </div>

        <!-- Studio Interactive Modal Container -->
        <div class="studio-modal-backdrop" id="studio-modal-backdrop">
            <div class="studio-modal">
                <div class="studio-modal-header">
                    <div class="studio-modal-title" id="studio-modal-title">🎛️ Phòng Studio Tương Tác</div>
                    <div class="studio-modal-actions">
                        <a href="#" target="_blank" id="studio-open-tab-btn" class="studio-modal-btn">Mở tab mới ↗</a>
                        <button type="button" id="studio-close-modal-btn" class="studio-modal-btn close-btn">✕ Đóng</button>
                    </div>
                </div>
                <iframe id="studio-modal-iframe" class="studio-modal-iframe" src="about:blank"></iframe>
            </div>
        </div>
    `;

    // Re-execute scripts in content
    document.querySelectorAll('.content script').forEach(oldScript => {
        const newScript = document.createElement('script');
        Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
        newScript.textContent = oldScript.textContent;
        oldScript.parentNode.replaceChild(newScript, oldScript);
    });

    // --- 1. Xử lý nút Menu Drawer trên Mobile ---
    const menuBtn = document.querySelector('.menubtn');
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            document.body.classList.toggle('navopen');
        });
    }

    // --- 2. Xử lý Dropdown Hệ sinh thái FEDU ---
    const ecoBtn = document.getElementById('eco-btn');
    const ecoMenu = document.getElementById('eco-menu');
    let ecoBackdrop = null;

    function closeEcoMenu() {
        if (!ecoMenu) return;
        ecoMenu.style.display = 'none';
        if (ecoBtn) {
            ecoBtn.classList.remove('active');
            ecoBtn.setAttribute('aria-expanded', 'false');
        }
        if (ecoBackdrop) {
            ecoBackdrop.remove();
            ecoBackdrop = null;
        }
    }

    function openEcoMenu() {
        if (!ecoMenu) return;
        if (typeof modal !== 'undefined' && modal && modal.style.display !== 'none') {
            modal.style.display = 'none';
        }
        ecoMenu.style.display = 'block';
        if (ecoBtn) {
            ecoBtn.classList.add('active');
            ecoBtn.setAttribute('aria-expanded', 'true');
        }
        if (!ecoBackdrop) {
            ecoBackdrop = document.createElement('div');
            ecoBackdrop.className = 'eco-backdrop';
            ecoBackdrop.addEventListener('click', closeEcoMenu);
            document.body.appendChild(ecoBackdrop);
        }
    }

    if (ecoBtn && ecoMenu) {
        ecoBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (ecoMenu.style.display !== 'none') {
                closeEcoMenu();
            } else {
                openEcoMenu();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && ecoMenu.style.display !== 'none') {
                closeEcoMenu();
            }
        });
    }

    // --- 3. Bổ sung Logic tìm kiếm CMD+K và Modal ---
    const searchBtn = document.querySelector('.searchbtn');
    const modalHtml = `
        <div class="sm" id="search-modal" style="display:none; position:fixed; top:0; left:0; right:0; bottom:0; background:rgba(0,0,0,0.5); z-index:9999; align-items:flex-start; justify-content:center; padding-top:10vh;">
            <div style="background:#fff; width:90%; max-width:600px; border-radius:8px; box-shadow:0 10px 25px rgba(0,0,0,0.2); overflow:hidden; display:flex; flex-direction:column;">
                <input type="text" id="sm-input" placeholder="Tìm kiếm bước dựng, câu lệnh mẫu, studio..." style="width:100%; border:none; padding:15px; font-size:16px; outline:none; border-bottom:1px solid #eee;">
                <div id="sm-results" style="max-height:60vh; overflow-y:auto; padding:10px;"></div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    const modal = document.getElementById('search-modal');
    const smInput = document.getElementById('sm-input');
    const smResults = document.getElementById('sm-results');
    
    let activeIndex = -1;
    let resultsData = [];
    
    function toggleModal() {
        if (modal.style.display === 'none') {
            closeEcoMenu();
            modal.style.display = 'flex';
            smInput.value = '';
            smResults.innerHTML = '';
            smInput.focus();
            activeIndex = -1;
            resultsData = [];
        } else {
            modal.style.display = 'none';
        }
    }
    
    if (searchBtn) searchBtn.addEventListener('click', toggleModal);
    
    document.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            toggleModal();
        }
        if (e.key === 'Escape' && modal.style.display !== 'none') {
            toggleModal();
        }
    });

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) toggleModal();
        });
    }

    if (smInput) {
        smInput.addEventListener('input', () => {
            const val = smInput.value.toLowerCase().trim();
            if (!val) {
                smResults.innerHTML = '';
                return;
            }
            resultsData = window.HUB.pages.filter(p => 
                (p.title && p.title.toLowerCase().includes(val)) ||
                (p.short && p.short.toLowerCase().includes(val)) ||
                (p.q && p.q.toLowerCase().includes(val))
            );
            if (resultsData.length === 0) {
                smResults.innerHTML = '<div style="padding:10px; color:#999; font-size:14px;">Không tìm thấy kết quả phù hợp</div>';
                return;
            }
            smResults.innerHTML = resultsData.map((p, idx) => `
                <a href="${rel}${p.file}" class="sm-item" style="display:flex; align-items:center; gap:10px; padding:10px 12px; text-decoration:none; color:#141413; border-radius:6px; margin-bottom:4px; font-size:14px;">
                    <span>${p.icon || '📄'}</span>
                    <div>
                        <div style="font-weight:600;">${p.title}</div>
                        <div style="font-size:12px; color:#64748b;">${p.q}</div>
                    </div>
                </a>
            `).join('');
        });
    }

    // --- 4. TÍNH NĂNG SAO CHÉP CÂU LỆNH MẪU (.copy-cmd-btn) ---
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.copy-cmd-btn');
        if (!btn) return;
        const box = btn.closest('.cmd-box');
        if (!box) return;
        const codeEl = box.querySelector('pre code') || box.querySelector('pre');
        if (!codeEl) return;
        
        const rawText = codeEl.innerText || codeEl.textContent;
        navigator.clipboard.writeText(rawText.trim()).then(() => {
            const originText = btn.innerHTML;
            btn.classList.add('copied');
            btn.innerHTML = '✓ Đã chép!';
            setTimeout(() => {
                btn.classList.remove('copied');
                btn.innerHTML = originText;
            }, 2000);
        }).catch(err => {
            console.error('Không thể copy:', err);
        });
    });

    // --- 5. TÍNH NĂNG STUDIO MODAL TƯƠNG TÁC (window.openStudioModal) ---
    const studioBackdrop = document.getElementById('studio-modal-backdrop');
    const studioIframe = document.getElementById('studio-modal-iframe');
    const studioTitle = document.getElementById('studio-modal-title');
    const studioOpenTabBtn = document.getElementById('studio-open-tab-btn');
    const studioCloseBtn = document.getElementById('studio-close-modal-btn');

    window.openStudioModal = function(url, title = 'Phòng Studio Tương Tác') {
        if (!studioBackdrop || !studioIframe) return;
        studioTitle.innerHTML = `🎛️ ${title}`;
        studioIframe.src = url;
        studioOpenTabBtn.href = url;
        studioBackdrop.classList.add('open');
        document.body.style.overflow = 'hidden';
    };

    window.closeStudioModal = function() {
        if (!studioBackdrop || !studioIframe) return;
        studioBackdrop.classList.remove('open');
        studioIframe.src = 'about:blank';
        document.body.style.overflow = '';
    };

    if (studioCloseBtn) {
        studioCloseBtn.addEventListener('click', window.closeStudioModal);
    }

    if (studioBackdrop) {
        studioBackdrop.addEventListener('click', (e) => {
            if (e.target === studioBackdrop) {
                window.closeStudioModal();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && studioBackdrop && studioBackdrop.classList.contains('open')) {
            window.closeStudioModal();
        }
    });

    // Tự động gán sự kiện cho các nút mở Studio trong trang
    document.addEventListener('click', (e) => {
        const launchBtn = e.target.closest('[data-studio-url]');
        if (launchBtn) {
            e.preventDefault();
            const url = launchBtn.getAttribute('data-studio-url');
            const title = launchBtn.getAttribute('data-studio-title') || 'Phòng Studio Tương Tác';
            window.openStudioModal(url, title);
        }
    });
});
