// Scrapbook · cream paper with taped polaroids, post-its, a fold-out letter
// All styles namespaced as scrapStyles to avoid global collisions.

const scrapStyles = {
  paper: {
    position: 'absolute', inset: 0,
    background:
      'radial-gradient(ellipse at 20% 10%, #faf3e3 0%, #f4ecd8 45%, #ecdfc1 100%)',
    overflow: 'hidden',
    fontFamily: '"EB Garamond", Georgia, serif',
    color: '#3a2f23',
  },
  grain: {
    position: 'absolute', inset: 0, pointerEvents: 'none',
    backgroundImage:
      'radial-gradient(rgba(80,55,30,.08) 1px, transparent 1.4px),' +
      'radial-gradient(rgba(80,55,30,.05) 1px, transparent 1.4px)',
    backgroundSize: '7px 7px, 13px 13px',
    backgroundPosition: '0 0, 3px 5px',
    mixBlendMode: 'multiply',
  },
  edge: {
    position:'absolute', inset:0, pointerEvents:'none',
    boxShadow:'inset 0 0 80px rgba(70,40,15,.18), inset 0 0 200px rgba(70,40,15,.08)'
  },
};

function Tape({ style, color = 'rgba(244,222,160,.6)' }) {
  return (
    <div
      style={{
        position: 'absolute',
        width: 70, height: 20,
        background: color,
        boxShadow: '0 1px 2px rgba(0,0,0,.08)',
        ...style,
      }}
    />
  );
}

function Polaroid({ id, rotate = 0, top, left, label, tapes = [], onHoverGlow }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'absolute', top, left,
        width: 220, padding: '14px 14px 56px',
        background: '#fdfaf2',
        boxShadow: hover
          ? '0 18px 36px rgba(70,40,15,.28), 0 2px 6px rgba(0,0,0,.1)'
          : '0 10px 24px rgba(70,40,15,.2), 0 1px 3px rgba(0,0,0,.08)',
        transform: `rotate(${rotate}deg) translateY(${hover ? -4 : 0}px)`,
        transition: 'transform .25s cubic-bezier(.2,.7,.3,1), box-shadow .25s',
      }}
    >
      {tapes.map((t, i) => <Tape key={i} {...t} />)}
      <image-slot
        id={id}
        shape="rect"
        placeholder="drop a photo"
        style={{ width: '192px', height: '192px', display:'block', background:'#e9dec3' }}
      ></image-slot>
      <div
        style={{
          position: 'absolute', bottom: 12, left: 0, right: 0,
          textAlign: 'center',
          fontFamily: '"Caveat", cursive', fontSize: 22, color: '#5a4128',
          lineHeight: 1.1,
        }}
      >
        {label}
      </div>
    </div>
  );
}

// Tiny doodle flower in CSS — five overlapping ellipses + a center dot
function Flower({ size = 36, color = '#c75e4e', style }) {
  const petalW = size * 0.46, petalH = size * 0.7;
  const petals = [0, 72, 144, 216, 288];
  return (
    <div style={{ position: 'absolute', width: size, height: size, ...style }}>
      {petals.map((deg) => (
        <div key={deg} style={{
          position: 'absolute', left: '50%', top: '50%',
          width: petalW, height: petalH,
          marginLeft: -petalW/2, marginTop: -petalH/2,
          background: color, opacity: .85,
          borderRadius: '50%',
          transform: `rotate(${deg}deg) translateY(${-size*0.18}px)`,
        }} />
      ))}
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        width: size*0.28, height: size*0.28,
        marginLeft: -size*0.14, marginTop: -size*0.14,
        background: '#f4c95a', borderRadius: '50%',
        boxShadow: 'inset 0 -2px 0 rgba(0,0,0,.1)',
      }} />
    </div>
  );
}

// Paw print, tiny — 4 toes + heel
function Paw({ size = 22, color = 'rgba(90,60,30,.35)', style }) {
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

function PostIt({ rotate = -3, top, left, color = '#fef4a8', children, w = 200 }) {
  return (
    <div style={{
      position: 'absolute', top, left, width: w, padding: '14px 16px',
      background: color,
      boxShadow: '0 8px 18px rgba(70,40,15,.22)',
      transform: `rotate(${rotate}deg)`,
      fontFamily: '"Caveat", cursive', fontSize: 21, lineHeight: 1.25,
      color: '#5a4a2a',
      clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%)',
    }}>
      {children}
    </div>
  );
}

function FoldOutLetter() {
  const [open, setOpen] = React.useState(false);
  return (
    <div
      onClick={() => setOpen((v) => !v)}
      style={{
        position: 'absolute', bottom: 36, left: 360, width: 560,
        cursor: 'pointer',
        perspective: '1200px',
      }}
    >
      {/* Closed flap label */}
      <div style={{
        position: 'absolute', top: -28, left: 0, right: 0, textAlign:'center',
        fontFamily: '"Caveat", cursive', fontSize: 20, color: '#7a5a32',
        opacity: open ? 0 : 1, transition: 'opacity .3s',
      }}>
        ↓ unfold ↓
      </div>

      <div style={{
        position: 'relative',
        background: '#fbf4e0',
        boxShadow: open
          ? '0 24px 50px rgba(70,40,15,.3)'
          : '0 12px 26px rgba(70,40,15,.22)',
        padding: '34px 38px',
        transformOrigin: 'top center',
        transition: 'transform .5s cubic-bezier(.2,.7,.3,1), max-height .5s',
        maxHeight: open ? 600 : 92,
        overflow: 'hidden',
        backgroundImage:
          'repeating-linear-gradient(transparent 0 30px, rgba(110,70,30,.08) 30px 31px)',
        backgroundPosition: '0 28px',
      }}>
        {/* fold crease */}
        <div style={{
          position:'absolute', left:0, right:0, top: 92,
          borderTop: '1px dashed rgba(110,70,30,.35)',
          opacity: open ? 0 : 1, transition:'opacity .3s',
        }}/>
        <div style={{
          fontFamily:'"Caveat", cursive', fontSize: 28, color:'#5a3f22',
          marginBottom: 10,
        }}>
          Ana,
        </div>
        <div style={{
          fontFamily:'"EB Garamond", serif', fontSize: 18, lineHeight: 1.6,
          color:'#3a2f23',
        }}>
          two years ago, after a walk with Bailey, you sat on the couch and I
          decided I was never going to look at anyone else the way I look at
          you. it was 22:00. the apartment was quiet. you laughed at something
          I don't remember and then I kissed you, and that was it — me, done,
          permanently.
          <br/><br/>
          here are 730-ish days of us. here is a paw-print trail to find me by.
          here is your post-it. here is picture four, which is, for the record,
          still the best one.
          <br/><br/>
          happy two years. I love you.
        </div>
        <div style={{
          marginTop: 16, textAlign:'right',
          fontFamily:'"Caveat", cursive', fontSize: 28, color:'#5a3f22',
        }}>
          — Rico
        </div>
      </div>
    </div>
  );
}

// Hidden ending — a tiny "find me" in the corner; click opens a soft toast
function HiddenHeart() {
  const [open, setOpen] = React.useState(false);
  return (
    <div style={{ position:'absolute', bottom: 14, right: 18 }}>
      <button
        onClick={() => setOpen((v) => !v)}
        title="psst"
        style={{
          width: 22, height: 22, borderRadius: '50%', border:'none',
          background: 'transparent', cursor:'pointer',
          color: 'rgba(199,94,78,.5)', fontSize: 16, padding: 0,
        }}
      >♡</button>
      {open && (
        <div style={{
          position:'absolute', right: 28, bottom: 0, width: 220,
          background:'#3a2f23', color:'#fbf4e0',
          padding: '12px 14px', borderRadius: 8,
          fontFamily:'"Caveat", cursive', fontSize: 19, lineHeight: 1.25,
          boxShadow:'0 12px 28px rgba(0,0,0,.3)',
        }}>
          you found it. i love you. — R
        </div>
      )}
    </div>
  );
}

function Scrapbook() {
  return (
    <div style={scrapStyles.paper}>
      <div style={scrapStyles.grain} />
      <div style={scrapStyles.edge} />

      {/* Title */}
      <div style={{ position:'absolute', top: 44, left: 56, width: 480 }}>
        <div style={{
          fontFamily: '"Instrument Serif", serif',
          fontSize: 108, lineHeight: 0.95, letterSpacing:'-0.02em',
          color: '#2a1e10',
        }}>
          two
          <br/>
          <span style={{ fontStyle:'italic', color:'#c75e4e' }}>years.</span>
        </div>
        <div style={{
          marginTop: 18,
          fontFamily:'"Caveat", cursive', fontSize: 28, color:'#5a4128',
          transform:'rotate(-1.5deg)',
        }}>
          for Ana &nbsp;·&nbsp; 25 · 05 · 2026
        </div>
        <div style={{
          marginTop: 6,
          fontFamily:'"Special Elite", monospace', fontSize: 12,
          letterSpacing:'0.18em', color:'#7a5a32', opacity:.8,
        }}>
          A SCRAPBOOK · FROM RICO · WITH BAILEY
        </div>
      </div>

      {/* Doodle flowers */}
      <Flower size={42} color="#c75e4e" style={{ top: 30, left: 540 }} />
      <Flower size={28} color="#e3a25b" style={{ top: 70, left: 600 }} />
      <Flower size={34} color="#8aa169" style={{ top: 96, left: 558 }} />
      <Flower size={24} color="#c75e4e" style={{ top: 116, left: 612 }} />

      {/* Polaroids — 4 of them, with #4 specially marked */}
      <Polaroid
        id="scrap-pic-1" rotate={-4}
        top={64} left={680}
        label="us, last summer"
        tapes={[{ style:{ top:-8, left:90, transform:'rotate(-6deg)' } }]}
      />
      <Polaroid
        id="scrap-pic-2" rotate={3}
        top={88} left={960}
        label="bailey, photobomb"
        tapes={[{ style:{ top:-10, left:80, transform:'rotate(8deg)' }, color:'rgba(245,210,180,.7)' }]}
      />
      <Polaroid
        id="scrap-pic-3" rotate={-2}
        top={420} left={56}
        label="that café"
        tapes={[{ style:{ top:-9, left:90, transform:'rotate(-3deg)' } }]}
      />
      <Polaroid
        id="scrap-pic-4" rotate={5}
        top={400} left={960}
        label="#4 — still the best ;)"
        tapes={[
          { style:{ top:-10, left:30, transform:'rotate(-8deg)' }, color:'rgba(199,94,78,.55)' },
          { style:{ top:-10, left:130, transform:'rotate(6deg)' }, color:'rgba(199,94,78,.55)' },
        ]}
      />

      {/* Post-its */}
      <PostIt rotate={-4} top={420} left={310}>
        it's been 2 years since<br/>
        Kira's IG story 🎬<br/>
        <span style={{ fontSize: 17, opacity:.7 }}>(thanks, Kira.)</span>
      </PostIt>

      <PostIt rotate={4} top={250} left={56} color="#f9d6b8" w={210}>
        first kiss: 22:00,<br/>
        the couch, after Bailey's walk.<br/>
        <span style={{ fontSize: 17 }}>i remember everything.</span>
      </PostIt>

      {/* Paw print trail crossing the page */}
      <Paw size={22} style={{ top: 360, left: 280, transform:'rotate(10deg)' }} />
      <Paw size={22} style={{ top: 390, left: 240, transform:'rotate(-8deg)' }} />
      <Paw size={22} style={{ top: 430, left: 260, transform:'rotate(14deg)' }} />
      <Paw size={22} style={{ top: 470, left: 230, transform:'rotate(-4deg)' }} />
      <Paw size={22} style={{ top: 510, left: 268, transform:'rotate(12deg)' }} />

      {/* Fold-out letter */}
      <FoldOutLetter />

      {/* Tiny corner signature */}
      <div style={{
        position:'absolute', bottom: 18, left: 28,
        fontFamily:'"Special Elite", monospace', fontSize: 11,
        letterSpacing:'.2em', color:'#7a5a32', opacity:.7,
      }}>
        — R &amp; A · MMXXIV → MMXXVI —
      </div>

      <HiddenHeart />
    </div>
  );
}

window.Scrapbook = Scrapbook;
