// --- GOOGLE TASKS ---
const GOOGLE_CLIENT_ID = '69969715731-jeemef1madpjor1gh6m0oqoqnrnda46e.apps.googleusercontent.com'; 
let gtasksTokenClient; let gtasksAccessToken = null;

document.getElementById('gtasks-login-btn').addEventListener('click', () => { gtasksTokenClient.requestAccessToken({prompt: 'consent'}); });

async function fetchGoogleTaskLists() {
    document.getElementById('gtasks-loading').style.display = 'block';
    try {
        const res = await fetch('https://tasks.googleapis.com/tasks/v1/users/@me/lists', { headers: { 'Authorization': `Bearer ${gtasksAccessToken}` } });
        const data = await res.json();
        const sel = document.getElementById('gtasks-list-select'); sel.innerHTML = '';
        if(data.items && data.items.length > 0) {
            data.items.forEach(list => { const option = document.createElement('option'); option.value = list.id; option.textContent = list.title; sel.appendChild(option); });
            fetchGoogleTasks(data.items[0].id); 
        } else { document.getElementById('gtasks-list-container').innerHTML = '<p class="text-xs text-center text-gray-500">Chưa có danh mục.</p>'; }
    } catch (err) {}
    document.getElementById('gtasks-loading').style.display = 'none';
}

document.getElementById('gtasks-list-select').addEventListener('change', (e) => fetchGoogleTasks(e.target.value));

async function fetchGoogleTasks(listId) {
    const container = document.getElementById('gtasks-list-container'); container.innerHTML = ''; document.getElementById('gtasks-loading').style.display = 'block';
    try {
        const res = await fetch(`https://tasks.googleapis.com/tasks/v1/lists/${listId}/tasks?showCompleted=true&showHidden=true`, { headers: { 'Authorization': `Bearer ${gtasksAccessToken}` } });
        const data = await res.json();
        if(data.items && data.items.length > 0) {
            data.items.forEach(task => {
                if(task.title.trim() === "") return; 
                const isC = task.status === 'completed';
                container.innerHTML += `<div class="gtask-item group hover:bg-gray-50 p-2 rounded-lg transition flex items-start gap-2"><input type="checkbox" class="gtask-checkbox" ${isC ? 'checked' : ''} data-id="${task.id}" data-status="${task.status}"><span class="gtask-title ${isC ? 'gtask-completed' : ''}">${task.title}</span></div>`;
            });
        } else { container.innerHTML = '<p class="text-xs text-center text-gray-500 py-6">Mục này rỗng.</p>'; }
    } catch (err) {}
    document.getElementById('gtasks-loading').style.display = 'none';
}

document.getElementById('gtasks-add-btn').addEventListener('click', createNewTask); 
document.getElementById('gtasks-new-input').addEventListener('keypress', (e) => { if (e.key === 'Enter') createNewTask(); });

async function createNewTask() {
    const taskTitle = document.getElementById('gtasks-new-input').value.trim(); const listId = document.getElementById('gtasks-list-select').value;
    if (!taskTitle || !listId) return;
    document.getElementById('gtasks-add-btn').disabled = true;
    try {
        const res = await fetch(`https://tasks.googleapis.com/tasks/v1/lists/${listId}/tasks`, { method: 'POST', headers: { 'Authorization': `Bearer ${gtasksAccessToken}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ title: taskTitle }) });
        if (res.ok) { document.getElementById('gtasks-new-input').value = ''; fetchGoogleTasks(listId); }
    } catch (e) {} finally { document.getElementById('gtasks-add-btn').disabled = false; }
}

document.getElementById('gtasks-list-container').addEventListener('click', async (e) => {
    const listId = document.getElementById('gtasks-list-select').value;
    if (e.target.classList.contains('gtask-checkbox')) {
        const checkbox = e.target; const taskId = checkbox.getAttribute('data-id'); const newStatus = checkbox.getAttribute('data-status') === 'completed' ? 'needsAction' : 'completed';
        checkbox.disabled = true; 
        try { const res = await fetch(`https://tasks.googleapis.com/tasks/v1/lists/${listId}/tasks/${taskId}`, { method: 'PATCH', headers: { 'Authorization': `Bearer ${gtasksAccessToken}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ status: newStatus }) }); if (res.ok) fetchGoogleTasks(listId); else checkbox.disabled = false; } catch(err) { checkbox.disabled = false; }
    }
});

// --- POMODORO ---
(function() {
    let timerInterval, totalSeconds = 1500, secondsLeft = 1500, isRunning = false;
    function updateDisplay() { let m = Math.floor(secondsLeft / 60); let s = secondsLeft % 60; let str = `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`; document.getElementById('pomo-main-time').textContent = str; document.getElementById('pomo-mini-time').textContent = str; document.title = isRunning ? `(${str}) CMS` : "vietndj CMS"; }
    document.getElementById('pomo-start').addEventListener('click', () => { if(!isRunning) { isRunning = true; document.getElementById('pomo-start').textContent="ĐANG CHẠY..."; timerInterval = setInterval(()=>{ secondsLeft--; updateDisplay(); if(secondsLeft<=0){clearInterval(timerInterval); isRunning=false; alert("Hết giờ!"); document.getElementById('pomo-start').textContent="BẮT ĐẦU";}}, 1000);}});
    document.getElementById('pomo-reset').addEventListener('click', () => { clearInterval(timerInterval); isRunning=false; secondsLeft=totalSeconds; document.getElementById('pomo-start').textContent="BẮT ĐẦU"; updateDisplay();});
    document.querySelectorAll('.pomo-tab').forEach(t => t.addEventListener('click', (e)=>{ document.querySelectorAll('.pomo-tab').forEach(b=>{b.style.background='#E5E5EA'; b.style.color='#1D1D1F';}); e.target.style.background='#007AFF'; e.target.style.color='white'; totalSeconds=parseInt(e.target.getAttribute('data-time')); secondsLeft=totalSeconds; updateDisplay();}));
})();