// Shared scrapbook helpers — Polaroid, PostIt, Paw, Flower, Tape
// Namespaced as window.SB.*

const PAPER_BG =
  'radial-gradient(ellipse at 18% 12%, #faf3e3 0%, #f4ecd8 45%, #ecdfc1 100%)';

const GRAIN_LAYER = {
  position: 'absolute', inset: 0, pointerEvents: 'none',
  backgroundImage:
    'radial-gradient(rgba(80,55,30,.08) 1px, transparent 1.4px),' +
    'radial-gradient(rgba(80,55,30,.05) 1px, transparent 1.4px)',
  backgroundSize: '7px 7px, 13px 13px',
  backgroundPosition: '0 0, 3px 5px',
  mixBlendMode: 'multiply',
};

const EDGE_VIGNETTE = {
  position: 'absolute', inset: 0, pointerEvents: 'none',
  boxShadow: 'inset 0 0 100px rgba(70,40,15,.18), inset 0 0 260px rgba(70,40,15,.1)',
};

function Tape({ style, color = 'rgba(244,222,160,.6)' }) {
  return (
    <div style={{
      position: 'absolute', width: 70, height: 20,
      background: color,
      boxShadow: '0 1px 2px rgba(0,0,0,.08)',
      ...style,
    }} />
  );
}

function Polaroid({ id, rotate = 0, top, left, label, tapes = [], delay = 0, width = 220 }) {
  const [hover, setHover] = React.useState(false);
  const photoSize = width - 28;
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'absolute', top, left,
        width, padding: '14px 14px 56px',
        background: '#fdfaf2',
        boxShadow: hover
          ? '0 22px 40px rgba(70,40,15,.32), 0 2px 6px rgba(0,0,0,.1)'
          : '0 12px 28px rgba(70,40,15,.22), 0 1px 3px rgba(0,0,0,.08)',
        transform: `rotate(${rotate}deg) translateY(${hover ? -6 : 0}px) translateZ(0)`,
        transition: 'transform .3s cubic-bezier(.2,.7,.3,1), box-shadow .3s',
        animation: `pol-drop .9s cubic-bezier(.2,.7,.3,1) ${delay}s both`,
      }}
    >
      {tapes.map((t, i) => <Tape key={i} {...t} />)}
      <image-slot
        id={id}
        shape="rect"
        placeholder="drop a photo"
        style={{ width: `${photoSize}px`, height: `${photoSize}px`, display: 'block', background: '#e9dec3' }}
      ></image-slot>
      <div style={{
        position: 'absolute', bottom: 12, left: 0, right: 0,
        textAlign: 'center',
        fontFamily: '"Caveat", cursive', fontSize: 22, color: '#5a4128',
        lineHeight: 1.1,
      }}>
        {label}
      </div>
    </div>
  );
}

function Flower({ size = 36, color = '#c75e4e', style }) {
  const petalW = size * 0.46, petalH = size * 0.7;
  const petals = [0, 72, 144, 216, 288];
  return (
    <div style={{ position: 'absolute', width: size, height: size, ...style }}>
      {petals.map((deg) => (
        <div key={deg} style={{
          position: 'absolute', left: '50%', top: '50%',
          width: petalW, height: petalH,
          marginLeft: -petalW / 2, marginTop: -petalH / 2,
          background: color, opacity: .88,
          borderRadius: '50%',
          transform: `rotate(${deg}deg) translateY(${-size * 0.18}px)`,
        }} />
      ))}
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        width: size * 0.28, height: size * 0.28,
        marginLeft: -size * 0.14, marginTop: -size * 0.14,
        background: '#f4c95a', borderRadius: '50%',
        boxShadow: 'inset 0 -2px 0 rgba(0,0,0,.1)',
      }} />
    </div>
  );
}

function Paw({ size = 22, color = 'rgba(90,60,30,.4)', style, delay = 0 }) {
  return (
    <svg viewBox="0 0 60 60" width={size} height={size} style={{
      position: 'absolute',
      animation: `pol-fadein .6s ease ${delay}s both`,
      ...style,
    }}>
      <ellipse cx="30" cy="40" rx="14" ry="11" fill={color} />
      <ellipse cx="13" cy="22" rx="6" ry="8" fill={color} />
      <ellipse cx="24" cy="12" rx="6" ry="8" fill={color} />
      <ellipse cx="38" cy="12" rx="6" ry="8" fill={color} />
      <ellipse cx="49" cy="22" rx="6" ry="8" fill={color} />
    </svg>
  );
}

function PostIt({ rotate = -3, top, left, color = '#fef4a8', children, w = 200, delay = 0 }) {
  return (
    <div style={{
      position: 'absolute', top, left, width: w, padding: '14px 16px',
      background: color,
      boxShadow: '0 10px 22px rgba(70,40,15,.25)',
      transform: `rotate(${rotate}deg)`,
      fontFamily: '"Caveat", cursive', fontSize: 21, lineHeight: 1.25,
      color: '#5a4a2a',
      clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%)',
      animation: `pol-slap .7s cubic-bezier(.2,.7,.3,1) ${delay}s both`,
    }}>
      {children}
    </div>
  );
}

// Base animations
if (typeof document !== 'undefined' && !document.getElementById('sb-anims')) {
  const s = document.createElement('style');
  s.id = 'sb-anims';
  s.textContent = `
    @keyframes pol-drop {
      0% { opacity: 0; transform: translateY(-40px) rotate(0); }
      60% { opacity: 1; }
      100% { opacity: 1; }
    }
    @keyframes pol-slap {
      0% { opacity: 0; transform: scale(.6) rotate(0); }
      70% { opacity: 1; transform: scale(1.05); }
      100% { opacity: 1; }
    }
    @keyframes pol-fadein { from{opacity:0; transform: translateY(8px) scale(.7)} to{opacity:1} }
    @keyframes sb-rise { from{opacity:0; transform: translateY(20px)} to{opacity:1; transform:none} }
  `;
  document.head.appendChild(s);
}

window.SB = { PAPER_BG, GRAIN_LAYER, EDGE_VIGNETTE, Tape, Polaroid, Flower, Paw, PostIt };
