// --- CONFIGURACIÓN DE AUDIO ---
const audio = new Audio();
const playlist = [
    { name: "Synthetic Sky", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
    { name: "Digital Ghost", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
    { name: "Cyber Drive", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" }
];
let currentSongIndex = 0;

function loadSong(index) {
    audio.src = playlist[index].url;
    document.getElementById('song-name').innerText = `Sonando: ${playlist[index].name}`;
}

loadSong(currentSongIndex);

// Reproducir al primer clic en la web
document.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        document.getElementById('play-pause').innerText = "Pause";
    }
}, { once: true });

document.getElementById('play-pause').addEventListener('click', (e) => {
    e.stopPropagation();
    if (audio.paused) {
        audio.play();
        e.target.innerText = "Pause";
    } else {
        audio.pause();
        e.target.innerText = "Play";
    }
});

document.getElementById('next').addEventListener('click', (e) => {
    e.stopPropagation();
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadSong(currentSongIndex);
    audio.play();
});

document.getElementById('prev').addEventListener('click', (e) => {
    e.stopPropagation();
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    loadSong(currentSongIndex);
    audio.play();
});

document.getElementById('volume').addEventListener('input', (e) => {
    audio.volume = e.target.value;
});

// --- VISUALIZADOR (OLAS) ---
const canvas = document.getElementById('visualizer');
const ctx = canvas.getContext('2d');

function draw() {
    requestAnimationFrame(draw);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!audio.paused) {
        ctx.fillStyle = '#0070f3';
        for (let i = 0; i < canvas.width; i += 4) {
            const h = Math.random() * 25; 
            ctx.fillRect(i, canvas.height - h, 2, h);
        }
    }
}
draw();

// --- PANEL MOVIBLE (DRAGGABLE) ---
const panel = document.getElementById('panel');
const header = document.getElementById('panel-header');
let isDragging = false;
let startX, startY;

header.onmousedown = (e) => {
    isDragging = true;
    startX = e.clientX - panel.offsetLeft;
    startY = e.clientY - panel.offsetTop;
};

document.onmousemove = (e) => {
    if (!isDragging) return;
    panel.style.left = (e.clientX - startX) + 'px';
    panel.style.top = (e.clientY - startY) + 'px';
};

document.onmouseup = () => isDragging = false;

// --- NAVEGACIÓN SPA ---
const pages = {
    'apikey': '<h1>API Key</h1><p>Gestiona tus claves de acceso seguro aquí.</p>',
    'bot': '<h1>Bot de Sistema</h1><p>Configura las respuestas y comandos del bot.</p>',
    'hosting': '<h1>Hosting</h1><p>Servidores activos: 99.9% uptime.</p>',
    'contactos': '<h1>Contactos</h1><p>Escríbenos a soporte@tudominio.com</p>'
};

function navigate(event, route) {
    event.preventDefault();
    window.history.pushState({}, '', `/${route}`);
    document.getElementById('main-content').innerHTML = `<div class="hero">${pages[route]}</div>`;
}

window.onpopstate = () => {
    const route = window.location.pathname.replace('/', '');
    if(pages[route]) document.getElementById('main-content').innerHTML = `<div class="hero">${pages[route]}</div>`;
};
