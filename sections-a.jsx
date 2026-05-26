// The scrollable scrapbook keepsake for Ana.
// Sections stack vertically; Reveal animates them as they enter view.

const {
  Petals, EnvelopeIntro, Reveal, Parallax,
  burstAt, showToast, foundEgg,
} = window;
const {
  Polaroid: SBPolaroid, Flower: SBFlower, Paw: SBPaw, PostIt: SBPostIt,
  PAPER_BG: SB_PAPER, GRAIN_LAYER: SB_GRAIN, EDGE_VIGNETTE: SB_EDGE,
} = window.SB;

// ── Tiny utilities ────────────────────────────────────────────────────────
function clickableFlower({ size = 40, color = '#c75e4e', style, eggKey }) {
  return (
    <div
      style={{ ...style, cursor: 'pointer' }}
      onClick={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        burstAt(r.left + r.width / 2, r.top + r.height / 2, { count: 14 });
        if (eggKey && foundEgg(eggKey)) showToast('petal burst · egg found ♡');
      }}
      title="give it a tap"
    >
      <SBFlower size={size} color={color} style={{ position: 'static' }} />
    </div>
  );
}

function clickablePaw({ size = 22, style, eggKey, line }) {
  return (
    <div
      style={{ ...style, cursor: 'pointer' }}
      onClick={(e) => {
        e.stopPropagation();
        if (eggKey && foundEgg(eggKey)) showToast(line || 'woof. — Bailey ♡');
        else showToast(line || 'woof. — Bailey');
      }}
      title="bailey?"
    >
      <SBPaw size={size} style={{ position: 'static' }} />
    </div>
  );
}

// Day counter (today is May 21, 2026 → 4 days to go)
function dayCounter() {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const ann = new Date(2026, 4, 25);
  const diff = Math.round((today - ann) / 86400000);
  if (diff === 0) return { big: 'today.', sub: 'two years exactly.', tone: 'now' };
  if (diff === -1) return { big: 'one sleep.', sub: 'until two years.', tone: 'soon' };
  if (diff < 0) return { big: `${-diff} days`, sub: 'until two years.', tone: 'soon' };
  if (diff === 1) return { big: 'one day', sub: 'past two years.', tone: 'past' };
  return { big: `${diff} days`, sub: 'past two years.', tone: 'past' };
}

// Page background shared
function PaperBg() {
  return (
    <>
      <div style={{ position: 'absolute', inset: 0, background: SB_PAPER, zIndex: -2 }} />
      <div style={{ ...SB_GRAIN, zIndex: -1 }} />
    </>
  );
}

// Section wrapper — a card-feeling page
function Section({ children, minH = 900, label, ix, style }) {
  return (
    <section
      data-section={label}
      style={{
        position: 'relative',
        minHeight: minH,
        padding: '90px 40px',
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* page tag */}
      {label && (
        <div style={{
          position: 'absolute', top: 28, left: '50%', transform: 'translateX(-50%)',
          fontFamily: '"Special Elite", monospace', fontSize: 11,
          letterSpacing: '.4em', color: 'rgba(110,70,30,.55)',
          whiteSpace: 'nowrap',
        }}>
          {String(ix).padStart(2, '0')} · {label}
        </div>
      )}
      {children}
    </section>
  );
}

// ── Section 1 — Cover ─────────────────────────────────────────────────────
function CoverSection() {
  const c = React.useMemo(dayCounter, []);
  const [taps, setTaps] = React.useState(0);

  function tapTitle(e) {
    const next = taps + 1;
    setTaps(next);
    if (next >= 3) {
      setTaps(0);
      const r = e.currentTarget.getBoundingClientRect();
      // big burst
      for (let i = 0; i < 4; i++) {
        setTimeout(() => burstAt(
          r.left + r.width / 2 + (Math.random() - .5) * 200,
          r.top + r.height / 2 + (Math.random() - .5) * 80,
          { count: 22 }
        ), i * 90);
      }
      if (foundEgg('triple-title')) showToast('triple-tap ♡ egg found');
      else showToast('it gets better every time.');
    }
  }

  return (
    <Section label="COVER" ix={1} minH={980}>
      <Reveal delay={0.05}>
        <div style={{
          textAlign: 'center', marginTop: 30,
          fontFamily: '"Special Elite", monospace', fontSize: 12,
          letterSpacing: '.4em', color: '#7a5a32',
        }}>
          A SCRAPBOOK &nbsp;·&nbsp; FROM RICO &nbsp;·&nbsp; WITH BAILEY
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <div style={{
          textAlign: 'center', marginTop: 16,
          fontFamily: '"Caveat", cursive', fontSize: 38, color: '#5a4128',
          transform: 'rotate(-1.5deg)',
        }}>
          for Ana
        </div>
      </Reveal>

      <Reveal delay={0.35}>
        <h1
          onClick={tapTitle}
          title="psst — try tapping three times"
          style={{
            margin: '20px auto 0',
            textAlign: 'center',
            fontFamily: '"Instrument Serif", serif',
            fontSize: 'clamp(140px, 22vw, 280px)',
            lineHeight: 0.9, letterSpacing: '-0.02em',
            color: '#2a1e10', cursor: 'pointer',
            userSelect: 'none',
          }}
        >
          two<br />
          <em style={{ color: '#c75e4e', fontStyle: 'italic' }}>years.</em>
        </h1>
      </Reveal>

      {/* day counter card */}
      <Reveal delay={0.6}>
        <div style={{
          margin: '70px auto 0', width: 460, maxWidth: '90%',
          position: 'relative',
          background: '#fbf4e0',
          padding: '26px 40px 24px',
          textAlign: 'center',
          boxShadow: '0 14px 30px rgba(70,40,15,.22)',
          transform: 'rotate(-1deg)',
        }}>
          <div style={{
            position: 'absolute', top: -10, left: '50%', marginLeft: -36, width: 72, height: 18,
            background: 'rgba(199,94,78,.5)', transform: 'rotate(-2deg)',
          }} />
          <div style={{
            fontFamily: '"Instrument Serif", serif',
            fontSize: 56, lineHeight: 1,
            color: c.tone === 'now' ? '#c75e4e' : '#3a2f23',
            fontStyle: c.tone === 'now' ? 'italic' : 'normal',
          }}>
            {c.big}
          </div>
          <div style={{ marginTop: 4, fontFamily: '"Caveat", cursive', fontSize: 26, color: '#5a4128' }}>
            {c.sub}
          </div>
          <div style={{
            marginTop: 8, fontFamily: '"Special Elite", monospace', fontSize: 10,
            letterSpacing: '.3em', color: '#7a5a32', opacity: .75,
          }}>
            25 · 05 · 2026
          </div>
        </div>
      </Reveal>

      {/* doodle flowers, clickable */}
      <Parallax speed={-0.15} style={{ position: 'absolute', top: 200, left: '12%' }}>
        {clickableFlower({ size: 46, color: '#c75e4e', eggKey: 'flower-1' })}
      </Parallax>
      <Parallax speed={-0.1} style={{ position: 'absolute', top: 260, left: '17%' }}>
        {clickableFlower({ size: 30, color: '#e3a25b', eggKey: 'flower-1' })}
      </Parallax>
      <Parallax speed={-0.2} style={{ position: 'absolute', top: 220, right: '14%' }}>
        {clickableFlower({ size: 38, color: '#8aa169', eggKey: 'flower-1' })}
      </Parallax>
      <Parallax speed={-0.05} style={{ position: 'absolute', top: 290, right: '20%' }}>
        {clickableFlower({ size: 26, color: '#c75e4e', eggKey: 'flower-1' })}
      </Parallax>

      {/* scroll hint */}
      <Reveal delay={1.0}>
        <div style={{
          marginTop: 90, textAlign: 'center',
          fontFamily: '"Caveat", cursive', fontSize: 24, color: '#7a5a32',
          animation: 'cover-hint 2.4s ease-in-out infinite',
        }}>
          ↓ keep scrolling ↓
        </div>
      </Reveal>

      <style>{`
        @keyframes cover-hint { 0%,100%{transform:translateY(0); opacity:.6} 50%{transform:translateY(6px); opacity:1} }
      `}</style>
    </Section>
  );
}

// ── Section 2 — The Night (22:00 on the couch) ────────────────────────────
function NightSection() {
  return (
    <Section label="THE NIGHT" ix={2} minH={820}>
      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>
        <Reveal>
          <div style={{
            fontFamily: '"Instrument Serif", serif', fontSize: 84, lineHeight: 1,
            color: '#2a1e10',
          }}>
            it started at <em style={{ color: '#c75e4e', fontStyle: 'italic' }}>22:00</em>.
          </div>
          <div style={{
            marginTop: 14,
            fontFamily: '"Caveat", cursive', fontSize: 28, color: '#5a4128',
            transform: 'rotate(-1deg)',
          }}>
            on a couch. after a walk with Bailey. quietly.
          </div>
        </Reveal>

        <div style={{ position: 'relative', marginTop: 60, height: 540 }}>
          {/* the clock */}
          <Reveal dir="left" delay={0.1}>
            <div style={{
              position: 'absolute', left: 30, top: 30,
              width: 200, height: 200, borderRadius: '50%',
              background: '#fbf3e0',
              border: '8px solid #3a2415',
              boxShadow: '0 18px 36px rgba(70,40,15,.32), inset 0 0 12px rgba(70,40,15,.1)',
              transform: 'rotate(-3deg)',
            }}>
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} style={{
                  position: 'absolute', left: '50%', top: 6,
                  width: 3, height: 12, background: '#3a2415',
                  marginLeft: -1.5, transformOrigin: '1.5px 90px',
                  transform: `rotate(${i * 30}deg)`,
                }} />
              ))}
              <div style={{
                position: 'absolute', left: '50%', top: '50%',
                width: 4, height: 56, background: '#3a2415',
                marginLeft: -2, marginTop: -52, transformOrigin: '2px 52px',
                transform: 'rotate(300deg)', borderRadius: 2,
              }} />
              <div style={{
                position: 'absolute', left: '50%', top: '50%',
                width: 3, height: 72, background: '#c75e4e',
                marginLeft: -1.5, marginTop: -68, transformOrigin: '1.5px 68px',
                transform: 'rotate(0deg)', borderRadius: 2,
              }} />
              <div style={{
                position: 'absolute', left: '50%', top: '50%',
                width: 14, height: 14, marginLeft: -7, marginTop: -7,
                background: '#3a2415', borderRadius: '50%',
              }} />
              <div style={{
                position: 'absolute', top: 'calc(100% + 14px)', left: 0, right: 0, textAlign: 'center',
                fontFamily: '"Caveat", cursive', fontSize: 22, color: '#7a3a2a',
              }}>twenty-two hundred.</div>
            </div>
          </Reveal>

          {/* polaroid: the couch */}
          <Reveal dir="up" delay={0.3}>
            <SBPolaroid
              id="scrap-couch"
              rotate={4}
              top={20} left={'34%'}
              src="the%20couch.jpeg"
              label="the couch ♡"
              width={280}
              tapes={[
                { style: { top: -10, left: 70, transform: 'rotate(-6deg)' }, color: 'rgba(199,94,78,.55)' },
                { style: { top: -10, left: 180, transform: 'rotate(6deg)' }, color: 'rgba(199,94,78,.55)' },
              ]}
            />
          </Reveal>

          {/* post-it */}
          <Reveal dir="right" delay={0.45}>
            <SBPostIt rotate={-3} top={60} left={'68%'} color="#f9d6b8" w={230}>
              first kiss: 22:00,<br />
              the couch, after Bailey's walk.<br />
              <span style={{ fontSize: 17 }}>i remember everything.</span>
            </SBPostIt>
          </Reveal>

          {/* paw trail entering scene */}
          <Reveal delay={0.6}>
            {clickablePaw({ size: 22, style: { position: 'absolute', left: 50, top: 380, transform: 'rotate(20deg)' }, line: 'bailey: "i was there too." 🐾' })}
            {clickablePaw({ size: 22, style: { position: 'absolute', left: 110, top: 410, transform: 'rotate(-6deg)' }, line: 'bailey: "i was there too." 🐾' })}
            {clickablePaw({ size: 22, style: { position: 'absolute', left: 170, top: 380, transform: 'rotate(14deg)' }, line: 'bailey: "i was there too." 🐾', eggKey: 'paw-bailey' })}
            {clickablePaw({ size: 22, style: { position: 'absolute', left: 230, top: 410, transform: 'rotate(-2deg)' }, line: 'bailey: "i was there too." 🐾' })}
            {clickablePaw({ size: 22, style: { position: 'absolute', left: 290, top: 380, transform: 'rotate(10deg)' }, line: 'bailey: "i was there too." 🐾' })}
          </Reveal>

          {/* small flower */}
          {clickableFlower({ size: 30, color: '#c75e4e', style: { position: 'absolute', right: 80, bottom: 60 }, eggKey: 'flower-1' })}
        </div>
      </div>
    </Section>
  );
}

// ── Section 3 — Bailey's chapter ──────────────────────────────────────────
function BaileySection() {
  return (
    <Section label="BAILEY" ix={3} minH={760}>
      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>
        <Reveal>
          <div style={{
            fontFamily: '"Special Elite", monospace', fontSize: 12,
            letterSpacing: '.3em', color: '#7a5a32',
          }}>CHAPTER · CO-CONSPIRATOR</div>
          <div style={{
            fontFamily: '"Instrument Serif", serif', fontSize: 84, lineHeight: 1,
            color: '#2a1e10', marginTop: 6,
          }}>
            then there was <em style={{ color: '#c75e4e', fontStyle: 'italic' }}>Bailey.</em>
          </div>
          <div style={{
            marginTop: 12, fontFamily: '"Caveat", cursive', fontSize: 26, color: '#5a4128',
            transform: 'rotate(-1deg)', maxWidth: 720,
          }}>
            he walked us into this. he keeps walking us further in.
          </div>
        </Reveal>

        <div style={{ position: 'relative', marginTop: 50, height: 460 }}>
          {/* big bailey sketch */}
          <Reveal dir="left" delay={0.15}>
            <div style={{
              position: 'absolute', left: 20, top: 30, width: 360,
              background: '#fbf4e0',
              padding: 22,
              boxShadow: '0 14px 30px rgba(70,40,15,.25)',
              transform: 'rotate(-3deg)',
            }}>
              <svg viewBox="0 0 200 140" width="100%">
                <ellipse cx="105" cy="90" rx="78" ry="32" fill="#d9a35a" />
                <ellipse cx="105" cy="78" rx="60" ry="22" fill="#e6b772" />
                <ellipse cx="38" cy="80" rx="30" ry="26" fill="#d9a35a" />
                <ellipse cx="42" cy="86" rx="16" ry="12" fill="#e6b772" />
                <ellipse cx="20" cy="88" rx="10" ry="7" fill="#e6b772" />
                <ellipse cx="14" cy="86" rx="3" ry="2.5" fill="#2a1810" />
                <path d="M 50 56 Q 56 38 66 56 Q 60 70 50 68 Z" fill="#a87838" />
                <path d="M 30 78 Q 34 76 38 78" stroke="#2a1810" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <path d="M 175 82 Q 195 66 188 50" stroke="#d9a35a" strokeWidth="14" fill="none" strokeLinecap="round" />
                <text x="64" y="36" fontFamily="EB Garamond, serif" fontSize="16" fill="#5a3f22">z</text>
                <text x="76" y="24" fontFamily="EB Garamond, serif" fontSize="12" fill="#5a3f22" opacity=".7">z</text>
                <text x="86" y="16" fontFamily="EB Garamond, serif" fontSize="10" fill="#5a3f22" opacity=".5">z</text>
              </svg>
              <div style={{
                marginTop: 8, textAlign: 'center',
                fontFamily: '"Caveat", cursive', fontSize: 24, color: '#5a3f22',
              }}>Bailey, sleeping through history</div>
            </div>
          </Reveal>

          {/* a polaroid of Bailey */}
          <Reveal dir="right" delay={0.3}>
            <SBPolaroid
              id="scrap-bailey-1"
              rotate={6}
              top={20} left={'48%'}
              src="bailey%20photobomb.jpeg"
              label="bailey, photobomb"
              tapes={[{ style: { top: -10, left: 80, transform: 'rotate(8deg)' }, color: 'rgba(245,210,180,.7)' }]}
            />
          </Reveal>

          {/* paw print + post-it */}
          <Reveal dir="right" delay={0.5}>
            <SBPostIt rotate={3} top={60} left={'73%'} color="#cfe4b0" w={210}>
              <span style={{ fontFamily: '"Special Elite", monospace', fontSize: 11, letterSpacing: '.2em' }}>FROM BAILEY</span><br />
              "i support this couple."
            </SBPostIt>
          </Reveal>

          <Reveal delay={0.7}>
            {clickablePaw({ style: { position: 'absolute', left: 380, top: 380, transform: 'rotate(15deg)' }, line: 'bailey says: ♡' })}
            {clickablePaw({ style: { position: 'absolute', left: 440, top: 400, transform: 'rotate(-8deg)' }, line: 'bailey says: ♡' })}
            {clickablePaw({ style: { position: 'absolute', left: 500, top: 380, transform: 'rotate(10deg)' }, line: 'bailey says: ♡' })}
            {clickablePaw({ style: { position: 'absolute', left: 560, top: 400, transform: 'rotate(-4deg)' }, line: 'bailey says: ♡' })}
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

// ── Section 4 — Polaroid Wall ─────────────────────────────────────────────
function WallSection() {
  return (
    <Section label="THE WALL" ix={4} minH={900}>
      <div style={{ maxWidth: 1180, margin: '0 auto', position: 'relative' }}>
        <Reveal>
          <div style={{
            fontFamily: '"Instrument Serif", serif', fontSize: 84, lineHeight: 1,
            color: '#2a1e10', textAlign: 'center',
          }}>
            small <em style={{ fontStyle: 'italic', color: '#c75e4e' }}>days,</em> mostly.
          </div>
          <div style={{
            textAlign: 'center', marginTop: 14,
            fontFamily: '"Caveat", cursive', fontSize: 26, color: '#5a4128',
          }}>
            (drop your favourite photos into these — they'll save.)
          </div>
        </Reveal>

        <div style={{ position: 'relative', marginTop: 70, height: 660 }}>
          <Reveal dir="up" delay={0.1}>
            <SBPolaroid id="wall-1" rotate={-5} top={0}   left={60}   src="us%20last%20summer.jpeg" label="us, last summer" tapes={[{ style: { top: -8, left: 90, transform: 'rotate(-6deg)' } }]} />
          </Reveal>
          <Reveal dir="up" delay={0.2}>
            <SBPolaroid id="wall-2" rotate={3}  top={30}  left={330}  src="walking%20Bailey.jpeg" label="walking Bailey" tapes={[{ style: { top: -8, left: 80, transform: 'rotate(8deg)' }, color: 'rgba(245,210,180,.7)' }]} />
          </Reveal>
          <Reveal dir="up" delay={0.3}>
            <SBPolaroid id="wall-3" rotate={-3} top={0}   left={600}  src="Bailey%20with%20Mozart's%20Brother.jpeg" label="Bailey with Mozart's brother" tapes={[{ style: { top: -10, left: 100, transform: 'rotate(-3deg)' } }]} />
          </Reveal>
          <Reveal dir="up" delay={0.4}>
            <SBPolaroid id="wall-4" rotate={5}  top={20}  left={880}  src="the%20beach.jpeg" label="the beach" tapes={[{ style: { top: -10, left: 70, transform: 'rotate(6deg)' }, color: 'rgba(199,94,78,.4)' }]} />
          </Reveal>
          <Reveal dir="up" delay={0.5}>
            <SBPolaroid id="wall-5" rotate={4}  top={340} left={110}  src="flower.jpeg" label="flowers, on no occasion" tapes={[{ style: { top: -9, left: 90, transform: 'rotate(4deg)' } }]} />
          </Reveal>
          <Reveal dir="up" delay={0.6}>
            <SBPolaroid id="wall-6" rotate={-4} top={330} left={400}  src="the%20long%20evening.jpeg" label="the long evening" tapes={[{ style: { top: -10, left: 90, transform: 'rotate(-3deg)' }, color: 'rgba(245,210,180,.7)' }]} />
          </Reveal>
          <Reveal dir="up" delay={0.7}>
            <SBPolaroid id="wall-7" rotate={3}  top={350} left={690}  src="the%20d%C3%B6ner.jpeg" label="a Döner"  tapes={[{ style: { top: -10, left: 80, transform: 'rotate(4deg)' } }]} />
          </Reveal>
          <Reveal dir="up" delay={0.8}>
            <SBPolaroid id="wall-8" rotate={-3} top={340} left={960}  src="us%20again.jpeg" label="us, again"  tapes={[{ style: { top: -10, left: 80, transform: 'rotate(-8deg)' } }]} />
          </Reveal>

          {/* paw trail through the wall */}
          {clickablePaw({ style: { position: 'absolute', top: 300, left: 280, transform: 'rotate(20deg)' }, line: '🐾 bailey was here' })}
          {clickablePaw({ style: { position: 'absolute', top: 320, left: 340, transform: 'rotate(-6deg)' }, line: '🐾 bailey was here' })}
          {clickablePaw({ style: { position: 'absolute', top: 300, left: 560, transform: 'rotate(14deg)' }, line: '🐾 bailey was here' })}
          {clickablePaw({ style: { position: 'absolute', top: 320, left: 620, transform: 'rotate(-2deg)' }, line: '🐾 bailey was here' })}
          {clickablePaw({ style: { position: 'absolute', top: 300, left: 840, transform: 'rotate(8deg)' }, line: '🐾 bailey was here' })}

          {/* flowers scattered */}
          {clickableFlower({ size: 26, color: '#8aa169', style: { position: 'absolute', top: 660, left: 70 }, eggKey: 'flower-1' })}
          {clickableFlower({ size: 22, color: '#e3a25b', style: { position: 'absolute', top: 670, left: 250 }, eggKey: 'flower-1' })}
          {clickableFlower({ size: 30, color: '#c75e4e', style: { position: 'absolute', top: 660, right: 60 }, eggKey: 'flower-1' })}
        </div>
      </div>
    </Section>
  );
}

window.CoverSection = CoverSection;
window.NightSection = NightSection;
window.BaileySection = BaileySection;
window.WallSection = WallSection;
