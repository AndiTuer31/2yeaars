// Door + knock intro. Three knocks → door swings open, envelope appears behind.
// Sits in front of the envelope; calls onPass when knocks complete.

function DoorIntro({ onPass }) {
  const [knocks, setKnocks] = React.useState(0);
  const [opening, setOpening] = React.useState(false);
  const [shake, setShake] = React.useState(0);
  const [hintVisible, setHintVisible] = React.useState(false);

  React.useEffect(() => {
    const t = setTimeout(() => setHintVisible(true), 900);
    return () => clearTimeout(t);
  }, []);

  function knock(e) {
    if (opening) return;
    setShake((s) => s + 1);
    playKnock();
    const next = knocks + 1;
    setKnocks(next);
    // Burst petals from the knock point
    if (window.burstAt && e) {
      window.burstAt(e.clientX, e.clientY, { count: 8, colors: ['#e3a25b','#f4c95a','#fdfaf2'] });
    }
    if (next >= 3) {
      setTimeout(() => {
        setOpening(true);
        setTimeout(() => onPass?.(), 1500);
      }, 250);
    }
  }

  function playKnock() {
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      const ctx = window.__audioCtx || (window.__audioCtx = new Ctx());
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'square';
      o.frequency.value = 80;
      g.gain.value = 0;
      o.connect(g); g.connect(ctx.destination);
      const t = ctx.currentTime;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.18, t + 0.005);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
      o.start(t); o.stop(t + 0.15);
    } catch (e) {}
  }

  return (
    <div
      style={{
        position: 'absolute', inset: 0, overflow: 'hidden',
        background: 'radial-gradient(ellipse at center, #0d0805 0%, #06030200 70%), #0a0604',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: opening ? 'default' : 'default',
        perspective: '1600px',
      }}
    >
      <style>{`
        @keyframes door-shake {
          0%,100% { transform: translateX(0) }
          25% { transform: translateX(-3px) }
          75% { transform: translateX(3px) }
        }
        @keyframes door-open {
          to { transform: perspective(2000px) rotateY(-92deg); }
        }
        @keyframes hint-pulse {
          0%,100% { transform: translateY(0); opacity: .65 }
          50% { transform: translateY(-5px); opacity: 1 }
        }
        @keyframes door-light-spill {
          to { opacity: 1; }
        }
        @keyframes door-glow {
          0%,100% { box-shadow: 0 0 12px rgba(255,200,140,.0); }
          50% { box-shadow: 0 0 24px rgba(255,200,140,.4); }
        }
      `}</style>

      {/* light spill from behind door once opening */}
      {opening && (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(255,220,160,.4) 0%, rgba(255,220,160,.1) 35%, transparent 60%)',
          opacity: 0,
          animation: 'door-light-spill 1.2s ease forwards',
        }}/>
      )}

      {/* DOOR FRAME */}
      <div style={{
        position: 'relative',
        width: 360, height: 600,
        transformStyle: 'preserve-3d',
        animation: shake ? `door-shake .4s ease-out` : 'none',
      }} key={shake}>
        {/* frame */}
        <div style={{
          position: 'absolute', inset: -14,
          background: '#1f130a',
          boxShadow: '0 30px 60px rgba(0,0,0,.6), inset 0 0 0 6px #2a1810',
          borderRadius: 4,
        }} />

        {/* the door — rotates on left hinge */}
        <div
          onClick={knock}
          style={{
            position: 'absolute', inset: 0,
            background:
              'linear-gradient(180deg, #5a3a22 0%, #4a2e1b 100%)',
            backgroundImage:
              'repeating-linear-gradient(90deg, rgba(0,0,0,.18) 0 1px, transparent 1px 80px), ' +
              'repeating-linear-gradient(0deg, rgba(0,0,0,.08) 0 1px, transparent 1px 4px)',
            transformOrigin: 'left center',
            transform: 'perspective(2000px) rotateY(0)',
            animation: opening ? 'door-open 1.4s cubic-bezier(.45,0,.55,1) forwards' : 'none',
            cursor: opening ? 'default' : 'pointer',
            boxShadow: 'inset 0 0 0 8px #3a2415, inset 0 0 60px rgba(0,0,0,.45), 0 4px 0 rgba(0,0,0,.4)',
            transition: 'box-shadow .3s ease',
          }}
        >
          {/* panels */}
          {[0, 1].map((row) => (
            <div key={row} style={{
              position: 'absolute',
              left: 40, right: 40,
              top: row === 0 ? 50 : 320,
              height: 220,
              border: '4px solid #2a1810',
              borderRadius: 2,
              boxShadow: 'inset 0 0 0 2px #6a4524, inset 0 0 22px rgba(0,0,0,.4)',
              background: 'linear-gradient(180deg, #4a2e1b 0%, #3a2414 100%)',
            }} />
          ))}

          {/* doorknob */}
          <div style={{
            position: 'absolute', right: 24, top: '50%', width: 22, height: 22,
            borderRadius: '50%',
            background: 'radial-gradient(circle at 30% 30%, #e8c878 0%, #b48a40 60%, #6a4f1c 100%)',
            transform: 'translateY(-50%)',
            boxShadow: '0 2px 4px rgba(0,0,0,.5)',
          }} />
          <div style={{
            position: 'absolute', right: 22, top: '50%', width: 26, height: 4,
            background: '#3a2810',
            transform: 'translateY(-50%) translateX(-10px)',
          }} />

          {/* knocker */}
          <div style={{
            position: 'absolute', left: '50%', top: 90, width: 56, height: 56,
            transform: 'translateX(-50%)',
          }}>
            <div style={{
              width: '100%', height: '100%', borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 30%, #d8b25c 0%, #8a6624 60%, #4a3010 100%)',
              boxShadow: '0 3px 6px rgba(0,0,0,.45)',
            }}/>
            <div style={{
              position: 'absolute', inset: 12,
              borderRadius: '50%',
              border: '3px solid rgba(0,0,0,.4)',
              background: 'radial-gradient(circle at 35% 30%, #b48a40 0%, #5a3e16 100%)',
            }}/>
            {/* heart inside */}
            <div style={{
              position: 'absolute', left: '50%', top: '50%',
              transform: 'translate(-50%,-50%)',
              color: '#c75e4e', fontSize: 16,
            }}>♡</div>
          </div>

          {/* knock count indicators */}
          <div style={{
            position: 'absolute', bottom: 80, left: 0, right: 0,
            display: 'flex', justifyContent: 'center', gap: 14,
          }}>
            {[0,1,2].map(i => (
              <div key={i} style={{
                width: 12, height: 12, borderRadius: '50%',
                background: i < knocks ? '#e3a25b' : 'rgba(255,255,255,.08)',
                boxShadow: i < knocks ? '0 0 8px rgba(227,162,91,.7)' : 'inset 0 0 0 1px rgba(255,255,255,.18)',
                transition: 'all .25s ease',
              }}/>
            ))}
          </div>

          {/* "for Ana" small plate */}
          <div style={{
            position: 'absolute', bottom: 30, left: 0, right: 0, textAlign: 'center',
            fontFamily: '"Caveat", cursive', fontSize: 22, color: '#e3a25b',
            opacity: .85,
            textShadow: '0 1px 2px rgba(0,0,0,.5)',
          }}>
            for Ana
          </div>
        </div>
      </div>

      {/* hint */}
      <div style={{
        position: 'absolute', bottom: '12%', left: 0, right: 0, textAlign: 'center',
        fontFamily: '"Caveat", cursive', fontSize: 26, color: '#e3a25b',
        opacity: hintVisible && !opening ? 1 : 0,
        transition: 'opacity .8s ease',
        animation: hintVisible && !opening ? 'hint-pulse 2.4s ease-in-out infinite' : 'none',
        pointerEvents: 'none',
      }}>
        {knocks === 0 && '↑ knock three times ↑'}
        {knocks === 1 && '↑ two more ↑'}
        {knocks === 2 && '↑ one more ↑'}
        {knocks >= 3 && (opening ? 'come in' : '...')}
      </div>

      {/* top tag */}
      <div style={{
        position: 'absolute', top: '11%', left: 0, right: 0, textAlign: 'center',
        fontFamily: '"Special Elite", monospace', fontSize: 12,
        letterSpacing: '.4em',
        color: '#e3a25b', opacity: .7,
      }}>
        FROM RICO &nbsp; · &nbsp; WITH BAILEY
      </div>
    </div>
  );
}

window.DoorIntro = DoorIntro;
