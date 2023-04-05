const changeModalState = (state) => {
    const windowForm = document.querySelectorAll('.balcon_icons_img');
    const windowWidth = document.querySelectorAll('#width');
    const windowHeight = document.querySelectorAll('#height');
    const windowType = document.querySelectorAll('#view_type');
    const windowProfile = document.querySelectorAll('.checkbox');

    function bindActionOnElems(event, elems, prop) {
        elems.forEach((item, i) => {
            item.addEventListener(event, () => {
                switch(item.nodeName) {
                    case 'SPAN' : 
                        state[prop] = i;
                        break;
                    case 'INPUT' :
                        if(item.type === 'checkbox') {
                            state[prop] = (i === 0) ? 'Холодное' : 'Теплое';
                            elems.forEach((item, j) => {
                                item.checked = false;
                                if(i === j) item.checked = true;
                            })
                        } else {
                            state[prop] = item.value;
                        }
                        break;
                    case 'SELECT' :
                        state[prop] = item.value;
                        break;
                }
                console.log(state);
            });
        })
    }

    bindActionOnElems('click', windowForm, 'form');
    bindActionOnElems('input', windowWidth, 'width');
    bindActionOnElems('input', windowHeight, 'height');
    bindActionOnElems('change', windowType, 'type');
    bindActionOnElems('change', windowProfile, 'profile');
}

export default changeModalState;