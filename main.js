import { setupThreeJS } from './modules/index.three.js';
import { mouseLocation, scrollAmount, scrollLocation, mouseHorizontal, mouseVertical } from './modules/mouse.js';
import { scrollToTop } from './modules/navigation.js';

document.addEventListener('DOMContentLoaded', setupThreeJS);

document.addEventListener('mousemove', mouseLocation);
document.addEventListener('scroll', scrollLocation);

const logo = document.getElementById('logo_button');
logo.addEventListener('click', scrollToTop);

document.addEventListener('scroll', () => {
    const socialsCard = document.getElementById('socials_card');

    const navigationHeight = document.getElementById('top_navigation').clientHeight;
    const canvasHeight = document.getElementById('three_js').clientHeight;
    const totalHeight = document.body.clientHeight;
    const socialsCardHeight = socialsCard.clientHeight;

    const socialsScrollHeight = canvasHeight + navigationHeight - ((totalHeight / 2) - (socialsCardHeight / 2));

    let scrollScale = 1.1 - ((scrollAmount / socialsScrollHeight) * 0.1);

    if (scrollAmount < socialsScrollHeight) {
        socialsCard.style.position = 'fixed';
        socialsCard.style.top = '50%';
        socialsCard.style.transform = 'translateY(-50%)';
        socialsCard.style.scale = scrollScale;
    } else {
        socialsCard.style.position = 'inherit';
        socialsCard.style.top = 'initial';
        socialsCard.style.transform = 'none';
    }
});