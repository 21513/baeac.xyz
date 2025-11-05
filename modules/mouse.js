export let mouseHorizontal = 0;
export let mouseVertical = 0;

export let scrollAmount = 0;

export function mouseLocation(event) {
    const root = document.documentElement;

    root.style.setProperty('--x', event.clientX + 'px');
    root.style.setProperty('--y', event.clientY + 'px');

    mouseHorizontal = (event.clientX / window.innerWidth) * 2 - 1;
    mouseVertical = (event.clientY / window.innerHeight) * 2 + 1;
}

export function scrollLocation(event) {
    const root = document.documentElement;

    root.style.setProperty('--verticalScroll', window.scrollY + 'px');

    scrollAmount = window.scrollY;
}