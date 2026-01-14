// --- ACCESO ---
const tCheck = document.getElementById('terms-check');
document.getElementById('btn-continue').onclick = () => {
    if (tCheck.checked) {
        document.getElementById('loader').style.transform = 'translateY(-100%)';
        setTimeout(() => {
            document.getElementById('panel').style.display = 'block';
            document.getElementById('main-content').style.display = 'flex';
            setTimeout(() => { document.getElementById('panel').style.opacity = '1'; document.getElementById('main-content').style.opacity = '1'; }, 100);
            initAudio();
            loadContent('/');
        }, 600);
    } else { alert("ACCESO DENEGADO: Acepte términos."); }
};

// --- AUDIO VISUALIZER ---
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
    for (let i = 0; i < 60; i++) {
        let h = array[i] / 4;
        ctx.fillStyle = `rgba(0, 112, 243, ${h/50})`;
        ctx.fillRect(i * 4, canvas.height - h, 3, h);
    }
}

document.getElementById('play-pause').onclick = () => audio.paused ? audio.play() : audio.pause();
document.getElementById('volume').oninput = (e) => audio.volume = e.target.value;

// --- SPA CONTENT ---
const contentMap = {
    '/': '<h1>LEGACY OS</h1><p>SISTEMA OPERATIVO EN LINEA</p>',
    '/contactos': `<h1>RED NEURAL</h1><div class="contact-section"><h3>DUEÑOS</h3><a href="https://wa.me/85295456491" class="btn-contact">CUERVO</a></div><div class="contact-section"><h3>COLABORADORES</h3><a href="https://wa.me/573133374132" class="btn-contact">YO SOY YO</a></div>`
};

async function loadContent(path) {
    document.querySelector('.content-wrapper').innerHTML = contentMap[path] || contentMap['/'];
}

document.querySelectorAll('.btn-link').forEach(btn => {
    btn.onclick = (e) => { e.preventDefault(); loadContent(btn.getAttribute('href')); }
});

// Draggable
const panel = document.getElementById('panel'), header = document.getElementById('panel-header');
let drag = false, ox, oy;
header.onmousedown = (e) => { drag = true; ox = e.clientX - panel.offsetLeft; oy = e.clientY - panel.offsetTop; };
document.onmousemove = (e) => { if (drag) { panel.style.left = (e.clientX - ox) + 'px'; panel.style.top = (e.clientY - oy) + 'px'; } };
document.onmouseup = () => drag = false;
