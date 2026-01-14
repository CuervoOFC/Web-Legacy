const playlist = [
    { name: "BAIXO", url: "https://files.catbox.moe/895vxi" },
    { name: "CYBER CORE", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" }
];

let audio = new Audio();
let audioCtx, analyser, source, canvas, ctx, map;
let isAudioInit = false;

// ACTIVACIÓN GLOBAL DE AUDIO (Cualquier parte de la web)
document.addEventListener('click', () => {
    if (!isAudioInit) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        initVisualizer();
        isAudioInit = true;
    }
    if (audioCtx.state === 'suspended') audioCtx.resume();
}, { once: false });

const contentMap = {
    '/': '<h1>LEGACY CORE</h1><p>V3.0 DEEP SPACE SYSTEM ONLINE</p>',
    '/apikey': '<h1>API KEY</h1><p>Acceso a llaves de cifrado.</p><a href="https://api.the-legacy-code.pro" target="_blank" class="btn-link" style="display:inline-block; margin-top:15px; padding: 10px 40px;">APIKEY</a>',
    '/bot': '<h1>BOT SYSTEM</h1><p>Automatización legacy activa.</p><a href="https://bot.the-legacy-code.pro" target="_blank" class="btn-link" style="display:inline-block; margin-top:15px;">BOT PORTAL</a>',
    '/hosting': `<h1>HOSTING & DASHBOARD</h1><div class="contacts-grid">
        <div class="mini-panel"><h3>DASH</h3><a href="https://dash.the-legacy-code.pro" target="_blank" class="btn-contact">IR AL DASH</a></div>
        <div class="mini-panel"><h3>PANEL</h3><a href="https://panel.the-legacy-code.pro" target="_blank" class="btn-contact">IR AL PANEL</a></div>
    </div>`,
    '/contactos': `<h1>RED NEURAL</h1><div class="contacts-grid">
        <div class="mini-panel"><h3>DUEÑOS</h3><a href="https://wa.me/5016613065" class="btn-contact">ᴛʜᴇᴅᴇᴠɪʟ ⁺⁵⁰¹</a><a href="https://wa.me/85295456491" class="btn-contact">ઈ𓅇𝐂𝐮𝐞𝐫𝐯𝐨𝐎𝐅𝐂𓆰</a></div>
        <div class="mini-panel"><h3>SOPORTE</h3><a href="https://wa.me/31651131184" class="btn-contact">ઈ𓅇𝐂𝐮𝐞𝐫𝐯𝐨𝐒𝐮𝐩𝐩ο𝐫𝐭𓆰</a><a href="https://wa.me/51921826291" class="btn-contact">𝐒𝐨𝐲𝐌𝐚𝐲𝐜ο𝐥 ᴼᶠⁱᶜⁱᵃˡ</a></div>
        <div class="mini-panel"><h3>COLABORADORES</h3><a href="https://wa.me/50493732693" class="btn-contact">ADO (Adonix)</a><a href="https://wa.me/573133374132" class="btn-contact">Yo Soy Yo</a><a href="https://wa.me/523142183828" class="btn-contact">OptiShield - OFC</a></div>
        <div class="mini-panel"><h3>REDES</h3><a href="https://chat.whatsapp.com/KxHlg8fxLs8C8ShNFhDmYA" class="btn-contact">MOON&STARS GROUP</a><a href="https://whatsapp.com/channel/0029VaM09iJ8F2pDE8GCaB3V" class="btn-contact">MOON&STARS CHANNEL</a></div>
    </div>`
};

async function loadContent(path) {
    const wrap = document.querySelector('.content-wrapper');
    document.getElementById('main-content').style.opacity = '0';
    setTimeout(async () => {
        if (path === '/user') {
            wrap.innerHTML = '<h1>ESCANEANDO...</h1>';
            const res = await fetch('https://ipapi.co/json/');
            const d = await res.json();
            wrap.innerHTML = `<h1>MI INFO</h1><div class="mini-panel" style="text-align:left;"><p>IP: ${d.ip}</p><p>ZONA: ${d.timezone}</p><p>OS: ${navigator.platform}</p><p>HORA: <span id="clock"></span></p></div><div id="map" style="height:180px; margin-top:10px; border:1px solid var(--primary)"></div>`;
            setInterval(() => { if(document.getElementById('clock')) document.getElementById('clock').innerText = new Date().toLocaleTimeString('es-ES', {timeZone: d.timezone}); }, 1000);
            if(map) map.remove();
            map = L.map('map').setView([d.latitude, d.longitude], 12);
            L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png').addTo(map);
        } else { wrap.innerHTML = contentMap[path] || contentMap['/']; }
        document.getElementById('main-content').style.opacity = '1';
    }, 300);
}

function playRandom() {
    const track = playlist[Math.floor(Math.random() * playlist.length)];
    audio.src = track.url;
    document.getElementById('song-name').innerText = track.name;
    audio.play();
    document.getElementById('play-pause').innerText = "||";
}

document.getElementById('play-pause').onclick = (e) => {
    e.stopPropagation();
    if (audio.paused) { audio.play(); document.getElementById('play-pause').innerText = "||"; }
    else { audio.pause(); document.getElementById('play-pause').innerText = "▶"; }
};

document.getElementById('next').onclick = (e) => { e.stopPropagation(); playRandom(); };

function initVisualizer() {
    canvas = document.getElementById("visualizer");
    ctx = canvas.getContext("2d");
    source = audioCtx.createMediaElementSource(audio);
    analyser = audioCtx.createAnalyser();
    source.connect(analyser);
    analyser.connect(audioCtx.destination);
    renderWaves();
}

function renderWaves() {
    requestAnimationFrame(renderWaves);
    const data = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(data);
    ctx.clearRect(0,0,canvas.width,canvas.height); ctx.fillStyle = "#0070f3";
    for(let i=0; i<60; i++) { ctx.fillRect(i*4, canvas.height-(data[i]/4), 2, data[i]/4); }
}

// BOTONES UI
document.getElementById('btn-read-terms').onclick = (e) => { e.stopPropagation(); document.getElementById('terms-panel').classList.remove('modal-hidden'); };
document.getElementById('btn-decline').onclick = () => { document.getElementById('loader').style.display='none'; document.getElementById('error-screen').style.display='flex'; };
document.getElementById('btn-accept').onclick = () => {
    document.getElementById('loader').style.display='none';
    document.getElementById('panel').style.display='block';
    document.getElementById('main-content').style.display='flex';
    playRandom(); loadContent('/');
};
document.getElementById('panel-toggle-btn').onclick = (e) => { e.stopPropagation(); document.getElementById('panel').classList.toggle('mini'); };
document.querySelectorAll('.btn-link').forEach(l => l.onclick = (e) => { e.preventDefault(); e.stopPropagation(); loadContent(l.getAttribute('href')); });
