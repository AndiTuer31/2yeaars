// Main app — door → envelope → long scroll scrapbook

const {
  Petals: AppPetals, EnvelopeIntro: AppEnvelope, DoorIntro: AppDoor,
  CursorPetals, SkyOverlay, ReadingProgress, AmbientAudio,
  CoverSection, NightSection, BaileySection, WallSection,
  KiraSection, FourthSection, LetterSection, ListSection, FinalSection,
  ConstellationSection, CouponsSection, HandwrittenSignature,
  PAPER_BG: APP_PB, GRAIN_LAYER: APP_GR, EDGE_VIGNETTE: APP_EV,
} = { ...window, ...window.SB };

function EggBadge() {
  const [n, setN] = React.useState(0);
  React.useEffect(() => {
    const i = setInterval(() => setN(window.__eggs ? window.__eggs.size : 0), 500);
    return () => clearInterval(i);
  }, []);
  return (
    <div id="egg-badge" style={{
      position: 'fixed', top: 18, right: 18, zIndex: 50,
      padding: '8px 14px',
      background: 'rgba(40,20,10,.5)',
      color: '#fbf3e0',
      fontFamily: '"Special Elite", monospace', fontSize: 11,
      letterSpacing: '.2em',
      borderRadius: 20, backdropFilter: 'blur(8px)',
      pointerEvents: 'none',
      opacity: n > 0 ? 1 : 0,
      transition: 'opacity .35s ease',
    }}>
      ♡ {n} / 8 found
    </div>
  );
}

function App() {
  // Flow: closed → door knocked → envelope visible → envelope opened → scrolling
  const [doorPassed, setDoorPassed] = React.useState(false);
  const [opened, setOpened] = React.useState(false);
  const [revealed, setRevealed] = React.useState(false);

  React.useEffect(() => {
    if (!opened) return;
    const t = setTimeout(() => {
      setRevealed(true);
      document.body.style.overflow = 'auto';
    }, 700);
    return () => clearTimeout(t);
  }, [opened]);

  React.useEffect(() => {
    document.body.style.overflow = opened ? 'auto' : 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, [opened]);

  return (
    <>
      <AppPetals />
      <CursorPetals />
      {window.Fireflies && <window.Fireflies count={7} />}
      <SkyOverlay />
      <ReadingProgress />
      <EggBadge />
      <AmbientAudio />
      <ClickHearts />

      {/* DOOR — first thing user sees */}
      {!doorPassed && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 110 }}>
          <AppDoor onPass={() => setDoorPassed(true)} />
        </div>
      )}

      {/* ENVELOPE — after door */}
      {doorPassed && !opened && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 100,
          animation: 'app-fade-in .8s ease both',
        }}>
          <AppEnvelope onOpen={() => setOpened(true)} />
        </div>
      )}

      {/* SCRAPBOOK */}
      <div
        style={{
          opacity: revealed ? 1 : 0,
          transition: 'opacity 1s ease .2s',
          position: 'relative',
        }}
      >
        <div style={{ background: APP_PB, position: 'relative' }}>
          <div style={{ ...APP_GR, position: 'fixed', zIndex: 1, pointerEvents: 'none' }} />

          <CoverSection />
          <NightSection />
          <BaileySection />
          <WallSection />
          <ConstellationSection />
          <KiraSection />
          <FourthSection />
          <LetterSection />
          <CouponsSection />
          <ListSection />
          <FinalSection />

          <footer style={{
            padding: '70px 0 90px',
            textAlign: 'center',
          }}>
            <div style={{ display: 'inline-block' }}>
              <HandwrittenSignature />
            </div>
            <div style={{
              marginTop: 22,
              fontFamily: '"Special Elite", monospace',
              fontSize: 11, letterSpacing: '.3em',
              color: 'rgba(110,70,30,.6)',
            }}>
              — R &amp; A · MMXXIV → MMXXVI · 25 MAY 2026 —
            </div>
          </footer>
        </div>
      </div>

      <style>{`
        @keyframes app-fade-in { from{opacity:0} to{opacity:1} }
      `}</style>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
