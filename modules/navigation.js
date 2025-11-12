export function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function toggleScrollButton() {
    const scrollToTopButton = document.getElementById('scroll_button');
    const windowHeight = window.innerHeight;

    const totalHeight = document.documentElement.scrollHeight;
    const footerHeight = document.getElementById('footer').clientHeight - 8;

    if (window.scrollY < (windowHeight / 3)) {
        scrollToTopButton.style.opacity = '0';
        scrollToTopButton.style.pointerEvents = 'none';
        scrollToTopButton.style.transform = 'none';
    } else if(window.scrollY >= (windowHeight / 3) && window.scrollY < (totalHeight - windowHeight - 100)) {
        scrollToTopButton.style.opacity = '1';
        scrollToTopButton.style.pointerEvents = 'auto';
        scrollToTopButton.style.transform = 'none';
    } else {
        scrollToTopButton.style.opacity = '1';
        scrollToTopButton.style.pointerEvents = 'auto';
        if (document.body.clientWidth < 1024) {
            scrollToTopButton.style.transform = `translateY(-${footerHeight}px)`;
        }
    }
}

export function toggleViewerMessage() {
    const viewerHello = document.querySelector('.viewerGreeting');
    const viewerScroll = document.querySelector('.viewerScroll');
    
    if (window.scrollY > 160) {
        viewerScroll.style.display = 'grid';
        viewerHello.style.display = 'none';
    } else {
        viewerScroll.style.display = 'none';
        viewerHello.style.display = 'grid';
    }
}