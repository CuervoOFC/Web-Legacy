// --- SISTEMA DE ACCESO ---
const tCheck = document.getElementById('terms-check');
const tPanel = document.getElementById('terms-panel');

document.getElementById('btn-read-terms').onclick = () => tPanel.classList.remove('modal-hidden');
document.getElementById('btn-close-terms').onclick = () => tPanel.classList.add('modal-hidden');

document.getElementById('btn-continue').onclick = () => {
    if (tCheck.checked) {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('panel').style.display = 'block';
        document.getElementById('main-content').style.display = 'flex';
        document.getElementById('panel').style.opacity = '1';
        document.getElementById('main-content').style.opacity = '1';
        initAudio();
        loadContent('/');
    } else { alert("Error: Debe aceptar los términos y deslinde."); }
};

// --- AUDIO Y VISUALIZADOR (ONDAS) ---
let audio = new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");
let context, analyser, src, canvas, ctx;

function initAudio() {
    canvas = document.getElementById("visualizer");
    ctx = canvas.getContext("2d");
    if (!context) {
        context = new (window.AudioContext || window.webkitAudioContext)();
        analyser = context.createAnalyser();
        src = context.createMediaElementSource(audio);
        src.connect(analyser);
        analyser.connect(context.destination);
    }
    draw();
}

function draw() {
    requestAnimationFrame(draw);
    let array = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(array);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#0070f3"; // Color de las ondas
    for (let i = 0; i < 100; i++) {
        let h = array[i] / 3;
        ctx.fillRect(i * 3, canvas.height - h, 2, h);
    }
}

document.getElementById('play-pause').onclick = () => {
    if (audio.paused) { audio.play(); context.resume(); document.getElementById('play-pause').innerText = "||"; } 
    else { audio.pause(); document.getElementById('play-pause').innerText = "▶"; }
};
document.getElementById('volume').oninput = (e) => audio.volume = e.target.value;

// --- CONTENIDOS ---
const contentMap = {
    '/': '<h1>The Legacy Code</h1><p>Sistema Operativo v2.0</p>',
    '/contactos': `
        <h1>CONTACTOS Y EQUIPO</h1>
        <div class="contact-section">
            <h3>DUEÑOS</h3>
            <a href="https://wa.me/85295456491" class="btn-contact">CuervoOFC</a>
            <a href="https://wa.me/51921826291" class="btn-contact">SoyMaycol</a>
        </div>
        <div class="contact-section">
            <h3>COLABORADORES</h3>
            <a href="https://wa.me/573133374132" class="btn-contact">Yo Soy Yo</a>
            <a href="https://wa.me/50493732693" class="btn-contact">ADO (Adonix)</a>
            <a href="https://wa.me/523142183828" class="btn-contact">OptiShield</a>
        </div>
        <div class="contact-section">
            <h3>REDES <span class="icon-anim">🌙⭐</span></h3>
            <a href="https://whatsapp.com/channel/0029VaM09iJ8F2pDE8GCaB3V" class="btn-contact">MOON&STARS CHANNEL</a>
        </div>`
};

async function loadContent(path) {
    const wrap = document.querySelector('.content-wrapper');
    if (path === '/user') {
        const res = await fetch('https://ipapi.co/json/');
        const d = await res.json();
        wrap.innerHTML = `<h1>INFO USUARIO</h1><p>IP: ${d.ip}</p><div id="user-map" style="height:200px; width:100%;"></div>`;
        const map = L.map('user-map').setView([d.latitude, d.longitude], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    } else { wrap.innerHTML = contentMap[path] || contentMap['/']; }
}

document.querySelectorAll('.btn-link').forEach(btn => {
    btn.onclick = (e) => {
        e.preventDefault();
        loadContent(btn.getAttribute('href'));
        document.getElementById('panel').classList.add('mini');
    }
});

// Panel Draggable
const panel = document.getElementById('panel'), header = document.getElementById('panel-header');
let drag = false, ox, oy;
header.onmousedown = (e) => { drag = true; ox = e.clientX - panel.offsetLeft; oy = e.clientY - panel.offsetTop; };
document.onmousemove = (e) => { if (drag) { panel.style.left = (e.clientX - ox) + 'px'; panel.style.top = (e.clientY - oy) + 'px'; } };
document.onmouseup = () => drag = false;
