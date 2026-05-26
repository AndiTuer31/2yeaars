// Seaside · sunset beach with a bottle-letter, a picnic blanket of polaroids,
// paw prints, and "two years" written in the sand.

const seaStyles = {
  scene: {
    position:'absolute', inset:0, overflow:'hidden',
    fontFamily:'"EB Garamond", Georgia, serif',
    background:
      'linear-gradient(180deg,' +
      ' #f8c79a 0%, #f4a679 22%, #e98166 38%,' +
      ' #c9839a 50%, #7a8aa8 60%,' +
      ' #6e8aa3 60%, #7f9bb3 62%,' +
      ' #e3c89a 68%, #e8d2a2 100%)',
  },
};

function Sun({ onClick, glow }) {
  return (
    <button onClick={onClick} title="psst" style={{
      position:'absolute', top: 140, left: '50%', marginLeft: -50, width: 100, height: 100,
      borderRadius:'50%', border:'none', cursor:'pointer', padding: 0,
      background:'radial-gradient(circle, #ffe4ad 0%, #f4a679 70%, #e98166 100%)',
      boxShadow: glow
        ? '0 0 80px 30px rgba(255,210,140,.6), 0 0 160px 60px rgba(255,160,110,.35)'
        : '0 0 40px 12px rgba(255,210,140,.45)',
      transition:'box-shadow .6s ease',
    }}/>
  );
}

function Sea() {
  return (
    <div style={{ position:'absolute', left:0, right:0, top:'38%', height:'24%', overflow:'hidden' }}>
      {/* horizon glow on water */}
      <div style={{
        position:'absolute', left:'50%', top:0, marginLeft:-180, width:360, height:24,
        background:'radial-gradient(ellipse, rgba(255,210,140,.65) 0%, rgba(255,210,140,0) 70%)',
      }}/>
      {/* sun reflection band */}
      <div style={{
        position:'absolute', left:'50%', top:8, marginLeft:-22, width: 44, height:'90%',
        background:'linear-gradient(180deg, rgba(255,210,140,.55) 0%, rgba(255,210,140,0) 100%)',
      }}/>
      {/* wave lines */}
      {Array.from({length: 9}).map((_, i) => (
        <div key={i} style={{
          position:'absolute', left: -40, right: -40,
          top: 24 + i*22,
          height: 2,
          background:`rgba(255,255,255,${0.18 + (i%2)*0.1})`,
          borderRadius: 2,
          transform:`translateX(${(i%2?-1:1)*8}px)`,
          animation: `sea-drift ${4 + (i%3)}s ease-in-out ${i*.2}s infinite alternate`,
        }}/>
      ))}
      {/* tiny sailboat */}
      <svg viewBox="0 0 60 50" width="40" height="34" style={{
        position:'absolute', top: 18, left: '28%',
        opacity:.75,
      }}>
        <path d="M 30 8 L 30 30 L 48 30 Z" fill="#fbf3e0" />
        <path d="M 30 12 L 30 30 L 18 30 Z" fill="#fbf3e0" opacity=".75" />
        <path d="M 12 32 L 50 32 L 44 40 L 18 40 Z" fill="#3a2415" />
      </svg>
    </div>
  );
}

function Sand() {
  return (
    <div style={{
      position:'absolute', left:0, right:0, top:'60%', bottom:0,
      background:
        'linear-gradient(180deg, #e8cf9c 0%, #d9b97a 70%, #c4a06a 100%)',
    }}>
      {/* sand grain dots */}
      <div style={{ position:'absolute', inset:0,
        backgroundImage:
          'radial-gradient(rgba(110,70,30,.18) 1px, transparent 1.4px),' +
          'radial-gradient(rgba(110,70,30,.12) 1px, transparent 1.4px)',
        backgroundSize:'8px 8px, 14px 14px',
        backgroundPosition:'0 0, 4px 7px',
        opacity:.6,
      }}/>
    </div>
  );
}

function PicnicBlanket() {
  // gingham red+cream
  return (
    <div style={{
      position:'absolute', bottom: 50, left: 320, width: 480, height: 230,
      transform:'perspective(900px) rotateX(38deg)',
      transformOrigin:'50% 100%',
      background:
        'repeating-linear-gradient(0deg, rgba(199,94,78,.85) 0 22px, rgba(255,250,240,.9) 22px 44px),' +
        'repeating-linear-gradient(90deg, rgba(199,94,78,.6) 0 22px, transparent 22px 44px)',
      backgroundBlendMode:'multiply',
      boxShadow:'0 30px 40px rgba(70,40,15,.3)',
      borderRadius: 6,
    }}/>
  );
}

function PolaroidOnSand({ id, top, left, rotate, label }) {
  return (
    <div style={{
      position:'absolute', top, left, width: 170, padding:'10px 10px 36px',
      background:'#fdfaf2',
      boxShadow:'0 12px 20px rgba(70,40,15,.32)',
      transform: `rotate(${rotate}deg)`,
    }}>
      <image-slot
        id={id} shape="rect" placeholder="photo"
        style={{ width:'150px', height:'150px', display:'block', background:'#e9dec3' }}
      ></image-slot>
      <div style={{
        position:'absolute', bottom: 8, left: 0, right: 0, textAlign:'center',
        fontFamily:'"Caveat", cursive', fontSize: 18, color:'#5a4128',
      }}>{label}</div>
    </div>
  );
}

function Paw({ size = 20, color = 'rgba(120,80,40,.45)', style }) {
  return (
    <svg viewBox="0 0 60 60" width={size} height={size} style={{ position:'absolute', ...style }}>
      <ellipse cx="30" cy="40" rx="14" ry="11" fill={color} />
      <ellipse cx="13" cy="22" rx="6" ry="8" fill={color} />
      <ellipse cx="24" cy="12" rx="6" ry="8" fill={color} />
      <ellipse cx="38" cy="12" rx="6" ry="8" fill={color} />
      <ellipse cx="49" cy="22" rx="6" ry="8" fill={color} />
    </svg>
  );
}

function Shell({ style, color = '#f6c6a5' }) {
  return (
    <svg viewBox="0 0 40 30" width="34" height="26" style={{ position:'absolute', ...style }}>
      <path d="M 20 28 Q 2 12 8 4 Q 14 0 20 6 Q 26 0 32 4 Q 38 12 20 28 Z" fill={color} stroke="#a26b48" strokeWidth=".8" />
      <path d="M 20 28 L 20 6" stroke="#a26b48" strokeWidth=".6" fill="none" />
      <path d="M 20 28 Q 14 18 14 8" stroke="#a26b48" strokeWidth=".5" fill="none" />
      <path d="M 20 28 Q 26 18 26 8" stroke="#a26b48" strokeWidth=".5" fill="none" />
    </svg>
  );
}

function Bottle({ onClick }) {
  return (
    <button onClick={onClick} style={{
      position:'absolute', bottom: 80, left: 90, width: 110, height: 140,
      background:'transparent', border:'none', cursor:'pointer', padding: 0,
    }}>
      {/* shadow */}
      <div style={{
        position:'absolute', bottom: -8, left: 8, width: 96, height: 18,
        background:'radial-gradient(ellipse, rgba(70,40,15,.35) 0%, rgba(70,40,15,0) 70%)',
      }}/>
      {/* glass body */}
      <div style={{
        position:'absolute', bottom: 0, left: 24, width: 62, height: 110,
        background:'linear-gradient(135deg, rgba(180,210,200,.7) 0%, rgba(130,170,160,.85) 100%)',
        borderRadius:'12px 12px 18px 18px',
        boxShadow:'inset 4px 0 8px rgba(255,255,255,.4), inset -6px 0 10px rgba(0,0,0,.18), 0 8px 16px rgba(0,0,0,.18)',
      }}/>
      {/* neck */}
      <div style={{
        position:'absolute', bottom: 100, left: 40, width: 30, height: 30,
        background:'linear-gradient(135deg, rgba(180,210,200,.7) 0%, rgba(130,170,160,.85) 100%)',
        borderRadius: 4,
      }}/>
      {/* cork */}
      <div style={{
        position:'absolute', bottom: 124, left: 42, width: 26, height: 14,
        background:'#a26b48', borderRadius:'3px 3px 5px 5px',
      }}/>
      {/* rolled letter inside */}
      <div style={{
        position:'absolute', bottom: 30, left: 32, width: 46, height: 8,
        background:'#fbf3e0', borderRadius: 4,
        boxShadow:'0 1px 0 rgba(70,40,15,.2)',
      }}/>
      <div style={{
        position:'absolute', bottom: 30, left: 32, width: 46, height: 8,
        background:'transparent',
        boxShadow:'inset 0 0 0 1px rgba(110,70,30,.3)', borderRadius: 4,
      }}/>
      <div style={{
        position:'absolute', top: -22, left: '50%', transform:'translateX(-50%)',
        fontFamily:'"Caveat", cursive', fontSize: 18, color:'#3a2f23',
        whiteSpace:'nowrap', opacity:.8,
      }}>open me ↓</div>
    </button>
  );
}

function BottleLetter({ open, onClose }) {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{
      position:'absolute', inset:0, background:'rgba(40,20,8,.55)',
      display:'flex', alignItems:'center', justifyContent:'center', zIndex:20,
      cursor:'pointer', animation:'sea-fade .3s ease',
    }}>
      <div onClick={(e)=>e.stopPropagation()} style={{
        background:'#fbf3e0', padding:'46px 54px', maxWidth: 520,
        boxShadow:'0 24px 60px rgba(0,0,0,.4)',
        backgroundImage:'repeating-linear-gradient(transparent 0 30px, rgba(110,70,30,.07) 30px 31px)',
        fontFamily:'"EB Garamond", serif', fontSize: 18, lineHeight: 1.6, color:'#3a2f23',
        cursor:'default',
      }}>
        <div style={{ fontFamily:'"Caveat", cursive', fontSize: 32, color:'#c75e4e', marginBottom: 10 }}>Ana —</div>
        if I had to put it in a bottle and throw it in the sea, it would say:
        <br/><br/>
        two years ago, a couch, our dog, 22:00. somehow that small night has
        kept growing — into beaches, and breakfasts, and Kira's stupid story,
        and one absolutely perfect picture four.
        <br/><br/>
        let's keep going. find me on the next beach.
        <div style={{ textAlign:'right', fontFamily:'"Caveat", cursive', fontSize: 28, color:'#5a3f22', marginTop: 18 }}>— Rico ♡</div>
        <div style={{ marginTop: 14, textAlign:'center', fontFamily:'"Special Elite", monospace', fontSize: 11, opacity:.5, letterSpacing:'.2em' }}>
          click anywhere to close
        </div>
      </div>
    </div>
  );
}

function SandWriting() {
  // "two years" drawn as an SVG path-like styling — we'll just use type
  // pressed into the sand via inset shadow trick on a transparent text.
  return (
    <div style={{
      position:'absolute', left:'50%', transform:'translateX(-50%)',
      bottom: 320, textAlign:'center', pointerEvents:'none',
    }}>
      <div style={{
        fontFamily:'"Caveat", cursive', fontSize: 64, lineHeight: 1,
        color:'transparent',
        textShadow:
          '1px 1px 0 rgba(255,250,240,.5),' +
          '-1px -1px 0 rgba(110,70,30,.5)',
        WebkitTextStroke: '1px rgba(110,70,30,.45)',
        letterSpacing:'.02em',
      }}>
        two years
      </div>
      <div style={{
        marginTop: 6,
        fontFamily:'"Special Elite", monospace', fontSize: 13, letterSpacing:'.3em',
        color:'rgba(110,70,30,.55)',
      }}>
        25 · 05 · 2026
      </div>
    </div>
  );
}

function Seaside() {
  const [letter, setLetter] = React.useState(false);
  const [sunGlow, setSunGlow] = React.useState(false);
  return (
    <div style={seaStyles.scene}>
      <style>{`
        @keyframes sea-drift { from{transform:translateX(-20px)} to{transform:translateX(20px)} }
        @keyframes sea-fade { from{opacity:0} to{opacity:1} }
        @keyframes sea-bird { 0%{transform:translateX(0)} 100%{transform:translateX(120px)} }
      `}</style>

      {/* subtitle */}
      <div style={{
        position:'absolute', top: 36, left: 0, right: 0, textAlign:'center',
        fontFamily:'"Instrument Serif", serif', fontSize: 64, lineHeight: 1,
        color:'#3a1f14', letterSpacing:'-.02em',
      }}>
        <span style={{ fontStyle:'italic' }}>two years,</span>
        <span style={{ fontStyle:'normal', opacity:.8 }}> by the sea</span>
      </div>
      <div style={{
        position:'absolute', top: 108, left: 0, right: 0, textAlign:'center',
        fontFamily:'"Caveat", cursive', fontSize: 24, color:'#3a1f14',
      }}>
        for Ana &nbsp;·&nbsp; from Rico &nbsp;·&nbsp; and Bailey
      </div>

      {/* sky elements */}
      <Sun onClick={()=>setSunGlow((v)=>!v)} glow={sunGlow} />
      {/* tiny bird silhouettes */}
      <svg viewBox="0 0 40 12" width="36" height="12" style={{ position:'absolute', top: 180, left: '20%', animation:'sea-bird 14s linear infinite' }}>
        <path d="M 2 8 Q 8 2 14 8 Q 20 2 26 8" stroke="#3a2415" strokeWidth="1.5" fill="none" />
      </svg>
      <svg viewBox="0 0 40 12" width="28" height="10" style={{ position:'absolute', top: 220, left: '70%', animation:'sea-bird 16s linear infinite reverse' }}>
        <path d="M 2 8 Q 8 2 14 8 Q 20 2 26 8" stroke="#3a2415" strokeWidth="1.4" fill="none" opacity=".8" />
      </svg>

      <Sea />
      <Sand />

      {/* sand writing */}
      <SandWriting />

      {/* picnic blanket */}
      <PicnicBlanket />

      {/* polaroids resting on blanket */}
      <PolaroidOnSand id="sea-pic-1" top={540} left={360} rotate={-6} label="us, by the water" />
      <PolaroidOnSand id="sea-pic-2" top={520} left={560} rotate={3}  label="bailey says hi" />
      <PolaroidOnSand id="sea-pic-3" top={560} left={770} rotate={-2} label="#4 — still the best ;)" />

      {/* bottle on the left */}
      <Bottle onClick={()=>setLetter(true)} />

      {/* shells & flowers scattered */}
      <Shell style={{ bottom: 60, left: 240, transform:'rotate(-12deg)' }} />
      <Shell style={{ bottom: 36, right: 180, transform:'rotate(20deg)' }} color="#f4b9c2" />
      <Shell style={{ bottom: 110, right: 90, transform:'rotate(-5deg)' }} color="#e8c89a" />
      {/* small wildflower */}
      <svg viewBox="0 0 40 50" width="38" height="46" style={{ position:'absolute', bottom: 60, right: 280 }}>
        <path d="M 20 50 L 20 20" stroke="#5a7a3a" strokeWidth="2" />
        <ellipse cx="14" cy="30" rx="3" ry="6" fill="#8aa169" transform="rotate(-30 14 30)" />
        <ellipse cx="26" cy="34" rx="3" ry="6" fill="#8aa169" transform="rotate(30 26 34)" />
        <circle cx="14" cy="14" r="5" fill="#c75e4e" />
        <circle cx="22" cy="10" r="4" fill="#e3a25b" />
        <circle cx="28" cy="16" r="4" fill="#f4c95a" />
        <circle cx="20" cy="20" r="3" fill="#fbf3e0" />
      </svg>

      {/* paw print trail along the sand, curving toward bottle */}
      <Paw style={{ bottom: 80, left: 240, transform:'rotate(-6deg)' }} />
      <Paw style={{ bottom: 60, left: 290, transform:'rotate(14deg)' }} />
      <Paw style={{ bottom: 90, left: 330, transform:'rotate(-4deg)' }} />
      <Paw style={{ bottom: 68, left: 380, transform:'rotate(10deg)' }} />
      <Paw style={{ bottom: 96, left: 430, transform:'rotate(-12deg)' }} />

      <BottleLetter open={letter} onClose={()=>setLetter(false)} />

      <div style={{
        position:'absolute', bottom: 14, left: 0, right: 0, textAlign:'center',
        fontFamily:'"Special Elite", monospace', fontSize: 11, color:'#3a2415',
        opacity:.55, letterSpacing:'.2em',
      }}>
        OPEN THE BOTTLE · TAP THE SUN · FOLLOW THE PAW PRINTS
      </div>
    </div>
  );
}

window.Seaside = Seaside;
