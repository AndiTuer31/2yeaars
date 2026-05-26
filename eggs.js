// Easter-egg system + global helpers
// ── Petal burst (click on flowers, click on title) ─────────────────────────
function burstAt(x, y, opts = {}) {
  const count = opts.count || 18;
  const colors = opts.colors || ['#c75e4e', '#e3a25b', '#f4c95a', '#8aa169', '#fdfaf2', '#d98a72'];
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    const size = 6 + Math.random() * 10;
    const ang = (Math.PI * 2 * i) / count + (Math.random() - .5) * .6;
    const dist = 80 + Math.random() * 140;
    const dx = Math.cos(ang) * dist;
    const dy = Math.sin(ang) * dist + 40; // bias downward (gravity feel)
    el.style.cssText = `
      position:fixed; left:${x}px; top:${y}px; width:${size * 1.6}px; height:${size}px;
      background:${colors[Math.floor(Math.random() * colors.length)]};
      border-radius:${['50% 0 50% 50%', '0 50% 50% 50%', '50% 50% 0 50%'][i % 3]};
      pointer-events:none; z-index:9999; opacity:.95;
      transform:translate(-50%,-50%) rotate(${Math.random() * 360}deg);
      transition:transform 1.6s cubic-bezier(.2,.7,.3,1), opacity 1.6s ease;
      filter:blur(.4px);
    `;
    document.body.appendChild(el);
    requestAnimationFrame(() => {
      el.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) rotate(${Math.random() * 720}deg)`;
      el.style.opacity = '0';
    });
    setTimeout(() => el.remove(), 1700);
  }
}

window.burstAt = burstAt;

// ── Tiny corner toast ─────────────────────────────────────────────────────
function showToast(message, opts = {}) {
  const t = document.createElement('div');
  t.style.cssText = `
    position:fixed; bottom:28px; left:50%; transform:translateX(-50%) translateY(20px);
    background:#3a2415; color:#fbf3e0; padding:14px 22px;
    font-family:"Caveat", cursive; font-size:22px; line-height:1.2;
    border-radius:10px; box-shadow:0 18px 40px rgba(0,0,0,.4);
    opacity:0; transition:opacity .35s ease, transform .45s cubic-bezier(.2,.7,.3,1);
    z-index:9998; max-width:80vw; text-align:center;
  `;
  t.textContent = message;
  document.body.appendChild(t);
  requestAnimationFrame(() => {
    t.style.opacity = '1';
    t.style.transform = 'translateX(-50%) translateY(0)';
  });
  setTimeout(() => {
    t.style.opacity = '0';
    t.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => t.remove(), 500);
  }, opts.duration || 2400);
}
window.showToast = showToast;

// ── ANA-typing detector ───────────────────────────────────────────────────
(() => {
  if (window.__anaDetectorInstalled) return;
  window.__anaDetectorInstalled = true;
  let buf = '';
  window.addEventListener('keydown', (e) => {
    if (e.key.length !== 1) return;
    buf = (buf + e.key.toLowerCase()).slice(-3);
    if (buf === 'ana') {
      buf = '';
      const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          burstAt(
            cx + (Math.random() - .5) * window.innerWidth * .6,
            cy + (Math.random() - .5) * window.innerHeight * .4,
            { count: 22 }
          );
        }, i * 120);
      }
      showToast('A · N · A  ♡  found one!', { duration: 2800 });
    }
  });
})();

// ── Egg counter (persists in memory, not localStorage) ────────────────────
window.__eggs = window.__eggs || new Set();
function foundEgg(name) {
  if (window.__eggs.has(name)) return false;
  window.__eggs.add(name);
  // Update the corner badge if it exists
  const badge = document.getElementById('egg-badge');
  if (badge) badge.textContent = `${window.__eggs.size} / 8 found`;
  return true;
}
window.foundEgg = foundEgg;
