const cards = document.querySelectorAll(".gallery-item");
let rippleEl = null;

for (let card of cards) {
  card.addEventListener("mousedown", (e) => {
    if (rippleEl) rippleEl.remove();

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    rippleEl = document.createElement("span");
    rippleEl.className = "ripple";

    // Maximum size needed to cover the card from click point
    const maxDim = Math.max(rect.width, rect.height);
    rippleEl.style.width = rippleEl.style.height = maxDim * 2 + "px";

    rippleEl.style.left = x - maxDim + "px";
    rippleEl.style.top = y - maxDim + "px";

    card.appendChild(rippleEl);

    // animate outward
    requestAnimationFrame(() => {
      rippleEl.style.transform = "scale(1)";
    });
  });

  // Remove ripple when released
  ["mouseup", "mouseleave"].forEach((evt) => {
    card.addEventListener(evt, () => {
      if (rippleEl) {
        rippleEl.style.opacity = "0";
        setTimeout(() => rippleEl?.remove(), 350);
      }
    });
  });
}
