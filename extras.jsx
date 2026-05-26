// Extras — shooting stars, ambient audio toggle (Web Audio drone).

// ── Shooting stars layer ──────────────────────────────────────────────────
// Renders absolutely-positioned streaks inside its parent. Place it inside
// any section that should host shooting stars.
function ShootingStars({ count = 4 }) {
  const [stars, setStars] = React.useState([]);
  React.useEffect(() => {
    let live = true;
    function spawn() {
      if (!live) return;
      const next = {
        id: Math.random(),
        x: 30 + Math.random() * 60,
        y: 5 + Math.random() * 30,
        angle: -20 + Math.random() * 40,
        len: 100 + Math.random() * 200,
        dur: 1.2 + Math.random() * 1.6,
      };
      setStars((s) => [...s, next]);
      setTimeout(() => setStars((s) => s.filter(x => x.id !== next.id)), next.dur * 1000 + 200);
      setTimeout(spawn, 1500 + Math.random() * 3500);
    }
    for (let i = 0; i < count; i++) setTimeout(spawn, i * 700 + Math.random() * 2000);
    return () => { live = false; };
  }, [count]);

  return (
    <>
      <style>{`
        @keyframes shoot {
          0%   { transform: translate(0, 0); opacity: 0; }
          15%  { opacity: 1; }
          100% { transform: translate(var(--dx), var(--dy)); opacity: 0; }
        }
      `}</style>
      {stars.map((s) => {
        const rad = (s.angle * Math.PI) / 180;
        const dx = Math.cos(rad) * s.len;
        const dy = Math.sin(rad) * s.len + 50;
        return (
          <div key={s.id} style={{
            position: 'absolute',
            left: `${s.x}%`, top: `${s.y}%`,
            width: 3, height: 3, borderRadius: '50%',
            background: '#fff',
            boxShadow: '0 0 8px 2px rgba(255,255,255,.85)',
            transform: 'translate(0,0)',
            animation: `shoot ${s.dur}s linear forwards`,
            '--dx': `${dx}px`, '--dy': `${dy}px`,
            pointerEvents: 'none',
          }}>
            {/* tail */}
            <div style={{
              position: 'absolute', top: '50%', left: 0,
              width: 80, height: 1.5,
              background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,.85) 90%, #fff 100%)',
              transform: `translateY(-50%) translateX(-100%) rotate(${s.angle + 180}deg)`,
              transformOrigin: 'right center',
              filter: 'blur(.4px)',
            }} />
          </div>
        );
      })}
    </>
  );
}

// ── Ambient audio toggle ───────────────────────────────────────────────────
// A small button in the bottom-right that toggles a gentle drone of two
// detuned sine oscillators routed through a soft lowpass + slow LFO. No
// external audio files needed.
function AmbientAudio() {
  const [on, setOn] = React.useState(false);
  const ref = React.useRef(null);

  function toggle() {
    const next = !on;
    setOn(next);
    if (next) start(); else stop();
  }

  function start() {
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      const ctx = window.__audioCtx || (window.__audioCtx = new Ctx());
      const out = ctx.createGain();
      out.gain.value = 0;
      out.gain.setTargetAtTime(0.13, ctx.currentTime, 1.0);
      const lp = ctx.createBiquadFilter();
      lp.type = 'lowpass';
      lp.frequency.value = 900;
      lp.Q.value = 0.7;
      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.value = 110; // A2
      const osc2 = ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.value = 164.81; // E3 - perfect fifth
      const osc3 = ctx.createOscillator();
      osc3.type = 'triangle';
      osc3.frequency.value = 220; // A3
      const g3 = ctx.createGain();
      g3.gain.value = 0.25;
      // gentle vibrato LFO
      const lfo = ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.value = 0.18;
      const lfoG = ctx.createGain();
      lfoG.gain.value = 200;
      lfo.connect(lfoG); lfoG.connect(lp.frequency);
      osc1.connect(lp); osc2.connect(lp); osc3.connect(g3); g3.connect(lp);
      lp.connect(out); out.connect(ctx.destination);
      [osc1, osc2, osc3, lfo].forEach(o => o.start());
      ref.current = { ctx, out, oscs: [osc1, osc2, osc3, lfo] };
    } catch (e) { console.warn('audio failed', e); }
  }
  function stop() {
    const ref0 = ref.current;
    if (!ref0) return;
    const { ctx, out, oscs } = ref0;
    out.gain.setTargetAtTime(0, ctx.currentTime, 0.4);
    setTimeout(() => oscs.forEach(o => { try { o.stop(); } catch {} }), 1200);
    ref.current = null;
  }

  return (
    <button
      onClick={toggle}
      title={on ? 'mute' : 'play ambient'}
      style={{
        position: 'fixed', bottom: 20, right: 20, zIndex: 50,
        width: 44, height: 44, borderRadius: '50%',
        border: '1px solid rgba(110,70,30,.25)',
        background: on ? 'rgba(199,94,78,.85)' : 'rgba(251,243,224,.85)',
        color: on ? '#fbf3e0' : '#7a5a32',
        cursor: 'pointer', padding: 0,
        boxShadow: '0 8px 18px rgba(70,40,15,.18)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backdropFilter: 'blur(8px)',
        transition: 'all .25s ease',
      }}
    >
      {on ? (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M3 10v4h4l5 5V5L7 10H3zm12.5 2c0-1.77-1-3.29-2.5-4.03v8.05c1.5-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.17v2.06a8.99 8.99 0 0 0 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
        </svg>
      )}
    </button>
  );
}

window.ShootingStars = ShootingStars;
window.AmbientAudio = AmbientAudio;
