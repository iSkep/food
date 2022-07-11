import {getZero} from './timer';

function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {

    // slider v.1

    // const slides = document.querySelectorAll('.offer__slide');
    // const sliderLeftArrow = document.querySelector('.offer__slider-prev');
    // const sliderRightArrow = document.querySelector('.offer__slider-next');
    // const slideTotal = document.querySelector('#total');
    // const slideCurrent = document.querySelector('#current');

    // let slideIndex = 0;

    // slideTotal.innerHTML = getZero(slides.length);

    // function showSlide () {
    //     slides.forEach(slide => slide.classList.add('hide'));
    //     slides[slideIndex].classList.remove('hide');

    //     slideCurrent.innerHTML = getZero(slideIndex + 1);
    // }

    // showSlide();

    // sliderLeftArrow.addEventListener('click', () => {
    //     if (slideIndex == 0) {
    //         slideIndex = slides.length - 1;
    //     } else {
    //         slideIndex--;
    //     }

    //     showSlide();
    // });

    // sliderRightArrow.addEventListener('click', () => {
    //     if (slideIndex >= slides.length - 1) {
    //         slideIndex = 0;
    //     } else {
    //         slideIndex++;
    //     }

    //     showSlide();
    // });


    // slider v.2

    const slides = document.querySelectorAll(slide);
    const slider = document.querySelector(container);
    const sliderLeftArrow = document.querySelector(prevArrow);
    const sliderRightArrow = document.querySelector(nextArrow);
    const slideTotal = document.querySelector(totalCounter);
    const slideCurrent = document.querySelector(currentCounter);
    const slidesWrapper = document.querySelector(wrapper);
    const slidesField = document.querySelector(field);
    const slidersWidth = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1;
    let slidesOffset = 0;

    slideTotal.innerHTML = getZero(slides.length);
    slideCurrent.innerHTML = getZero(slideIndex);

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => slide.style.width = slidersWidth);

    slider.style.position = 'relative';

    const indicators = document.createElement('ol');
    const dots = [];
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
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
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
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

        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    sliderRightArrow.addEventListener('click', () => {
        if (slidesOffset == (deleteNotDigits(slidersWidth) * (slides.length - 1))) {
            slidesOffset = 0;
        } else {
            slidesOffset += deleteNotDigits(slidersWidth);
        }

        slidesField.style.transform = `translateX(-${slidesOffset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        slideCurrent.innerHTML = getZero(slideIndex);

        changeDotsOpacity();
    });

    sliderLeftArrow.addEventListener('click', () => {
        if (slidesOffset == 0) {
            slidesOffset = deleteNotDigits(slidersWidth) * (slides.length - 1);
        } else {
            slidesOffset -= deleteNotDigits(slidersWidth);
        }

        slidesField.style.transform = `translateX(-${slidesOffset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        slideCurrent.innerHTML = getZero(slideIndex);

        changeDotsOpacity();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            slidesOffset = deleteNotDigits(slidersWidth) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${slidesOffset}px)`;

            slideCurrent.innerHTML = getZero(slideIndex);

            changeDotsOpacity();
        });
    });

    function changeDotsOpacity() {
        dots.forEach(dot => dot.style.opacity = '0.5');
        dots[slideIndex - 1].style.opacity = '1';
    }

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }
}

export default slider;