// More delight: click anywhere to release a small heart that floats up,
// plus drifting fireflies that gently roam the page.

// ── Click hearts ─────────────────────────────────────────────────────────
function ClickHearts() {
  React.useEffect(() => {
    function spawn(e) {
      // Skip clicks on real interactive controls so we don't fight existing UI
      const tag = e.target?.tagName;
      if (['BUTTON', 'INPUT', 'A', 'SELECT', 'TEXTAREA', 'IMAGE-SLOT', 'CANVAS'].includes(tag)) return;
      if (e.target?.closest?.('button, a, input, image-slot, canvas')) return;
      // Don't fire in the dark constellation section either (the flashlight
      // experience is the point there)
      if (e.target?.closest?.('[data-section="CONSTELLATION"]')) return;

      const el = document.createElement('div');
      const size = 18 + Math.random() * 12;
      const drift = -30 + Math.random() * 60;
      el.style.cssText = `
        position: fixed; left: ${e.clientX}px; top: ${e.clientY}px;
        font-size: ${size}px;
        color: #c75e4e;
        transform: translate(-50%, -50%) scale(.4) rotate(${-10 + Math.random() * 20}deg);
        opacity: 0;
        pointer-events: none; z-index: 9990;
        text-shadow: 0 4px 14px rgba(199,94,78,.45);
        transition: transform 1.6s cubic-bezier(.34,1.5,.4,1), opacity 1.6s ease;
        font-family: serif;
        will-change: transform, opacity;
      `;
      el.textContent = '♡';
      document.body.appendChild(el);
      requestAnimationFrame(() => {
        el.style.opacity = '1';
        el.style.transform = `translate(calc(-50% + ${drift}px), calc(-50% - 80px)) scale(1) rotate(${-15 + Math.random() * 30}deg)`;
      });
      setTimeout(() => {
        el.style.opacity = '0';
        el.style.transform = `translate(calc(-50% + ${drift * 2}px), calc(-50% - 200px)) scale(.6)`;
      }, 800);
      setTimeout(() => el.remove(), 2200);
    }
    window.addEventListener('click', spawn);
    return () => window.removeEventListener('click', spawn);
  }, []);
  return null;
}

// ── Fireflies ────────────────────────────────────────────────────────────
// Drifting glowing dots across the page. Subtle.
function Fireflies({ count = 8 }) {
  const flies = React.useMemo(() => Array.from({ length: count }).map((_, i) => ({
    x: Math.random() * 100,
    y: 30 + Math.random() * 60,
    dur: 18 + Math.random() * 30,
    delay: -Math.random() * 30,
    size: 3 + Math.random() * 2,
    hue: 35 + Math.random() * 20, // warm amber
    swayX: 60 + Math.random() * 80,
    swayY: 40 + Math.random() * 60,
  })), [count]);
  return (
    <div style={{
      position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 3,
      overflow: 'hidden',
    }}>
      <style>{`
        @keyframes ff-drift {
          0%   { transform: translate(0, 0); }
          25%  { transform: translate(var(--sx), calc(var(--sy) * -1)); }
          50%  { transform: translate(calc(var(--sx) * 1.2), var(--sy)); }
          75%  { transform: translate(calc(var(--sx) * -.5), calc(var(--sy) * -.7)); }
          100% { transform: translate(0, 0); }
        }
        @keyframes ff-pulse {
          0%,100% { opacity: .3; box-shadow: 0 0 4px 2px var(--c1), 0 0 12px 4px var(--c2); }
          50%     { opacity: 1;  box-shadow: 0 0 8px 4px var(--c1), 0 0 24px 8px var(--c2); }
        }
      `}</style>
      {flies.map((f, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${f.x}%`, top: `${f.y}%`,
          width: f.size, height: f.size,
          borderRadius: '50%',
          background: `hsl(${f.hue}, 100%, 80%)`,
          animation: `ff-drift ${f.dur}s ease-in-out ${f.delay}s infinite, ff-pulse ${2 + (i % 3)}s ease-in-out ${i * 0.4}s infinite`,
          '--sx': `${f.swayX}px`,
          '--sy': `${f.swayY}px`,
          '--c1': `hsla(${f.hue}, 100%, 80%, .7)`,
          '--c2': `hsla(${f.hue}, 100%, 60%, .35)`,
          willChange: 'transform, box-shadow',
        }} />
      ))}
    </div>
  );
}

window.ClickHearts = ClickHearts;
window.Fireflies = Fireflies;
