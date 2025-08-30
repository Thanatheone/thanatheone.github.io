async function typewrite(text, {target = document, delay = 150, loop = false} = {}) {
    const set = val => (target === document ? (document.title = val) : (target.textContent = val));

    do {
        set('');                     // start blank
        for (let i = 0; i < text.length; i++) {
            set((target === document ? document.title : '') + text.slice(0, i + 1));
            await sleep(delay);
        }
        // optional pause before looping again
        if (loop) await sleep(800);
    } while (loop);
}

// Usage:
typewrite("Thana's Portfolio", {delay: 120, loop: true});
