const forms = () => {
    const formList = document.querySelectorAll('form');
    const inputList = document.querySelectorAll('input');
    const inputPhoneList = document.querySelectorAll('input[name="user_phone"]');

    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Мы с вами свяжемся.',
        failure: 'Что-то пошло не так :('
    };

    inputPhoneList.forEach(input => {
        input.addEventListener('input', () => {
            input.value = input.value.replace(/\D/, '');
        })
    })

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

            postData('assets/server.php', formData)
                .then(res => {
                    console.log(res);
                    statusMessage.textContent = message.success;
                })
                .catch(() => {
                    statusMessage.textContent = message.failure;
                })
                .finally(() => {
                    clearInputs(inputList);
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 3000);
                });
        })
    })
}

export default forms;