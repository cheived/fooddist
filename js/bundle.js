/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");


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
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)(message);
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
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)(document.querySelector('.modal'));
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/menu.js":
/*!****************************!*\
  !*** ./js/modules/menu.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function menu() {
    class menu {
        constructor(img, alt, title, descr, price, parent, ...classes) {
            this.img = img;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parent);
            this.classes = classes;
        }

        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                element.classList.add('menu__item')
            } else {
                this.classes.forEach(elem => element.classList.add(elem));
            }
            element.innerHTML = `
                    <img src=${this.img} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                    </div>
            `;
            this.parent.append(element);
        }
    }

    const getResource = async function (url) {
        const res = await fetch(url)

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getResource('http://localhost:3000/menu')
        .then((data) => {
            data.forEach(({ img, altimg, title, descr, price }) => {
                console.log(new menu(img, altimg, title, descr, price, ".menu .container"));
                new menu(img, altimg, title, descr, price, ".menu .container").render()
            });
        })

    // getResource('http://localhost:3000/menu')
    //     .then(data => createCard(data));

    // function createCard(data) {
    //     data.forEach(({ img, altimg, title, descr, price }) => {
    //         const element = document.createElement('div');
    //         element.classList.add('menu__item');
    //         element.innerHTML = `<img src=${img} alt=${altimg}>
    //         <h3 class="menu__item-subtitle">${title}</h3>
    //         <div class="menu__item-descr">${descr}</div>
    //         <div class="menu__item-divider"></div>
    //         <div class="menu__item-price">
    //             <div class="menu__item-cost">Цена:</div>
    //             <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //         </div>`
    //         document.querySelector('.menu .container').append(element);
    //     });
    // }

    // new menu(
    //     "img/tabs/vegy.jpg",
    //     "vegy",
    //     'Меню "Фитнес"',
    //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    //     229,
    //     '.menu .container').render();

    // new menu(
    //     "img/tabs/post.jpg",
    //     "post",
    //     'Меню "Постное"',
    //     'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    //     430,
    //     '.menu .container').render();

    // new menu(
    //     "img/tabs/elite.jpg",
    //     "elite",
    //     'Меню “Премиум”',
    //     'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан! без похода в ресторан!',
    //     550,
    //     '.menu .container').render();

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (menu);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeModal: () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   openModal: () => (/* binding */ openModal)
/* harmony export */ });

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


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider() {

    function plusZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }
    const wrapper = document.querySelector('.offer__slider-wrapper'),
        slides = document.querySelectorAll('.offer__slide'),
        inner = document.querySelector('.offer__slider-inner'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        current = document.querySelector('#current'),
        total = document.querySelector('#total'),
        slider = document.querySelector('.offer__slider'),
        widthWrapper = +((window.getComputedStyle(wrapper).width).slice(0, window.getComputedStyle(wrapper).width.length - 2));

    inner.style.display = 'flex';
    inner.style.width = 100 * slides.length + '%';
    const widthInner = +((window.getComputedStyle(inner).width).slice(0, window.getComputedStyle(inner).width.length - 2));

    inner.style.transition = '0.5s all'
    wrapper.style.overflow = 'hidden';

    slides.forEach((item) => {
        item.style.width = widthWrapper;
    });
    current.textContent = plusZero(1);
    total.textContent = plusZero(slides.length);
    let offset = 0;
    let currentSlide = 1;

    next.addEventListener('click', () => {
        offset += widthWrapper;
        if (offset == widthInner) {
            offset = 0;
            currentSlide = 1;
        } else {
            currentSlide++
        }
        current.textContent = plusZero(currentSlide);
        inner.style.transform = `translateX(-${offset}px)`;
        dots.forEach(item => item.style.opacity = '0.5');
        dots[currentSlide - 1].style.opacity = '1';
    });

    prev.addEventListener('click', () => {
        offset -= widthWrapper;
        if (offset < 0) {
            offset = widthInner - widthWrapper;
            currentSlide = slides.length;
        } else {
            currentSlide--
        }
        current.textContent = plusZero(currentSlide);
        inner.style.transform = `translateX(-${offset}px)`
        dots.forEach(item => item.style.opacity = '0.5');
        dots[currentSlide - 1].style.opacity = '1';
    });

    const dots = [];

    slider.style.position = 'relative';
    const nav = document.createElement('ol');
    nav.classList.add('carousel-indicators');
    nav.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
    `;
    slider.append(nav);


    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.style.cssText = `
        box-sizing: content-box;
        flex: 0 1 auto;
        width: 30px;
        height: 6px;
        margin-right: 3px;
        margin-left: 3px;
        cursor: pointer;
        background-color: #fff;
        background-clip: padding-box;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        opacity: .5;
        transition: opacity .6s ease;
        `;
        if (i === 0) {
            dot.style.opacity = '1';
        }
        nav.append(dot);
        dots.push(dot);
    }

    slider.addEventListener('click', (event) => {
        if (event.target.tagName == 'LI') {
            for (let i = 0; i < dots.length; i++) {
                if (event.target == dots[i]) {
                    const width = widthWrapper * i;
                    offset = width;
                    inner.style.transform = `translateX(-${offset}px)`;

                    dots.forEach(item => item.style.opacity = '0.5');
                    dots[i].style.opacity = '1';
                    currentSlide = i + 1;
                    current.textContent = plusZero(currentSlide);
                }
            }
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs() {

    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent(0);

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains("tabheader__item")) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer() {
    const date = new Date()
    const deadLine = `${date.getFullYear()}-${date.getMonth() + 3}-${date.getDay()}`;

    function DateCalculating(end) {
        const date = Date.parse(end) - Date.parse(new Date()),
            day = Math.floor(date / (1000 * 60 * 60 * 24)),
            hour = Math.floor(date / (1000 * 60 * 60) % 24),
            minute = Math.floor(date / (1000 * 60) % 60),
            second = Math.floor(date / 1000 % 60);

        return {
            date: date,
            day: day,
            hour: hour,
            minute: minute,
            second: second
        }
    }

    function plusZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }


    function insertCountdown(result) {
        const days = document.querySelector('#days'),
            hours = document.querySelector('#hours'),
            minutes = document.querySelector('#minutes'),
            seconds = document.querySelector('#seconds');

        if (result.date <= 0) {
            days.innerHTML = '00';
            hours.innerHTML = '00';
            minutes.innerHTML = '00';
            seconds.innerHTML = '00';
        } else {
            days.innerHTML = plusZero(result.day);
            hours.innerHTML = plusZero(result.hour);
            minutes.innerHTML = plusZero(result.minute);
            seconds.innerHTML = plusZero(result.second);
        }
    }
    insertCountdown(DateCalculating(deadLine));
    const interval = setInterval(function () {
        stopCounting(DateCalculating);
        insertCountdown(DateCalculating(deadLine));
    }, 1000);

    function stopCounting(result) {
        if (result.date <= 0) {
            clearInterval(interval);
        }
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_menu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/menu */ "./js/modules/menu.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");







window.addEventListener('DOMContentLoaded', () => {



    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_0__["default"])();
    (0,_modules_menu__WEBPACK_IMPORTED_MODULE_2__["default"])();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_1__["default"])();
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__["default"])();
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__["default"])();
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_5__["default"])();
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])();

});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map