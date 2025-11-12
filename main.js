import { setupThreeJS } from './modules/index.three.js';
import { mouseLocation, scrollLocation, scrollSocialsCard } from './modules/mouse.js';
import { scrollToTop, toggleScrollButton, toggleViewerMessage } from './modules/navigation.js';

document.addEventListener('DOMContentLoaded', setupThreeJS);

document.addEventListener('mousemove', mouseLocation);

document.addEventListener('scroll', scrollLocation);
document.addEventListener('scroll', scrollSocialsCard);
document.addEventListener('scroll', toggleScrollButton);
document.addEventListener('scroll', toggleViewerMessage);

const scrollButton = document.getElementById('scroll_button');
scrollButton.addEventListener('click', scrollToTop);