const playlist = [
    { name: "NEBULA DRIVE", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
    { name: "CYBER PROTOCOL", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" }
];
let audio = new Audio();
let audioCtx, analyser, source, canvas, ctx, map;

// SEGURIDAD Y TERMINOS
document.getElementById('btn-read-terms').onclick = () => document.getElementById('terms-panel').classList.remove('modal-hidden');
document.getElementById('btn-decline').onclick = () => {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('error-screen').style.display = 'flex';
};
document.getElementById('btn-accept').onclick = () => {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('panel').style.display = 'block';
    document.getElementById('main-content').style.display = 'flex';
    initVisualizer(); playRandom(); loadContent('/');
};

// CONTENIDO SPA
const contentMap = {
    '/': '<h1>LEGACY CORE</h1><p>SISTEMA OPERATIVO v3.0 ONLINE</p>',
    '/apikey': '<h1>API KEY</h1><p>Portal de llaves.</p><a href="https://api.the-legacy-code.pro" target="_blank" class="btn-primary">APIKEY</a>',
    '/bot': '<h1>BOTS</h1><p>Gestión de bots.</p><a href="https://bot.the-legacy-code.pro" target="_blank" class="btn-primary">ENTRAR</a>',
    '/hosting': '<h1>HOSTING & DASH</h1><div class="contacts-grid"><div class="mini-panel"><h3>DASH</h3><a href="https://dash.the-legacy-code.pro" target="_blank" class="btn-contact">ACCEDER</a></div><div class="mini-panel"><h3>PANEL</h3><a href="https://panel.the-legacy-code.pro" target="_blank" class="btn-contact">ACCEDER</a></div></div>',
    '/contactos': `<h1>RED NEURAL</h1><div class="contacts-grid">
        <div class="mini-panel"><h3>DUEÑOS</h3><a href="https://wa.me/5016613065" class="btn-contact">ᴛʜᴇᴅᴇᴠɪʟ</a><a href="https://wa.me/85295456491" class="btn-contact">CuervoOFC</a></div>
        <div class="mini-panel"><h3>SOPORTE</h3><a href="https://wa.me/31651131184" class="btn-contact">CuervoSupport</a><a href="https://wa.me/51921826291" class="btn-contact">SoyMaycol</a></div>
        <div class="mini-panel"><h3>COLABORADORES</h3><a href="https://wa.me/50493732693" class="btn-contact">ADO</a><a href="https://wa.me/573133374132" class="btn-contact">Yo Soy Yo</a></div>
        <div class="mini-panel"><h3>REDES</h3><a href="https://chat.whatsapp.com/KxHlg8fxLs8C8ShNFhDmYA" class="btn-contact">GRUPO</a></div>
    </div>`
};

async function loadContent(path) {
    const wrap = document.querySelector('.content-wrapper');
    if (path === '/user') {
        wrap.innerHTML = '<h1>ESCANEANDO...</h1>';
        const res = await fetch('https://ipapi.co/json/');
        const d = await res.json();
        const browser = navigator.userAgent.split(') ')[1] || "Generic Browser";
        wrap.innerHTML = `<h1>MI INFO</h1><div class="mini-panel"><p>IP: ${d.ip}</p><p>ZONA: ${d.timezone}</p><p>NAVEGADOR: ${browser}</p><p>HORA: <span id="clock"></span></p></div><div id="map" style="height:150px; margin-top:10px; border:1px solid var(--primary)"></div>`;
        setInterval(() => { document.getElementById('clock').innerText = new Date().toLocaleTimeString('es-ES', {timeZone: d.timezone}); }, 1000);
        if(map) map.remove();
        map = L.map('map').setView([d.latitude, d.longitude], 12);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png').addTo(map);
    } else { wrap.innerHTML = contentMap[path] || contentMap['/']; }
}

// AUDIO
function playRandom() {
    const track = playlist[Math.floor(Math.random() * playlist.length)];
    audio.src = track.url;
    document.getElementById('song-name').innerText = track.name;
    audio.play(); document.getElementById('play-pause').innerText = "||";
}
document.getElementById('play-pause').onclick = () => { audio.paused ? (audio.play(), document.getElementById('play-pause').innerText = "||") : (audio.pause(), document.getElementById('play-pause').innerText = "▶"); };
document.getElementById('next').onclick = () => playRandom();
document.getElementById('volume').oninput = (e) => audio.volume = e.target.value;

function initVisualizer() {
    canvas = document.getElementById("visualizer"); ctx = canvas.getContext("2d");
    if(!audioCtx) {
        audioCtx = new AudioContext(); analyser = audioCtx.createAnalyser();
        source = audioCtx.createMediaElementSource(audio); source.connect(analyser); analyser.connect(audioCtx.destination);
    }
    renderWaves();
}
function renderWaves() {
    requestAnimationFrame(renderWaves);
    const data = new Uint8Array(analyser.frequencyBinCount); analyser.getByteFrequencyData(data);
    ctx.clearRect(0,0,canvas.width,canvas.height); ctx.fillStyle = "#0070f3";
    for(let i=0; i<60; i++) { ctx.fillRect(i*4, canvas.height-(data[i]/4), 2, data[i]/4); }
}

// PANEL
document.getElementById('panel-header').onclick = () => document.getElementById('panel').classList.toggle('mini');
document.querySelectorAll('.btn-link').forEach(link => {
    link.onclick = (e) => { e.preventDefault(); loadContent(link.getAttribute('href')); };
});
