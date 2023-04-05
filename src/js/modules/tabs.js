const tabs = (headerSelector, tabSelector, contentSelector, activeClass, display = 'block') => {
    const header = document.querySelector(headerSelector),
        tab = document.querySelectorAll(tabSelector),
        content = document.querySelectorAll(contentSelector);

    function hideTabContent() {
        content.forEach(item => item.style.display = 'none');

        tab.forEach(item => item.classList.remove(activeClass));
    }

    function showTabContent(n = 0) {
        content[n].style.display = display;

        tab[n].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();

    header.addEventListener('click', (e) => {
        const currElement = e.target;
        const _tabClass = tabSelector.replace(/\./, '');

        if (currElement && (currElement.classList.contains(_tabClass) || currElement.parentNode.classList.contains(_tabClass))) {
            tab.forEach((item, i) => {
                if (currElement === item || currElement.parentNode === item) {
                    hideTabContent();
                    showTabContent(i);
                }
            })
        }
    });
}

export default tabs;