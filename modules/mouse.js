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

export function scrollSocialsCard(event) {
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
}