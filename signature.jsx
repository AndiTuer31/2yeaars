// Animated handwritten signature: SVG paths drawing "Rico" + a heart
function HandwrittenSignature({ delay = 0, scale = 1 }) {
  const ref = React.useRef(null);
  const [start, setStart] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return window.__revealController.add(el, () => setStart(true));
  }, []);

  // Two strokes: the "Rico" wordmark and the heart afterward.
  return (
    <div ref={ref} style={{ display: 'inline-block', transform: `scale(${scale})`, transformOrigin: 'left top' }}>
      <svg viewBox="0 0 280 90" width="280" height="90" style={{ overflow: 'visible' }}>
        <style>{`
          .sig-path {
            fill: none;
            stroke: #c75e4e;
            stroke-width: 2.4;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-dasharray: var(--len);
            stroke-dashoffset: var(--len);
            transition: stroke-dashoffset 1.6s cubic-bezier(.65,0,.35,1);
          }
          .sig-path.sig-go { stroke-dashoffset: 0; }
        `}</style>
        {/* R */}
        <path
          className={`sig-path ${start ? 'sig-go' : ''}`}
          style={{ '--len': 220, transitionDelay: `${delay}s` }}
          d="M 20 70 C 18 45, 22 22, 30 18 C 50 14, 60 28, 50 42 C 42 52, 26 46, 28 46 C 32 46, 48 56, 56 70"
        />
        {/* i */}
        <path
          className={`sig-path ${start ? 'sig-go' : ''}`}
          style={{ '--len': 50, transitionDelay: `${delay + 0.5}s` }}
          d="M 78 38 C 76 50, 76 62, 80 70"
        />
        <circle
          cx="80" cy="28" r="2.2" fill="#c75e4e"
          style={{
            opacity: start ? 1 : 0,
            transition: `opacity .3s ease ${delay + 0.7}s`,
          }}
        />
        {/* c */}
        <path
          className={`sig-path ${start ? 'sig-go' : ''}`}
          style={{ '--len': 120, transitionDelay: `${delay + 0.7}s` }}
          d="M 124 46 C 116 38, 102 38, 98 50 C 96 62, 108 70, 124 64"
        />
        {/* o */}
        <path
          className={`sig-path ${start ? 'sig-go' : ''}`}
          style={{ '--len': 160, transitionDelay: `${delay + 1.0}s` }}
          d="M 148 50 C 138 38, 158 36, 162 52 C 164 64, 146 68, 144 56 C 142 48, 150 44, 156 46"
        />
        {/* flourish dash + heart */}
        <path
          className={`sig-path ${start ? 'sig-go' : ''}`}
          style={{ '--len': 90, transitionDelay: `${delay + 1.3}s` }}
          d="M 172 66 C 184 64, 200 62, 214 64"
        />
        {/* heart */}
        <path
          className={`sig-path ${start ? 'sig-go' : ''}`}
          style={{ '--len': 80, transitionDelay: `${delay + 1.7}s`, strokeWidth: 2.6 }}
          d="M 234 50 C 234 42, 222 42, 222 52 C 222 58, 234 66, 234 66 C 234 66, 246 58, 246 52 C 246 42, 234 42, 234 50 Z"
          fill={start ? '#c75e4e' : 'none'}
          fillOpacity={start ? 1 : 0}
        />
      </svg>
    </div>
  );
}

window.HandwrittenSignature = HandwrittenSignature;
