// --- CONFIGURACIÓN DE AUDIO ---
const playlist = [
    { name: "BAIXO", url: "https://files.catbox.moe/895vxi" },
    { name: "CYBER PROTOCOL", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" },
    { name: "DEEP SPACE", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3" }
];

let audio = new Audio();
audio.crossOrigin = "anonymous";
let audioCtx, analyser, source, canvas, ctx, map;
let audioStarted = false; // Flag para evitar múltiples reinicios

// --- FUNCIÓN MAESTRA DE AUDIO ---
function startEverything() {
    if (audioStarted) return; // Solo se ejecuta una vez
    
    // Desbloquear Contexto de Audio
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        initVisualizer();
    }
    if (audioCtx.state === 'suspended') audioCtx.resume();

    // Iniciar Música Aleatoria
    const track = playlist[Math.floor(Math.random() * playlist.length)];
    audio.src = track.url;
    audio.play().then(() => {
        audioStarted = true;
        document.getElementById('play-pause').innerText = "||";
        document.getElementById('song-name').innerText = track.name;
        console.log("Audio desbloqueado por interacción global.");
    }).catch(e => console.log("Esperando interacción válida..."));
}

// Escuchar CLIC en cualquier parte del documento
document.addEventListener('click', startEverything, { once: false });

// --- VISUALIZADOR ---
function initVisualizer() {
    canvas = document.getElementById("visualizer");
    if (!canvas) return;
    ctx = canvas.getContext("2d");
    
    analyser = audioCtx.createAnalyser();
    source = audioCtx.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);
    
    renderWaves();
}

function renderWaves() {
    requestAnimationFrame(renderWaves);
    const data = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(data);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#0070f3"; 
    for (let i = 0; i < 60; i++) {
        let h = data[i] / 4;
        ctx.fillRect(i * 4, canvas.height - h, 2, h);
    }
}

// --- GESTIÓN DE TÉRMINOS Y NAVEGACIÓN SPA ---
const contentMap = {
    '/': '<h1>LEGACY CORE</h1><p>SISTEMA OPERATIVO v3.0 ONLINE</p>',
    '/apikey': '<h1>API KEY</h1><p>Portal de llaves.</p><a href="https://api.the-legacy-code.pro" target="_blank" class="btn-primary">APIKEY</a>',
    '/hosting': `<h1>HOSTING & DASH</h1>
        <div class="contacts-grid">
            <div class="mini-panel"><h3>DASH</h3><a href="https://dash.the-legacy-code.pro" target="_blank" class="btn-contact" style="background:var(--primary)">ACCEDER</a></div>
            <div class="mini-panel"><h3>PANEL</h3><a href="https://panel.the-legacy-code.pro" target="_blank" class="btn-contact" style="background:var(--primary)">ACCEDER</a></div>
        </div>`,
    '/bot': '<h1>BOTS</h1><p>Gestión de bots.</p><a href="https://bot.the-legacy-code.pro" target="_blank" class="btn-primary">ENTRAR</a>',
    '/contactos': `<h1>RED NEURAL</h1><div class="contacts-grid">
        <div class="mini-panel"><h3>DUEÑOS</h3>
            <a href="https://wa.me/5016613065" target="_blank" class="btn-contact">ᴛʜᴇᴅᴇᴠɪʟ ⁺⁵⁰¹</a>
            <a href="https://wa.me/85295456491" target="_blank" class="btn-contact">ઈ𓅇𝐂𝐮𝐞𝐫𝐯𝐨𝐎𝐅𝐂𓆰ࣩ֟፝𓆪</a>
        </div>
        <div class="mini-panel"><h3>SOPORTE</h3>
            <a href="https://wa.me/31651131184" target="_blank" class="btn-contact">ઈ𓅇𝐂𝐮𝐞𝐫𝐯𝐨𝐒𝐮𝐩𝐩𝐨𝐫𝐭𝐎𝐅𝐂𓆰ࣩ֟፝𓆪</a>
            <a href="https://wa.me/51921826291" target="_blank" class="btn-contact">𝐒𝐨𝐲𝐌𝐚𝐲𝐜𝐨𝐥 ᴼᶠⁱᶜⁱᵃˡ</a>
        </div>
        <div class="mini-panel"><h3>COLABORADORES</h3>
            <a href="https://wa.me/50493732693" target="_blank" class="btn-contact">ADO (Adonix)</a>
            <a href="https://wa.me/573133374132" target="_blank" class="btn-contact">Yo Soy Yo</a>
            <a href="https://wa.me/523142183828" target="_blank" class="btn-contact">OptiShield - OFC</a>
        </div>
        <div class="mini-panel"><h3>REDES</h3>
            <a href="https://chat.whatsapp.com/KxHlg8fxLs8C8ShNFhDmYA" target="_blank" class="btn-contact">MOON&STARS GROUP</a>
            <a href="https://whatsapp.com/channel/0029VaM09iJ8F2pDE8GCaB3V" target="_blank" class="btn-contact">MOON&STARS CHANNEL</a>
        </div>
    </div>`
};

async function loadContent(path) {
    const wrap = document.querySelector('.content-wrapper');
    if (path === '/user') {
        wrap.innerHTML = '<h1>ESCANEANDO...</h1>';
        try {
            const res = await fetch('https://ipapi.co/json/');
            const d = await res.json();
            wrap.innerHTML = `<h1>MI INFO</h1>
                <div class="mini-panel">
                    <p>IP: ${d.ip}</p>
                    <p>ZONA: ${d.timezone}</p>
                    <p>NAVEGADOR: ${navigator.userAgent.includes("Chrome") ? "Chrome" : "Navegador Legacy"}</p>
                    <p>HORA: <span id="clock"></span></p>
                </div>
                <div id="map" style="height:150px; margin-top:10px; border:1px solid var(--primary)"></div>`;
            setInterval(() => { if(document.getElementById('clock')) document.getElementById('clock').innerText = new Date().toLocaleTimeString('es-ES', {timeZone: d.timezone}); }, 1000);
            if(map) map.remove();
            map = L.map('map').setView([d.latitude, d.longitude], 12);
            L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png').addTo(map);
        } catch(e) { wrap.innerHTML = "<h1>ERROR DE ESCANEO</h1>"; }
    } else {
        wrap.innerHTML = contentMap[path] || contentMap['/'];
    }
}

// --- BOTONES DE INTERFAZ ---
document.getElementById('btn-read-terms').onclick = (e) => {
    e.stopPropagation(); // Evita conflicto con el clic global
    document.getElementById('terms-panel').classList.remove('modal-hidden');
};

document.getElementById('btn-decline').onclick = () => {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('error-screen').style.display = 'flex';
};

document.getElementById('btn-accept').onclick = () => {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('panel').style.display = 'block';
    document.getElementById('main-content').style.display = 'flex';
    loadContent('/');
};

document.getElementById('play-pause').onclick = (e) => {
    e.stopPropagation();
    if (audio.paused) { audio.play(); document.getElementById('play-pause').innerText = "||"; }
    else { audio.pause(); document.getElementById('play-pause').innerText = "▶"; }
};

document.getElementById('next').onclick = (e) => { e.stopPropagation(); audioStarted = false; startEverything(); };

document.querySelectorAll('.btn-link').forEach(link => {
    link.onclick = (e) => { e.preventDefault(); e.stopPropagation(); loadContent(link.getAttribute('href')); };
});

document.getElementById('panel-header').onclick = (e) => { e.stopPropagation(); document.getElementById('panel').classList.toggle('mini'); };
