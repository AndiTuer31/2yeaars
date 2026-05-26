// Atmospheric layers: cursor petal trail, scroll-driven sky, reading progress
// All as fixed-position overlays that compose with the scrapbook content.

// ── Cursor petals ────────────────────────────────────────────────────────
function CursorPetals() {
  React.useEffect(() => {
    let lastX = 0, lastY = 0, lastTime = 0;
    const COLORS = ['#c75e4e', '#e3a25b', '#f4c95a', '#8aa169', '#fdfaf2', '#d98a72'];
    function spawn(e) {
      const now = performance.now();
      if (now - lastTime < 40) return; // rate-limit
      lastTime = now;
      const dx = e.clientX - lastX, dy = e.clientY - lastY;
      lastX = e.clientX; lastY = e.clientY;
      if (Math.abs(dx) + Math.abs(dy) < 4) return;
      const el = document.createElement('div');
      const size = 5 + Math.random() * 6;
      el.style.cssText = `
        position: fixed; left: ${e.clientX}px; top: ${e.clientY}px;
        width: ${size * 1.5}px; height: ${size}px;
        background: ${COLORS[Math.floor(Math.random() * COLORS.length)]};
        border-radius: ${['50% 0 50% 50%','0 50% 50% 50%','50% 50% 0 50%'][Math.floor(Math.random() * 3)]};
        transform: translate(-50%,-50%) rotate(${Math.random() * 360}deg);
        opacity: .8; pointer-events: none; z-index: 9999;
        transition: transform 1.4s cubic-bezier(.2,.7,.3,1), opacity 1.4s ease;
        filter: blur(.3px);
        will-change: transform, opacity;
      `;
      document.body.appendChild(el);
      requestAnimationFrame(() => {
        const drift = -40 + Math.random() * 80;
        el.style.transform = `translate(calc(-50% + ${drift}px), calc(-50% + ${60 + Math.random() * 80}px)) rotate(${Math.random() * 540}deg)`;
        el.style.opacity = '0';
      });
      setTimeout(() => el.remove(), 1500);
    }
    window.addEventListener('mousemove', spawn, { passive: true });
    return () => window.removeEventListener('mousemove', spawn);
  }, []);
  return null;
}

// ── Sky overlay — color shifts based on scroll position ──────────────────
function SkyOverlay() {
  const [y, setY] = React.useState(0);
  React.useEffect(() => {
    let raf = 0;
    function loop() {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      setY((prev) => prev + (p - prev) * 0.1);
      raf = requestAnimationFrame(loop);
    }
    loop();
    return () => cancelAnimationFrame(raf);
  }, []);

  // p in [0,1] mapped to a 5-stop atmospheric curve:
  // dawn → morning → afternoon → dusk → night → dawn-again
  const stops = [
    { p: 0,    tint: 'rgba(255, 220, 180, 0)' },
    { p: 0.15, tint: 'rgba(255, 220, 180, .12)' },
    { p: 0.4,  tint: 'rgba(220, 230, 240, .06)' },
    { p: 0.55, tint: 'rgba(220, 110, 100, .18)' },
    { p: 0.75, tint: 'rgba(30, 30, 80, .28)' },
    { p: 1,    tint: 'rgba(255, 180, 130, .18)' },
  ];
  // interpolate
  let tint = stops[0].tint, i = 0;
  for (; i < stops.length - 1; i++) {
    if (y <= stops[i + 1].p) {
      const a = stops[i], b = stops[i + 1];
      const t = (y - a.p) / (b.p - a.p);
      tint = lerpRGBA(a.tint, b.tint, Math.max(0, Math.min(1, t)));
      break;
    }
  }

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: tint,
      mixBlendMode: 'multiply',
      pointerEvents: 'none',
      zIndex: 2,
      transition: 'background .4s ease',
    }} />
  );
}

function lerpRGBA(a, b, t) {
  const pa = parseRGBA(a), pb = parseRGBA(b);
  const r = Math.round(pa[0] + (pb[0] - pa[0]) * t);
  const g = Math.round(pa[1] + (pb[1] - pa[1]) * t);
  const bb = Math.round(pa[2] + (pb[2] - pa[2]) * t);
  const al = pa[3] + (pb[3] - pa[3]) * t;
  return `rgba(${r}, ${g}, ${bb}, ${al.toFixed(3)})`;
}
function parseRGBA(s) {
  const m = s.match(/rgba?\(([^)]+)\)/);
  if (!m) return [0, 0, 0, 0];
  const parts = m[1].split(',').map(x => parseFloat(x.trim()));
  return [parts[0] || 0, parts[1] || 0, parts[2] || 0, parts[3] ?? 1];
}

// ── Reading progress — a thin vertical timeline on the left edge ─────────
function ReadingProgress() {
  const [p, setP] = React.useState(0);
  React.useEffect(() => {
    let raf = 0;
    function tick() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setP(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      raf = requestAnimationFrame(tick);
    }
    tick();
    return () => cancelAnimationFrame(raf);
  }, []);

  // 25 markers — months spanning May 2024 → May 2026 (every other month labeled)
  const months = [
    'May 24','','Jul','','Sep','','Nov','','Jan 25','','Mar','','May','','Jul','','Sep','','Nov','','Jan 26','','Mar','','May',
  ];

  return (
    <div style={{
      position: 'fixed', top: 0, bottom: 0, left: 16, width: 4,
      zIndex: 40, pointerEvents: 'none',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    }}>
      {/* track */}
      <div style={{
        position: 'absolute', top: '6%', bottom: '6%', left: 1, width: 2,
        background: 'rgba(110,70,30,.18)', borderRadius: 2,
      }} />
      {/* fill */}
      <div style={{
        position: 'absolute', top: '6%', left: 0, width: 4,
        height: `calc(${(88 * p).toFixed(2)}%)`,
        background: 'linear-gradient(180deg, #e3a25b 0%, #c75e4e 60%, #b13e2a 100%)',
        borderRadius: 2,
        boxShadow: '0 0 8px rgba(199,94,78,.4)',
      }} />
      {/* tick marks + labels */}
      {months.map((label, i) => {
        const top = 6 + (88 * i / (months.length - 1));
        const passed = p >= (i / (months.length - 1));
        const isHeart = i === months.length - 1; // last = anniversary
        return (
          <div key={i} style={{
            position: 'absolute', top: `${top}%`, left: 0,
          }}>
            <div style={{
              width: isHeart ? 10 : 6, height: isHeart ? 10 : 6,
              background: passed ? (isHeart ? '#c75e4e' : '#e3a25b') : 'rgba(110,70,30,.3)',
              borderRadius: '50%',
              transform: 'translate(-25%, -50%)',
              boxShadow: isHeart && passed ? '0 0 0 4px rgba(199,94,78,.25), 0 0 12px rgba(199,94,78,.5)' : 'none',
              transition: 'all .3s ease',
            }} />
            {label && (
              <div style={{
                position: 'absolute', left: 14, top: -7,
                fontFamily: '"Special Elite", monospace', fontSize: 9,
                letterSpacing: '.15em',
                color: passed ? 'rgba(110,70,30,.7)' : 'rgba(110,70,30,.3)',
                whiteSpace: 'nowrap',
                transition: 'color .3s ease',
              }}>{label}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}

window.CursorPetals = CursorPetals;
window.SkyOverlay = SkyOverlay;
window.ReadingProgress = ReadingProgress;
