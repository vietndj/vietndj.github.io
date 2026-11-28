/* ==========================================================================
   MOTION HUB APP — RENDERING, INSTANT TOC, SEARCH/FILTER & YOUTUBE FACADE
   ========================================================================== */
(function () {
  'use strict';

  function esc(s) {
    return String(s || '').replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }

  var state = { query: '', filter: 'all' };

  function buildVideoStage(v) {
    var isPortrait = String(v.res || '').indexOf('9:16') !== -1;
    var cls = 'mh-vstage' + (isPortrait ? ' portrait' : '');
    if (v.videoUrl) {
      return '<div class="' + cls + '">' +
        '<video controls playsinline preload="metadata" src="' + esc(v.videoUrl) + '"></video>' +
      '</div>';
    }
    if (v.ytId) {
      var thumb = 'https://i.ytimg.com/vi/' + encodeURIComponent(v.ytId) + '/hqdefault.jpg';
      return '<div class="' + cls + '" data-yt="' + esc(v.ytId) + '">' +
        '<div class="mh-yt-poster" role="button" tabindex="0" aria-label="Phát video ' + esc(v.title) + '">' +
          '<img src="' + thumb + '" alt="' + esc(v.title) + '" loading="lazy"/>' +
          '<span class="mh-play-pill">▶ Phát trực tiếp</span>' +
        '</div>' +
      '</div>';
    }
    return '<div class="' + cls + '"><span style="color:#94a3b8;font-size:13px">Chưa gắn nguồn phát</span></div>';
  }

  function buildVideoCard(v) {
    var links = [];
    if (v.localPath) {
      var watchUrl = 'http://127.0.0.1:9000/local-video/watch?path=' + encodeURIComponent(v.localPath);
      links.push('<a class="mh-vlink" href="' + esc(watchUrl) + '" target="_blank" rel="noopener" title="Mở trình tua nhanh 60fps trên máy Mac">🖥️ Chrome 9000</a>');
    }
    if (v.slug && v.slug !== 'mau03-higgsfield-master') {
      links.push('<a class="mh-vlink" href="https://mau.fedu.vn/#' + encodeURIComponent(v.slug) + '" target="_blank" rel="noopener">🎬 Kho mẫu ↗</a>');
    }
    if (v.khoai) {
      var id8 = v.khoai.split('/').pop();
      links.push('<a class="mh-vlink khoai" href="' + esc(v.khoai) + '" target="_blank" rel="noopener">🧠 Luồng ' + esc(id8) + ' ↗</a>');
    }
    if (v.cid) {
      links.push('<a class="mh-vlink" href="conversation://' + esc(v.cid) + '">💬 Mở trên App</a>');
    }
    if (v.ytId) {
      links.push('<a class="mh-vlink" href="https://youtu.be/' + encodeURIComponent(v.ytId) + '" target="_blank" rel="noopener">▶ YouTube ↗</a>');
    }
    return '<article class="mh-vcard">' +
      buildVideoStage(v) +
      '<div class="mh-vbody">' +
        '<div class="mh-vmeta"><span>' + esc(v.date) + ' · ' + esc(v.dur) + '</span><span>' + esc(v.res) + '</span></div>' +
        '<div class="mh-vtitle">' + esc(v.title) + '</div>' +
        '<p class="mh-vnote">' + esc(v.note) + '</p>' +
        '<div class="mh-vlinks">' + links.join('') + '</div>' +
      '</div>' +
    '</article>';
  }

  function matchesQuery(cat, v, q) {
    if (!q) return true;
    var hay = [cat.title, cat.skill, cat.cmd, cat.tag, v.title, v.note, v.slug, v.res, v.khoai].join(' ').toLowerCase();
    return hay.indexOf(q) !== -1;
  }

  function matchesFilter(cat, v, f) {
    if (f === 'all') return true;
    if (f === '9:16') return String(v.res || '').indexOf('9:16') !== -1;
    if (f === '16:9') return String(v.res || '').indexOf('16:9') !== -1;
    return cat.id === f;
  }

  function renderAll() {
    var data = window.MOTION_HUB_DATA || { categories: [] };
    var cats = data.categories || [];
    var q = state.query.trim().toLowerCase();
    var container = document.getElementById('mh-categories');
    var tocList = document.getElementById('mh-toc-cats');
    var threadBody = document.getElementById('mh-threads-tbody');

    var htmlSecs = [];
    var tocItems = [];
    var allThreads = [];
    var seenThread = {};

    cats.forEach(function (cat) {
      cat.threads.forEach(function (t) {
        if (!seenThread[t.id8]) {
          seenThread[t.id8] = true;
          allThreads.push({ id8: t.id8, cid: t.cid, date: t.date, title: t.title, catTitle: cat.num + '. ' + cat.tag, skill: cat.skill });
        }
      });

      var vids = cat.videos.filter(function (v) {
        return matchesFilter(cat, v, state.filter) && matchesQuery(cat, v, q);
      });
      if (!vids.length && (state.filter !== 'all' || q)) return;

      tocItems.push('<li><a href="#' + esc(cat.id) + '">' + esc(cat.num) + '. ' + esc(cat.tag) + ' (' + vids.length + ')</a></li>');

      var badges = (cat.specs || []).map(function (s) {
        return '<span class="mh-badge">' + esc(s) + '</span>';
      }).join('');

      var threadLinks = (cat.threads || []).map(function (t) {
        return '<a class="mh-vlink khoai" href="https://khoai.fedu.vn/c/' + esc(t.id8) + '" target="_blank" rel="noopener" title="' + esc(t.title) + '">🧠 ' + esc(t.id8) + ' (' + esc(t.date.slice(0, 5)) + ') ↗</a>';
      }).join('');

      htmlSecs.push(
        '<section class="mh-sec" id="' + esc(cat.id) + '">' +
          '<div class="mh-sec-head">' +
            '<div>' +
              '<span class="mh-badge accent" style="margin-bottom:8px">Dòng ' + esc(cat.num) + ' · Kỹ năng: ' + esc(cat.skill) + '</span>' +
              '<h2>' + esc(cat.num) + '. ' + esc(cat.title) + '</h2>' +
              '<p class="mh-sec-desc">' + esc(cat.desc) + '</p>' +
            '</div>' +
          '</div>' +
          '<div class="mh-cmd-bar">' +
            '<div><span style="font-size:12px;color:var(--muted);margin-right:8px">Lệnh gọi nhanh:</span><code>' + esc(cat.cmd) + '</code></div>' +
            '<button class="mh-btn" type="button" data-copy="' + esc(cat.cmd) + '">📋 Copy lệnh</button>' +
          '</div>' +
          '<div class="mh-specs">' + badges + '</div>' +
          '<div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center;margin-bottom:16px">' +
            '<span style="font-size:12.5px;color:var(--muted);margin-right:4px">Luồng gốc của dòng này:</span>' + threadLinks +
          '</div>' +
          '<div class="mh-vgrid">' + vids.map(buildVideoCard).join('') + '</div>' +
        '</section>'
      );
    });

    container.innerHTML = htmlSecs.length ? htmlSecs.join('') : '<div class="mh-sec"><p>Không có video nào khớp bộ lọc hiện tại.</p></div>';
    tocList.innerHTML = tocItems.join('');

    allThreads.sort(function (a, b) {
      var pa = a.date.split('/').reverse().join('');
      var pb = b.date.split('/').reverse().join('');
      return pb.localeCompare(pa);
    });
    threadBody.innerHTML = allThreads.map(function (t) {
      return '<tr>' +
        '<td style="white-space:nowrap;font-family:var(--font-mono);font-size:12.5px">' + esc(t.date) + '</td>' +
        '<td><b>' + esc(t.catTitle) + '</b><br/><span style="font-size:12px;color:var(--muted)">' + esc(t.skill) + '</span></td>' +
        '<td>' + esc(t.title) + '</td>' +
        '<td style="white-space:nowrap">' +
          '<a class="mh-vlink khoai" href="https://khoai.fedu.vn/c/' + esc(t.id8) + '" target="_blank" rel="noopener">🧠 ' + esc(t.id8) + ' ↗</a> ' +
          '<a class="mh-vlink" href="conversation://' + esc(t.cid) + '">💬 App</a>' +
        '</td>' +
      '</tr>';
    }).join('');
  }

  document.addEventListener('click', function (e) {
    var poster = e.target.closest('.mh-yt-poster');
    if (poster) {
      var wrap = poster.parentElement;
      var ytId = wrap.getAttribute('data-yt');
      if (ytId) {
        wrap.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(ytId) + '?autoplay=1&rel=0" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>';
      }
      return;
    }
    var copyBtn = e.target.closest('[data-copy]');
    if (copyBtn) {
      var txt = copyBtn.getAttribute('data-copy');
      navigator.clipboard.writeText(txt).then(function () {
        var old = copyBtn.textContent;
        copyBtn.textContent = '✓ Đã chép';
        setTimeout(function () { copyBtn.textContent = old; }, 1400);
      });
      return;
    }
    var chip = e.target.closest('[data-filter]');
    if (chip) {
      state.filter = chip.getAttribute('data-filter');
      document.querySelectorAll('[data-filter]').forEach(function (el) {
        el.classList.toggle('active', el === chip);
      });
      renderAll();
    }
  });

  document.addEventListener('DOMContentLoaded', function () {
    var searchEl = document.getElementById('mh-search');
    if (searchEl) {
      searchEl.addEventListener('input', function () {
        state.query = searchEl.value || '';
        renderAll();
      });
    }
    var themeBtn = document.getElementById('mh-theme-btn');
    if (themeBtn) {
      themeBtn.addEventListener('click', function () {
        var root = document.documentElement;
        var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        root.setAttribute('data-theme', next);
        themeBtn.textContent = next === 'light' ? '🌙 Nền tối' : '☀️ Nền sáng';
      });
    }
    renderAll();
  });
})();
