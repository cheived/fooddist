function calc() {
    let height, weight, gender = 'female', age, activity = 1.375;


    function getData(parent) {
        const items = parent.childNodes;
        items.forEach((item) => {
            if (item.tagName == 'DIV' && item.classList.contains('calculating__choose-item_active')) {
                if (item.id == 'female' || item.id == 'male') {
                    gender = item.id;
                    localStorage.setItem('gender', item.id);
                } else {
                    activity = item.getAttribute('data-ratio');
                    localStorage.setItem('activity', item.getAttribute('data-ratio'));
                }
            }
        });
    }

    const buttons = document.querySelectorAll('.calculating__choose div');

    buttons.forEach((item) => {
        item.addEventListener('click', () => {
            item.parentNode.childNodes.forEach((items) => {
                if (items.tagName == 'DIV') {
                    items.classList.remove('calculating__choose-item_active');
                }
            });
            item.classList.add('calculating__choose-item_active');
            getData(item.parentNode);
            publicData();
        });


    });

    const inputs = document.querySelectorAll('.calculating__choose input');
    inputs.forEach((item) => {
        item.addEventListener('input', () => {
            if (item.value.match(/\D/g)) {
                item.style.border = '1px solid red';
            } else {
                item.style.border = 'none';

                switch (item.id) {
                    case 'height':
                        height = +item.value;
                        break;
                    case 'weight':
                        weight = +item.value;
                        break;
                    case 'age':
                        age = +item.value;
                        break;
                }
                publicData();
            }
        });
    })

    function publicData() {
        const res = document.querySelector('.calculating__result span')
        if (!height || !weight || !gender || !age || !activity) {
            res.textContent = '_____'
        } else {
            if (gender == 'female') {
                res.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * activity);
            } else {
                res.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * activity);
            }
        }
    }


    function localStorageGetData() {
        if (!localStorage.getItem('gender')) {
            localStorage.setItem('gender', 'female');
        }
        if (!localStorage.getItem('activity')) {
            localStorage.setItem('activity', 1.375);
        }
        gender = localStorage.getItem('gender');
        document.querySelectorAll('[data-ratio]').forEach((item) => {
            item.classList.remove('calculating__choose-item_active');
            if (+item.getAttribute('data-ratio') == +localStorage.getItem('activity')) {
                item.classList.add('calculating__choose-item_active');
            }
        });

        document.querySelector('#gender').childNodes.forEach(item => {
            if (item.tagName == 'DIV') {
                item.classList.remove('calculating__choose-item_active');
                if (item.id == localStorage.getItem('gender')) {
                    item.classList.add('calculating__choose-item_active');
                    activity = localStorage.getItem('activity');
                }
            }
        });
    }

    localStorageGetData();
    publicData();
}

export default calc;