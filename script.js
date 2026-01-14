const panel = document.getElementById('panel');
const audio = new Audio();
const playlist = [
    { name: "Electronic Flow", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
    { name: "Cyber Beats", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
    { name: "Digital Night", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" }
];
let currentSong = 0;

const contentMap = {
    '/apikey': `
        <h1>API KEY</h1>
        <p>Gestiona tus credenciales y accede a nuestra documentación técnica.</p>
        <a href="https://api.the-legacy-code.pro/" target="_blank" class="btn-external">Ir a la API Oficial</a>`,
    '/bot': `
        <h1>SISTEMA BOT</h1>
        <p>Configura las funciones de tu bot en tiempo real.</p>
        <a href="https://bot.the-legacy-code.pro" target="_blank" class="btn-external">Abrir Panel del Bot</a>`,
    '/hosting': `
        <h1>HOSTING SERVICES</h1>
        <p>Gestiona tus servidores desde nuestros paneles de control.</p>
        <div class="button-group">
            <a href="https://dash.the-legacy-code.pro" target="_blank" class="btn-external">Ir al Dashboard</a>
            <a href="https://panel.the-legacy-code.pro" target="_blank" class="btn-external">Ir al Panel</a>
        </div>`,
    '/contactos': `
        <h1>CONTACTOS</h1>
        <p>Contactos De Los Dueños y soporte</p>
        <div class="contact-section">
            <h3>DUEÑOS</h3>
            <div class="mini-panel-contacts">
                <a href="https://wa.me/85295456491" target="_blank" class="btn-contact">ઈ𓅇𝐂𝐮𝐞𝐫𝐯𝐨𝐎𝐅𝐂𓆰ࣩ֟፝𓆪</a>
                <a href="https://wa.me/5016613065" target="_blank" class="btn-contact">ᴛʜᴇᴅᴇ訂ɪʟ ⁺⁵⁰¹</a>
            </div>
        </div>
        <div class="contact-section">
            <h3>SOPORTE</h3>
            <div class="mini-panel-contacts">
                <a href="https://wa.me/31651131184" target="_blank" class="btn-contact">ઈ𓅇𝐂𝐮𝐞𝐫𝐯𝐨𝐒𝐮𝐩𝐩𝐨𝐫𝐭𝐎𝐅𝐂𓆰ࣩ֟፝𓆪</a>
                <a href="https://wa.me/51921826291" target="_blank" class="btn-contact">𝐒𝐨𝐲𝐌𝐚𝐲𝐜𝐨𝐥 ᴼᶠⁱᶜⁱᵃˡ</a>
            </div>
        </div>`
};

// NAVEGACIÓN SPA
document.querySelectorAll('.btn-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const path = link.getAttribute('href');
        window.history.pushState({}, '', path);
        document.querySelector('.content-wrapper').innerHTML = contentMap[path] || '<h1>Bienvenido</h1>';
        panel.classList.add('mini');
    });
});

document.getElementById('panel-header').onclick = () => panel.classList.toggle('mini');

// AUDIO ALEATORIO
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

document.getElementById('next').onclick = (e) => {
    e.stopPropagation();
    currentSong = (currentSong + 1) % playlist.length;
    loadSong(currentSong); audio.play();
};

document.getElementById('volume').oninput = (e) => audio.volume = e.target.value;

// VISUALIZADOR
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

// MOVIMIENTO
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
