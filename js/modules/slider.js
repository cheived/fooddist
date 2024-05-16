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

export default slider;