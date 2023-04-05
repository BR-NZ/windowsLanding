import { closeModals } from "./modals";
import checkNumInputs from "./checkNumInputs";

const forms = (state) => {
    const formList = document.querySelectorAll('form');
    const inputList = document.querySelectorAll('input');

    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Мы с вами свяжемся.',
        failure: 'Что-то пошло не так :('
    };

    checkNumInputs('input[name="user_phone"]');
    checkNumInputs('#width');
    checkNumInputs('#height');

    const clearInputs = (list) => {
        list.forEach(item => item.value = '');
    }

    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;

        const res = await fetch(url, {
            method: 'POST',
            body: data
        })

        return await res.text();
    }

    formList.forEach(form => {
        form.addEventListener('submit', e => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            form.append(statusMessage);

            const formData = new FormData(form);

            if(form.getAttribute('data-calc') === 'end') {
                for(let key in state) {
                    formData.append(key, state[key]);
                }
            }

            postData('assets/server.php', formData)
                .then(res => {
                    console.log(res);
                    statusMessage.textContent = message.success;
                })
                .catch(() => {
                    statusMessage.textContent = message.failure;
                })
                .finally(() => {
                    for(let key in state) {
                        state[key] = '';
                    }
                    clearInputs(inputList);
                    setTimeout(() => {
                        statusMessage.remove();
                        closeModals('[data-modal]');
                    }, 3000);
                });
        })
    })
}

export default forms;