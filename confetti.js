// Confetti — a controlled burst of paper-petal confetti
window.fireConfetti = function fireConfetti(opts = {}) {
  const x = opts.x ?? window.innerWidth / 2;
  const y = opts.y ?? window.innerHeight / 2;
  const count = opts.count || 80;
  const colors = opts.colors || ['#c75e4e', '#e3a25b', '#f4c95a', '#8aa169', '#fdfaf2', '#d98a72', '#b13e2a'];
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    const size = 6 + Math.random() * 10;
    const ang = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.4;
    const v = 200 + Math.random() * 500;
    const dx = Math.cos(ang) * v;
    const dy = Math.sin(ang) * v;
    const rotEnd = Math.random() * 1440;
    el.style.cssText = `
      position: fixed; left: ${x}px; top: ${y}px;
      width: ${size * 1.5}px; height: ${size}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      border-radius: ${['50% 0 50% 50%','0 50% 50% 50%','50% 50% 0 50%','12% 88% 12% 88% / 88% 12% 88% 12%'][Math.floor(Math.random() * 4)]};
      transform: translate(-50%,-50%) rotate(${Math.random() * 360}deg);
      opacity: .95; pointer-events: none; z-index: 9999;
      transition: transform 2.4s cubic-bezier(.2,.7,.3,1), opacity 2.4s ease;
      filter: blur(.3px);
      will-change: transform, opacity;
    `;
    document.body.appendChild(el);
    requestAnimationFrame(() => {
      el.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy + 800}px)) rotate(${rotEnd}deg)`;
      el.style.opacity = '0';
    });
    setTimeout(() => el.remove(), 2500);
  }
};
