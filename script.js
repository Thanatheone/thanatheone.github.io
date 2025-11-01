// --- Typewriter Effect ---
async function typewrite(
  text,
  { target = document.getElementById("typewriter"), delay = 120, loop = true, deleteDelay = 70 } = {}
) {
  const set = (val) => (target.textContent = val);

  do {
    // Type forward
    for (let i = 0; i < text.length; i++) {
      set(text.slice(0, i + 1));
      await sleep(delay);
    }

    await sleep(1200);

    // Delete backward (if looping)
    if (loop) {
      for (let i = text.length; i > 0; i--) {
        set(text.slice(0, i - 1));
        await sleep(deleteDelay);
      }
    }
  } while (loop);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

typewrite("Thana's Portfolio", { delay: 100, loop: true });

const leafColors = ['#d97706', '#f59e0b', '#92400e', '#fbbf24'];
for (let i = 0; i < 12; i++) {
  const leaf = document.createElement('div');
  leaf.classList.add('leaf');
  leaf.textContent = '🍂';
  leaf.style.left = `${Math.random() * 100}vw`;
  leaf.style.animationDuration = `${6 + Math.random() * 4}s`;
  leaf.style.fontSize = `${1 + Math.random()}rem`;
  leaf.style.color = leafColors[Math.floor(Math.random() * leafColors.length)];
  document.body.appendChild(leaf);
}
