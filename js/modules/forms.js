import { openModal, closeModal } from './modal'

function forms() {
    const forms = document.querySelectorAll('form');
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Всё хорошо',
        failure: 'Что-то пошло не так'
    }

    forms.forEach(item => {
        bindPostData(item);
    });


    const postData = async function (url, data) {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });
        return await res.json();
    }



    function bindPostData(form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            // const request = new XMLHttpRequest();
            // request.open('POST', 'server.php');
            // request.setRequestHeader('Content-type', 'application/json');

            const formData = new FormData(form);

            const object = {};
            formData.forEach((value, key) => {
                object[key] = value;
            });
            // request.send();
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
                // .then(request => request.text())
                // .then(result => result.json())
                .then((request) => {
                    console.log(request);
                    showMessage(message.success);
                    statusMessage.remove();
                })
                .catch(() => {
                    showMessage(message.failure);
                })
                .finally(() => {
                    form.reset();
                })


            // request.addEventListener('load', () => {
            //     if (request.status === 200) {
            //         console.log(request.response);
            //         showMessage(message.success);
            //         form.reset();
            //         statusMessage.remove();
            //     } else {
            //         
            //     }

            // })
        });
    }

    function showMessage(msg) {
        const message = document.createElement('div');
        const messagePrev = document.querySelector('.modal__dialog');

        messagePrev.classList.add('hide');
        openModal(message);
        message.classList.add('modal__dialog');
        message.innerHTML = `
                <div class="modal__content">

                        <div data-close class="modal__close">&times;</div>
                        <div class="modal__title">${msg}</div>

                </div>
    `

        document.querySelector('.modal').append(message);
        console.log(messagePrev.style.display);

        setTimeout(() => {
            message.remove();
            messagePrev.classList.add('show');
            messagePrev.classList.remove('hide');
            closeModal(document.querySelector('.modal'));
        }, 4000);
    }

    // function openGreetingsModal(msg) {
    //     const lastModal = document.querySelector('.modal__dialog');
    //     const newModal = document.createElement('div');

    //     // lastModal.classList.remove('show');
    //     lastModal.classList.add('hide');
    //     openModal();
    //     newModal.classList.add('modal__dialog');
    //     newModal.innerHTML = `
    //     <div class="modal__content">
    //                 <div data-close class="modal__close">&times;</div>
    //                 <div class="modal__title">${msg}</div>  
    //                 </div>     
    //     `

    //     document.querySelector('.modal').append(newModal);

    //     setTimeout(() => {
    //         closeModal();
    //         lastModal.classList.add('show');
    //         lastModal.classList.remove('hide');
    //         newModal.remove();

    //     }, 4000);
    // }
}

export default forms;