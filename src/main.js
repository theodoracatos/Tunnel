document.addEventListener('contextmenu', e => e.preventDefault());

// ── Loop ──────────────────────────────────────────────────────────────

window._freezeDraw = false;
function loop(ts) {
    const dt = Math.min((ts - prev) / 1000, 0.05);
    prev = ts;
    if (!window._freezeDraw) { update(dt); draw(); }
    requestAnimationFrame(loop);
}

titleScreen();
requestAnimationFrame(ts => { prev = ts; requestAnimationFrame(loop); });
