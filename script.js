async function typewrite(
  text,
  { target = document, delay = 200, loop = false } = {}
) {
  const set = (val) =>
    target === document ? (document.title = val) : (target.textContent = val);

  do {
    set('');
    for (let i = 0; i < text.length; i++) {
      set(text.slice(0, i + 1));
      await sleep(delay);
    }
    if (loop) await sleep(1200);
  } while (loop);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
typewrite("Thana's Portfolio", { delay: 150, loop: true });
