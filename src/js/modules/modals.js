const modals = (state) => {
    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
        const trigger = document.querySelectorAll(triggerSelector);
        const modal = document.querySelector(modalSelector);
        const close = document.querySelector(closeSelector);
        const scrollWidth = calcScroll();
        
        const incompleteMessage = document.createElement('p');
        incompleteMessage.classList.add('status');
        incompleteMessage.textContent = 'Пожалуйста, заполните все поля.';

        if (modal.getAttribute('data-valid')) {
            modal.validInputs = modal.getAttribute('data-valid').split(' ');
        }

        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) e.preventDefault();
                let isComplete = true;

                if (modal.validInputs) {
                    modal.validInputs.forEach(item => {
                        if (!state[item]) isComplete = false;
                    });
                }

                if (isComplete) {
                    closeModals('[data-modal]');
                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                    document.body.style.marginRight = scrollWidth + 'px';
                } else {
                    item.insertAdjacentElement('afterend', incompleteMessage);
                }
            });
        })

        close.addEventListener('click', (e) => {
            closeModals('[data-modal]');

            modal.style.display = 'none';
            document.body.style.overflow = '';
            document.body.style.marginRight = '';
        })

        modal.addEventListener('click', (e) => {
            if (e.target === modal && closeClickOverlay) {
                closeModals('[data-modal]');

                modal.style.display = 'none';
                document.body.style.overflow = '';
                document.body.style.marginRight = '';
            }
        });
    }

    function showModalByTime(selector, time) {
        const timer = setTimeout(() => {
            document.querySelector(selector).style.display = 'block';
            document.body.style.overflow = 'hidden';
        }, time)
    }

    function calcScroll() {
        const scrollBox = document.createElement('div');
        scrollBox.style.cssText = 'width: 10px; height: 10px; overflow-y: scroll; visibility: hidden;';
        document.body.append(scrollBox);

        const scrollWidth = scrollBox.offsetWidth - scrollBox.clientWidth;
        scrollBox.remove();

        return scrollWidth;
    }

    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
    bindModal('.phone_link', '.popup', '.popup .popup_close');
    bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
    bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
    bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);

    showModalByTime('.popup', 60000);
}

function closeModals(selector) {
    const modals = document.querySelectorAll(selector);
    modals.forEach(item => {
        item.style.display = 'none';
    });
    document.body.style.overflow = '';
}

export default modals;
export { closeModals };