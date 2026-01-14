// --- PLAYLIST ALEATORIA ---
const playlist = [
    { name: "NEBULA PROTOCOL", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
    { name: "CYBER SPACE", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
    { name: "LEGACY VOID", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" }
];

let audio = new Audio();
let audioContext, analyser, source, canvas, ctx;

function playRandom() {
    const track = playlist[Math.floor(Math.random() * playlist.length)];
    audio.src = track.url;
    document.getElementById('song-name').innerText = track.name;
    audio.play().catch(() => console.log("Clic requerido para audio"));
}

// --- VISUALIZADOR DE ONDAS ---
function startVisualizer() {
    canvas = document.getElementById("visualizer");
    ctx = canvas.getContext("2d");
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        source = audioContext.createMediaElementSource(audio);
        source.connect(analyser);
        analyser.connect(audioContext.destination);
    }
    renderFrame();
}

function renderFrame() {
    requestAnimationFrame(renderFrame);
    const data = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(data);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#0070f3";
    for (let i = 0; i < 50; i++) {
        let h = data[i] / 4;
        ctx.fillRect(i * 3, canvas.height - h, 2, h);
    }
}

// --- NAVEGACIÓN SPA ---
const contentMap = {
    '/': '<h1>LEGACY CORE</h1><p>SISTEMA v3.0 ONLINE</p>',
    '/contactos': '<h1>CONTACTOS</h1><div class="contact-section"><a href="https://wa.me/85295456491" class="btn-link">CUERVO</a><a href="https://wa.me/51921826291" class="btn-link">SOYMAYCOL</a></div>'
};

async function loadContent(path) {
    const wrap = document.querySelector('.content-wrapper');
    if (path === '/user') {
        wrap.innerHTML = '<h1>ESCANEANDO...</h1>';
        const res = await fetch('https://ipapi.co/json/');
        const d = await res.json();
        wrap.innerHTML = `<h1>MI INFO</h1><p>IP: ${d.ip}</p><p>PAIS: ${d.country_name}</p>`;
    } else {
        wrap.innerHTML = contentMap[path] || contentMap['/'];
    }
    wrap.style.opacity = '1';
}

// --- EVENTOS ---
document.getElementById('btn-continue').onclick = () => {
    if (document.getElementById('terms-check').checked) {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('panel').style.display = 'block';
        document.getElementById('main-content').style.display = 'flex';
        document.getElementById('panel').style.opacity = '1';
        document.getElementById('main-content').style.opacity = '1';
        startVisualizer();
        playRandom();
        loadContent('/');
    } else { alert("Acepta los términos."); }
};

document.getElementById('btn-read-terms').onclick = () => document.getElementById('terms-panel').classList.remove('modal-hidden');
document.getElementById('btn-close-terms').onclick = () => document.getElementById('terms-panel').classList.add('modal-hidden');

document.getElementById('panel-header').onclick = () => document.getElementById('panel').classList.toggle('mini');

document.querySelectorAll('.btn-link').forEach(btn => {
    btn.onclick = (e) => { e.preventDefault(); loadContent(btn.getAttribute('href')); };
});

document.getElementById('play-pause').onclick = () => audio.paused ? audio.play() : audio.pause();
document.getElementById('next').onclick = () => playRandom();
document.getElementById('prev').onclick = () => playRandom();
document.getElementById('volume').oninput = (e) => audio.volume = e.target.value;
