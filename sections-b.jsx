// Remaining sections: Kira, Picture #4 (magnifier easter egg), Letter, List, Final
const {
  Polaroid: SBPol2, Flower: SBFl2, Paw: SBPw2, PostIt: SBPi2,
  PAPER_BG: SB_PB2, GRAIN_LAYER: SB_GR2, EDGE_VIGNETTE: SB_EV2,
} = window.SB;
const { Reveal: Rv2, burstAt: burst2, showToast: toast2, foundEgg: egg2 } = window;

// Reuse clickables defined in sections-a — but redeclare safely
function CFlower({ size = 30, color = '#c75e4e', style }) {
  return (
    <div
      style={{ ...style, cursor: 'pointer' }}
      onClick={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        burst2(r.left + r.width / 2, r.top + r.height / 2, { count: 14 });
        if (egg2('flower-1')) toast2('petal burst ♡ egg found');
      }}
      title="give it a tap"
    >
      <SBFl2 size={size} color={color} style={{ position: 'static' }} />
    </div>
  );
}
function CPaw({ size = 22, style, line }) {
  return (
    <div
      style={{ ...style, cursor: 'pointer' }}
      onClick={() => toast2(line || 'woof. — Bailey')}
      title="bailey?"
    >
      <SBPw2 size={size} style={{ position: 'static' }} />
    </div>
  );
}

function Section({ children, minH = 900, label, ix, style }) {
  return (
    <section
      data-section={label}
      style={{ position: 'relative', minHeight: minH, padding: '90px 40px', overflow: 'hidden', ...style }}
    >
      {label && (
        <div style={{
          position: 'absolute', top: 28, left: '50%', transform: 'translateX(-50%)',
          fontFamily: '"Special Elite", monospace', fontSize: 11,
          letterSpacing: '.4em', color: 'rgba(110,70,30,.55)', whiteSpace: 'nowrap',
        }}>
          {String(ix).padStart(2, '0')} · {label}
        </div>
      )}
      {children}
    </section>
  );
}

// ── Section 5 — Kira's IG story ────────────────────────────────────────────
function KiraSection() {
  return (
    <Section label="KIRA'S IG" ix={5} minH={680}>
      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>
        <Rv2>
          <div style={{
            fontFamily: '"Instrument Serif", serif', fontSize: 84, lineHeight: 1,
            color: '#2a1e10', maxWidth: 880,
          }}>
            and yes — it's been two years <em style={{ color: '#c75e4e', fontStyle: 'italic' }}>since Kira's story.</em>
          </div>
          <div style={{
            marginTop: 14,
            fontFamily: '"Caveat", cursive', fontSize: 26, color: '#5a4128',
            transform: 'rotate(-1deg)',
          }}>
            (we owe her one. don't tell her.)
          </div>
        </Rv2>

        <div style={{ position: 'relative', marginTop: 60, height: 380 }}>
          {/* mocked IG story phone */}
          <Rv2 dir="left" delay={0.15}>
            <div style={{
              position: 'absolute', left: 40, top: 0,
              width: 220, height: 360,
              background: 'linear-gradient(135deg, #ec5d8c 0%, #ed943c 100%)',
              borderRadius: 24, padding: 14,
              boxShadow: '0 20px 40px rgba(0,0,0,.32)',
              transform: 'rotate(-4deg)',
              color: '#fff',
            }}>
              {/* status */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                fontFamily: '-apple-system, "Inter", sans-serif', fontSize: 12,
              }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#fff', color: '#ec5d8c', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>K</div>
                <div>
                  <div style={{ fontWeight: 600 }}>kira_</div>
                  <div style={{ opacity: .7, fontSize: 10 }}>2 years ago</div>
                </div>
              </div>
              {/* progress bar */}
              <div style={{ marginTop: 10, height: 2, background: 'rgba(255,255,255,.35)', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ width: '60%', height: '100%', background: '#fff' }}/>
              </div>
              {/* image area — Kira's legendary bad selfie */}
              <div style={{
                marginTop: 12, height: 200, borderRadius: 10,
                background: 'rgba(255,255,255,.18)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden', position: 'relative',
              }}>
                {/* flash blown-out overlay */}
                <div style={{
                  position: 'absolute', top: 0, right: 0,
                  width: 60, height: 60,
                  background: 'radial-gradient(circle at 80% 20%, rgba(255,255,255,.95) 0%, transparent 70%)',
                  pointerEvents: 'none',
                }} />
                <svg viewBox="0 0 160 190" width="120" height="143">
                  {/* neck */}
                  <rect x="68" y="118" width="24" height="28" fill="#f4c08a" />
                  {/* shirt corner (bad angle — cropped) */}
                  <path d="M 50 155 Q 80 142 110 155 L 118 190 L 42 190 Z" fill="#c75e4e" />
                  {/* head — tilted slightly */}
                  <ellipse cx="82" cy="82" rx="48" ry="52" fill="#f4c08a" transform="rotate(-6 82 82)" />
                  {/* hair — messy */}
                  <path d="M 36 72 Q 40 20 82 18 Q 124 16 128 72 Q 118 38 82 38 Q 46 38 36 72 Z" fill="#3a2010" />
                  <path d="M 36 72 Q 30 55 38 42 Q 44 32 50 38" stroke="#3a2010" strokeWidth="6" fill="none" strokeLinecap="round" />
                  <path d="M 128 72 Q 134 55 126 40" stroke="#3a2010" strokeWidth="5" fill="none" strokeLinecap="round" />
                  {/* eyes — one squinting from flash */}
                  <ellipse cx="66" cy="80" rx="8" ry="9" fill="#fff" />
                  <ellipse cx="66" cy="81" rx="4.5" ry="5" fill="#3a2010" />
                  {/* squinting eye (flash) */}
                  <path d="M 94 80 Q 100 76 106 80" stroke="#3a2010" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  <path d="M 93 83 Q 100 86 107 83" stroke="#3a2010" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                  {/* eyebrows */}
                  <path d="M 58 68 Q 66 64 74 67" stroke="#3a2010" strokeWidth="3" fill="none" strokeLinecap="round" />
                  <path d="M 92 67 Q 100 63 108 66" stroke="#3a2010" strokeWidth="3" fill="none" strokeLinecap="round" />
                  {/* nose */}
                  <path d="M 80 88 Q 76 100 80 104 Q 84 104 88 104" stroke="#c8956a" strokeWidth="2" fill="none" strokeLinecap="round" />
                  {/* open mouth smile — mid-word selfie */}
                  <path d="M 66 114 Q 82 126 98 114" stroke="#3a2010" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  <ellipse cx="82" cy="118" rx="10" ry="7" fill="#c0504a" />
                  <rect x="74" y="113" width="16" height="5" fill="#fdfaf2" rx="2" />
                  {/* ear */}
                  <ellipse cx="34" cy="85" rx="8" ry="11" fill="#f4c08a" transform="rotate(-6 34 85)" />
                  <ellipse cx="130" cy="85" rx="8" ry="11" fill="#f4c08a" transform="rotate(6 130 85)" />
                  {/* double chin / bad angle line */}
                  <path d="M 52 128 Q 82 136 112 128" stroke="#e0a878" strokeWidth="1.5" fill="none" opacity=".6" />
                  {/* arm holding phone up — visible from crop */}
                  <path d="M 122 160 Q 140 140 148 110 L 155 108 Q 150 138 134 165 Z" fill="#f4c08a" />
                  <rect x="148" y="95" width="18" height="28" rx="4" fill="#2a1e10" />
                  <rect x="150" y="97" width="14" height="20" rx="2" fill="#3a6a9a" opacity=".7" />
                </svg>
                {/* caption bubble */}
                <div style={{
                  position: 'absolute', bottom: 8, left: 8, right: 8,
                  background: 'rgba(0,0,0,.38)', borderRadius: 6,
                  fontFamily: '"Caveat", cursive', fontSize: 13, textAlign: 'center',
                  padding: '3px 6px', lineHeight: 1.2,
                }}>
                  📸 selfie attempt #7
                </div>
              </div>
            </div>
          </Rv2>

          {/* big post-it next to it */}
          <Rv2 dir="right" delay={0.3}>
            <SBPi2 rotate={-3} top={60} left={'33%'} w={290}>
              it's been 2 years since<br />
              Kira's IG story 🎬<br />
              <span style={{ fontSize: 18, opacity: .75 }}>(thanks, Kira.)</span>
            </SBPi2>
          </Rv2>

          <Rv2 dir="right" delay={0.5}>
            <SBPi2 rotate={4} top={170} left={'52%'} color="#cfe4b0" w={280}>
              the only screenshot<br />
              we've ever framed.
            </SBPi2>
          </Rv2>

          <Rv2 dir="right" delay={0.7}>
            <SBPi2 rotate={-2} top={20} left={'70%'} color="#f9d6b8" w={250}>
              the original cause<br />
              of the whole problem.
            </SBPi2>
          </Rv2>
        </div>
      </div>
    </Section>
  );
}

// ── Section 6 — Picture #4 with magnifier easter egg ─────────────────────
function FourthSection() {
  const [zoom, setZoom] = React.useState(false);

  return (
    <Section label="EXHIBIT A · PICTURE #4" ix={6} minH={780}>
      <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
        <Rv2>
          <div style={{
            fontFamily: '"Instrument Serif", serif', fontSize: 84, lineHeight: 1,
            color: '#2a1e10',
          }}>
            and then — <em style={{ color: '#c75e4e', fontStyle: 'italic' }}>picture #4.</em>
          </div>
          <div style={{
            marginTop: 14, fontFamily: '"Caveat", cursive', fontSize: 28, color: '#5a4128',
          }}>
            still the best one ;)
          </div>
        </Rv2>

        <Rv2 delay={0.2}>
          <div style={{ position: 'relative', display: 'inline-block', marginTop: 50 }}>
            <div
              onClick={() => {
                const next = !zoom; setZoom(next);
                if (next && egg2('picture-4')) toast2('you found the secret in #4 ♡');
              }}
              style={{
                position: 'relative', display: 'inline-block', cursor: 'zoom-in',
                width: 380, padding: '20px 20px 70px',
                background: '#fdfaf2',
                boxShadow: '0 24px 50px rgba(70,40,15,.32), 0 2px 6px rgba(0,0,0,.1)',
                transform: 'rotate(-2deg)',
              }}
              title="click to zoom in"
            >
              <div style={{ position: 'absolute', top: -12, left: 60, width: 90, height: 22, background: 'rgba(199,94,78,.55)', transform: 'rotate(-6deg)' }} />
              <div style={{ position: 'absolute', top: -12, right: 60, width: 90, height: 22, background: 'rgba(199,94,78,.55)', transform: 'rotate(6deg)' }} />
              <image-slot
                id="picture-four"
                shape="rect"
                placeholder="picture #4"
                style={{ width: '340px', height: '340px', display: 'block', background: '#e9dec3' }}
              ></image-slot>
              <div style={{
                position: 'absolute', bottom: 18, left: 0, right: 0, textAlign: 'center',
                fontFamily: '"Caveat", cursive', fontSize: 26, color: '#5a4128',
              }}>
                #4 — still the best ;)
              </div>

              {/* magnifier overlay when zoomed */}
              {zoom && (
                <div style={{
                  position: 'absolute', top: '20%', left: '20%', width: 240, height: 240,
                  borderRadius: '50%',
                  border: '6px solid #3a2415',
                  boxShadow: '0 18px 30px rgba(0,0,0,.35), inset 0 0 0 2px rgba(255,255,255,.5)',
                  background: 'radial-gradient(circle at center, rgba(251,243,224,.96) 0%, rgba(251,243,224,.9) 70%, rgba(251,243,224,1) 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: 24, textAlign: 'center',
                  animation: 'p4-pop .35s cubic-bezier(.2,.7,.3,1)',
                }}>
                  <div style={{
                    fontFamily: '"Caveat", cursive', fontSize: 22, color: '#c75e4e', lineHeight: 1.2,
                  }}>
                    look at <br />
                    <em style={{ fontFamily: '"Instrument Serif", serif', fontSize: 30 }}>your face.</em><br />
                    <span style={{ fontSize: 16, color: '#5a3f22' }}>that's the one I fell for.</span>
                  </div>
                  {/* handle */}
                  <div style={{
                    position: 'absolute', right: -34, bottom: -34, width: 70, height: 14,
                    background: '#3a2415', borderRadius: 6,
                    transform: 'rotate(45deg)',
                  }}/>
                </div>
              )}
            </div>
          </div>
        </Rv2>

        <Rv2 delay={0.5}>
          <div style={{
            marginTop: 24,
            fontFamily: '"Caveat", cursive', fontSize: 22, color: '#7a5a32',
          }}>
            {zoom ? 'click again to close' : '↑ click it ↑'}
          </div>
        </Rv2>

        {/* extra little flowers */}
        {CFlower({ size: 30, color: '#c75e4e', style: { position: 'absolute', top: 220, left: 80 } })}
        {CFlower({ size: 22, color: '#8aa169', style: { position: 'absolute', top: 260, left: 130 } })}
        {CFlower({ size: 30, color: '#e3a25b', style: { position: 'absolute', top: 220, right: 80 } })}
        {CFlower({ size: 24, color: '#c75e4e', style: { position: 'absolute', top: 260, right: 130 } })}
      </div>

      <style>{`
        @keyframes p4-pop { from{transform:scale(.4); opacity:0} to{transform:scale(1); opacity:1} }
      `}</style>
    </Section>
  );
}

// ── Section 7 — The Letter ─────────────────────────────────────────────────
function LetterSection() {
  const [sealOpen, setSealOpen] = React.useState(false);

  return (
    <Section label="A LETTER" ix={7} minH={920}>
      <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative' }}>
        <Rv2>
          <div style={{
            textAlign: 'center',
            fontFamily: '"Instrument Serif", serif', fontSize: 84, lineHeight: 1,
            color: '#2a1e10',
          }}>
            a <em style={{ fontStyle: 'italic', color: '#c75e4e' }}>letter,</em> then.
          </div>
        </Rv2>

        <Rv2 delay={0.2}>
          <div style={{
            position: 'relative', margin: '60px auto 0',
            background: '#fbf4e0',
            backgroundImage: 'repeating-linear-gradient(transparent 0 34px, rgba(110,70,30,.1) 34px 35px)',
            backgroundPosition: '0 56px',
            padding: '70px 80px 70px 96px',
            boxShadow: '0 28px 60px rgba(70,40,15,.3), 0 0 0 1px rgba(110,70,30,.08)',
            transform: 'rotate(-.4deg)',
          }}>
            {/* tape top */}
            <div style={{ position: 'absolute', top: -12, left: '50%', marginLeft: -50, width: 100, height: 24, background: 'rgba(244,222,160,.75)', transform: 'rotate(-2deg)', boxShadow: '0 1px 2px rgba(0,0,0,.08)' }}/>
            {/* red margin */}
            <div style={{ position: 'absolute', top: 0, bottom: 0, left: 64, width: 1, background: 'rgba(199,94,78,.5)' }}/>
            <div style={{ position: 'absolute', top: 0, bottom: 0, left: 66, width: 1, background: 'rgba(199,94,78,.5)' }}/>

            {/* wax seal */}
            <button
              onClick={() => { setSealOpen(v => !v); if (egg2('wax-seal')) toast2('R♡A · egg found'); }}
              title="click the seal"
              style={{
                position: 'absolute', top: -34, right: 50,
                width: 76, height: 76, borderRadius: '50%', border: 'none', padding: 0,
                background: 'radial-gradient(circle at 35% 30%, #e16e54 0%, #b13e2a 55%, #7a2818 100%)',
                color: '#fbf3e0', fontFamily: '"Instrument Serif", serif', fontStyle: 'italic',
                fontSize: 22,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 8px 18px rgba(0,0,0,.32), inset 0 -4px 6px rgba(0,0,0,.25), inset 0 4px 4px rgba(255,255,255,.15)',
                transform: sealOpen ? 'rotate(20deg) scale(1.05)' : 'rotate(-8deg)',
                transition: 'transform .4s cubic-bezier(.2,.7,.3,1)',
                cursor: 'pointer',
              }}
            >R♡A</button>
            {sealOpen && (
              <div style={{
                position: 'absolute', top: 60, right: -40, width: 220,
                background: '#fbf4e0', padding: '14px 16px',
                boxShadow: '0 14px 28px rgba(70,40,15,.28)',
                transform: 'rotate(3deg)',
                fontFamily: '"Caveat", cursive', fontSize: 22, lineHeight: 1.25,
                color: '#5a3f22',
                animation: 'seal-pop .3s ease',
              }}>
                <span style={{ fontFamily: '"Special Elite", monospace', fontSize: 10, letterSpacing: '.3em' }}>P.S.</span><br />
                you are the love of my life,<br />
                and that is just a fact now.
              </div>
            )}

            <div style={{
              fontFamily: '"Special Elite", monospace', fontSize: 12, letterSpacing: '.2em',
              color: '#7a5a32', textAlign: 'right', marginBottom: 14,
            }}>
              25 · 05 · 2026 &nbsp;·&nbsp; THE COUCH
            </div>

            <div style={{
              fontFamily: '"Caveat", cursive', fontSize: 44, color: '#c75e4e',
              marginBottom: 16, transform: 'rotate(-1deg)',
            }}>
              Ana,
            </div>

            <div style={{ fontFamily: '"EB Garamond", serif', fontSize: 21, lineHeight: 1.7, color: '#3a2f23' }}>
              two years ago, after a walk with Bailey, you sat on the couch and I
              decided — somewhere between the door clicking shut and the moment
              you laughed at something I no longer remember — that I was never
              going to look at anyone else the way I look at you. it was 22:00.
              the apartment was quiet. and then I kissed you, and that was that —
              me, done, permanently.
              <br /><br />
              here are 730-ish days of us, folded into a little book. there is a
              paw-print trail to find me by, a post-it from Kira (thank you,
              Kira), and one polaroid that is, for the record, still the best
              one I've ever seen of anyone, ever.
              <br /><br />
              thank you for the walks, the couches, the beaches, the flowers,
              the quiet evenings, the not-so-quiet ones, and for the small
              honest version of me that only you get to see.
              <br /><br />
              happy two years. let's keep going.
            </div>

            <div style={{
              marginTop: 28, textAlign: 'right',
              fontFamily: '"Caveat", cursive', fontSize: 38, color: '#5a3f22',
              transform: 'rotate(-2deg)',
            }}>
              yours, <span style={{ color: '#c75e4e' }}>— Rico ♡</span>
            </div>

            <div style={{
              marginTop: 12,
              fontFamily: '"Caveat", cursive', fontSize: 20, color: '#7a5a32',
            }}>
              p.s. Bailey says picture #4 is, in his expert opinion, also the best one.
            </div>
          </div>
        </Rv2>
      </div>

      <style>{`
        @keyframes seal-pop { from{opacity:0; transform:rotate(0) translateY(-10px)} to{opacity:1; transform:rotate(3deg) translateY(0)} }
      `}</style>
    </Section>
  );
}

// ── Section 8 — The List ───────────────────────────────────────────────────
function ListSection() {
  const promises = [
    'more couches',
    'more 22:00s',
    'more beaches & long walks',
    'more Bailey ✨',
    'more flowers, on no occasion',
    'more picture #4s',
    'more <em>two-years</em>.',
  ];
  return (
    <Section label="YEAR THREE · THE LIST" ix={8} minH={760}>
      <div style={{ maxWidth: 920, margin: '0 auto' }}>
        <Rv2>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: '"Special Elite", monospace', fontSize: 13,
              letterSpacing: '.3em', color: '#7a5a32',
            }}>YEAR THREE · THE LIST</div>
            <div style={{
              marginTop: 6,
              fontFamily: '"Instrument Serif", serif', fontSize: 84, lineHeight: 1,
              color: '#2a1e10',
            }}>
              and now? <em style={{ fontStyle: 'italic', color: '#c75e4e' }}>more.</em>
            </div>
          </div>
        </Rv2>

        <ul style={{ listStyle: 'none', padding: 0, margin: '50px auto 0', maxWidth: 700 }}>
          {promises.map((p, i) => (
            <Rv2 key={i} delay={0.1 + i * 0.08}>
              <li style={{
                display: 'flex', alignItems: 'baseline', gap: 18,
                padding: '18px 0',
                borderBottom: i < promises.length - 1 ? '1px dashed rgba(110,70,30,.25)' : 'none',
              }}>
                <span style={{
                  fontFamily: '"Caveat", cursive', fontSize: 32,
                  color: i === promises.length - 1 ? '#c75e4e' : '#7a5a32',
                  width: 40, textAlign: 'right',
                }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  style={{
                    fontSize: i === promises.length - 1 ? 36 : 28,
                    fontFamily: i === promises.length - 1 ? '"Instrument Serif", serif' : '"EB Garamond", serif',
                    color: i === promises.length - 1 ? '#c75e4e' : '#3a2f23',
                    lineHeight: 1.2,
                  }}
                  dangerouslySetInnerHTML={{ __html: p }}
                />
              </li>
            </Rv2>
          ))}
        </ul>
      </div>
    </Section>
  );
}

// ── Section 9 — Final heart + hidden polaroid ─────────────────────────────
function FinalSection() {
  const [hidden, setHidden] = React.useState(false);
  const [ending, setEnding] = React.useState(false);
  const heartRef = React.useRef(null);

  React.useEffect(() => {
    const el = heartRef.current;
    if (!el || !window.__revealController) return;
    return window.__revealController.add(el, () => {
      // Confetti burst from the heart
      setTimeout(() => {
        const r = el.getBoundingClientRect();
        if (window.fireConfetti) window.fireConfetti({
          x: r.left + r.width / 2,
          y: r.top + r.height / 2,
          count: 90,
        });
      }, 600);
    });
  }, []);
  return (
    <Section label="THE END · OR BEGINNING" ix={9} minH={1000} style={{ paddingBottom: 140 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
        <Rv2>
          <div style={{
            fontFamily: '"Instrument Serif", serif', fontSize: 84, lineHeight: 1,
            color: '#2a1e10',
          }}>
            so, <em style={{ fontStyle: 'italic', color: '#c75e4e' }}>Ana —</em>
          </div>
        </Rv2>

        <Rv2 delay={0.2}>
          <div style={{ position: 'relative', display: 'inline-block', margin: '50px auto 0' }} ref={heartRef}>
            <svg viewBox="0 0 100 95" width="380" height="360" style={{
              display: 'block',
              filter: 'drop-shadow(0 18px 30px rgba(199,94,78,.4))',
              animation: 'final-heart-pulse 3s ease-in-out infinite',
            }}>
              <defs>
                <linearGradient id="finalHeart" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#e07c66" />
                  <stop offset="100%" stopColor="#b13e2a" />
                </linearGradient>
              </defs>
              <path
                d="M50 86 C 18 60 0 40 0 22 C 0 8 12 0 24 0 C 36 0 46 8 50 18 C 54 8 64 0 76 0 C 88 0 100 8 100 22 C 100 40 82 60 50 86 Z"
                fill="url(#finalHeart)"
              />
              <ellipse cx="28" cy="20" rx="10" ry="6" fill="rgba(255,255,255,.5)" transform="rotate(-25 28 20)" />
            </svg>
            <div style={{
              position: 'absolute', top: '38%', left: 0, right: 0, textAlign: 'center',
              fontFamily: '"Caveat", cursive', fontSize: 58, color: '#fbf3e0',
              lineHeight: 1, textShadow: '0 4px 12px rgba(120,30,20,.5)',
              pointerEvents: 'none',
            }}>
              I love<br />you, Ana.
            </div>
          </div>
        </Rv2>

        <Rv2 delay={0.5}>
          <div style={{
            marginTop: 40,
            fontFamily: '"Caveat", cursive', fontSize: 30, color: '#5a3f22',
          }}>
            here's to year three.
          </div>
          <div style={{
            marginTop: 8,
            fontFamily: '"Instrument Serif", serif', fontStyle: 'italic',
            fontSize: 26, color: '#7a3a2a',
          }}>
            — Rico &amp; Bailey ♡
          </div>
        </Rv2>

        {/* hidden polaroid reveal — tiny hint */}
        <Rv2 delay={0.8}>
          <div style={{ marginTop: 80 }}>
            {!hidden ? (
              <button
                onClick={() => { setHidden(true); if (egg2('hidden-polaroid')) toast2('one more thing ♡ egg found'); }}
                style={{
                  background: 'transparent', border: '1px dashed rgba(110,70,30,.45)',
                  padding: '8px 14px',
                  fontFamily: '"Caveat", cursive', fontSize: 18, color: '#7a5a32',
                  cursor: 'pointer',
                  borderRadius: 4,
                }}
              >
                ↓ there's one more polaroid in here ↓
              </button>
            ) : (
              <div style={{
                display: 'inline-block', position: 'relative',
                width: 260, padding: '16px 16px 56px',
                background: '#fdfaf2',
                boxShadow: '0 22px 44px rgba(70,40,15,.35), 0 2px 6px rgba(0,0,0,.1)',
                transform: 'rotate(-3deg)',
                animation: 'hidden-pop .8s cubic-bezier(.2,.7,.3,1)',
              }}>
                <div style={{
                  position: 'absolute', top: -12, left: 60, width: 80, height: 22,
                  background: 'rgba(199,94,78,.6)', transform: 'rotate(-4deg)',
                }} />
                <image-slot
                  id="hidden-polaroid"
                  shape="rect"
                  placeholder="one for the end"
                  style={{ width: '228px', height: '228px', display: 'block', background: '#e9dec3' }}
                ></image-slot>
                <div style={{
                  position: 'absolute', bottom: 14, left: 0, right: 0, textAlign: 'center',
                  fontFamily: '"Caveat", cursive', fontSize: 22, color: '#5a4128',
                }}>year three ♡</div>
              </div>
            )}
          </div>
        </Rv2>

        {/* tiny ending button */}
        <div style={{ marginTop: 80 }}>
          <button
            onClick={() => { setEnding(true); egg2('p-p-s'); }}
            title="one more thing"
            style={{
              width: 34, height: 34, borderRadius: '50%', border: '1px solid rgba(199,94,78,.4)',
              background: 'rgba(199,94,78,.08)', cursor: 'pointer',
              color: '#c75e4e', fontSize: 18, padding: 0,
            }}
          >♡</button>
        </div>
      </div>

      {ending && (
        <div
          onClick={() => setEnding(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 9990,
            background: 'radial-gradient(ellipse at center, rgba(30,16,8,.65) 0%, rgba(30,16,8,.95) 80%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', animation: 'fade-in .4s ease',
          }}
        >
          <div onClick={(e) => e.stopPropagation()} style={{
            background: '#fbf3e0', padding: '54px 70px', maxWidth: 620,
            boxShadow: '0 30px 80px rgba(0,0,0,.5)',
            backgroundImage: 'repeating-linear-gradient(transparent 0 32px, rgba(110,70,30,.1) 32px 33px)',
            cursor: 'default', position: 'relative', transform: 'rotate(-1deg)',
          }}>
            <div style={{
              position: 'absolute', top: -12, left: '50%', marginLeft: -50, width: 100, height: 24,
              background: 'rgba(199,94,78,.6)', transform: 'rotate(-2deg)',
            }}/>
            <div style={{
              fontFamily: '"Special Elite", monospace', fontSize: 11,
              letterSpacing: '.3em', color: '#7a5a32', marginBottom: 12,
            }}>P.P.S. — STRICTLY FOR ANA</div>
            <div style={{
              fontFamily: '"Caveat", cursive', fontSize: 38, color: '#c75e4e',
              marginBottom: 14,
            }}>one more thing.</div>
            <div style={{ fontFamily: '"EB Garamond", serif', fontSize: 22, lineHeight: 1.6, color: '#3a2f23' }}>
              if you scrolled, clicked the seal, fed the flowers, found Bailey's
              paws, opened picture #4, typed your own name into the page,
              triple-tapped the title, and found the hidden polaroid — that's
              exactly the kind of thing I love about you. you look at everything
              closely. you find the good bits.
              <br/><br/>
              I'm so glad you found mine.
            </div>
            <div style={{ marginTop: 24, textAlign: 'right', fontFamily: '"Caveat", cursive', fontSize: 32, color: '#5a3f22' }}>
              forever — Rico ♡
            </div>
            <div style={{ marginTop: 18, textAlign: 'center', fontFamily: '"Special Elite", monospace', fontSize: 11, opacity: .5, letterSpacing: '.2em' }}>
              click anywhere to close
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes final-heart-pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.04)} }
        @keyframes hidden-pop { 0%{opacity:0; transform: scale(.4) rotate(0)} 60%{opacity:1; transform:scale(1.05) rotate(-3deg)} 100%{transform:scale(1) rotate(-3deg)} }
        @keyframes fade-in { from{opacity:0} to{opacity:1} }
      `}</style>
    </Section>
  );
}

window.KiraSection = KiraSection;
window.FourthSection = FourthSection;
window.LetterSection = LetterSection;
window.ListSection = ListSection;
window.FinalSection = FinalSection;
