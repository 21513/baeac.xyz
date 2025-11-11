document.addEventListener('DOMContentLoaded', () => {
    const themeToggleButton = document.getElementById('themeToggle');
    const bodyElement = document.body;

    const setDefaultTheme = () => {
        if (!localStorage.getItem('theme')) {
            localStorage.setItem('theme', 'themeDark');
            bodyElement.classList.add('themeDark');
        } else {
            bodyElement.classList.add(localStorage.getItem('theme'));
        }
    };

    setDefaultTheme();

    const updateIcon = () => {
        if (localStorage.getItem('theme') === 'themeDark') {
            themeToggleButton.innerHTML = '<img src="./assets/moon.svg" alt="">';
        } else {
            themeToggleButton.innerHTML = '<img src="./assets/sun.svg" alt="">';
        }
    };

    updateIcon();

    themeToggleButton.addEventListener('click', () => {
        if (localStorage.getItem('theme') === 'themeDark') {
            bodyElement.classList.remove('themeDark');
            bodyElement.classList.add('themeLight');
            localStorage.setItem('theme', 'themeLight');
        } else {
            bodyElement.classList.remove('themeLight');
            bodyElement.classList.add('themeDark');
            localStorage.setItem('theme', 'themeDark');
        }
        updateIcon();
    });


    // Marked
    const cardTexts = document.querySelectorAll(".articleContent[data-md]");

    cardTexts.forEach(cardText => {
    const mdFile = cardText.getAttribute("data-md");

    fetch(`md/${mdFile}`)
        .then(res => res.text())
        .then(markdown => {
        const html = marked.parse(markdown);
        
        // Create a temporary div to parse and modify the HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        
        // Remove h1, h5, and h6 elements from article content
        const h5Element = tempDiv.querySelector('h5');
        
        if (h5Element) h5Element.remove();
        
        // Set the modified content
        cardText.innerHTML = tempDiv.innerHTML;
        })
        .catch(err => console.error(`Error loading ${mdFile}:`, err));
    });

    // Extract h6 from markdown and add to article cards
    const articleCards = document.querySelectorAll('.articleCard[data-md]');
    
    articleCards.forEach(articleCard => {
        const mdFile = articleCard.getAttribute('data-md');
        
        fetch(`../articles/md/${mdFile}`)
            .then(res => res.text())
            .then(markdown => {
                // Parse the markdown to HTML
                const html = marked.parse(markdown);
                
                // Create a temporary div to parse the HTML
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = html;
                
                // Find the h1 (title), h5 (description), and h6 (date) elements
                const h1Element = tempDiv.querySelector('h1');
                const h5Element = tempDiv.querySelector('h5');
                const h6Element = tempDiv.querySelector('h6');
                
                // Create the articleInfo div dynamically
                const articleInfo = document.createElement('div');
                articleInfo.classList.add('articleInfo');
                
                // Add the title if h1 exists
                if (h1Element) {
                    const titleH3 = document.createElement('h3');
                    titleH3.textContent = h1Element.textContent;
                    articleInfo.appendChild(titleH3);
                }
                
                // Add the description if h5 exists
                if (h5Element) {
                    const descriptionP = document.createElement('p');
                    descriptionP.textContent = h5Element.textContent;
                    articleInfo.appendChild(descriptionP);
                }
                
                // Add the date if h6 exists
                if (h6Element) {
                    const dateP = document.createElement('p');
                    dateP.textContent = h6Element.textContent;
                    dateP.classList.add('articleDate');
                    articleInfo.appendChild(dateP);
                }
                
                // Append the articleInfo to the articleCard
                articleCard.appendChild(articleInfo);
            })
            .catch(err => console.error(`Error loading ${mdFile}:`, err));
    }); 
});
