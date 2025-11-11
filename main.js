import { setupThreeJS } from './modules/index.three.js';
import { mouseLocation, scrollLocation, socialsFollowScroll } from './modules/mouse.js';
import { scrollToTop } from './modules/navigation.js';

document.addEventListener('DOMContentLoaded', setupThreeJS);

document.addEventListener('mousemove', mouseLocation);

document.addEventListener('scroll', scrollLocation);
document.addEventListener('scroll', socialsFollowScroll);

const logo = document.getElementById('scroll_button');
logo.addEventListener('click', scrollToTop);

document.addEventListener('scroll', () => {
    const scrollToTopButton = document.getElementById('scroll_button');
    const windowHeight = window.innerHeight;

    if (window.scrollY > (windowHeight / 3)) {
        scrollToTopButton.style.opacity = '1';
        scrollToTopButton.style.pointerEvents = 'auto';
    } else {
        scrollToTopButton.style.opacity = '0';
        scrollToTopButton.style.pointerEvents = 'none';
    }
});