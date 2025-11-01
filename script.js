async function typewrite(
  text,
  { target = document, delay = 150, loop = false, deleteDelay = 75 } = {}
) {
  const set = (val) =>
    target === document ? (document.title = val) : (target.textContent = val);

  do {
    // Type forward
    for (let i = 0; i < text.length; i++) {
      set(text.slice(0, i + 1));
      await sleep(delay);
    }

    // Optional pause
    await sleep(1000);

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

typewrite("Thana's Portfolio", { delay: 120, loop: true });
