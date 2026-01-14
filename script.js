const panel = document.getElementById('panel');
const audio = new Audio();
const playlist = [
    { name: "Electronic Flow", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
    { name: "Cyber Beats", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
    { name: "Digital Night", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" }
];
let currentSong = 0;

// --- NAVEGACIÓN POR RUTAS / ---
const contentMap = {
    '/apikey': '<h1>API Keys</h1><p>Gestiona tus tokens de acceso seguro.</p>',
    '/bot': '<h1>Bot de Sistema</h1><p>Panel de control del bot automático.</p>',
    '/hosting': '<h1>Hosting</h1><p>Estado del servidor: Operativo.</p>',
    '/contactos': '<h1>Contactos</h1><p>Soporte disponible 24/7.</p>'
};

document.querySelectorAll('.btn-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const path = link.getAttribute('href');
        window.history.pushState({}, '', path);
        
        // Cambiar contenido y MINIMIZAR panel
        document.querySelector('.content-wrapper').innerHTML = contentMap[path];
        panel.classList.add('mini');
    });
});

// Volver a ampliar al tocar el header
document.getElementById('panel-header').onclick = () => panel.classList.toggle('mini');

// --- LÓGICA DE AUDIO ---
function loadSong(idx) {
    audio.src = playlist[idx].url;
    document.getElementById('song-name').innerText = playlist[idx].name;
}

document.addEventListener('click', () => {
    if (audio.paused) {
        loadSong(Math.floor(Math.random() * playlist.length));
        audio.play();
        document.getElementById('play-pause').innerText = "||";
    }
}, { once: true });

document.getElementById('play-pause').onclick = (e) => {
    e.stopPropagation();
    if (audio.paused) { audio.play(); e.target.innerText = "||"; }
    else { audio.pause(); e.target.innerText = "▶"; }
};

document.getElementById('next').onclick = () => {
    currentSong = (currentSong + 1) % playlist.length;
    loadSong(currentSong); audio.play();
};

document.getElementById('volume').oninput = (e) => audio.volume = e.target.value;

// --- VISUALIZADOR DE ONDAS ---
const canvas = document.getElementById('visualizer');
const ctx = canvas.getContext('2d');
function draw() {
    requestAnimationFrame(draw);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!audio.paused) {
        ctx.fillStyle = '#0070f3';
        for (let i = 0; i < canvas.width; i += 4) {
            const h = Math.random() * 20 + 5;
            ctx.fillRect(i, canvas.height - h, 2, h);
        }
    }
}
draw();

// --- MOVIMIENTO DEL PANEL ---
let isDragging = false, startX, startY;
document.getElementById('panel-header').onmousedown = (e) => {
    isDragging = true;
    startX = e.clientX - panel.offsetLeft;
    startY = e.clientY - panel.offsetTop;
};
document.onmousemove = (e) => {
    if (isDragging) {
        panel.style.left = (e.clientX - startX) + 'px';
        panel.style.top = (e.clientY - startY) + 'px';
    }
};
document.onmouseup = () => isDragging = false;
