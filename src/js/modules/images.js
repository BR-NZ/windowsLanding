const images = () => {
    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.style.justifyContent = 'center';
    popup.style.alignItems = 'center';
    popup.style.display = 'none';

    const bigImg = document.createElement('img');
    bigImg.style.maxWidth = '70vh';
    bigImg.style.maxHeight = '70vh';
    popup.append(bigImg);

    const eventArea = document.querySelector('.works');
    eventArea.append(popup);

    eventArea.addEventListener('click', (e) => {
        e.preventDefault();
        // проверка что элемент поддерживает данное событие
        if(e.target) {
            if(e.target.classList.contains('preview')) {
                popup.style.display = 'flex';
                bigImg.src = e.target.parentNode.getAttribute('href');
                document.body.style.overflow = 'hidden';
            }
            if(e.target.matches('div.popup')) {
                popup.style.display = 'none';
                document.body.style.overflow = '';
            }
        }
    })
};

export default images;