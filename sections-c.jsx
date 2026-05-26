// Flashlight constellation chapter.
//
// The whole section is near-pitch black. A radial light follows the cursor.
// Heart-shape stars are scattered in space — they only become visible when
// the flashlight touches them. Once a star is "discovered" it stays lit.
// When all stars are lit, the connecting lines animate into a heart and the
// chapter "completes" with a soft pulse.

function ConstellationSection() {
  const sectionRef = React.useRef(null);
  const overlayRef = React.useRef(null);
  const [discovered, setDiscovered] = React.useState(() => new Set());
  const [allFound, setAllFound] = React.useState(false);
  const [completed, setCompleted] = React.useState(false);
  const [hovering, setHovering] = React.useState(false);

  // Heart-shape star positions (in % of the constellation field)
  const N = 24;
  const points = React.useMemo(() => {
    const arr = [];
    for (let i = 0; i < N; i++) {
      const t = (i / N) * Math.PI * 2;
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
      // Field uses px coordinates; centered around (0,0) → translate to (50%, 50%)
      // Wider spread so user has to move the flashlight around
      arr.push({ x: x * 18, y: y * 18 });
    }
    return arr;
  }, []);

  // Flashlight position tracking
  React.useEffect(() => {
    const sec = sectionRef.current;
    const overlay = overlayRef.current;
    if (!sec || !overlay) return;

    let raf = 0;
    let cursorX = -1000, cursorY = -1000;
    let hoverState = false;

    function onMove(e) {
      const r = sec.getBoundingClientRect();
      // store relative to the section
      cursorX = e.clientX - r.left;
      cursorY = e.clientY - r.top;
      hoverState = cursorX >= 0 && cursorX <= r.width && cursorY >= 0 && cursorY <= r.height;
      setHovering(hoverState);
    }
    function onLeave() {
      hoverState = false;
      cursorX = cursorY = -1000;
      setHovering(false);
    }

    // Update overlay mask + check for stars in beam, on every frame
    function tick() {
      const r = sec.getBoundingClientRect();
      const vh = window.innerHeight;
      // Compute mask only if section is on screen
      const onScreen = r.bottom > 0 && r.top < vh;
      if (onScreen) {
        // Mask: a radial transparent hole + soft falloff
        // Use radial-gradient mask: filled black except where cursor is
        overlay.style.background =
          `radial-gradient(circle 200px at ${cursorX}px ${cursorY}px,` +
          `  rgba(0,0,0,0) 0%,` +
          `  rgba(0,0,0,.3) 35%,` +
          `  rgba(2,4,12,.94) 70%,` +
          `  rgba(2,4,12,.985) 100%)`;
        overlay.style.opacity = hoverState ? '1' : '0.96';
      }

      // Check each star — if within ~110px of cursor, mark as discovered
      if (hoverState) {
        const field = sec.querySelector('[data-field]');
        if (field) {
          const fr = field.getBoundingClientRect();
          const fieldCx = fr.left - r.left + fr.width / 2;
          const fieldCy = fr.top - r.top + fr.height / 2;
          let newDiscovered = null;
          for (let i = 0; i < points.length; i++) {
            const px = fieldCx + points[i].x;
            const py = fieldCy + points[i].y;
            const dx = px - cursorX, dy = py - cursorY;
            const d2 = dx * dx + dy * dy;
            if (d2 < 110 * 110) {
              if (!discovered.has(i)) {
                if (!newDiscovered) newDiscovered = new Set(discovered);
                newDiscovered.add(i);
              }
            }
          }
          if (newDiscovered) setDiscovered(newDiscovered);
        }
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseout', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseout', onLeave);
    };
  }, [points, discovered]);

  // Trigger completion
  React.useEffect(() => {
    if (!allFound && discovered.size === N) {
      setAllFound(true);
      setTimeout(() => setCompleted(true), 800);
      // Petal burst at center
      const sec = sectionRef.current;
      if (sec) {
        const r = sec.getBoundingClientRect();
        if (window.burstAt) {
          window.burstAt(r.left + r.width / 2, r.top + r.height / 2, {
            count: 36, colors: ['#fbf3e0', '#e8a89a', '#f4c95a'],
          });
        }
        if (window.foundEgg && window.foundEgg('constellation')) {
          window.showToast?.('the heart, in the dark ♡');
        }
      }
    }
  }, [discovered, allFound]);

  const fieldW = 720, fieldH = 540;
  const pct = discovered.size / N;
  const drawCount = Math.floor(pct * (N + 1));

  return (
    <section
      ref={sectionRef}
      data-section="CONSTELLATION"
      style={{
        position: 'relative',
        minHeight: 1200,
        padding: '90px 40px',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at center, #1a2640 0%, #0b1124 60%, #050810 100%)',
        cursor: 'none',
      }}
    >
      <style>{`
        @keyframes ct-pop { 0%{transform:scale(0)} 60%{transform:scale(1.3)} 100%{transform:scale(1)} }
        @keyframes ct-pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.04)} }
        @keyframes ct-twinkle { 0%,100%{opacity:.25} 50%{opacity:.55} }
        @keyframes ct-glow {
          0%,100% { filter: drop-shadow(0 0 6px rgba(255,200,160,.4)) drop-shadow(0 0 24px rgba(255,200,160,.25)); }
          50%     { filter: drop-shadow(0 0 12px rgba(255,200,160,.7)) drop-shadow(0 0 36px rgba(255,200,160,.5)); }
        }
      `}</style>

      {/* Faint background twinkles (under the mask) */}
      {Array.from({ length: 70 }).map((_, i) => {
        const x = (i * 37) % 100;
        const y = ((i * 53) % 100);
        const s = 1 + (i % 3);
        return (
          <div key={i} style={{
            position: 'absolute',
            left: `${x}%`, top: `${y}%`,
            width: s, height: s,
            background: '#fbf3e0', borderRadius: '50%',
            opacity: .25 + (i % 4) * 0.12,
            boxShadow: '0 0 3px rgba(255,255,255,.5)',
            animation: `ct-twinkle ${2 + (i % 5)}s ease-in-out ${i * 0.07}s infinite`,
          }} />
        );
      })}

      {/* shooting stars overlay */}
      {window.ShootingStars && <window.ShootingStars count={3} />}

      {/* Heart-stars field — positioned so cursor must explore to find them */}
      <div
        data-field
        style={{
          position: 'absolute', left: '50%', top: '50%',
          width: fieldW, height: fieldH,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 5,
        }}
      >
        <svg viewBox={`-${fieldW / 2} -${fieldH / 2} ${fieldW} ${fieldH}`} width="100%" height="100%" style={{ overflow: 'visible' }}>
          <defs>
            <radialGradient id="ct-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fffbe2" stopOpacity="1" />
              <stop offset="50%" stopColor="#f4d9b8" stopOpacity=".55" />
              <stop offset="100%" stopColor="#f4d9b8" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="ct-aura" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffd6c4" stopOpacity=".4" />
              <stop offset="100%" stopColor="#e8a89a" stopOpacity="0" />
            </radialGradient>
            <filter id="ct-blur">
              <feGaussianBlur stdDeviation="0.4" />
            </filter>
          </defs>

          {/* Connecting line — draws progressively as stars discovered */}
          {drawCount > 1 && (
            <path
              d={
                points.slice(0, drawCount).map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ') +
                (completed ? ` L ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)} Z` : '')
              }
              stroke="#f4d9b8"
              strokeWidth="0.8"
              strokeOpacity={Math.min(0.85, pct * 0.9)}
              fill={completed ? 'rgba(244,217,184,0.08)' : 'none'}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transition: 'fill .8s ease, stroke-opacity .4s ease' }}
            />
          )}

          {/* Glow fill once complete */}
          {completed && (
            <path
              d={points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ') + ` Z`}
              fill="rgba(232,168,154,0.22)"
              filter="url(#ct-blur)"
              style={{ animation: 'ct-pop .8s ease both, ct-pulse 3s ease-in-out 1s infinite' }}
            />
          )}

          {/* The stars */}
          {points.map((pt, i) => {
            const found = discovered.has(i);
            return (
              <g key={i} style={{
                opacity: found ? 1 : 0,
                transform: found ? 'scale(1)' : 'scale(0)',
                transformOrigin: `${pt.x}px ${pt.y}px`,
                transition: 'opacity .35s ease, transform .35s cubic-bezier(.34,1.5,.4,1)',
              }}>
                <circle cx={pt.x} cy={pt.y} r="14" fill="url(#ct-aura)" />
                <circle cx={pt.x} cy={pt.y} r="4" fill="url(#ct-glow)" />
                <circle cx={pt.x} cy={pt.y} r="1.2" fill="#fffbe2" />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Title — visible but dim, so the flashlight is what matters */}
      <div style={{
        position: 'relative', zIndex: 6,
        maxWidth: 1100, margin: '0 auto', textAlign: 'center',
        paddingTop: 30,
      }}>
        <div style={{
          fontFamily: '"Special Elite", monospace', fontSize: 11,
          letterSpacing: '.4em', color: 'rgba(244,222,160,.5)',
        }}>
          05A · IN THE DARK
        </div>
        <div style={{
          marginTop: 16,
          fontFamily: '"Instrument Serif", serif', fontSize: 72, lineHeight: 1,
          color: '#fbf3e0', letterSpacing: '-.02em',
          textShadow: '0 4px 24px rgba(0,0,0,.8)',
          opacity: completed ? 1 : 0.6,
          transition: 'opacity 1.2s ease',
        }}>
          there's a <em style={{ color: '#e8a89a', fontStyle: 'italic' }}>shape</em> in here.
        </div>
        <div style={{
          marginTop: 14,
          fontFamily: '"Caveat", cursive', fontSize: 26,
          color: '#e3a25b', opacity: hovering && discovered.size === 0 ? 1 : 0,
          transition: 'opacity .6s ease',
          textShadow: '0 2px 8px rgba(0,0,0,.6)',
        }}>
          move slowly. you'll find it.
        </div>
      </div>

      {/* discovery counter HUD */}
      <div style={{
        position: 'absolute', top: 28, right: 40, zIndex: 30,
        fontFamily: '"Special Elite", monospace', fontSize: 11,
        letterSpacing: '.3em', color: 'rgba(244,222,160,.7)',
        background: 'rgba(0,0,0,.4)',
        padding: '8px 14px',
        border: '1px solid rgba(244,222,160,.2)',
        borderRadius: 20,
        opacity: hovering ? 1 : .35,
        transition: 'opacity .4s ease',
      }}>
        ★ {String(discovered.size).padStart(2,'0')} / {N}
      </div>

      {/* Closing message */}
      <div style={{
        position: 'absolute', bottom: 140, left: 0, right: 0, textAlign: 'center', zIndex: 6,
        opacity: completed ? 1 : 0,
        transform: completed ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 1.2s ease .3s, transform 1.2s ease .3s',
      }}>
        <div style={{
          fontFamily: '"Caveat", cursive', fontSize: 36, color: '#fbf3e0',
          textShadow: '0 4px 16px rgba(0,0,0,.6)',
        }}>
          there it is. ♡
        </div>
        <div style={{
          marginTop: 8,
          fontFamily: '"Instrument Serif", serif', fontSize: 22, fontStyle: 'italic',
          color: '#e8a89a', opacity: .9,
        }}>
          have been seeing it for two years.
        </div>
      </div>

      {/* The dark veil + flashlight hole (over the page; under the title) */}
      <div
        ref={overlayRef}
        style={{
          position: 'absolute', inset: 0, zIndex: 4,
          pointerEvents: 'none',
          mixBlendMode: 'normal',
          transition: 'opacity .35s ease',
        }}
      />

      {/* Custom torch cursor — only inside section */}
      <FlashlightCursor visible={hovering} />

      {/* footer credit */}
      <div style={{
        position: 'absolute', bottom: 30, left: 0, right: 0, textAlign: 'center', zIndex: 6,
        fontFamily: '"Special Elite", monospace', fontSize: 10,
        letterSpacing: '.3em', color: 'rgba(244,222,160,.4)',
      }}>
        — sky · 25 may 2026 · 22:00 —
      </div>
    </section>
  );
}

// Cute flashlight cursor — a small circle with a beam-glow, follows mouse
function FlashlightCursor({ visible }) {
  const [pos, setPos] = React.useState({ x: -1000, y: -1000 });
  React.useEffect(() => {
    function move(e) { setPos({ x: e.clientX, y: e.clientY }); }
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);
  return (
    <div style={{
      position: 'fixed',
      left: pos.x, top: pos.y,
      transform: 'translate(-50%, -50%)',
      width: 36, height: 36,
      borderRadius: '50%',
      border: '2px solid rgba(255,230,180,.85)',
      background: 'radial-gradient(circle, rgba(255,240,200,.25) 0%, transparent 70%)',
      pointerEvents: 'none',
      zIndex: 28,
      opacity: visible ? 1 : 0,
      transition: 'opacity .3s ease',
      boxShadow: '0 0 16px rgba(255,220,160,.5), inset 0 0 8px rgba(255,220,160,.3)',
    }}>
      {/* the lens dot */}
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        width: 4, height: 4, borderRadius: '50%',
        background: '#fff5d4',
        transform: 'translate(-50%, -50%)',
        boxShadow: '0 0 6px rgba(255,245,212,.9)',
      }} />
    </div>
  );
}

window.ConstellationSection = ConstellationSection;
