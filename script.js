function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function typewriteTitle() {
    const str = "Thana's Portfolio"; // Replace with your title
    document.title = ''; // Start with an empty title

    for (let i = 0; i < str.length; i++) {
        document.title += str.charAt(i);
        await sleep(200); // Adjust the delay for typing speed (milliseconds)
    }
}

typewriteTitle();