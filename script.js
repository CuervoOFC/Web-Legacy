// --- ACCESO Y SEGURIDAD ---
const spans = document.querySelectorAll('.loader-text span');
spans.forEach((s, i) => s.style.animationDelay = (i * 0.1) + 's');

const tCheck = document.getElementById('terms-check');
const tPanel = document.getElementById('terms-panel');

document.getElementById('btn-read-terms').onclick = () => tPanel.classList.remove('modal-hidden');
document.getElementById('btn-close-terms').onclick = () => tPanel.classList.add('modal-hidden');
document.getElementById('btn-exit-web').onclick = () => {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('error-screen').classList.remove('hidden');
};

document.getElementById('btn-continue').onclick = () => {
    if (tCheck.checked) {
        document.getElementById('loader').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loader').style.display = 'none';
            document.getElementById('panel').style.display = 'block';
            document.getElementById('main-content').style.display = 'flex';
            setTimeout(() => { 
                document.getElementById('panel').style.opacity = '1'; 
                document.getElementById('main-content').style.opacity = '1'; 
            }, 50);
            loadContent('/');
        }, 500);
    } else { alert("ACCESO DENEGADO: Debe aceptar el deslinde de responsabilidades."); }
};

// --- CONTENIDO SPA ---
const contentMap = {
    '/': '<h1>The Legacy Code</h1><p>Sistema Central Operativo. Protocolo de seguridad v2.0.</p>',
    '/apikey': '<h1>API KEY</h1><a href="https://api.the-legacy-code.pro/" target="_blank" class="btn-contact" style="background:var(--primary)">Portal Oficial</a>',
    '/bot': '<h1>SISTEMA BOT</h1><a href="https://bot.the-legacy-code.pro" target="_blank" class="btn-contact" style="background:var(--primary)">Abrir Panel</a>',
    '/hosting': '<h1>HOSTING</h1><div style="display:flex;gap:5px;"><a href="https://dash.the-legacy-code.pro" target="_blank" class="btn-contact" style="background:var(--primary)">Dash</a><a href="https://panel.the-legacy-code.pro" target="_blank" class="btn-contact" style="background:var(--primary)">Panel</a></div>',
    '/contactos': `
        <h1>CONTACTOS Y EQUIPO</h1>
        <div class="contact-section">
            <h3>DUEÑOS</h3>
            <a href="https://wa.me/85295456491" target="_blank" class="btn-contact">ઈ𓅇𝐂𝐮𝐞𝐫𝐯𝐨𝐎𝐅𝐂𓆰ࣩ֟፝𓆪</a>
            <a href="https://wa.me/51921826291" target="_blank" class="btn-contact">𝐒𝐨𝐲𝐌𝐚𝐲𝐜𝐨𝐥 ᴼᶠⁱᶜⁱᵃˡ</a>
        </div>
        <div class="contact-section">
            <h3>COLABORADORES</h3>
            <a href="https://wa.me/573133374132" target="_blank" class="btn-contact">Yo Soy Yo</a>
            <a href="https://wa.me/50493732693" target="_blank" class="btn-contact">ADO (Adonix)</a>
            <a href="https://wa.me/523142183828" target="_blank" class="btn-contact">OptiShield - OFC</a>
        </div>
        <div class="contact-section">
            <h3>REDES <span class="icon-anim">🌙⭐</span></h3>
            <a href="https://whatsapp.com/channel/0029VaM09iJ8F2pDE8GCaB3V" target="_blank" class="btn-contact">MOON&STARS CHANNEL</a>
            <a href="https://chat.whatsapp.com/KxHlg8fxLs8C8ShNFhDmYA" target="_blank" class="btn-contact">MOON&STARS GROUP</a>
        </div>`
};

async function loadContent(path) {
    const wrap = document.querySelector('.content-wrapper');
    if (path === '/user') {
        wrap.innerHTML = '<h1>Escaneando IP...</h1>';
        const res = await fetch('https://ipapi.co/json/');
        const d = await res.json();
        wrap.innerHTML = `<h1>INFO SESIÓN</h1><div class="user-info-container">IP: ${d.ip}<br>Zona: ${d.timezone}</div><div id="user-map"></div>`;
        const map = L.map('user-map').setView([d.latitude, d.longitude], 12);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
        L.marker([d.latitude, d.longitude]).addTo(map);
    } else { wrap.innerHTML = contentMap[path] || contentMap['/']; }
}

document.querySelectorAll('.btn-link').forEach(btn => {
    btn.onclick = (e) => {
        e.preventDefault();
        const path = btn.getAttribute('href');
        loadContent(path);
        document.getElementById('panel').classList.add('mini');
    };
});

// Lógica de Panel Draggable
const p = document.getElementById('panel'), h = document.getElementById('panel-header');
let drag = false, ox, oy;
h.onmousedown = (e) => { drag = true; ox = e.clientX - p.offsetLeft; oy = e.clientY - p.offsetTop; };
document.onmousemove = (e) => { if (drag) { p.style.left = (e.clientX - ox) + 'px'; p.style.top = (e.clientY - oy) + 'px'; } };
document.onmouseup = () => drag = false;
h.onclick = () => p.classList.toggle('mini');
