/**
 * Type‑writes a string into either the page title or any DOM element.
 *
 * @param {string} text                – The text you want to animate.
 * @param {Object} [options]           – Optional configuration.
 * @param {HTMLElement|Document} [options.target=document] – Where to write.
 * @param {number} [options.delay=150] – Milliseconds between keystrokes.
 * @param {boolean} [options.loop=false] – Whether to repeat forever.
 */
async function typewrite(text, { target = document, delay = 200, loop = false } = {}) {
    // Helper that writes either to document.title or to an element’s textContent
    const set = val =>
        target === document
            ? (document.title = val)
            : (target.textContent = val);

    do {
        set(''); // start with a blank slate

        // Type each character one by one
        for (let i = 0; i < text.length; i++) {
            // Build the substring up to the current index
            const partial = text.slice(0, i + 1);
            set(partial);
            await sleep(delay);
        }

        // If we’re looping, pause briefly before starting over
        if (loop) await sleep(1200);
    } while (loop);
}

/* --------------------------------------------------------------
   Helper: simple sleep/pause function (same as in your original code)
---------------------------------------------------------------- */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/* -------------------- Example usage --------------------------- */
// Loop the title forever, typing a bit faster than the default
typewrite("Thana's Portfolio", { delay: 150, loop: true });

/* --------------------------------------------------------------
   If you prefer to animate an element instead of the title,
   pass the element reference as `target`:

   const heading = document.querySelector('h1');
   typewrite('Hello world', { target: heading, delay: 100, loop: false });
---------------------------------------------------------------- */
