// Drifting petals — gentle ambient layer over the whole page
function Petals() {
  const items = React.useMemo(() => Array.from({ length: 18 }).map((_, i) => ({
    left: Math.random() * 100,
    delay: -Math.random() * 30,
    dur: 18 + Math.random() * 18,
    size: 6 + Math.random() * 10,
    sway: -80 + Math.random() * 160,
    rotStart: Math.random() * 360,
    rotEnd: 180 + Math.random() * 720,
    color: ['#f5c0a8', '#e3a25b', '#fdfaf2', '#c75e4e', '#f4c95a', '#d98a72'][i % 6],
    opacity: 0.35 + Math.random() * 0.4,
    radius: ['50% 0 50% 50%', '0 50% 50% 50%', '50% 50% 0 50%'][i % 3],
  })), []);
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 5, overflow: 'hidden' }}>
      <style>{`
        @keyframes fa-petal {
          0%   { transform: translate3d(0, -12vh, 0) rotate(var(--r0)); }
          100% { transform: translate3d(var(--sway), 112vh, 0) rotate(var(--r1)); }
        }
      `}</style>
      {items.map((p, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${p.left}%`,
          top: 0,
          width: p.size * 1.6,
          height: p.size,
          background: p.color,
          opacity: p.opacity,
          borderRadius: p.radius,
          filter: 'blur(.4px)',
          animation: `fa-petal ${p.dur}s linear ${p.delay}s infinite`,
          '--sway': `${p.sway}px`,
          '--r0': `${p.rotStart}deg`,
          '--r1': `${p.rotEnd}deg`,
        }} />
      ))}
    </div>
  );
}

window.Petals = Petals;
