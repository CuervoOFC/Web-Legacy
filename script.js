// --- CONFIGURACIÓN DE AUDIO ---
const playlist = [
    { name: "BAIXO", url: "https://files.cloudkuimages.guru/audios/3d5237ae57d8.mp3" },
    { name: "CYBER CORE", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" },
    { name: "DEEP SPACE", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3" }
];

let audio = new Audio();
audio.crossOrigin = "anonymous";
let audioCtx, analyser, source, canvas, ctx, map;
let isAudioInitialized = false;

// --- FUNCIÓN PARA DESBLOQUEAR EL MOTOR DE AUDIO ---
function initAudioEngine() {
    if (isAudioInitialized) return;

    // Crear el contexto de audio (necesario para el visualizador)
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    
    // Crear el analizador
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 256;

    // Conectar el audio al analizador y a los altavoces
    source = audioCtx.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);

    initVisualizer();
    isAudioInitialized = true;
    console.log("Motor de audio Legacy inicializado.");
}

// Desbloqueo global: al primer toque en cualquier parte de la web
document.addEventListener('pointerdown', () => {
    if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}, { once: false });

// --- REPRODUCCIÓN ---
function playRandom() {
    // Si no se ha inicializado el motor al hacer clic, lo forzamos
    if (!isAudioInitialized) initAudioEngine();

    const track = playlist[Math.floor(Math.random() * playlist.length)];
    audio.src = track.url;
    audio.load(); 
    
    document.getElementById('song-name').innerText = track.name;
    
    audio.play().then(() => {
        document.getElementById('play-pause').innerText = "||";
        if (audioCtx.state === 'suspended') audioCtx.resume();
    }).catch(e => console.log("Esperando interacción para sonar..."));
}

// --- VISUALIZADOR ---
function initVisualizer() {
    canvas = document.getElementById("visualizer");
    if (!canvas) return;
    ctx = canvas.getContext("2d");
    renderWaves();
}

function renderWaves() {
    requestAnimationFrame(renderWaves);
    if (!analyser) return;
    
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#0070f3"; // Color Azul Legacy

    const barWidth = (canvas.width / 60);
    let x = 0;

    for (let i = 0; i < 60; i++) {
        let barHeight = dataArray[i] / 4;
        ctx.fillRect(x, canvas.height - barHeight, barWidth - 1, barHeight);
        x += barWidth;
    }
}

// --- NAVEGACIÓN SPA Y CONTENIDO ---
const contentMap = {
    '/': '<h1>THE LEGACY CODE - WEB</h1><p>THE LEGACY CODE -WEB UNA WEB PARA ENCONTRAR MAS FACIL NUESTRAS PAGINAS Y CONTACTOS O REDES</p>',
    '/apikey': '<h1>API KEY</h1><p>Acceso a la apikey The-Legacy-Code.</p><a href="https://api.the-legacy-code.pro" target="_blank" class="btn-link" style="display:inline-block; margin-top:15px; padding: 10px 40px;">APIKEY</a>',
    '/bot': '<h1>BOT SYSTEM</h1><p>Bot (yakusa) y subbots editables en nuestra web.</p><a href="https://bot.the-legacy-code.pro" target="_blank" class="btn-link" style="display:inline-block; margin-top:15px;">BOT PORTAL</a>',
    '/hosting': `<h1>HOSTING & DASHBOARD</h1><div class="contacts-grid">
        <div class="mini-panel"><h3>DASH</h3><a href="https://dash.the-legacy-code.pro" target="_blank" class="btn-contact">IR AL DASH</a></div>
        <div class="mini-panel"><h3>PANEL</h3><a href="https://panel.the-legacy-code.pro" target="_blank" class="btn-contact">IR AL PANEL</a></div>
    </div>`,
    '/contactos': `<h1>CONTACTOS & REDES</h1><div class="contacts-grid">
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
                <div class="mini-panel" style="text-align:left;">
                    <p><strong>IP:</strong> ${d.ip}</p>
                    <p><strong>ZONA:</strong> ${d.city}, ${d.country_name}</p>
                    <p><strong>NAVEGADOR:</strong> ${navigator.userAgent.includes("Chrome") ? "Chrome / WebKit" : "Legacy Browser"}</p>
                    <p><strong>HORA:</strong> <span id="clock" style="color:var(--primary)">--:--:--</span></p>
                </div>
                <div id="map" style="height:180px; margin-top:10px; border:1px solid var(--primary); border-radius:10px;"></div>`;
            
            setInterval(() => {
                if(document.getElementById('clock')) {
                    document.getElementById('clock').innerText = new Date().toLocaleTimeString('es-ES', {timeZone: d.timezone});
                }
            }, 1000);

            if(map) map.remove();
            map = L.map('map').setView([d.latitude, d.longitude], 12);
            L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png').addTo(map);
            L.marker([d.latitude, d.longitude]).addTo(map);
        } catch(e) { wrap.innerHTML = "<h1>ERROR DE ESCANEO</h1>"; }
    } else {
        wrap.innerHTML = contentMap[path] || contentMap['/'];
    }
}

// --- BOTONES Y UI ---
document.getElementById('btn-read-terms').onclick = (e) => {
    e.stopPropagation();
    document.getElementById('terms-panel').classList.remove('modal-hidden');
};

document.getElementById('btn-decline').onclick = () => {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('error-screen').style.display = 'flex';
};

document.getElementById('btn-accept').onclick = (e) => {
    e.stopPropagation();
    
    // Iniciar motor de audio al aceptar
    initAudioEngine();
    
    document.getElementById('loader').style.display = 'none';
    document.getElementById('panel').style.display = 'block';
    document.getElementById('main-content').style.display = 'flex';
    
    playRandom(); 
    loadContent('/');
};

document.getElementById('panel-toggle-btn').onclick = (e) => {
    e.stopPropagation();
    document.getElementById('panel').classList.toggle('mini');
};

document.getElementById('play-pause').onclick = (e) => {
    e.stopPropagation();
    if (audio.paused) {
        audio.play();
        document.getElementById('play-pause').innerText = "||";
    } else {
        audio.pause();
        document.getElementById('play-pause').innerText = "▶";
    }
};

document.getElementById('next').onclick = (e) => { e.stopPropagation(); playRandom(); };
document.getElementById('prev').onclick = (e) => { e.stopPropagation(); playRandom(); };
document.getElementById('volume').oninput = (e) => audio.volume = e.target.value;

document.querySelectorAll('.btn-link').forEach(link => {
    link.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        loadContent(link.getAttribute('href'));
    };
});
