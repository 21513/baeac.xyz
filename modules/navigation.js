export function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function toggleScrollButton() {
    const scrollToTopButton = document.getElementById('scroll_button');
    const windowHeight = window.innerHeight;

    if (window.scrollY > (windowHeight / 3)) {
        scrollToTopButton.style.opacity = '1';
        scrollToTopButton.style.pointerEvents = 'auto';
    } else {
        scrollToTopButton.style.opacity = '0';
        scrollToTopButton.style.pointerEvents = 'none';
    }
}