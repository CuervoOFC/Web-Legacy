:root { --primary: #0070f3; --bg: #0a0a0a; }

body { background: var(--bg); color: white; font-family: sans-serif; margin: 0; overflow: hidden; height: 100vh; }

/* CENTRADO TOTAL DEL CONTENIDO */
#main-content {
    position: fixed; inset: 0; display: flex; justify-content: center;
    align-items: center; text-align: center; pointer-events: none;
}
.content-wrapper { pointer-events: all; max-width: 600px; padding: 20px; }

/* IMAGEN REDONDA CON CONTORNO AZUL */
.avatar-container {
    width: 100px; height: 100px; margin: 0 auto 15px;
    border-radius: 50%; border: 3px solid var(--primary);
    box-shadow: 0 0 15px var(--primary); overflow: hidden;
}
.avatar { width: 100%; height: 100%; object-fit: cover; }

/* REPRODUCTOR DE AUDIO Y ONDAS */
.audio-player { background: rgba(255,255,255,0.05); border-radius: 15px; padding: 10px; margin-top: 15px; }
#visualizer { width: 100%; height: 40px; background: #000; border-radius: 5px; margin: 5px 0; }
.controls { display: flex; justify-content: center; align-items: center; gap: 10px; }
.controls button { background: none; border: 1px solid var(--primary); color: white; border-radius: 50%; width: 35px; height: 35px; cursor: pointer; }
#volume { width: 60px; accent-color: var(--primary); }

/* PANEL ESTÉTICO */
#panel { 
    position: absolute; top: 50%; left: 100px; transform: translateY(-50%); 
    width: 280px; background: rgba(10,10,10,0.9); border: 1px solid #333; 
    border-radius: 20px; padding: 20px; text-align: center;
}

/* MARQUESINA Y OTROS (MANTENER) */
.marquee-footer { position: fixed; bottom: 0; width: 100%; background: #000; border-top: 1px solid var(--primary); padding: 5px; }
.marquee-content { display: inline-block; white-space: nowrap; animation: scroll 20s linear infinite; font-size: 11px; }
@keyframes scroll { from { transform: translateX(100%); } to { transform: translateX(-100%); } }

.modal-hidden, .hidden { display: none !important; }
