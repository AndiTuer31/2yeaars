// Cinematic envelope intro:
// 1. Sealed envelope, breathing softly. Knock 3× hint, then "click to open".
// 2. On click: wax seal cracks open. Flap folds back. Letter slides up out of
//    the envelope. Letter unfurls. Envelope falls away. Petals burst.
//    Letter then fades into the scrapbook page.

function EnvelopeIntro({ onOpen }) {
  const [phase, setPhase] = React.useState('idle');
  // phases: idle → cracking → opening → pulling → unfurling → done
  const [hint, setHint] = React.useState(false);

  React.useEffect(() => {
    const t = setTimeout(() => setHint(true), 1100);
    return () => clearTimeout(t);
  }, []);

  function start(e) {
    if (phase !== 'idle') return;
    // burst petals from seal location
    if (window.burstAt && e) {
      const r = e.currentTarget.getBoundingClientRect();
      window.burstAt(r.left + r.width / 2, r.top + r.height / 2, { count: 24 });
    }
    setPhase('cracking');
    setTimeout(() => setPhase('opening'), 300);
    setTimeout(() => setPhase('pulling'), 1100);
    setTimeout(() => setPhase('unfurling'), 1900);
    setTimeout(() => { setPhase('done'); onOpen?.(); }, 2700);
  }

  const cracking = phase === 'cracking';
  const opening = ['opening','pulling','unfurling','done'].includes(phase);
  const pulling = ['pulling','unfurling','done'].includes(phase);
  const unfurling = ['unfurling','done'].includes(phase);
  const done = phase === 'done';

  return (
    <div
      style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: phase === 'idle' ? 'pointer' : 'default',
        perspective: '1800px',
        background: 'radial-gradient(ellipse at center, #2a1810 0%, #120a06 75%)',
        overflow: 'hidden',
      }}
      onClick={start}
    >
      <style>{`
        @keyframes env-hint { 0%,100%{transform:translateY(0); opacity:.55} 50%{transform:translateY(-6px); opacity:.95} }
        @keyframes env-breath { 0%,100%{transform:scale(1)} 50%{transform:scale(1.012)} }
        @keyframes env-spark { 0%,100%{opacity:.4; transform:scale(1)} 50%{opacity:1; transform:scale(1.1)} }
        @keyframes env-crack { 0%{transform:translate(-50%,-50%) scale(1) rotate(0)} 30%{transform:translate(-50%,-50%) scale(1.15) rotate(-3deg)} 60%{transform:translate(-50%,-50%) scale(1.05) rotate(4deg)} 100%{transform:translate(-50%,-50%) scale(0) rotate(0); opacity:0} }
        @keyframes env-fall {
          0%   { transform: translateY(0) rotate(0); opacity: 1; }
          100% { transform: translateY(60vh) rotate(-8deg); opacity: 0; }
        }
        @keyframes env-pull { 0%{transform:translateY(0)} 100%{transform:translateY(-280px)} }
        @keyframes env-unfurl {
          0%   { transform: translate(-50%, -50%) translateY(-280px) scale(.55) rotateX(60deg); opacity: 1; }
          100% { transform: translate(-50%, -50%) translateY(-30px) scale(1.55) rotateX(0); opacity: 1; }
        }
        @keyframes env-fade-out {
          to { opacity: 0; transform: translate(-50%, -50%) translateY(-30px) scale(1.55); }
        }
      `}</style>

      {/* ambient spark vignette */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, rgba(255,200,140,.08) 0%, transparent 60%)',
        animation: 'env-spark 6s ease-in-out infinite',
        pointerEvents: 'none',
      }}/>

      {/* Envelope */}
      <div style={{
        position: 'relative', width: 580, height: 360,
        animation: phase === 'idle' ? 'env-breath 5s ease-in-out infinite' : 'none',
        transformStyle: 'preserve-3d',
      }}>
        {/* body — falls away after envelope opens fully */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, #d2a07c 0%, #b07854 100%)',
          boxShadow: '0 30px 70px rgba(0,0,0,.55), inset 0 0 60px rgba(70,30,10,.3)',
          borderRadius: 6,
          animation: unfurling ? 'env-fall 1.4s cubic-bezier(.45,.05,.55,.95) forwards' : 'none',
        }} />

        {/* inner V shading */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage:
            'linear-gradient(135deg, rgba(40,20,10,.25) 0%, transparent 50%),' +
            'linear-gradient(225deg, rgba(40,20,10,.25) 0%, transparent 50%)',
          clipPath: 'polygon(0 0, 50% 50%, 100% 0, 100% 100%, 0 100%)',
          borderRadius: 6,
          animation: unfurling ? 'env-fall 1.4s cubic-bezier(.45,.05,.55,.95) forwards' : 'none',
        }} />

        {/* address line */}
        <div style={{
          position: 'absolute', top: '66%', left: '50%', transform: 'translateX(-50%)',
          fontFamily: '"Caveat", cursive', fontSize: 42, color: '#fbf3e0',
          textShadow: '0 2px 4px rgba(0,0,0,.3)',
          whiteSpace: 'nowrap',
          opacity: opening ? 0 : .95,
          transition: 'opacity .4s ease',
        }}>for Ana</div>
        <div style={{
          position: 'absolute', top: '80%', left: '50%', transform: 'translateX(-50%)',
          fontFamily: '"Special Elite", monospace', fontSize: 11,
          letterSpacing: '.3em', color: '#fbf3e0',
          opacity: opening ? 0 : .7,
          transition: 'opacity .4s ease',
        }}>25 · 05 · 2026</div>

        {/* flap — folds back, then envelope falls */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '50%',
          background: 'linear-gradient(180deg, #d99a78 0%, #b8785a 100%)',
          clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
          transformOrigin: 'top center',
          transform: opening ? 'rotateX(-180deg)' : 'rotateX(0)',
          transition: 'transform 1.0s cubic-bezier(.4,0,.6,1)',
          boxShadow: opening ? 'none' : '0 4px 8px rgba(0,0,0,.18)',
          backfaceVisibility: 'hidden',
          animation: unfurling ? 'env-fall 1.4s cubic-bezier(.45,.05,.55,.95) .15s forwards' : 'none',
        }} />

        {/* wax seal */}
        <div style={{
          position: 'absolute', top: '42%', left: '50%',
          width: 78, height: 78, borderRadius: '50%',
          transform: 'translate(-50%,-50%)',
          background: 'radial-gradient(circle at 35% 30%, #e16e54 0%, #b13e2a 55%, #7a2818 100%)',
          color: '#fbf3e0',
          fontFamily: '"Instrument Serif", serif', fontSize: 22, fontStyle: 'italic',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 8px 16px rgba(0,0,0,.4), inset 0 -4px 6px rgba(0,0,0,.25), inset 0 4px 4px rgba(255,255,255,.15)',
          letterSpacing: '.02em',
          animation: cracking ? 'env-crack .6s cubic-bezier(.65,0,.35,1) forwards' : 'none',
        }}>R♡A</div>

        {/* The letter — slides UP and out of the envelope */}
        <div style={{
          position: 'absolute', left: '8%', right: '8%', top: 30, bottom: -10,
          background: '#fbf3e0',
          boxShadow: '0 8px 24px rgba(0,0,0,.3), inset 0 6px 10px rgba(0,0,0,.06)',
          backgroundImage: 'repeating-linear-gradient(transparent 0 28px, rgba(110,70,30,.1) 28px 29px)',
          padding: '40px 50px',
          fontFamily: '"EB Garamond", serif',
          color: '#3a2f23',
          transform: pulling ? 'translateY(-280px)' : 'translateY(0)',
          transition: 'transform 1.0s cubic-bezier(.34,1.2,.4,1)',
          zIndex: -1,
          opacity: opening ? 1 : 0,
          transitionProperty: 'transform, opacity',
          transitionDuration: '1.0s, 0.5s',
        }}>
          <div style={{
            fontFamily: '"Caveat", cursive', fontSize: 34, color: '#c75e4e',
            transform: 'rotate(-1deg)',
            marginBottom: 8,
          }}>
            Ana,
          </div>
          <div style={{ fontSize: 18, lineHeight: 1.55 }}>
            two years ago, after a walk with Bailey, you sat down on the couch — and that was the end of every other plan I had.
          </div>
          <div style={{
            marginTop: 22, fontFamily: '"Caveat", cursive', fontSize: 28, color: '#5a3f22',
            transform: 'rotate(-1.5deg)',
          }}>
            ↓ keep reading ↓
          </div>
        </div>
      </div>

      {/* corner header */}
      <div style={{
        position: 'absolute', top: '11%', left: 0, right: 0, textAlign: 'center',
        fontFamily: '"Special Elite", monospace', fontSize: 12, letterSpacing: '.4em',
        color: '#f4d9b8',
        opacity: opening ? 0 : .75, transition: 'opacity .5s',
      }}>
        FROM RICO &nbsp; · &nbsp; WITH BAILEY
      </div>

      {/* hint */}
      <div style={{
        position: 'absolute', bottom: '13%', left: 0, right: 0, textAlign: 'center',
        fontFamily: '"Caveat", cursive', fontSize: 28, color: '#f4d9b8',
        opacity: hint && !opening ? 1 : 0,
        transition: 'opacity .8s ease',
        animation: hint && !opening ? 'env-hint 2.2s ease-in-out infinite' : 'none',
        pointerEvents: 'none',
      }}>
        ↓ click the seal ↓
      </div>
    </div>
  );
}

window.EnvelopeIntro = EnvelopeIntro;
