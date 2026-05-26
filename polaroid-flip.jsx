// 3D Polaroid — flips on double-click to reveal a handwritten note on the back.
// Drop-in replacement for window.SB.Polaroid usage.

function PolaroidFlip({ id, rotate = 0, top, left, label, tapes = [], delay = 0, width = 220, note, src = '' }) {
  const [flipped, setFlipped] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  const photoSize = width - 28;

  return (
    <div
      onDoubleClick={() => setFlipped((v) => !v)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'absolute', top, left,
        width, height: width + 42,
        perspective: '1400px',
        animation: `pol-drop .9s cubic-bezier(.2,.7,.3,1) ${delay}s both`,
        cursor: 'pointer',
      }}
      title="double-click to flip"
    >
      <div style={{
        position: 'relative',
        width: '100%', height: '100%',
        transformStyle: 'preserve-3d',
        transform: `rotate(${rotate}deg) translateY(${hover ? -6 : 0}px) ${flipped ? 'rotateY(180deg)' : 'rotateY(0)'}`,
        transition: 'transform .9s cubic-bezier(.65,0,.35,1)',
      }}>
        {/* FRONT */}
        <div style={{
          position: 'absolute', inset: 0,
          padding: '14px 14px 56px',
          background: '#fdfaf2',
          boxShadow: hover
            ? '0 22px 40px rgba(70,40,15,.32), 0 2px 6px rgba(0,0,0,.1)'
            : '0 12px 28px rgba(70,40,15,.22), 0 1px 3px rgba(0,0,0,.08)',
          transition: 'box-shadow .3s',
          backfaceVisibility: 'hidden',
        }}>
          {tapes.map((t, i) => (
            <div key={i} style={{
              position: 'absolute', width: 70, height: 20,
              background: t.color || 'rgba(244,222,160,.6)',
              boxShadow: '0 1px 2px rgba(0,0,0,.08)',
              ...t.style,
            }} />
          ))}
          <image-slot
            id={id}
            shape="rect"
            placeholder="drop a photo"
            src={src || undefined}
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

        {/* BACK */}
        <div style={{
          position: 'absolute', inset: 0,
          background: '#fdfaf2',
          boxShadow: '0 14px 30px rgba(70,40,15,.25)',
          transform: 'rotateY(180deg)',
          backfaceVisibility: 'hidden',
          padding: '24px 22px',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        }}>
          <div>
            <div style={{
              fontFamily: '"Special Elite", monospace', fontSize: 9,
              letterSpacing: '.3em', color: '#7a5a32',
              borderBottom: '1px dashed rgba(110,70,30,.3)',
              paddingBottom: 6,
            }}>
              POLAROID · BACK · NO {String(((id || '').length * 31) % 99).padStart(2, '0')}
            </div>
            <div style={{
              marginTop: 14,
              fontFamily: '"Caveat", cursive', fontSize: 22, color: '#3a2f23',
              lineHeight: 1.3,
            }}>
              {note || (
                <>
                  taken: <em style={{ color: '#c75e4e' }}>some morning</em><br />
                  with Ana<br />
                  <span style={{ fontSize: 16, opacity: .7 }}>(she'd just laughed.)</span>
                </>
              )}
            </div>
          </div>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
          }}>
            <div style={{
              fontFamily: '"Caveat", cursive', fontSize: 18, color: '#7a5a32',
            }}>
              — R ♡
            </div>
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 30%, #e16e54 0%, #b13e2a 70%)',
              color: '#fbf3e0',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', fontSize: 14,
              boxShadow: '0 3px 6px rgba(0,0,0,.25)',
            }}>
              R♡A
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.PolaroidFlip = PolaroidFlip;
