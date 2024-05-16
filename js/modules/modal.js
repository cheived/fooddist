
//Функция открытия модального окна
function openModal(object, listener) {
    object.style.display = 'block';
    document.body.style.overflow = 'hidden';
    window.removeEventListener('scroll', listener);
}


//Функция закрытия модального окна
function closeModal(object) {
    object.style.display = 'none';
    document.body.style.overflow = '';
}


function modal() {

    const modalBtn = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');

    //Открытие модального окна по кнопке
    modalBtn.forEach((item) => {
        item.addEventListener('click', () => openModal(modal, showModalByScroll));
    });

    //Закрытие по клику мимо модального окна
    modal.addEventListener('click', (event) => {
        if (event.target === modal || event.target.getAttribute('data-close') == '') {
            closeModal(modal)
        }
    });
    //Закрытие по нажатию Esc
    document.addEventListener('keydown', event => {
        if (event.code === 'Escape' && modal.style.display === 'block') {
            closeModal(modal);
        }
    });
    //Открытие по скроллу до конца страницы
    function showModalByScroll() {
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modal, showModalByScroll);
            clearTimeout(timerModal);
        }
    }
    window.addEventListener('scroll', showModalByScroll);
    //Открытие модального окна через 5 секунд
    const timerModal = setTimeout(() => openModal(modal), 5000);

}


export default modal;
export { openModal, closeModal };