const checkNumInputs = (selector) => {
    const inputNumList = document.querySelectorAll(selector);

    inputNumList.forEach(input => {
        input.addEventListener('input', () => {
            input.value = input.value.replace(/\D/, '');
        })
    })
}

export default checkNumInputs;