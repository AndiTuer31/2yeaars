// Reveal — fades content in on scroll.
// Strategy: subscribe to a global controller that re-checks on scroll/resize,
// PLUS a per-element fallback that always reveals after a small delay (so a
// missed scroll event never leaves anything hidden).

(() => {
  if (window.__revealController) return;
  const subs = new Set();
  function check() {
    const vh = window.innerHeight;
    for (const sub of subs) {
      if (sub.seen) continue;
      const el = sub.el;
      if (!el) continue;
      let r = el.getBoundingClientRect();
      // Wrappers around absolutely-positioned content can collapse to height
      // 0. Fall back to the nearest section's rect so reveal still fires.
      if (r.height === 0) {
        const sec = el.closest('section') || el.parentElement;
        if (sec) r = sec.getBoundingClientRect();
      }
      if (r.top < vh && r.bottom > 0) {
        sub.seen = true;
        sub.cb();
      }
    }
  }
  let scheduled = false;
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => { scheduled = false; check(); });
  }
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  window.__revealController = {
    add(el, cb) {
      const sub = { el, cb, seen: false };
      subs.add(sub);
      schedule();
      // Periodic sweep — robust against missed scroll events / odd iframes.
      // Cleared once the sub has fired (seen=true).
      const iv = setInterval(() => { if (sub.seen) clearInterval(iv); else check(); }, 250);
      return () => { subs.delete(sub); clearInterval(iv); };
    },
    schedule,
  };
})();

function Reveal({ children, delay = 0, dir = 'up', distance = 40 }) {
  const ref = React.useRef(null);
  const [seen, setSeen] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Hard fallback: 2.5s after mount, reveal regardless. So nothing is ever
    // stuck invisible even if scroll/intersection never fires.
    const fallback = setTimeout(() => setSeen(true), 2500);
    const off = window.__revealController.add(el, () => {
      clearTimeout(fallback);
      setSeen(true);
    });
    return () => { off(); clearTimeout(fallback); };
  }, []);
  const offset = {
    up: `translateY(${distance}px)`,
    down: `translateY(-${distance}px)`,
    left: `translateX(${distance}px)`,
    right: `translateX(-${distance}px)`,
    none: 'none',
  }[dir];
  return (
    <div ref={ref} style={{
      opacity: seen ? 1 : 0,
      transform: seen ? 'none' : offset,
      transition: `opacity .9s cubic-bezier(.2,.7,.3,1) ${delay}s, transform 1s cubic-bezier(.2,.7,.3,1) ${delay}s`,
      willChange: 'opacity, transform',
    }}>
      {children}
    </div>
  );
}
window.Reveal = Reveal;

// Parallax helper
function Parallax({ children, speed = 0.2, style }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0, target = 0, current = 0;
    function loop() {
      const r = el.getBoundingClientRect();
      const center = r.top + r.height / 2 - window.innerHeight / 2;
      target = center * speed;
      current += (target - current) * 0.12;
      el.style.transform = `translateY(${current.toFixed(2)}px)`;
      raf = requestAnimationFrame(loop);
    }
    loop();
    return () => cancelAnimationFrame(raf);
  }, [speed]);
  return <div ref={ref} style={{ willChange: 'transform', ...style }}>{children}</div>;
}
window.Parallax = Parallax;
