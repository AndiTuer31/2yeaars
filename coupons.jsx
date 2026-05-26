// Coupon chapter — a stack of scratch-to-reveal promises she can claim.
// Uses canvas to draw a scratch-off layer that the user erases by dragging.

function ScratchCoupon({ id, title, subtitle, color = '#c75e4e', delay = 0 }) {
  const wrap = React.useRef(null);
  const canvasRef = React.useRef(null);
  const [revealed, setRevealed] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const w = c.offsetWidth, h = c.offsetHeight;
    const dpr = window.devicePixelRatio || 1;
    c.width = w * dpr; c.height = h * dpr;
    const ctx = c.getContext('2d');
    ctx.scale(dpr, dpr);
    // Scratch-off coating (warm metallic gold)
    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, '#d4af6a');
    g.addColorStop(0.5, '#b48a40');
    g.addColorStop(1, '#7a5a24');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    // grain
    for (let i = 0; i < 600; i++) {
      ctx.fillStyle = `rgba(0,0,0,${0.04 + Math.random() * 0.05})`;
      ctx.fillRect(Math.random() * w, Math.random() * h, 1.5, 1.5);
    }
    // "scratch to reveal"
    ctx.fillStyle = 'rgba(255,250,235,.55)';
    ctx.font = '500 18px "Caveat", cursive';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('scratch to reveal ♡', w / 2, h / 2);
    ctx.font = '11px "Special Elite", monospace';
    ctx.fillStyle = 'rgba(70,40,15,.6)';
    ctx.fillText('TICKET 0' + id + ' · YEAR III', w / 2, h / 2 + 24);
  }, []);

  React.useEffect(() => {
    const c = canvasRef.current;
    if (!c || revealed) return;
    let drawing = false;
    function pt(e) {
      const r = c.getBoundingClientRect();
      const x = (e.touches ? e.touches[0].clientX : e.clientX) - r.left;
      const y = (e.touches ? e.touches[0].clientY : e.clientY) - r.top;
      return { x, y };
    }
    function scratch(e) {
      if (!drawing) return;
      e.preventDefault();
      const { x, y } = pt(e);
      const ctx = c.getContext('2d');
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 28, 0, Math.PI * 2);
      ctx.fill();
    }
    function start(e) {
      drawing = true;
      // Sample at start
      const { x, y } = pt(e);
      const ctx = c.getContext('2d');
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 28, 0, Math.PI * 2);
      ctx.fill();
    }
    function end() {
      drawing = false;
      // Estimate progress
      const ctx = c.getContext('2d');
      const data = ctx.getImageData(0, 0, c.width, c.height).data;
      let cleared = 0, total = 0;
      for (let i = 3; i < data.length; i += 16 * 4) { // sample sparsely
        total++;
        if (data[i] < 50) cleared++;
      }
      const p = cleared / total;
      setProgress(p);
      if (p > 0.5 && !revealed) {
        setRevealed(true);
        // auto-fade remaining
        const fade = setInterval(() => {
          ctx.globalCompositeOperation = 'destination-out';
          ctx.fillStyle = 'rgba(0,0,0,.2)';
          ctx.fillRect(0, 0, c.width, c.height);
        }, 40);
        setTimeout(() => clearInterval(fade), 600);
      }
    }
    c.addEventListener('mousedown', start);
    c.addEventListener('mousemove', scratch);
    window.addEventListener('mouseup', end);
    c.addEventListener('touchstart', start, { passive: false });
    c.addEventListener('touchmove', scratch, { passive: false });
    c.addEventListener('touchend', end);
    return () => {
      c.removeEventListener('mousedown', start);
      c.removeEventListener('mousemove', scratch);
      window.removeEventListener('mouseup', end);
      c.removeEventListener('touchstart', start);
      c.removeEventListener('touchmove', scratch);
      c.removeEventListener('touchend', end);
    };
  }, [revealed]);

  return (
    <window.Reveal delay={delay}>
      <div ref={wrap} style={{
        position: 'relative', width: 320, height: 200,
        background: '#fbf3e0',
        boxShadow: '0 14px 30px rgba(70,40,15,.25)',
        transform: `rotate(${(id % 2 === 0 ? -2 : 2)}deg)`,
        padding: 0,
        margin: 14,
        cursor: revealed ? 'default' : 'grab',
        userSelect: 'none',
      }}>
        {/* decorative border */}
        <div style={{
          position: 'absolute', inset: 8,
          border: `2px dashed ${color}`,
          pointerEvents: 'none',
        }} />
        {/* corner stub */}
        <div style={{
          position: 'absolute', top: -6, right: 12,
          background: color, color: '#fbf3e0',
          padding: '4px 10px',
          fontFamily: '"Special Elite", monospace', fontSize: 10,
          letterSpacing: '.2em',
          transform: 'rotate(2deg)',
        }}>
          № 0{id}
        </div>

        {/* coupon content */}
        <div style={{
          position: 'absolute', inset: 0, padding: '32px 28px',
          display: 'flex', flexDirection: 'column',
          justifyContent: 'center', alignItems: 'center',
          textAlign: 'center',
        }}>
          <div style={{
            fontFamily: '"Caveat", cursive', fontSize: 18, color: '#7a5a32',
            opacity: .8, marginBottom: 4,
          }}>
            this ticket is good for
          </div>
          <div style={{
            fontFamily: '"Instrument Serif", serif', fontStyle: 'italic',
            fontSize: 32, lineHeight: 1.05, color,
          }}>
            {title}
          </div>
          {subtitle && (
            <div style={{
              marginTop: 8,
              fontFamily: '"Caveat", cursive', fontSize: 20, color: '#5a4128',
            }}>
              {subtitle}
            </div>
          )}
          <div style={{
            marginTop: 12,
            fontFamily: '"Special Elite", monospace', fontSize: 9,
            letterSpacing: '.3em', color: '#7a5a32', opacity: .65,
          }}>
            REDEEMABLE FOREVER · — RICO
          </div>
        </div>

        {/* the scratch-off layer */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute', inset: 8,
            width: 'calc(100% - 16px)', height: 'calc(100% - 16px)',
            cursor: revealed ? 'default' : 'grab',
            pointerEvents: revealed && progress > 0.7 ? 'none' : 'auto',
            transition: 'opacity .4s ease',
            opacity: progress > 0.9 ? 0 : 1,
          }}
        />
      </div>
    </window.Reveal>
  );
}

function CouponsSection() {
  const coupons = [
    { title: 'one massage', subtitle: 'on demand. no warning needed.', color: '#c75e4e' },
    { title: 'one long Bailey walk', subtitle: 'extra route through your favourite park.', color: '#8aa169' },
    { title: 'one quiet evening', subtitle: 'no phones. just the couch.', color: '#b48a40' },
    { title: 'one trip to the Isenthal', subtitle: 'whenever you want.', color: '#3a6a8a' },
    { title: 'one flower delivery', subtitle: 'on a Tuesday, for no reason.', color: '#c75e4e' },
    { title: 'one slow morning', subtitle: 'pastries. sun. no plans.', color: '#e3a25b' },
  ];

  return (
    <section
      data-section="COUPONS"
      style={{
        position: 'relative', minHeight: 940,
        padding: '90px 40px',
        overflow: 'hidden',
      }}
    >
      {/* page tag */}
      <div style={{
        position: 'absolute', top: 28, left: '50%', transform: 'translateX(-50%)',
        fontFamily: '"Special Elite", monospace', fontSize: 11,
        letterSpacing: '.4em', color: 'rgba(110,70,30,.55)',
      }}>
        08A · TICKET BOOK · YEAR III
      </div>

      <window.Reveal>
        <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
          <div style={{
            fontFamily: '"Instrument Serif", serif', fontSize: 84, lineHeight: 1,
            color: '#2a1e10',
          }}>
            and a few <em style={{ fontStyle: 'italic', color: '#c75e4e' }}>tickets,</em>
          </div>
          <div style={{
            marginTop: 14,
            fontFamily: '"Caveat", cursive', fontSize: 26, color: '#5a4128',
            transform: 'rotate(-1deg)',
          }}>
            scratch them off whenever you like. ↓
          </div>
        </div>
      </window.Reveal>

      <div style={{
        marginTop: 50,
        maxWidth: 1100, margin: '50px auto 0',
        display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
      }}>
        {coupons.map((c, i) => (
          <ScratchCoupon key={i} id={i + 1} {...c} delay={i * 0.05} />
        ))}
      </div>

      {/* footer note */}
      <window.Reveal delay={0.4}>
        <div style={{
          marginTop: 30, textAlign: 'center',
          fontFamily: '"Caveat", cursive', fontSize: 22, color: '#7a5a32',
        }}>
          no expiry date. ♡
        </div>
      </window.Reveal>
    </section>
  );
}

window.CouponsSection = CouponsSection;
