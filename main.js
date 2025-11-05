import { setupThreeJS } from './modules/index.three.js';
import { mouseLocation, scrollLocation } from './modules/mouse.js';
import { scrollToTop } from './modules/navigation.js';

document.addEventListener('DOMContentLoaded', setupThreeJS);

document.addEventListener('mousemove', mouseLocation);
document.addEventListener('scroll', scrollLocation);

// scrollToTop
const logo = document.getElementById('logo_button');
logo.addEventListener('click', scrollToTop);

// Navigation buttons
const portfolioLocation = './portfolio';
const projectsLocation = './projects';
const codingLocation = './coding';
const photographyLocation = './photography';
const contactLocation = './contact';

const portfolioButton = document.getElementById('portfolio_button');
const projectsButton = document.getElementById('projects_button');
const codingButton = document.getElementById('coding_button');
const photographyButton = document.getElementById('photography_button');
const contactButton = document.getElementById('contact_button');

portfolioButton.addEventListener('click', () => {window.location.href = portfolioLocation;});
projectsButton.addEventListener('click', () => {window.location.href = projectsLocation;});
codingButton.addEventListener('click', () => {window.location.href = codingLocation;});
photographyButton.addEventListener('click', () => {window.location.href = photographyLocation;});
contactButton.addEventListener('click', () => {window.location.href = contactLocation;});