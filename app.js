const $ = id => document.getElementById(id);
const SECRET_PIN = "0070";
const username = 'vietndj';
const DRIVE_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbzaSLNSuCFtaWG1ti3CHnEvqD_ZcuhuK9rkhbbOJIijVozlkJSqXlIkW8icGvtS6oVojQ/exec";
const CMS_PIN_WIDGET = '\n<script id="cms-pin-widget">if(localStorage.getItem("cms_auth")==="granted"){const p=window.location.pathname.split("/").filter(Boolean);let r="vietndj.github.io",f="index.html";if(p.length>1){r=p[0];f=p.pop()}else if(p.length===1){if(p[0].endsWith(".html"))f=p[0];else r=p[0]}const k=r+"/"+decodeURIComponent(f);let isP=false;try{const d=JSON.parse(localStorage.getItem("cms_repo_data"));if(d&&d.pinned&&d.pinned.includes(k))isP=true;}catch(e){}const b=document.createElement("a");b.href="https://vietndj.github.io/?"+(isP?"unpin=":"pin=")+encodeURIComponent(k);b.innerHTML=isP?"❌ Bỏ ghim":"📌 Ghim bài";b.style.cssText="position:fixed;top:15px;right:15px;background:"+(isP?"#FF3B30":"#FF9500")+";color:white;padding:8px 16px;border-radius:20px;font-weight:bold;font-size:12px;z-index:99999;text-decoration:none;box-shadow:0 4px 10px rgba(0,0,0,0.15);transition:all 0.2s ease;cursor:pointer;";b.onclick=function(e){e.preventDefault();window.open(this.href,"_blank");isP=!isP;this.innerHTML=isP?"❌ Bỏ ghim":"📌 Ghim bài";this.style.background=isP?"#FF3B30":"#FF9500";this.href="https://vietndj.github.io/?"+(isP?"unpin=":"pin=")+encodeURIComponent(k)};document.body.appendChild(b);}<\/script>\n';
const WIDGET_REGEX = new RegExp('\\n*<script id="cms-pin-widget">[\\s\\S]*?<\\/script>\\n*', 'gi');

let sortOrder = 'desc', currentView = 'list', activeTag = 'all', activeRepo = 'all', searchQuery = '', isDeepSearch = false, isSyncing = false, tableSort = {by:'date',dir:'desc'};
let db = { repos: {}, files: [], tags: {}, links: {}, tasks: [], pinned: [], colors: {}, customCol: [], titles: {} };
let bulkSet = new Set(), isSlugEdited = false, currentColorKey = null, currentColorSha = null, uploadLinksTemp = [];
let editMeta = { tagKey: null, sha: null, linkKey: null, mSR: '', mFN: '', mFS: '' };

// INIT APP GỌI NGAY KHI LOAD
function initApp() {
    _injectModals();
    let auth = false; try { if(localStorage.getItem("cms_auth") === "granted") auth = true; } catch(e) {}
    if(auth) {
        unlockSystem(); 
    } else {
        const ls = $('login-screen'); if(ls) { ls.classList.remove('hidden'); ls.style.display = 'flex'; }
        const inp = $('pin-input'); if(inp) inp.focus();
    }
    try { const w = localStorage.getItem('cms_pomo_webhook'); if(w && $('pomo-webhook-url')) $('pomo-webhook-url').value = w; } catch(e) {}
}

initApp();

function safeSetLocal(key, value) {
    try { localStorage.setItem(key, value); } 
    catch (e) { 
        if(e.name === 'QuotaExceededError' || e.message.includes('quota')) {
            try { localStorage.removeItem('cms_repo_data'); localStorage.setItem(key, value); } catch(err) {}
        }
    }
}

window.checkPIN = function() { 
    const inp = $('pin-input');
    if(inp && inp.value.trim() === SECRET_PIN) { 
        safeSetLocal("cms_auth", "granted"); 
        unlockSystem(); 
    } else { 
        if($('login-error')) $('login-error').classList.remove('hidden'); 
        if(inp) inp.value=''; 
    } 
}

window.unlockSystem = function() { 
    if($('login-screen')) $('login-screen').style.display = 'none'; 
    if($('app-content')) { $('app-content').classList.remove('hidden'); $('app-content').style.display = 'flex'; $('app-content').classList.add('fade-in'); }
    setTimeout(() => { try { checkTokenUI(); initCMS(); } catch(e) { console.error(e); } }, 50); 
}

window.logout = function() { try{localStorage.removeItem("cms_auth");}catch(e){} location.reload(); }

window.toggleToolsMenu = function(e) { if(e) e.stopPropagation(); const d = $('tools-dropdown'); if(d) { d.classList.contains('hidden') ? (d.classList.remove('hidden'), d.classList.add('flex')) : (d.classList.add('hidden'), d.classList.remove('flex')); } }
document.addEventListener('click', (e) => { const d = $('tools-dropdown'); if(d && !d.classList.contains('hidden') && !e.target.closest('#tools-dropdown-container')) { d.classList.add('hidden'); d.classList.remove('flex'); } });
window.toggleTasks = function() { const s = $('task-sidebar'), b = $('btn-task-toggle'); if(!s) return; if(s.classList.contains('hidden')) { s.classList.remove('hidden'); s.classList.add('flex'); if(b) b.classList.add('text-[var(--accent)]', 'border-[var(--accent)]'); } else { s.classList.add('hidden'); s.classList.remove('flex'); if(b) b.classList.remove('text-[var(--accent)]', 'border-[var(--accent)]'); } }
window.toggleWidget = function(id) { const w = $(id); if(w) w.classList.toggle('hidden'); }
window.closeModal = function(id) { const e = $(id); if(e){e.classList.add('hidden');e.classList.remove('flex');} }
window.openModal = function(id) { const e = $(id); if(e){e.classList.remove('hidden');e.classList.add('flex');} }
window.showToast = function(msg, err=false) { const t=$('sync-status-toast'), tt=$('sync-status-text'); if(!t) return; t.classList.remove('hidden'); t.classList.add('flex'); t.style.borderColor = err?'#FF3B30':'var(--accent)'; tt.innerText=msg; }
window.hideToast = function() { setTimeout(()=>$('sync-status-toast')?.classList.add('hidden'), 2000); }
window.setTheme = function(t) { document.documentElement.setAttribute('data-theme', t); safeSetLocal('cms_theme', t); }

window.checkTokenUI = function() { 
    try { 
        const tk = localStorage.getItem('github_pat'); 
        if(tk) { if($('token-col')) $('token-col').style.display='none'; if($('token-saved-badge')) $('token-saved-badge').classList.remove('hidden'); if($('github-token')) $('github-token').value=tk; } 
        else { if($('token-col')) $('token-col').style.display='block'; if($('token-saved-badge')) $('token-saved-badge').classList.add('hidden'); if($('github-token')) $('github-token').value=''; } 
    } catch(e){} 
}
window.clearToken = function() { if(confirm("Xóa Token bảo mật?")) { try{localStorage.removeItem('github_pat');}catch(e){} checkTokenUI(); } }

window.renderRepoSuggestions = function() {
    try {
        const c = $('repo-suggestions'); if(!c) return;
        const rs = Object.keys(db.repos).filter(r=>r!=='📌 Đã ghim'&&r!==`${username}.github.io`).sort(); rs.unshift(`${username}.github.io`);
        c.innerHTML = rs.map(r=>`<button type="button" onclick="document.getElementById('upload-repo').value='${username}/${r}'" class="cms-btn px-3 py-1.5 rounded-lg text-[10px] font-bold shadow-sm opacity-90 transition hover:opacity-100 uppercase tracking-wide border border-gray-200 dark:border-gray-700">${r}</button>`).join(''); 
    } catch(e){}
}

window.toggleUpload = function() { 
    const s = $('upload-section'), i = $('upload-icon'); if(!s) return;
    if(s.classList.contains('hidden')){ s.classList.remove('hidden'); if(i) i.style.transform='rotate(180deg)'; renderRepoSuggestions(); syncUploadTagsUI(); } 
    else { s.classList.add('hidden'); if(i) i.style.transform='rotate(0deg)'; } 
}

window.clearUploadForm = function() { 
    ['upload-title', 'upload-filename', 'upload-content', 'upload-tags', 'original-repo', 'original-filename', 'original-sha'].forEach(id => { const el = $(id); if(el) el.value=''; });
    if($('btn-create')) $('btn-create').innerHTML='ĐĂNG BÀI <span class="opacity-70 text-[10px] bg-black/20 px-1.5 py-0.5 rounded ml-1 font-mono uppercase hidden sm:inline-block">Ctrl S</span>'; 
    if($('upload-status')) $('upload-status').style.display='none'; 
    if($('btn-delete')) $('btn-delete').classList.add('hidden'); 
    uploadLinksTemp=[]; renderUploadLinks(); syncUploadTagsUI(); isSlugEdited=false; renderRepoSuggestions();
}

window.getAllUniqueTags = function() { const aT = new Set(); Object.values(getSafeTagsData()).forEach(a=>a.forEach(x=>aT.add(x))); return Array.from(aT).sort(); }

window.syncUploadTagsUI = function() { 
    try {
        const tg = getAllUniqueTags();
        const inp = $('upload-tags'); const cur = inp.value.split(',').map(x=>x.trim()).filter(Boolean); const sug = $('upload-tag-suggestions');
        if(!tg.length) sug.innerHTML='<span class="text-[10px] text-muted italic mt-2">Chưa có nhãn.</span>'; 
        else sug.innerHTML = tg.map(t=>{ 
            const c = cur.includes(t) ? 'bg-[var(--accent)] text-white border-transparent shadow-md' : 'bg-[var(--bg-hover)] text-[var(--text-main)] border-[var(--border)] hover:opacity-80'; 
            const sf = t.replace(/'/g,"\\'").replace(/"/g,"&quot;");
            return `<button type="button" onclick="toggleUploadTagForm('${sf}')" class="px-3 py-1.5 text-[11px] font-bold rounded-lg transition border ${c}" data-tag="${sf}">${t}</button>`; 
        }).join(''); 
    } catch(e){}
}

window.toggleUploadTagForm = function(t) {
    t = t.replace(/\\'/g,"'").replace(/&quot;/g,'"'); const i = $('upload-tags'); if(!i) return;
    let c = i.value.split(',').map(x=>x.trim()).filter(Boolean);
    if(c.includes(t)) c = c.filter(x=>x!==t); else c.push(t);
    i.value = c.join(', '); syncUploadTagsUI(); autoSlugify();
}

window.renderUploadLinks = function() { 
    const c=$('upload-links-container'); if(!c) return; 
    if(!uploadLinksTemp.length) { c.innerHTML='<span class="text-[10px] text-muted italic">Chưa có link ngoài nào.</span>'; return; }
    c.innerHTML=uploadLinksTemp.map((l,i)=>`<div class="flex gap-2 items-center bg-[var(--bg-card)] p-1.5 rounded-lg border cms-border"><input type="text" placeholder="Tên Link" value="${l.title}" oninput="uploadLinksTemp[${i}].title=this.value" class="w-1/3 px-2 py-1 text-[11px] rounded bg-transparent outline-none font-bold text-[var(--text-main)]"><input type="text" placeholder="URL" value="${l.url}" oninput="uploadLinksTemp[${i}].url=this.value" class="flex-1 px-2 py-1 text-[11px] rounded bg-transparent outline-none border-l cms-border text-[var(--text-main)]"><button type="button" onclick="uploadLinksTemp.splice(${i},1);renderUploadLinks()" class="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 px-2 py-1 rounded-md text-xs transition font-bold">✕</button></div>`).join(''); 
}
window.addUploadLink = function() { uploadLinksTemp.push({title:'Gem '+(uploadLinksTemp.length+1),url:''}); renderUploadLinks(); }

document.addEventListener('keydown', e => {
    const cmd = navigator.platform.toUpperCase().indexOf('MAC')>=0 ? e.metaKey : e.ctrlKey; const ac = $('app-content');
    if(ac && !ac.classList.contains('hidden')) {
        const us = $('upload-section');
        if(cmd && e.key.toLowerCase()==='s' && us && !us.classList.contains('hidden')) { e.preventDefault(); createFile(); }
        if(cmd && e.key.toLowerCase()==='k') { e.preventDefault(); $('search-input')?.focus(); }
        if(cmd && e.key.toLowerCase()==='e') { e.preventDefault(); toggleUpload(); if(us && !us.classList.contains('hidden')) $('upload-title')?.focus(); }
        if(e.key === 'Escape') { ['tag-modal-overlay','link-modal-overlay','color-modal-overlay','create-repo-overlay','rename-repo-overlay','move-file-overlay','bulk-move-overlay'].forEach(id=>closeModal(id)); if(us && !us.classList.contains('hidden')) toggleUpload(); $('search-input')?.blur(); }
    }
});

const getToken = () => ($('github-token')?.value || localStorage.getItem('github_pat') || '').replace(/\s+/g, '');
const getHeaders = () => { const t = getToken(); return t ? { 'Authorization': `Bearer ${t}`, 'Accept': 'application/vnd.github.v3+json' } : { 'Accept': 'application/vnd.github.v3+json' }; };
window.requireToken = function() { if(!getToken()) { alert("🔒 Vui lòng nhập Mã Token GitHub!"); const us = $('upload-section'); if(us && us.classList.contains('hidden')) toggleUpload(); $('github-token')?.focus(); return false; } return true; };

const safeEnc = fn => { try { fn = decodeURIComponent(fn); } catch(e){} return encodeURIComponent(fn); };

const encodeBase64UTF8Async = async (str) => {
    const bytes = new TextEncoder().encode(str); let binary = '';
    for (let i = 0; i < bytes.byteLength; i += 16384) { binary += String.fromCharCode.apply(null, bytes.subarray(i, i + 16384)); }
    return btoa(binary);
};

async function fetchJSON(url, opts) { try { const r = await fetch(url, opts); return r.ok ? await r.json() : null; } catch(e) { return null; } }
async function fetchText(url, opts) { try { const r = await fetch(url, opts); return r.ok ? await r.text() : null; } catch(e) { return null; } }
async function getFileShaSafe(repoPath, file) { 
    let d = await fetchJSON(`https://api.github.com/repos/${repoPath}/contents/${safeEnc(file)}?t=${Date.now()}`, {headers: getHeaders()}); if(d && !Array.isArray(d)) return d.sha; 
    let d2 = await fetchJSON(`https://api.github.com/repos/${repoPath}/contents/?t=${Date.now()}`, {headers: getHeaders()}); if(d2 && Array.isArray(d2)) { const f = d2.find(x => x.name === file); if(f) return f.sha; } 
    return null; 
}

window.getContrastYIQ = function(hex) { if(!hex)return '#1D1D1F'; hex=hex.replace("#",""); const yiq=((parseInt(hex.substr(0,2),16)*299)+(parseInt(hex.substr(2,2),16)*587)+(parseInt(hex.substr(4,2),16)*114))/1000; return (yiq>=128)?'#1D1D1F':'#FFFFFF'; };
window.slugify = function(t) { return t?t.toString().toLowerCase().replace(/[áàảạãăắằẳẵặâấầẩẫậ]/gi,'a').replace(/[éèẻẽẹêếềểễệ]/gi,'e').replace(/[iíìỉĩị]/gi,'i').replace(/[óòỏõọôốồổỗộơớờởỡợ]/gi,'o').replace(/[úùủũụưứừửữự]/gi,'u').replace(/[ýỳỷỹỵ]/gi,'y').replace(/đ/gi,'d').replace(/\s+/g,'-').replace(/[^\w\-]+/g,'').replace(/\-\-+/g,'-').replace(/^-+|-+$/g,''):""; };

window.autoSlugify = function() { 
    if(isSlugEdited) return; 
    const ti = $('upload-title'); if(!ti) return; let t = ti.value.trim(); 
    const fn = $('upload-filename'); if(!fn) return;
    if(t.toLowerCase()==='index'||t.toLowerCase()==='index.html') { fn.value='index.html'; return; }
    let s = slugify(t); const tagInp = $('upload-tags'); let tg = tagInp ? tagInp.value.split(',').map(x=>x.trim()).filter(Boolean) : []; 
    if(tg.length && s) { let ts=slugify(tg.join('-')); if(!s.includes(ts)) s+='-'+ts; } fn.value=s; 
}

function getSafeTagsData() { 
    let safe={}; try{ if(!db.tags) db.tags = {}; for(let k in db.tags){ let v=Array.isArray(db.tags[k])?db.tags[k]:[db.tags[k]]; v=v.filter(x=>typeof x==='string').map(x=>x.trim()).filter(Boolean); if(v.length)safe[k]=v; } }catch(e){} 
    return db.tags=safe; 
}

function parseHTML(html, safeN, url) {
    let res = { tocHTML:'', previewText:'...', previewFeedHTML:'', coverHTML:'', fullText:'' }; try {
        const doc = new DOMParser().parseFromString(html, 'text/html'), t = doc.querySelector('title')?.textContent||doc.querySelector('h1')?.textContent||safeN.replace('.html','');
        res.coverHTML = `<div class="w-full h-full p-4 flex items-center justify-center text-center opacity-60 font-bold">${t}</div>`;
        let tocs=[]; doc.querySelectorAll('h1, h2, h3').forEach((h,i) => { if(!h.id) h.id=`toc-${i}`; tocs.push(`<li class="truncate"><a href="${url}#${h.id}" class="hover:underline transition text-[var(--accent)] font-medium">• ${h.textContent.trim()}</a></li>`); });
        if(tocs.length) res.tocHTML = `<details class="cms-input rounded-xl text-xs mb-4 border cms-border cursor-pointer"><summary class="font-bold p-3 outline-none opacity-80">📋 Mục lục (${tocs.length})</summary><ul class="p-3 pt-0 space-y-2 opacity-90">${tocs.join('')}</ul></details>`;
        const b = doc.body.cloneNode(true); b.querySelectorAll('script, style, nav, header, footer, iframe, svg, button').forEach(x=>x.remove()); 
        
        res.fullText = (b.textContent||"").replace(/\s+/g,' ').trim().substring(0, 3000); 
        if(res.fullText) res.previewText = res.fullText.substring(0,600)+(res.fullText.length>600?"...":"");
        
        let fH="", pN=doc.body.querySelectorAll('p, h2, h3, h4, ul, ol, blockquote');
        if(pN.length) { pN.forEach((n, i)=>{ 
            if(i > 20) return; 
            let tx=n.textContent.trim(), tg=n.tagName.toLowerCase(); if(tx.length<4) return;
            if(tg.startsWith('h')) fH+=`<h4 class="font-bold mt-6 mb-2 border-l-4 border-[var(--accent)] pl-3 text-lg">${tx}</h4>`;
            else if(tg==='ul'||tg==='ol') fH+=`<ul class="list-disc pl-6 mb-4 opacity-90 space-y-1.5">${Array.from(n.querySelectorAll('li')).map(li=>`<li>${li.textContent.trim()}</li>`).join('')}</ul>`;
            else if(tg==='blockquote') fH+=`<blockquote class="border-l-4 border-[var(--border)] pl-4 py-1 italic mb-4 cms-input rounded-r-lg opacity-80">${tx}</blockquote>`;
            else fH+=`<p class="mb-4 text-[16px] leading-relaxed opacity-95">${tx}</p>`;
        }); res.previewFeedHTML = fH || `<p class="whitespace-pre-line text-[16px]">${res.previewText}</p>`; } else res.previewFeedHTML = `<div class="mb-4 whitespace-pre-line text-[16px]">${res.previewText}</div>`;
    } catch(e){} return res;
}

window.initCMS = function() {
    try { 
        const c = JSON.parse(localStorage.getItem('cms_repo_data')); 
        if(c) { 
            if(c.files) db.files = c.files;
            if(c.repos) db.repos = c.repos;
            if(c.tags) db.tags = c.tags;
            if(c.links) db.links = c.links;
            if(c.tasks) db.tasks = c.tasks;
            if(c.pinned) db.pinned = c.pinned;
            if(c.colors) db.colors = c.colors;
            if(c.customCol) db.customCol = c.customCol;
            if(c.titles) db.titles = c.titles;

            getSafeTagsData(); 
            if(Array.isArray(db.files) && db.files.length > 0) renderRepos(); 
            renderTasks(); 
        } 
    } catch(e) { console.error("INIT CMS ERR", e); }
    fastLoadDB(); 
    checkUrlPin(); 
}

function rebuildRepoMap() { db.repos = {}; if(Array.isArray(db.files)) { db.files.forEach(f => { if(!db.repos[f.repoName]) db.repos[f.repoName] = []; db.repos[f.repoName].push(f); }); } }

function _saveLocal() { 
    try {
        const safeTasks = (db.tasks || []).map(t => ({...t, image: (t.image && t.image.startsWith('data:image')) ? '' : t.image}));
        const leanFiles = (db.files || []).map(f => ({ repoName: f.repoName, name: f.name, fileName: f.fileName, sha: f.sha, url: f.url, timestamp: f.timestamp, fullDate: f.fullDate, preview: f.preview ? f.preview.substring(0, 150) : '' }));
        const safeData = { tags: db.tags||{}, links: db.links||{}, tasks: safeTasks, pinned: db.pinned||[], colors: db.colors||{}, customCol: db.customCol||[], titles: db.titles||{}, files: leanFiles };
        localStorage.removeItem('cms_repo_data'); 
        localStorage.setItem('cms_repo_data', JSON.stringify(safeData));
    } catch(e) { 
        try { const minimal = { tags: db.tags||{}, links: db.links||{}, tasks: [], pinned: db.pinned||[], colors: db.colors||{}, customCol: db.customCol||[], titles: db.titles||{} }; localStorage.removeItem('cms_repo_data'); localStorage.setItem('cms_repo_data', JSON.stringify(minimal)); } catch(err) {} 
    }
}

async function saveMeta() { 
    const t=getToken(); if(!t) throw new Error("Missing Token"); 
    const sha=await getFileShaSafe(`${username}/${username}.github.io`, 'metadata.json'); 
    const safeTasks = (db.tasks || []).map(t => ({...t, image: (t.image && t.image.startsWith('data:image')) ? '' : t.image})); 
    const c=await encodeBase64UTF8Async(JSON.stringify({_version:8, tags:db.tags, links:db.links, tasks:safeTasks, pinned:db.pinned, colors:db.colors, customCol:db.customCol, titles:db.titles}, null, 2)); 
    const r = await fetch(`https://api.github.com/repos/${username}/${username}.github.io/contents/metadata.json`, {method:'PUT', headers:{'Authorization':`Bearer ${t}`,'Content-Type':'application/json'}, body:JSON.stringify({message:"Sync Meta", content:c, sha:sha||undefined})}); 
    if(!r.ok) throw new Error("Cập nhật Meta bị lỗi");
    _saveLocal(); 
}

async function saveDB() { 
    const t=getToken(); if(!t) throw new Error("Missing Token"); 
    const sha=await getFileShaSafe(`${username}/${username}.github.io`, 'cms_db.json'); 
    const leanDB = db.files.map(f => ({ repoName: f.repoName, name: f.name, fileName: f.fileName, sha: f.sha, url: f.url, timestamp: f.timestamp, fullDate: f.fullDate, preview: (f.preview||"").substring(0, 150) })); 
    const c=await encodeBase64UTF8Async(JSON.stringify({allFiles: leanDB})); 
    const b={message:"Auto-sync DB", content:c}; if(sha) b.sha=sha; 
    const r = await fetch(`https://api.github.com/repos/${username}/${username}.github.io/contents/cms_db.json`, {method:'PUT', headers:{'Authorization':`Bearer ${t}`,'Content-Type':'application/json'}, body:JSON.stringify(b)}); 
    if(!r.ok) throw new Error("Cập nhật DB JSON bị lỗi");
}

window._syncSilent = async function() { try{ await saveMeta(); await saveDB(); }catch(e){} }
window.forceSync = function() { const t=$('github-token')?.value.trim(); if(t){ safeSetLocal('github_pat', t); checkTokenUI();} fastLoadDB(); }

async function fastLoadDB() {
    if(isSyncing) return; isSyncing=true; showToast("Đang tải Database...");
    try {
        const m = await fetchRawJSON(`${username}/${username}.github.io`, 'metadata.json');
        if(m && typeof m==='object') { if(m.tags) db.tags = m.tags; if(m.links) db.links = m.links; if(m.tasks) db.tasks = m.tasks; if(m.pinned) db.pinned = m.pinned; if(m.colors) db.colors = m.colors; if(m.customCol) db.customCol = m.customCol; if(m.titles) db.titles = m.titles; getSafeTagsData(); }
        const d = await fetchRawJSON(`${username}/${username}.github.io`, 'cms_db.json');
        if(d && d.allFiles) {
            db.files = d.allFiles; rebuildRepoMap(); _saveLocal(); renderRepos(); renderTasks(); 
            const uploadSect = $('upload-section'); if(uploadSect && !uploadSect.classList.contains('hidden')) { renderRepoSuggestions(); syncUploadTagsUI(); }
            showToast("✅ Hoàn tất!"); hideToast(); const b = $('btn-rebuild-db'); if(b) { b.className="cms-btn px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-sm h-[32px] hidden lg:block"; b.innerText="↻ Tải DB Lõi"; }
        } else throw new Error("No DB");
    } catch(e) { showToast("⚠️ Trống, Nạp Core Lõi!", true); const b = $('btn-rebuild-db'); if(b) b.classList.remove('hidden'); setTimeout(()=>$('sync-status-toast')?.classList.add('hidden'), 3000); } finally { isSyncing=false; }
}

window.buildMasterDatabase = async function() {
    if(!requireToken() || !confirm("⚠️ QUÉT LẠI TOÀN BỘ DATA LÕI?\nMất khoảng 15-30s. Bắt đầu?")) return;
    const btn = $('btn-rebuild-db'); if(btn) { btn.innerText="⏳ Đang quét..."; btn.disabled=true; }
    showToast("Bắt đầu quét Github...");
    try {
        const rR=await fetchJSON(`https://api.github.com/users/${username}/repos?per_page=100&t=${Date.now()}`, {headers:getHeaders()});
        if(!rR) throw Error("Lỗi API Repos");
        let mF=[], fP=[];
        for(let i=0; i<rR.length; i++) {
            const rp = rR[i]; showToast(`Quét: ${rp.name} (${i+1}/${rR.length})...`);
            const rF = await fetchJSON(`https://api.github.com/repos/${username}/${rp.name}/contents/?t=${Date.now()}`, {headers:getHeaders()});
            if(rF && Array.isArray(rF)) {
                const htmlF = rF.filter(x=>x.name.endsWith('.html') && !(rp.name===`${username}.github.io`&&(x.name==='index.html'||x.name==='fix-titles.html'||x.name==='fix-url.html'||x.name.endsWith('.json'))));
                for(let f of htmlF) {
                    let sN=f.name; try{sN=decodeURIComponent(f.name);}catch(e){}
                    const u = rp.name===`${username}.github.io`?`https://${username}.github.io/${f.name}`:`https://${username}.github.io/${rp.name}/${f.name}`;
                    const tI=(db.titles&&db.titles[`${rp.name}/${f.name}`])||sN.replace('.html','');
                    const nf={repoName:rp.name, name:tI, fileName:f.name, sha:f.sha, url:u, downloadUrl:f.download_url||"", timestamp:Date.now(), fullDate:"Đang tải", preview:"...", previewFeedHTML:"", tocHTML:"", coverHTML:"", fullText:""};
                    mF.push(nf);
                    const pD=fetchJSON(`https://api.github.com/repos/${username}/${rp.name}/commits?path=${f.path}&per_page=1`, {headers:getHeaders()}).then(cd=>{if(cd&&cd.length){const d=new Date(cd[0].commit.committer.date); nf.timestamp=d.getTime(); nf.fullDate=d.toLocaleString('vi-VN');}}).catch(()=>{});
                    const pC=fetchText(`https://api.github.com/repos/${username}/${rp.name}/contents/${safeEnc(sN)}?t=${Date.now()}`, {headers:{...getHeaders(),'Accept':'application/vnd.github.v3.raw'}}).then(txt=>{if(txt){const p=parseHTML(txt,sN,u); nf.preview=p.previewText; nf.previewFeedHTML=p.previewFeedHTML; nf.tocHTML=p.tocHTML; nf.coverHTML=p.coverHTML; nf.fullText=p.fullText;}}).catch(()=>{});
                    fP.push(pD, pC); await new Promise(r=>setTimeout(r,30));
                }
            }
        }
        showToast("Trích xuất HTML..."); await Promise.allSettled(fP);
        db.files = mF.sort((a,b)=>b.timestamp-a.timestamp); rebuildRepoMap();
        showToast("Lưu lên GitHub..."); await saveDB(); await saveMeta();
        if(btn){ btn.innerText="↻ Tải DB Lõi"; btn.classList.remove('bg-red-500','text-white','animate-pulse'); btn.className="cms-btn px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-sm h-[32px]"; }
        _saveLocal(); renderRepos(); showToast("✅ THÀNH CÔNG!"); alert("Cập nhật Database thành công!");
    } catch(e) { alert(`Lỗi: ${e.message}`); showToast("❌ Lỗi hệ thống", true); if(btn){btn.disabled=false;btn.innerText="⚠️ Data Lõi";} }
    finally { hideToast(); document.body.style.cursor='default'; }
}

function checkUrlPin() {
    const p = new URLSearchParams(window.location.search), t = p.get('pin')||p.get('unpin');
    if(t && getToken()) {
        const dec = decodeURIComponent(t), arr = dec.split('/'), f = arr.pop(), r = arr.join('/')||`${username}.github.io`, k = `${r}/${f}`;
        if(r && f) {
            let ch = false; if(!Array.isArray(db.pinned)) db.pinned=[];
            if(p.get('pin') && !db.pinned.includes(k)){ db.pinned.push(k); ch=true; } else if(p.get('unpin') && db.pinned.includes(k)){ db.pinned=db.pinned.filter(x=>x!==k); ch=true; }
            document.body.innerHTML=`<div style="display:flex;height:100vh;align-items:center;justify-content:center;background:var(--bg-body)"><div class="cms-card p-10 text-center shadow-lg border cms-border"><div style="font-size:50px">${p.get('pin')?'📌':'❌'}</div><h2 class="text-xl font-bold mt-4">Đã xử lý!</h2><p class="text-muted text-sm mt-2">Đang đóng tab...</p></div></div>`;
            const fin = () => { window.history.replaceState({},document.title,window.location.pathname); setTimeout(()=>window.close(), 1000); };
            if(ch){ _saveLocal(); _syncSilent().then(fin).catch(fin); } else fin();
        }
    }
}

window.handleSearch = function(v) { searchQuery = v.toLowerCase(); const c = $('clear-search-btn'); if(c) c.classList.toggle('hidden',!v); renderRepos(); }
window.clearSearch = function() { const s = $('search-input'); if(s) { s.value=''; handleSearch(''); s.focus(); } }
window.toggleDeepSearch = function() { isDeepSearch=!isDeepSearch; const bd = $('btn-deep-search'), td = $('text-deep-search'); if(bd) bd.className=isDeepSearch?"shrink-0 bg-[var(--accent)] text-white px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border border-transparent":"shrink-0 cms-btn px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5"; if(td) td.innerText=isDeepSearch?"Sâu: ON":"Sâu"; if(searchQuery) renderRepos(); }
window.changeSortOrder = function(o) { sortOrder=o; ['sort-asc','sort-desc'].forEach(id=>{const el = $(id); if(el) el.classList.toggle('active',id===`sort-${o}`)}); renderRepos(); }
window.setView = function(v) { currentView=v; ['btn-view-list','btn-view-gallery','btn-view-kanban','btn-view-table','btn-view-feed'].forEach(id=>{const el = $(id); if(el) el.classList.toggle('active',id===`btn-view-${v}`)}); renderRepos(); }
window.sortTable = function(b) { if(tableSort.by===b) tableSort.dir=tableSort.dir==='asc'?'desc':'asc'; else {tableSort.by=b; tableSort.dir='desc';} renderRepos(); }
window.filterByRepo = function(r) { activeRepo=r; renderRepos(); }
window.filterByTag = function(t) { activeTag=t.replace(/&quot;/g,'"').replace(/\\'/g,"'"); renderRepos(); }

function renderFilters() {
    const rb=$('repo-filter-bar'), tb=$('tag-filter-bar'); if(!rb||!tb) return;
    let rs = Object.keys(db.repos).filter(r=>r!=='📌 Đã ghim'&&r!==`${username}.github.io`).sort(); rs.unshift('all', `${username}.github.io`);
    rb.innerHTML = `<span class="text-[10px] font-bold text-muted uppercase shrink-0 mr-2 flex items-center gap-1"><svg class="w-3 h-3"><use href="#icon-folder"></use></svg> Kho</span>` + rs.map(r=>`<button type="button" onclick="filterByRepo('${r.replace(/'/g,"\\'")}')" class="px-3 py-1.5 text-xs font-bold rounded-lg border transition whitespace-nowrap ${activeRepo===r?'bg-[var(--accent)] text-white border-transparent shadow-sm':'cms-input border-transparent hover:opacity-80'}">${r==='all'?'Tất cả':r}</button>`).join('');
    
    const tg = getAllUniqueTags();
    tb.innerHTML = `<span class="text-[10px] font-bold text-muted uppercase shrink-0 mr-2 flex items-center gap-1"><svg class="w-3 h-3"><use href="#icon-tag"></use></svg> Nhãn</span>` + ['all',...tg].map(t=>{const safe=t.replace(/'/g,"\\'").replace(/"/g,"&quot;"); return `<button type="button" onclick="filterByTag('${safe}')" class="px-3 py-1.5 text-xs font-bold rounded-lg border transition whitespace-nowrap ${activeTag===t?'bg-[var(--accent)] text-white border-transparent shadow-sm':'cms-input border-transparent hover:opacity-80'}">${t==='all'?'Tất cả':t}</button>`}).join('') + (tg.length>0 ? `<button type="button" onclick="renameGlobalTag()" class="ml-2 px-3 py-1 text-xs font-bold rounded-lg border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white transition shrink-0">⚙ Sửa</button>`:'');
}

function renderRecentFiles() {
    const wrapper = $('recent-files-wrapper'); if(!wrapper) return;
    if (activeTag !== 'all' || activeRepo !== 'all' || searchQuery.trim() !== '') { wrapper.innerHTML = ''; return; }
    const recentFiles = [...db.files].sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0)).slice(0, 15);
    if (recentFiles.length === 0) { wrapper.innerHTML = ''; return; }
    let html = `<details open class="mb-8"><summary class="font-bold text-lg mb-3 cursor-pointer outline-none flex items-center gap-2 text-[var(--accent)]"><svg class="w-5 h-5"><use href="#icon-timer"></use></svg> Vừa thao tác gần đây</summary><div class="flex kanban-scroll overflow-x-auto gap-4 pb-4">`;
    recentFiles.forEach(f => {
        const sf = (f.fileName||"").replace(/'/g,"\\'").replace(/"/g,"&quot;");
        html += `<div class="cms-card p-3 min-w-[240px] max-w-[240px] flex flex-col group hover:border-[var(--accent)] transition cursor-pointer border cms-border" onclick="window.open('${f.url}', '_blank')"><div class="text-[10px] text-muted mb-1 flex items-center gap-1"><svg class="w-3 h-3"><use href="#icon-folder"></use></svg>${f.repoName}</div><h4 class="font-bold text-sm line-clamp-2 mb-2 group-hover:text-[var(--accent)] transition">${f.name}</h4><div class="flex justify-between items-center mt-auto border-t cms-border pt-2"><span class="text-[10px] opacity-70">${f.fullDate ? f.fullDate.split(' ')[1] || f.fullDate.split(' ')[0] : ''}</span><button type="button" onclick="event.stopPropagation(); editFileContent('${f.repoName}','${sf}','${f.sha}')" class="text-[10px] bg-[var(--bg-hover)] text-[var(--accent)] px-2 py-1 rounded font-bold hover:opacity-80 transition">Sửa</button></div></div>`;
    });
    html += `</div></details>`; wrapper.innerHTML = html;
}

const getTagsH = (r,f) => (db.tags[`${r}/${f}`]||[]).map(t=>`<span class="cms-input text-[10px] px-2 py-0.5 rounded font-bold border cms-border flex items-center gap-1 opacity-90"><svg class="w-2.5 h-2.5 opacity-60"><use href="#icon-tag"></use></svg>${t}</span>`).join('');
const getLnkH = (r,f) => (db.links[`${r}/${f}`]||[]).map(l=>`<a href="${l.url}" target="_blank" onclick="event.stopPropagation()" class="bg-[#007AFF]/10 text-[var(--accent)] text-[10px] px-2 py-0.5 rounded font-bold border border-transparent hover:border-[#007AFF]/30 transition flex items-center gap-1"><svg class="w-3 h-3"><use href="#icon-link"></use></svg>${l.title}</a>`).join('');
const getActBtns = (r, fn, sf, sha, feed) => {
    const isP = db.pinned && db.pinned.includes(`${r}/${fn}`), pC = isP ? 'text-[#FF9500]' : '', pI = isP ? '#icon-pin-filled' : '#icon-pin';
    if(feed) return `<button type="button" onclick="editFileContent('${r}','${sf}','${sha}')" class="cms-btn-primary px-5 py-2 rounded-xl text-sm font-bold ml-auto shadow-sm flex items-center gap-1 hover:opacity-90 transition"><svg class="w-4 h-4"><use href="#icon-edit"></use></svg> Sửa bài</button><button type="button" onclick="togglePin('${r}','${sf}')" class="cms-btn px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-1.5 ${pC}"><svg class="w-4 h-4"><use href="${pI}"></use></svg> Ghim</button><button type="button" onclick="openColorModal('${r}','${sf}','${sha}')" class="cms-btn px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-1.5"><svg class="w-4 h-4"><use href="#icon-palette"></use></svg> Màu</button><button type="button" onclick="editFileTags('${r}','${sf}','${sha}')" class="cms-btn px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-1.5"><svg class="w-4 h-4"><use href="#icon-tag"></use></svg> Nhãn</button><button type="button" onclick="openLinkModal('${r}','${sf}','${sha}')" class="cms-btn px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-1.5 text-[var(--accent)]"><svg class="w-4 h-4"><use href="#icon-link"></use></svg> Link</button>`;
    return `<button type="button" onclick="togglePin('${r}','${sf}')" class="icon-btn ${pC}"><svg class="svg-icon"><use href="${pI}"></use></svg></button><button type="button" onclick="openColorModal('${r}','${sf}','${sha}')" class="icon-btn"><svg class="svg-icon"><use href="#icon-palette"></use></svg></button><button type="button" onclick="editFileTags('${r}','${sf}','${sha}')" class="icon-btn"><svg class="svg-icon"><use href="#icon-tag"></use></svg></button><button type="button" onclick="openLinkModal('${r}','${sf}','${sha}')" class="icon-btn text-[var(--accent)]"><svg class="svg-icon"><use href="#icon-link"></use></svg></button><button type="button" onclick="openMoveModal('${r}','${sf}','${sha}')" class="icon-btn"><svg class="svg-icon"><use href="#icon-move"></use></svg></button><button type="button" onclick="editFileContent('${r}','${sf}','${sha}')" class="icon-btn text-[var(--accent)] cms-input ml-1"><svg class="svg-icon"><use href="#icon-edit"></use></svg></button>`;
};

window.renderRepos = function() {
    renderFilters(); renderRecentFiles();
    const cont = $('repo-container'); if(!cont) return; cont.innerHTML = '';
    let filtered = [];
    if (Array.isArray(db.files)) {
        filtered = db.files.filter(f => {
            let mt = activeTag==='all' || (db.tags[`${f.repoName}/${f.fileName}`]||[]).includes(activeTag.replace(/\\'/g,"'").replace(/&quot;/g,'"'));
            let mr = activeRepo==='all' || f.repoName === activeRepo.replace(/\\'/g,"'");
            let sl = searchQuery; let mq = !sl || (f.name||"").toLowerCase().includes(sl) || (f.repoName||"").toLowerCase().includes(sl) || (isDeepSearch && ((f.preview||"").toLowerCase().includes(sl) || (f.fullText||"").toLowerCase().includes(sl) || (f.previewFeedHTML||"").toLowerCase().includes(sl)));
            return mt && mr && mq;
        });
    }

    let p = [], u = []; if(!Array.isArray(db.pinned)) db.pinned = [];
    filtered.forEach(f => db.pinned.includes(`${f.repoName}/${f.fileName}`) ? p.push(f) : u.push(f));
    const sortFn = (a,b) => sortOrder==='desc' ? (b.timestamp||0)-(a.timestamp||0) : (a.timestamp||0)-(b.timestamp||0); p.sort(sortFn); u.sort(sortFn);

    if(!filtered.length) { cont.innerHTML = '<div class="text-center py-20 text-muted font-bold text-sm">Trống</div>'; return; }

    const renderCard = (f, v) => {
        const sf = (f.fileName||"").replace(/'/g,"\\'").replace(/"/g,"&quot;"); const col = db.colors[`${f.repoName}/${f.fileName}`];
        const isDark = col && getContrastYIQ(col) === '#FFFFFF'; const stl = col ? `background-color:${col}; border-color:transparent; color:${isDark?'#FFF':'#1D1D1F'};` : '';
        const chk = `<input type="checkbox" class="absolute top-4 left-4 w-4 h-4 z-10 cursor-pointer accent-[#007AFF]" onclick="toggleFileSelection('${f.repoName}','${sf}','${f.sha}',event)" ${bulkSet.has(`${f.repoName}|${f.fileName}|${f.sha}`) ? 'checked':''}>`;
        if(v==='feed') return `<article class="cms-card p-6 md:p-8 flex flex-col relative mb-8 border cms-border" style="${stl}">${chk}<div class="flex items-center gap-3 mb-4 pl-8"><div class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl cms-input border cms-border"><svg class="w-5 h-5"><use href="#icon-folder"></use></svg></div><div><p class="text-sm font-bold cursor-pointer hover:underline opacity-80" onclick="activeRepo='${f.repoName}';renderRepos()">${f.repoName}</p><p class="text-[11px] font-semibold opacity-70 mt-0.5">${f.fullDate}</p></div></div><h2 class="text-3xl font-bold mb-4 pl-8"><a href="${f.url}" target="_blank" class="hover:underline opacity-90">${f.name}</a></h2><div class="flex flex-wrap gap-2 mb-2 pl-8 empty:hidden">${getTagsH(f.repoName,f.fileName)}</div><div class="flex flex-wrap gap-2 mb-6 pl-8 empty:hidden">${getLnkH(f.repoName,f.fileName)}</div><div class="w-full h-48 cms-input mb-6 rounded-xl flex items-center justify-center overflow-hidden border cms-border">${f.coverHTML||''}</div><div class="text-[16px] leading-relaxed mb-6 opacity-90">${f.tocHTML||''}${f.previewFeedHTML||f.preview}</div><div class="flex flex-wrap gap-2 pt-5 border-t cms-border mt-auto"><a href="${f.url}" target="_blank" class="cms-btn px-6 py-2 rounded-xl text-sm font-bold shadow-sm">Đọc bài</a>${getActBtns(f.repoName,f.fileName,sf,f.sha,true)}</div></article>`;
        if(v==='gallery') return `<div class="cms-card flex flex-col relative overflow-hidden group hover:scale-[1.02] transition border cms-border" style="${stl}">${chk}<div class="h-28 cms-input flex items-center justify-center border-b cms-border overflow-hidden">${f.coverHTML||''}</div><div class="p-5 flex flex-col flex-1"><span class="text-[10px] uppercase font-bold text-muted mb-2">${f.repoName}</span><a href="${f.url}" target="_blank" class="font-bold text-lg mb-2 line-clamp-2 hover:underline">${f.name}</a><div class="flex flex-wrap gap-1.5 mb-2 empty:hidden">${getTagsH(f.repoName,f.fileName)}</div><div class="flex flex-wrap gap-1.5 mb-3 empty:hidden">${getLnkH(f.repoName,f.fileName)}</div><div class="text-sm opacity-70 line-clamp-4 flex-1 mb-4">${f.tocHTML||''}${f.preview}</div><div class="flex justify-between items-center pt-3 border-t cms-border"><span class="text-[10px] opacity-60">${f.fullDate}</span><div class="flex gap-0.5">${getActBtns(f.repoName,f.fileName,sf,f.sha,false)}</div></div></div></div>`;
        return `<div class="cms-card p-4 flex flex-col relative group hover:scale-[1.01] transition border cms-border" style="${stl}">${chk}<a href="${f.url}" target="_blank" class="font-bold text-[15px] hover:underline mb-2 pl-6 line-clamp-2">${f.name}</a><div class="flex flex-wrap gap-1 mb-2 pl-6 empty:hidden">${getTagsH(f.repoName,f.fileName)}</div><div class="flex flex-wrap gap-1 mb-3 pl-6 empty:hidden">${getLnkH(f.repoName,f.fileName)}</div><div class="flex justify-between items-center mt-auto pt-3 border-t cms-border"><span class="text-[10px] opacity-60">${v==='kanban'?(f.fullDate.split(' ')[1]||f.fullDate):f.fullDate}</span><div class="flex gap-0.5 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition">${getActBtns(f.repoName,f.fileName,sf,f.sha,false)}</div></div></div>`;
    };

    let html = '';
    if(currentView === 'gallery' || currentView === 'feed') {
        cont.className = currentView === 'gallery' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' : 'flex flex-col max-w-3xl mx-auto w-full';
        if(p.length) { html += `<h3 class="col-span-full font-bold mb-2 text-[#FF9500] text-lg border-b cms-border pb-2">📌 Đã ghim</h3>`; p.forEach(f=>html+=renderCard(f,currentView)); }
        if(u.length) { if(p.length) html += `<h3 class="col-span-full font-bold mt-4 mb-2 text-lg border-b cms-border pb-2">Khác</h3>`; u.forEach(f=>html+=renderCard(f,currentView)); }
    } else {
        cont.className = currentView === 'kanban' ? 'flex kanban-scroll overflow-x-auto gap-6 pb-6 items-start min-h-[70vh]' : 'flex flex-col gap-6';
        let groups = {}; if(p.length) groups['📌 Đã ghim']=p; u.forEach(f=>{if(!groups[f.repoName])groups[f.repoName]=[]; groups[f.repoName].push(f);});
        
        Object.keys(groups).sort((a,b)=>a==='📌 Đã ghim'?-1:b==='📌 Đã ghim'?1:0).forEach(k => {
            if(currentView === 'kanban') { html += `<div class="w-[320px] shrink-0 cms-input rounded-2xl flex flex-col h-full max-h-[70vh] border cms-border p-2"><div class="px-3 py-2 flex justify-between items-center font-bold text-sm mb-2 ${k==='📌 Đã ghim'?'text-[#FF9500]':''} cursor-pointer hover:opacity-70 transition" onclick="if('${k}'!=='📌 Đã ghim'){filterByRepo('${k}')}"><span>${k}</span><span class="cms-card px-2 py-0.5 rounded-full text-[10px] border-none shadow-sm">${groups[k].length}</span></div><div class="overflow-y-auto kanban-scroll space-y-3 px-1 pb-2 flex-1">${groups[k].map(f=>renderCard(f,'kanban')).join('')}</div></div>`;
            } else if(currentView === 'table') { groups[k].sort((a,b)=>tableSort.by==='name'?(tableSort.dir==='asc'?(a.name||"").localeCompare(b.name||""):(b.name||"").localeCompare(a.name||"")):(tableSort.dir==='asc'?(a.timestamp||0)-(b.timestamp||0):(b.timestamp||0)-(a.timestamp||0)));
                html += `<details open class="mb-4"><summary class="font-bold text-lg mb-2 cursor-pointer border-b cms-border pb-2 flex items-center gap-2 outline-none ${k==='📌 Đã ghim'?'text-[#FF9500]':''}">${k} <span class="text-sm text-muted">(${groups[k].length})</span></summary><div class="cms-card overflow-x-auto"><table class="w-full text-left text-sm min-w-[800px]"><tr class="cms-input text-muted text-[10px] uppercase tracking-wider border-b cms-border"><th class="p-3 w-8"></th><th class="p-3 cursor-pointer hover:underline" onclick="sortTable('name')">Bài viết ${tableSort.by==='name'?(tableSort.dir==='asc'?'↑':'↓'):'↕'}</th><th class="p-3">Mô tả</th><th class="p-3 w-32 cursor-pointer hover:underline" onclick="sortTable('date')">Cập nhật ${tableSort.by==='date'?(tableSort.dir==='asc'?'↑':'↓'):'↕'}</th><th class="p-3 text-center w-40">Thao tác</th></tr>${groups[k].map(f=>{const sN=(f.fileName||"").replace(/'/g,"\\'"), c=db.colors[`${f.repoName}/${f.fileName}`], d=c&&getContrastYIQ(c)==='#FFFFFF'?'text-white':'', chk=bulkSet.has(`${f.repoName}|${f.fileName}|${f.sha}`) ? 'checked':''; return `<tr class="border-b cms-border hover:bg-[var(--bg-hover)] transition ${d}" style="${c?`background-color:${c};`:''}"><td class="p-3 text-center"><input type="checkbox" class="accent-[#007AFF] w-4 h-4 cursor-pointer" onclick="toggleFileSelection('${f.repoName}','${sN}','${f.sha}',event)" ${chk}></td><td class="p-3"><a href="${f.url}" target="_blank" class="font-bold hover:text-[var(--accent)] text-[15px]">${f.name}</a><div class="mt-1 flex flex-wrap gap-1">${getTagsH(f.repoName,f.fileName)}${getLnkH(f.repoName,f.fileName)}</div></td><td class="p-3 text-xs opacity-70 line-clamp-2 max-w-[200px] leading-relaxed">${f.preview||''}</td><td class="p-3 text-xs opacity-80 whitespace-nowrap">${f.fullDate}</td><td class="p-3"><div class="flex gap-1 justify-center">${getActBtns(f.repoName,f.fileName,sN,f.sha,false)}</div></td></tr>`}).join('')}</table></div></details>`;
            } else { html += `<details open class="mb-6"><summary class="font-bold text-xl mb-4 border-b cms-border pb-2 cursor-pointer outline-none ${k==='📌 Đã ghim'?'text-[#FF9500]':''} flex items-center gap-2" onclick="const e = document.getElementById('upload-repo'); if(e) e.value='${k==='📌 Đã ghim'?'':username+'/'+k}'; event.stopPropagation();"><svg class="w-6 h-6"><use href="${k==='📌 Đã ghim'?'#icon-pin-filled':'#icon-folder'}"></use></svg>${k} <span class="cms-input text-xs px-2 py-0.5 rounded-full border cms-border">${groups[k].length}</span></summary><div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">${groups[k].map(f=>renderCard(f,'list')).join('')}</div></details>`; }
        });
    } cont.innerHTML = html;
}

        // 8. TASKS & POMO
        window.renderTasks = function() { const c=$('native-task-list'), b=$('task-count-badge'); if(!c) return; if(!Array.isArray(db.tasks)) db.tasks = []; let ac=db.tasks.filter(t=>!t.completed).length; if(b) b.innerText=ac||'✓'; if(!db.tasks.length) return c.innerHTML='<div class="text-center py-8 opacity-50 text-sm">Trống</div>'; c.innerHTML=db.tasks.sort((a,b)=>a.completed===b.completed?b.id-a.id:a.completed?1:-1).map(t=>`<div class="cms-card p-3 flex flex-col gap-2 border cms-border shadow-sm hover:scale-[1.01] transition group ${t.completed?'opacity-50':''}"><div class="flex gap-2"><input type="checkbox" class="mt-1 accent-[#007AFF] w-4 h-4 cursor-pointer" ${t.completed?'checked':''} onchange="toggleT(${t.id})"><span class="flex-1 text-sm font-medium leading-tight cursor-pointer" onclick="toggleT(${t.id})">${t.title}</span><button type="button" onclick="delT(${t.id})" class="text-red-500 font-bold px-1 opacity-0 group-hover:opacity-100 transition">✕</button></div>${t.image?`<img src="${t.image}" class="w-full rounded-lg border cms-border max-h-48 object-cover cursor-pointer" onclick="window.open('${t.image}')">`:''}</div>`).join(''); }
        window.addNativeTask = function() { if(!requireToken())return; const input=$('native-task-input'); if(!input) return; const v=input.value.trim(); if(v){ db.tasks.unshift({id:Date.now(),title:v,completed:false}); input.value=''; _saveLocal(); renderTasks(); _syncSilent(); } }
        window.toggleT = function(id) { if(!requireToken())return; let t=db.tasks.find(x=>x.id===id); if(t){t.completed=!t.completed;_saveLocal();renderTasks();_syncSilent();} }
        window.delT = function(id) { if(!requireToken())return; let t=db.tasks.find(x=>x.id===id); db.tasks=db.tasks.filter(x=>x.id!==id); _saveLocal(); renderTasks(); if(t?.image?.includes('task_images/')){ fetch(`https://api.github.com/repos/${username}/${username}.github.io/contents/task_images/img_${id}.png?t=${Date.now()}`,{headers:getHeaders()}).then(r=>r.json()).then(d=>{if(d.sha)fetch(d.url,{method:'DELETE',headers:{'Authorization':`Bearer ${getToken()}`},body:JSON.stringify({message:"Del Task",sha:d.sha})})}); } _syncSilent(); }
        
        const nti = $('native-task-input');
        if(nti) { nti.addEventListener('paste', e=>{ if(!requireToken())return e.preventDefault(); for(let i of e.clipboardData.items) if(i.type.indexOf('image')===0){ e.preventDefault(); const r=new FileReader(); r.onload=async ev=>{ const b64=ev.target.result, tid=Date.now(), tit=$('native-task-input').value.trim()||'Ảnh dán'; db.tasks.unshift({id:tid,title:tit+' (Đang tải...)',completed:false,image:b64}); $('native-task-input').value=''; renderTasks(); try{ const res=await fetch(`https://api.github.com/repos/${username}/${username}.github.io/contents/task_images/img_${tid}.png`,{method:'PUT',headers:{'Authorization':`Bearer ${getToken()}`,'Content-Type':'application/json'},body:JSON.stringify({message:'Up img',content:b64.split(',')[1]})}); if(res.ok){ let t=db.tasks.find(x=>x.id===tid); if(t){ t.title=tit; t.image=(await res.json()).content.download_url; _saveLocal(); renderTasks(); _syncSilent();} } }catch(er){let t=db.tasks.find(x=>x.id===tid); if(t){t.title=tit+' (Lỗi)'; renderTasks();}} }; r.readAsDataURL(i.getAsFile()); break; } }); }

        let pInt, pTime=1500; const btnStart = $('pomo-start');
        if(btnStart) { btnStart.addEventListener('click', async()=>{ if("Notification" in window&&Notification.permission!=="granted"&&Notification.permission!=="denied") await Notification.requestPermission(); const b=$('pomo-start'); if(b.innerText==='BẮT ĐẦU'){ b.innerText='DỪNG LẠI'; b.classList.replace('cms-btn-primary','bg-[#FF9500]'); b.style.color="#FFF"; pInt=setInterval(()=>{pTime--; const m=Math.floor(pTime/60),s=pTime%60; $('pomo-main-time').innerText=`${m<10?'0':''}${m}:${s<10?'0':''}${s}`; $('pomo-mini-time').innerText=`${m<10?'0':''}${m}:${s<10?'0':''}${s}`; document.title=`(${m<10?'0':''}${m}:${s<10?'0':''}${s}) CMS`; if(pTime<=0){clearInterval(pInt); pTime=1500; b.innerText='BẮT ĐẦU'; b.classList.replace('bg-[#FF9500]','cms-btn-primary'); b.style.color=""; alert("Hết giờ!"); try{$('pomo-audio').src=$('pomo-sound').value;$('pomo-audio').play();}catch(e){} const w=$('pomo-webhook-url').value; if(w) fetch(w.startsWith('http')?w:`https://ntfy.sh/${w}`,{method:'POST',body:`Nhiệm vụ: ${$('pomo-task').value||'Xong'}`,headers:{'Title':'🍅 CMS Pomo','Tags':'alarm_clock'}}); } },1000); } else { clearInterval(pInt); b.innerText='BẮT ĐẦU'; b.classList.replace('bg-[#FF9500]','cms-btn-primary'); b.style.color=""; } }); }
        const btnReset = $('pomo-reset');
        if(btnReset) { btnReset.addEventListener('click', ()=>{ clearInterval(pInt); pTime=parseInt(document.querySelector('.pomo-tab.active')?.getAttribute('data-time')||1500); const m=Math.floor(pTime/60),s=pTime%60; $('pomo-main-time').innerText=`${m<10?'0':''}${m}:${s<10?'0':''}${s}`; $('pomo-mini-time').innerText=`${m<10?'0':''}${m}:${s<10?'0':''}${s}`; const b=$('pomo-start'); b.innerText='BẮT ĐẦU'; b.classList.replace('bg-[#FF9500]','cms-btn-primary'); b.style.color=""; }); }
        document.querySelectorAll('.pomo-tab').forEach(t=>t.addEventListener('click', e=>{ document.querySelectorAll('.pomo-tab').forEach(x=>{x.className='flex-1 cms-input py-1.5 rounded-lg text-xs font-bold pomo-tab border cms-border'}); e.target.className='flex-1 cms-btn-primary py-1.5 rounded-lg text-xs font-bold pomo-tab active'; pTime=parseInt(e.target.getAttribute('data-time')); $('pomo-reset')?.click(); }));
        window.saveWebhookSettings = function(){ safeSetLocal('cms_pomo_webhook', $('pomo-webhook-url').value.trim()); alert('Lưu Topic thành công!'); $('webhook-settings').classList.add('hidden'); }

        // 9. MODALS
        function _injectModals() {
            const h = `
            <div id="tag-modal-overlay" class="hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-[999999] items-center justify-center transition-opacity"><div class="cms-card p-6 max-w-sm w-full mx-4 border cms-border"><h3 class="text-xl font-bold mb-1 flex items-center gap-2"><svg class="svg-icon"><use href="#icon-tag"></use></svg> Gắn Nhãn</h3><input type="text" id="tag-modal-input" onkeypress="if(event.key === 'Enter') saveTagModal()" class="w-full px-3 py-2 cms-input border cms-border rounded-lg text-sm font-bold text-[var(--accent)] mb-4 mt-4" placeholder="Ví dụ: AI, Note..."><div class="mb-6"><span class="text-[11px] font-bold text-muted uppercase mb-2 block tracking-wider">Gợi ý từ hệ thống</span><div id="tag-modal-suggestions" class="flex flex-wrap gap-2 max-h-40 overflow-y-auto kanban-scroll min-h-[40px]"></div></div><div class="flex justify-end gap-3"><button type="button" onclick="closeModal('tag-modal-overlay')" class="cms-btn px-5 py-2 rounded-lg text-sm font-bold">Hủy</button><button type="button" onclick="saveTagModal()" class="cms-btn-primary px-5 py-2 rounded-lg text-sm">Lưu</button></div></div></div>
            <div id="link-modal-overlay" class="hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-[999999] items-center justify-center transition-opacity"><div class="cms-card p-6 max-w-md w-full mx-4 flex flex-col max-h-[85vh] border cms-border"><h3 class="text-xl font-bold mb-4 flex items-center gap-2"><svg class="svg-icon"><use href="#icon-link"></use></svg> Link Tham Khảo</h3><div id="link-modal-list" class="flex-1 overflow-y-auto kanban-scroll space-y-3 mb-4 cms-input p-3 rounded-xl min-h-[100px] border cms-border"></div><button type="button" onclick="addLinkItem()" class="mb-5 cms-btn text-[var(--accent)] px-4 py-2.5 rounded-xl text-sm font-bold w-full shadow-sm">+ Thêm Link</button><div class="flex justify-end gap-3 mt-auto"><button type="button" onclick="closeModal('link-modal-overlay')" class="cms-btn px-5 py-2 rounded-lg text-sm font-bold">Hủy</button><button type="button" onclick="saveLinkModal()" class="cms-btn-primary px-5 py-2 rounded-lg text-sm">Lưu</button></div></div></div>
            <div id="color-modal-overlay" class="hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-[999999] items-center justify-center transition-opacity"><div class="cms-card p-6 max-w-sm w-full mx-4 border cms-border"><h3 class="text-xl font-bold mb-4 flex items-center gap-2"><svg class="svg-icon"><use href="#icon-palette"></use></svg> Đổi màu</h3><div class="flex gap-3 mb-6"><button type="button" onclick="applyColor('#FFF9B1')" class="w-8 h-8 rounded-full border shadow-sm hover:scale-110 transition" style="background:#FFF9B1"></button><button type="button" onclick="applyColor('#FCE6C1')" class="w-8 h-8 rounded-full border shadow-sm hover:scale-110 transition" style="background:#FCE6C1"></button><button type="button" onclick="applyColor('#E4F9E0')" class="w-8 h-8 rounded-full border shadow-sm hover:scale-110 transition" style="background:#E4F9E0"></button><button type="button" onclick="applyColor('#E0F2FE')" class="w-8 h-8 rounded-full border shadow-sm hover:scale-110 transition" style="background:#E0F2FE"></button><button type="button" onclick="applyColor('#F3E8FD')" class="w-8 h-8 rounded-full border shadow-sm hover:scale-110 transition" style="background:#F3E8FD"></button></div><div id="custom-colors-container" class="flex flex-wrap gap-3 mb-3 empty:hidden"></div><div class="flex items-center gap-2 cms-input p-2 rounded-xl border cms-border mb-4"><input type="color" id="new-color-picker" value="#333333" class="w-8 h-8 p-0 border-0 rounded cursor-pointer bg-transparent"><button type="button" onclick="addCustomColor()" class="flex-1 cms-btn text-xs font-bold py-1.5 rounded-lg">Thêm màu này</button></div><div class="flex justify-between items-center border-t cms-border pt-4 mt-2"><button type="button" onclick="removeColor()" class="text-red-500 bg-red-50 dark:bg-red-900/30 px-4 py-2 rounded-xl text-sm font-bold">Xóa màu</button><button type="button" onclick="closeModal('color-modal-overlay')" class="cms-btn px-5 py-2 rounded-lg text-sm font-bold">Đóng</button></div></div></div>
            <div id="create-repo-overlay" class="hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-[999999] items-center justify-center transition-opacity"><div class="cms-card p-6 max-w-sm w-full mx-4 border cms-border"><h3 class="text-xl font-bold mb-4 flex items-center gap-2"><svg class="svg-icon"><use href="#icon-folder"></use></svg> Tạo Kho (Repo)</h3><input type="text" id="new-repo-name" class="w-full px-3 py-2 cms-input border cms-border rounded-lg text-sm mb-6" placeholder="Tên Repo..."><div class="flex justify-end gap-3"><button type="button" onclick="closeModal('create-repo-overlay')" class="cms-btn px-4 py-2 rounded-lg font-bold text-sm">Hủy</button><button type="button" onclick="submitCreateRepo()" id="btn-submit-create-repo" class="cms-btn-primary px-4 py-2 rounded-lg text-sm">Tạo</button></div></div></div>
            <div id="rename-repo-overlay" class="hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-[999999] items-center justify-center transition-opacity"><div class="cms-card p-6 max-w-sm w-full mx-4 border cms-border"><h3 class="text-xl font-bold mb-4 flex items-center gap-2"><svg class="svg-icon"><use href="#icon-edit"></use></svg> Đổi tên Repo</h3><input type="hidden" id="rename-repo-old-name"><input type="text" id="rename-repo-new-name" class="w-full px-3 py-2 cms-input border cms-border rounded-lg text-sm mb-6"><div class="flex justify-end gap-3"><button type="button" onclick="closeModal('rename-repo-overlay')" class="cms-btn px-4 py-2 rounded-lg font-bold text-sm">Hủy</button><button type="button" onclick="submitRenameRepo()" id="btn-submit-rename-repo" class="cms-btn-primary px-4 py-2 rounded-lg text-sm">Lưu</button></div></div></div>
            <div id="move-file-overlay" class="hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-[999999] items-center justify-center transition-opacity"><div class="cms-card p-6 max-w-sm w-full mx-4 border cms-border"><h3 class="text-xl font-bold mb-2 flex items-center gap-2"><svg class="svg-icon"><use href="#icon-move"></use></svg> Chuyển Bài</h3><p id="move-file-desc" class="text-sm text-muted mb-4 truncate"></p><select id="move-target-repo" class="w-full px-3 py-2 cms-input border cms-border rounded-lg text-sm mb-6"></select><div class="flex justify-end gap-3"><button type="button" onclick="closeModal('move-file-overlay')" class="cms-btn px-4 py-2 rounded-lg font-bold text-sm">Hủy</button><button type="button" onclick="submitMoveFile()" id="btn-submit-move-file" class="cms-btn-primary px-4 py-2 rounded-lg text-sm">Chuyển</button></div></div></div>
            <div id="bulk-move-overlay" class="hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-[999999] items-center justify-center transition-opacity"><div class="cms-card p-6 max-w-sm w-full mx-4 border cms-border"><h3 class="text-xl font-bold mb-4 flex items-center gap-2"><svg class="svg-icon"><use href="#icon-move"></use></svg> Chuyển Hàng Loạt</h3><p class="text-sm text-muted mb-2">Đang chọn <span id="bulk-move-count-display" class="font-bold text-[var(--accent)]">0</span> bài.</p><select id="bulk-move-target-repo" class="w-full px-3 py-2 cms-input border cms-border rounded-lg text-sm mb-2"></select><p id="bulk-move-status" class="text-[10px] text-[#007AFF] italic mb-4 h-4"></p><div class="flex justify-end gap-3"><button type="button" onclick="closeModal('bulk-move-overlay')" class="cms-btn px-4 py-2 rounded-lg font-bold text-sm">Hủy</button><button type="button" onclick="submitBulkMove()" id="btn-submit-bulk-move" class="cms-btn-primary px-4 py-2 rounded-lg text-sm">Chuyển</button></div></div></div>
            `;
            const container = $('modals-container');
            if(container && !container.innerHTML) container.innerHTML = h;
        }

        window.toggleModalTag = function(t) { t=t.replace(/\\'/g,"'").replace(/&quot;/g,'"'); const i=$('tag-modal-input'); let c=i.value.split(',').map(x=>x.trim()).filter(Boolean); if(c.includes(t)) c=c.filter(x=>x!==t); else c.push(t); i.value=c.join(', '); document.querySelectorAll('.tag-suggest-btn').forEach(b=>{const bt=b.getAttribute('data-tag').replace(/\\'/g,"'").replace(/&quot;/g,'"'); b.className=`px-3 py-1.5 text-xs font-bold rounded-lg border transition tag-suggest-btn ${c.includes(bt)?'bg-[var(--accent)] text-white border-transparent':'cms-input text-muted border-[var(--border)] hover:opacity-80'}`}); }
        window.saveTagModal = async function() { if(!requireToken()||!editMeta.tagKey)return; let nt=$('tag-modal-input').value.split(',').map(t=>t.trim()).filter(Boolean); if(nt.length>0)db.tags[editMeta.tagKey]=nt; else delete db.tags[editMeta.tagKey]; closeModal('tag-modal-overlay'); showToast("Đang lưu..."); try{await saveMeta();await saveDB();renderRepos();hideToast();}catch(e){showToast("Lỗi!",true);} }
        window.renameGlobalTag = async function() { if(!requireToken()) return; const o=prompt("Nhập tên Nhãn CŨ:"); if(!o) return; const n=prompt("Tên Nhãn MỚI (để trống để Xóa):",o); if(n===null) return; let ch=false; for(let k in db.tags){let ts=db.tags[k]; if(Array.isArray(ts)){let i=ts.indexOf(o); if(i!==-1){if(n.trim()==="")ts.splice(i,1); else ts[i]=n.trim(); db.tags[k]=[...new Set(ts)]; if(!db.tags[k].length)delete db.tags[k]; ch=true;}}} if(ch){showToast("Đang lưu...");try{await saveMeta();await saveDB();if(activeTag===o)activeTag=n.trim()||'all';renderRepos();hideToast();}catch(e){showToast("Lỗi!",true);}}else alert("Không tìm thấy."); }

        window.toggleFileSelection = function(r, f, sha, e) { if(e) e.stopPropagation(); f=f.replace(/\\'/g,"'").replace(/&quot;/g,'"'); const k=`${r}|${f}|${sha}`; if(bulkSet.has(k)) bulkSet.delete(k); else bulkSet.add(k); updateBulkActionBar(); }
        function updateBulkActionBar() { const b=$('bulk-action-bar'), c=$('bulk-count'); if(bulkSet.size) {b.classList.remove('hidden');b.classList.add('flex');if(c)c.innerText=bulkSet.size;} else {b.classList.replace('flex','hidden');} }
        window.clearBulkSelection = function() { bulkSet.clear(); updateBulkActionBar(); renderRepos(); }
        window.openBulkMoveModal = function() { if(!requireToken()) return; const s=$('bulk-move-target-repo'); s.innerHTML='<option disabled selected>-- Chọn Repo --</option>'; Object.keys(db.repos).forEach(r=>{if(r!=='📌 Đã ghim'&&r!==`${username}.github.io`)s.innerHTML+=`<option value="${r}">${r}</option>`}); s.innerHTML+=`<option value="${username}.github.io">${username}.github.io</option>`; $('bulk-move-count-display').innerText=bulkSet.size; openModal('bulk-move-overlay'); }
        window.submitBulkMove = async function() { const t=$('bulk-move-target-repo').value; if(!t) return alert("Chọn Repo!"); const tk=getToken(); if(!tk) return; if(!confirm(`Chuyển ${bulkSet.size} bài sang [${t}]?`)) return; const btn=$('btn-submit-bulk-move'); btn.innerText="⏳..."; btn.disabled=true; let sC=0, fC=0; const files=Array.from(bulkSet).map(k=>{const p=k.split('|');return{repo:p[0],file:p[1],sha:p[2]}}); try{ for(const f of files){ if(f.repo===t) continue; $('bulk-move-status').innerText=`Chuyển: ${f.file}...`; try{ const gR=await fetchText(`https://api.github.com/repos/${username}/${f.repo}/contents/${safeEnc(f.file)}?t=${Date.now()}`,{headers:{...getHeaders(),'Accept':'application/vnd.github.v3.raw'}}); if(!gR) throw 1; const tS=await getFileShaSafe(`${username}/${t}`,f.file); const eC=await encodeBase64UTF8Async(gR); const pB={message:`Bulk move`,content:eC}; if(tS) pB.sha=tS; const pR=await fetch(`https://api.github.com/repos/${username}/${t}/contents/${safeEnc(f.file)}`,{method:'PUT',headers:{'Authorization':`Bearer ${tk}`,'Content-Type':'application/json'},body:JSON.stringify(pB)}); if(!pR.ok) throw 1; const nMeta=await pR.json(); const oS=await getFileShaSafe(`${username}/${f.repo}`,f.file)||f.sha; await fetch(`https://api.github.com/repos/${username}/${f.repo}/contents/${safeEnc(f.file)}`,{method:'DELETE',headers:{'Authorization':`Bearer ${tk}`,'Content-Type':'application/json'},body:JSON.stringify({message:`Xóa bulk`,sha:oS})}); const oK=`${f.repo}/${f.file}`, nK=`${t}/${f.file}`; if(db.tags[oK]){db.tags[nK]=[...db.tags[oK]];delete db.tags[oK];} if(db.links[oK]){db.links[nK]=[...db.links[oK]];delete db.links[oK];} if(db.colors[oK]){db.colors[nK]=db.colors[oK];delete db.colors[oK];} if(db.titles[oK]){db.titles[nK]=db.titles[oK];delete db.titles[oK];} if(Array.isArray(db.pinned)&&db.pinned.includes(oK)){db.pinned=db.pinned.filter(x=>x!==oK);db.pinned.push(nK);} const idx=db.files.findIndex(x=>x.sha===f.sha||x.url.includes(`/${f.repo}/${f.file}`)); if(idx!==-1){db.files[idx].repoName=t;db.files[idx].sha=nMeta.content.sha;db.files[idx].url=`https://${username}.github.io/${t==username+'.github.io'?'':t+'/'}${f.file}`;} sC++; }catch(e){fC++;} await new Promise(r=>setTimeout(r,200)); } rebuildRepoMap(); await saveMeta(); _saveLocal(); await saveDB(); closeModal('bulk-move-overlay'); clearBulkSelection(); alert(`Xong!\nThành công: ${sC}\nThất bại: ${fC}`); }catch(e){alert(`Lỗi: ${e.message}`);}finally{btn.innerText="Chuyển Tất Cả";btn.disabled=false;$('bulk-move-status').innerText="";} }

        window.openMoveModal = function(r, f, sha) { if(!requireToken()) return; editMeta.mSR=r; editMeta.mFN=f.replace(/\\'/g,"'").replace(/&quot;/g,'"'); editMeta.mFS=sha; $('move-file-desc').innerText=`File: ${editMeta.mFN}`; const s=$('move-target-repo'); s.innerHTML='<option disabled selected>-- Chọn Repo --</option>'; Object.keys(db.repos).forEach(rp=>{if(rp!==editMeta.mSR&&rp!==`${username}.github.io`)s.innerHTML+=`<option value="${rp}">${rp}</option>`}); if(editMeta.mSR!==`${username}.github.io`)s.innerHTML+=`<option value="${username}.github.io">${username}.github.io</option>`; openModal('move-file-overlay'); setTimeout(()=>s.focus(),100); }
        window.submitMoveFile = async function() { const t=$('move-target-repo').value; if(!t||!requireToken()) return; const tk=getToken(), btn=$('btn-submit-move-file'); btn.innerText="⏳..."; btn.disabled=true; try{ const rC=await fetchText(`https://api.github.com/repos/${username}/${editMeta.mSR}/contents/${safeEnc(editMeta.mFN)}`,{headers:{...getHeaders(),'Accept':'application/vnd.github.v3.raw'}}); if(!rC) throw Error("Lỗi đọc gốc"); const tS=await getFileShaSafe(`${username}/${t}`,editMeta.mFN); const pB={message:`Move từ ${editMeta.mSR}`,content:await encodeBase64UTF8Async(rC)}; if(tS) pB.sha=tS; const pR=await fetch(`https://api.github.com/repos/${username}/${t}/contents/${safeEnc(editMeta.mFN)}`,{method:'PUT',headers:{'Authorization':`Bearer ${tk}`,'Content-Type':'application/json'},body:JSON.stringify(pB)}); if(!pR.ok) throw Error("Lỗi ghi đích"); const nM=await pR.json(); const oS=await getFileShaSafe(`${username}/${editMeta.mSR}`,editMeta.mFN)||editMeta.mFS; await fetch(`https://api.github.com/repos/${username}/${editMeta.mSR}/contents/${safeEnc(editMeta.mFN)}`,{method:'DELETE',headers:{'Authorization':`Bearer ${tk}`,'Content-Type':'application/json'},body:JSON.stringify({message:`Xóa do move`,sha:oS})}); const oK=`${editMeta.mSR}/${editMeta.mFN}`, nK=`${t}/${editMeta.mFN}`; let nS=false; if(db.tags[oK]){db.tags[nK]=[...db.tags[oK]];delete db.tags[oK];nS=true;} if(db.links[oK]){db.links[nK]=[...db.links[oK]];delete db.links[oK];nS=true;} if(db.colors[oK]){db.colors[nK]=db.colors[oK];delete db.colors[oK];nS=true;} if(db.titles[oK]){db.titles[nK]=db.titles[oK];delete db.titles[oK];nS=true;} if(Array.isArray(db.pinned)&&db.pinned.includes(oK)){db.pinned=db.pinned.filter(x=>x!==oK);db.pinned.push(nK);nS=true;} if(nS) await saveMeta(); const idx=db.files.findIndex(x=>x.sha===editMeta.mFS); if(idx!==-1){let f=db.files[idx]; f.repoName=t; f.sha=nM.content.sha; f.url=`https://${username}.github.io/${t===`${username}.github.io`?'':t+'/'}${editMeta.mFN}`; rebuildRepoMap(); } _saveLocal(); await saveDB(); closeModal('move-file-overlay'); renderRepos(); alert("Chuyển thành công!"); }catch(e){alert(`Lỗi: ${e.message}`);}finally{btn.innerText="Chuyển";btn.disabled=false;} }

        window.openCreateRepoModal = function() { if(!requireToken()) return; $('new-repo-name').value=''; openModal('create-repo-overlay'); setTimeout(()=>$('new-repo-name').focus(),100); }
        window.submitCreateRepo = async function() { const tk=getToken(), n=$('new-repo-name').value.trim(); if(!n||!tk) return; const btn=$('btn-submit-create-repo'); btn.innerText="⏳..."; btn.disabled=true; try{ const r=await fetch('https://api.github.com/user/repos',{method:'POST',headers:{'Authorization':`Bearer ${tk}`,'Content-Type':'application/json'},body:JSON.stringify({name:n,auto_init:true})}); if(!r.ok) throw Error((await r.json()).message); try{await new Promise(x=>setTimeout(x,2000)); await fetch(`https://api.github.com/repos/${username}/${n}/pages`,{method:'POST',headers:{'Authorization':`Bearer ${tk}`,'Accept':'application/vnd.github.v3+json'},body:JSON.stringify({source:{branch:'main',path:'/'}})});}catch(e){} if(!db.repos[n]) db.repos[n]=[]; _saveLocal(); closeModal('create-repo-overlay'); renderRepos(); $('upload-repo').value=`${username}/${n}`; alert(`Tạo xong: ${n}`); }catch(e){alert(`Lỗi: ${e.message}`);}finally{btn.innerText="Tạo";btn.disabled=false;} }

        window.openRenameRepoModal = function(o) { if(!requireToken()) return; if(o===`${username}.github.io`) return alert("Lỗi"); $('rename-repo-old-name').value=o; $('rename-repo-new-name').value=o; openModal('rename-repo-overlay'); setTimeout(()=>$('rename-repo-new-name').focus(),100); }
        window.submitRenameRepo = async function() { const tk=getToken(), o=$('rename-repo-old-name').value, n=$('rename-repo-new-name').value.trim(); if(!n||n===o||!tk) return; const btn=$('btn-submit-rename-repo'); btn.innerText="⏳..."; btn.disabled=true; try{ const r=await fetch(`https://api.github.com/repos/${username}/${o}`,{method:'PATCH',headers:{'Authorization':`Bearer ${tk}`,'Content-Type':'application/json'},body:JSON.stringify({name:n})}); if(!r.ok) throw Error("Lỗi"); const nT={}, nL={}, nC={}, nTi={}; let nP=[]; for(let k in db.tags) nT[k.startsWith(`${o}/`)?k.replace(`${o}/`,`${n}/`):k]=db.tags[k]; for(let k in db.links) nL[k.startsWith(`${o}/`)?k.replace(`${o}/`,`${n}/`):k]=db.links[k]; for(let k in db.colors) nC[k.startsWith(`${o}/`)?k.replace(`${o}/`,`${n}/`):k]=db.colors[k]; for(let k in db.titles) nTi[k.startsWith(`${o}/`)?k.replace(`${o}/`,`${n}/`):k]=db.titles[k]; if(Array.isArray(db.pinned)) db.pinned.forEach(k=>nP.push(k.startsWith(`${o}/`)?k.replace(`${o}/`,`${n}/`):k)); db.tags=nT; db.links=nL; db.colors=nC; db.titles=nTi; db.pinned=nP; await saveMeta(); db.files.forEach(f=>{if(f.repoName===o){f.repoName=n;f.url=f.url.replace(`/${o}/`,`/${n}/`);}}); rebuildRepoMap(); _saveLocal(); await saveDB(); if($('upload-repo').value===`${username}/${o}`) $('upload-repo').value=`${username}/${n}`; closeModal('rename-repo-overlay'); renderRepos(); alert("Xong!"); }catch(e){alert(`Lỗi`);}finally{btn.innerText="Lưu";btn.disabled=false;} }

        window.compileAllForNotebookLM = async function() {
            if(!requireToken()||!confirm("🚀 XUẤT SIÊU SÁCH CHO NOTEBOOKLM (LẤY MỚI 100%)\nMất khoảng 20-30s. Bắt đầu?")) return;
            showToast("Lấy danh sách Repo..."); try {
                const rs=await fetchJSON(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100&t=${Date.now()}`,{headers:getHeaders()}); if(!rs) throw Error("Lỗi API List");
                let ct=`SIÊU SÁCH KIẾN THỨC: ${username.toUpperCase()}\n====================================\n\n`, tc=0;
                for(let rp of rs){ const fs=await fetchJSON(`https://api.github.com/repos/${username}/${rp.name}/contents/?t=${Date.now()}`,{headers:getHeaders()}); if(!Array.isArray(fs))continue;
                    const hFs=fs.filter(f=>f.name.endsWith('.html')&&!(rp.name===`${username}.github.io`&&(f.name==='index.html'||f.name==='fix-url.html'||f.name.endsWith('.json')))); if(hFs.length){ct+=`\n\n[KHO: ${rp.name.toUpperCase()}]\n\n`;}
                    for(const f of hFs){ tc++; showToast(`Đang trích xuất: ${f.name}...`); let sN=f.name; try{sN=decodeURIComponent(f.name);}catch(e){} const rC=await fetchText(`https://api.github.com/repos/${username}/${rp.name}/contents/${safeEnc(sN)}?t=${Date.now()}`,{headers:{...getHeaders(),'Accept':'application/vnd.github.v3.raw'}}); if(rC){ const d=new DOMParser().parseFromString(rC,'text/html'); d.querySelectorAll('script,style,nav,header,footer,iframe,svg,button').forEach(x=>x.remove()); const ti=(db.titles&&db.titles[`${rp.name}/${f.name}`])||sN.replace('.html',''); ct+=`BÀI: ${ti}\n[Nội dung]\n${(d.body.innerText||d.body.textContent||"").replace(/\n{3,}/g,'\n\n').trim()}\n------------------------\n\n`; } await new Promise(r=>setTimeout(r,50)); } }
                ct=ct.replace('====================================',`Tổng số bài: ${tc}\n====================================`);
                showToast("Lưu Siêu Sách lên Github..."); const fn=`notebooklm_ALL.txt`, sS=await getFileShaSafe(`${username}/${username}.github.io`,fn); 
                const encodedChunked = await encodeBase64UTF8Async(ct);
                await fetch(`https://api.github.com/repos/${username}/${username}.github.io/contents/${fn}`,{method:'PUT',headers:{'Authorization':`Bearer ${getToken()}`,'Content-Type':'application/json'},body:JSON.stringify({message:`Đóng gói Siêu sách`,content:encodedChunked,sha:sS||undefined})});
                if(DRIVE_WEBHOOK_URL){ showToast("Đẩy lên Google Drive..."); try{await fetch(DRIVE_WEBHOOK_URL,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain'},body:ct});}catch(e){} }
                showToast("✅ Đóng gói xong!"); const u=`https://${username}.github.io/${fn}`; try{await navigator.clipboard.writeText(u);}catch(e){} setTimeout(()=>prompt(`🎉 XONG! Link đã Copy:\n(Dán vào NotebookLM)`,u),500);
            } catch(e) { alert(`Lỗi: ${e.message}`); } finally { hideToast(); }
        }

        window.copyEditorToSubstack = async function() {
            const c=$('upload-content').value; if(!c) return alert("Trống!");
            const btn=$('btn-copy-editor'), oT=btn.innerHTML; btn.innerHTML="⏳..."; btn.disabled=true;
            try{
                const d=new DOMParser().parseFromString(c,'text/html');
                d.querySelectorAll('head,style,script,svg,iframe,nav,footer,header,meta,title').forEach(e=>e.remove());
                d.body.querySelectorAll('*').forEach(e=>{const t=e.tagName.toLowerCase(),h=e.getAttribute('href'),s=e.getAttribute('src'),a=e.getAttribute('alt'); while(e.attributes.length>0)e.removeAttribute(e.attributes[0].name); if(t==='a'&&h)e.setAttribute('href',h); if(t==='img'&&s){e.setAttribute('src',s);e.setAttribute('alt',a||'');}});
                await navigator.clipboard.write([new ClipboardItem({'text/html':new Blob([d.body.innerHTML],{type:'text/html'}),'text/plain':new Blob([d.body.textContent],{type:'text/plain'})})]);
                btn.innerHTML="✅ Đã Copy"; btn.classList.add('text-[var(--accent)]');
            }catch(e){alert("Lỗi: "+e.message);}finally{setTimeout(()=>{btn.innerHTML=oT;btn.classList.remove('text-[var(--accent)]');btn.disabled=false;},2000);}
        }

        window.confirmDeleteFromForm = async function() {
            if(!requireToken())return; const rp=$('original-repo').value, fs=$('original-sha').value; let fn=$('original-filename').value; try{fn=decodeURIComponent(fn);}catch(e){}
            if(!rp||!fn||!fs) return alert("Không tìm thấy gốc.");
            if(!confirm(`CẢNH BÁO: Xóa vĩnh viễn bài:\n[ ${fn} ]?`)) return;
            const btn=$('btn-delete'), ot=btn.innerHTML; btn.innerHTML="⏳..."; btn.disabled=true;
            try {
                const res=await fetch(`https://api.github.com/repos/${rp}/contents/${safeEnc(fn)}`,{method:'DELETE',headers:{'Authorization':`Bearer ${getToken()}`,'Content-Type':'application/json'},body:JSON.stringify({message:`Xóa bài: ${fn}`,sha:fs})});
                if(!res.ok) throw Error("Lỗi API Github");
                db.files=db.files.filter(x=>x.sha!==fs); const rn=rp.split('/')[1]||rp.split('/')[0], k=`${rn}/${fn}`;
                if(db.tags[k])delete db.tags[k]; if(db.links[k])delete db.links[k]; if(db.colors[k])delete db.colors[k]; if(db.titles[k])delete db.titles[k]; if(Array.isArray(db.pinned)) db.pinned=db.pinned.filter(x=>x!==k);
                rebuildRepoMap(); await saveMeta(); await saveDB(); clearUploadForm(); renderRepos(); renderRepoSuggestions(); alert("Đã xóa!");
            }catch(e){alert(`Lỗi: ${e.message}`);btn.innerHTML=ot;btn.disabled=false;}
        }

        window.editFileContent = async function(rN, f, sha) { 
            if(!requireToken()) return; f=f.replace(/\\'/g,"'").replace(/&quot;/g,'"'); 
            if($('upload-section') && $('upload-section').classList.contains('hidden')) toggleUpload(); window.scrollTo({top:0,behavior:'smooth'}); 
            const st=$('upload-status'); st.style.display='block'; st.className="text-sm mt-3 px-4 py-3 font-bold rounded-xl cms-input text-[var(--accent)] animate-pulse border cms-border"; st.innerText=`Đang nạp...`; 
            try { 
                let sN=f; try{sN=decodeURIComponent(f);}catch(e){} let fs=sha, c=""; 
                const r=await fetchText(`https://api.github.com/repos/${username}/${rN}/contents/${safeEnc(sN)}?t=${Date.now()}`,{headers:{...getHeaders(),'Accept':'application/vnd.github.v3.raw'}}); 
                if(r){c=r.replace(WIDGET_REGEX,''); if(!fs)fs=await getFileShaSafe(`${username}/${rN}`,sN)||"";}else throw Error("File bị xóa."); 
                $('upload-content').value=c; let rp=rN===username||rN===`${username}.github.io`?`${username}/${username}.github.io`:`${username}/${rN}`; $('upload-repo').value=rp; $('original-repo').value=rp; $('original-filename').value=sN; $('original-sha').value=fs; $('btn-create').innerHTML='Lưu (Ctrl S)'; if($('btn-delete')) $('btn-delete').classList.remove('hidden'); 
                let rName=rN===username||rN===`${username}.github.io`?`${username}.github.io`:rN; if(rName.includes('/'))rName=rName.split('/')[1]||rName.split('/')[0]; 
                $('upload-title').value=db.titles[`${rName}/${sN}`]||sN.replace('.html',''); $('upload-filename').value=sN.replace('.html',''); isSlugEdited=true; $('upload-tags').value=(db.tags[`${rName}/${sN}`]||[]).join(', '); syncUploadTagsUI(); uploadLinksTemp=db.links[`${rName}/${sN}`]?JSON.parse(JSON.stringify(db.links[`${rName}/${sN}`])):[]; renderUploadLinks(); 
                st.innerText="✅ Đã nạp thành công."; st.className="text-sm mt-3 px-4 py-3 font-bold rounded-xl bg-green-50 text-green-600 border border-green-500/30"; 
            }catch(e){ st.innerText=`❌ Lỗi: ${e.message}`; st.className="text-sm mt-3 px-4 py-3 font-bold rounded-xl bg-red-50 text-red-500 border border-red-500/30"; } 
        }
        
        window.createFile = async function() {
            if(!requireToken()) return; const t=getToken(); let rp=$('upload-repo').value.trim().replace(/\/$/,''); let rt=$('upload-title').value.trim(); let rs=$('upload-filename').value.trim(); let n=rs;
            if(rs.toLowerCase()==='index'||rs.toLowerCase()==='index.html') n='index.html'; else if(rs.toLowerCase()!=='metadata.json'){ rs=rs.replace(/\.html$/i,''); let sN=slugify(rs); let tags=$('upload-tags').value.split(',').map(x=>x.trim()).filter(Boolean); if(tags.length&&sN){let ts=slugify(tags.join('-'));if(!sN.includes(ts))sN+='-'+ts;} if(!sN)sN=slugify(rt); if(!sN)return alert("Lỗi tên file!"); n=sN+'.html'; $('upload-filename').value=sN; }
            let ct=$('upload-content').value; const oR=$('original-repo').value; let oN=$('original-filename').value; try{oN=decodeURIComponent(oN);}catch(e){} const oS=$('original-sha').value, st=$('upload-status'), btn=$('btn-create'); if(!rp||!n||!ct) return alert("Thiếu dữ liệu!");
            ct=ct.replace(WIDGET_REGEX,''); if(n.endsWith('.html')&&n!=='index.html'&&n!=='fix-url.html'){if(ct.includes('</body>'))ct=ct.replace('</body>',CMS_PIN_WIDGET+'</body>');else ct+=CMS_PIN_WIDGET;}
            try{localStorage.setItem('github_pat',t);}catch(e){} checkTokenUI(); btn.innerHTML="⏳..."; btn.disabled=true; st.style.display='block'; st.className="text-sm mt-3 px-4 py-3 font-bold rounded-xl cms-input text-[var(--accent)] animate-pulse border cms-border"; st.innerText="Đang lưu...";
            try {
                let tS=await getFileShaSafe(rp,n); const b64=await encodeBase64UTF8Async(ct); const bd={message:`Cập nhật: ${n}`,content:b64}; if(tS)bd.sha=tS;
                const res=await fetch(`https://api.github.com/repos/${rp}/contents/${safeEnc(n)}`,{method:'PUT',headers:{'Authorization':`Bearer ${t}`,'Content-Type':'application/json'},body:JSON.stringify(bd)}); if(!res.ok) throw Error((await res.json()).message); const rd=await res.json();
                let isR=oN&&oR&&(oN!==n||oR!==rp); if(isR&&oS){ await fetch(`https://api.github.com/repos/${oR}/contents/${safeEnc(oN)}`,{method:'DELETE',headers:{'Authorization':`Bearer ${t}`,'Content-Type':'application/json'},body:JSON.stringify({message:`Xóa file cũ`,sha:oS})}); const ok=`${oR.split('/')[1]||oR.split('/')[0]}/${oN}`; if(db.tags[ok])delete db.tags[ok]; if(db.links[ok])delete db.links[ok]; if(db.colors[ok])delete db.colors[ok]; if(db.titles[ok])delete db.titles[ok]; if(Array.isArray(db.pinned)) db.pinned=db.pinned.filter(x=>x!==ok); }
                let rO=rp.split('/')[0], rN=rp.split('/')[1]||rp.split('/')[0], nT=$('upload-tags').value.split(',').map(x=>x.trim()).filter(Boolean), fK=`${rN}/${n}`;
                if(nT.length)db.tags[fK]=[...new Set(nT)]; else delete db.tags[fK]; let fL=uploadLinksTemp.filter(x=>x.title.trim()&&x.url.trim()); if(fL.length)db.links[fK]=fL; else delete db.links[fK]; if(rt)db.titles[fK]=rt;
                if(isR){ if(db.colors[`${oR.split('/')[1]||oR.split('/')[0]}/${oN}`])db.colors[fK]=db.colors[`${oR.split('/')[1]||oR.split('/')[0]}/${oN}`]; if(Array.isArray(db.pinned) && db.pinned.includes(`${oR.split('/')[1]||oR.split('/')[0]}/${oN}`))db.pinned.push(fK); }
                const tUrl=`https://${rO}.github.io/${rN===`${rO}.github.io`?'':rN+'/'}${n}`, dt=new Date(), pD=parseHTML(ct,n,tUrl);
                if(n.endsWith('.html')&&n!=='index.html'){
                    if(isR&&oS)db.files=db.files.filter(x=>x.sha!==oS); let ei=db.files.findIndex(x=>x.sha===tS||x.sha===rd.content.sha);
                    if(ei!==-1){ let x=db.files[ei]; x.fileName=n;x.name=rt||decodeURIComponent(n.replace('.html',''));x.url=tUrl;x.timestamp=dt.getTime();x.fullDate=dt.toLocaleString('vi-VN');x.preview=pD.previewText;x.previewFeedHTML=pD.previewFeedHTML;x.tocHTML=pD.tocHTML;x.coverHTML=pD.coverHTML;x.fullText=pD.fullText;x.sha=rd.content.sha; }
                    else db.files.unshift({repoName:rN,name:rt||decodeURIComponent(n.replace('.html','')),fileName:n,sha:rd.content.sha,url:tUrl,downloadUrl:rd.content.download_url||"",timestamp:dt.getTime(),fullDate:dt.toLocaleString('vi-VN'),preview:pD.previewText,previewFeedHTML:pD.previewFeedHTML,tocHTML:pD.tocHTML,coverHTML:pD.coverHTML,fullText:pD.fullText});
                    rebuildRepoMap(); _saveLocal(); renderRepos(); 
                    st.innerText="Đang lưu Database Lõi..."; await saveDB(); 
                } 
                st.innerText="Đang lưu Metadata..."; await saveMeta(); 
                st.className="text-sm mt-3 px-4 py-3 font-bold rounded-xl bg-green-50 text-green-600 border border-green-500/30"; st.innerText=`✅ THÀNH CÔNG!`; clearUploadForm(); setTimeout(()=>window.open(tUrl,'_blank'),1500);
            }catch(e){ 
                st.className="text-sm mt-3 px-4 py-3 font-bold rounded-xl bg-red-50 text-red-500 border border-red-500/30"; st.innerText=`❌ Lỗi: ${e.message}`; 
            }finally{ btn.innerHTML='ĐĂNG BÀI <span class="opacity-70 text-[10px] bg-black/20 px-1.5 py-0.5 rounded ml-1 font-mono uppercase hidden sm:inline-block">Ctrl S</span>'; btn.disabled=false; }
        }
    </script>
</body>
</html>
