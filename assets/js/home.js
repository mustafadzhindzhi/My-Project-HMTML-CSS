/*Home Page*/ 

document.addEventListener('DOMContentLoaded', function () {
    let mySwiper;

    function initializeSwiper() {
        mySwiper = new Swiper('.swiper-container', {
            direction: 'horizontal',
            loop: true,
            slidesPerView: 1,
            spaceBetween: 0,
            effect: 'slide',
            speed: 1000, 
            autoplay: {
                delay: 5000, 
            },
        });
    }

    initializeSwiper(); 

    // Pause autoplay on mouseover
    mySwiper.el.addEventListener('mouseover', function () {
        mySwiper.autoplay.stop();
    });

    // Restart autoplay on mouseout
    mySwiper.el.addEventListener('mouseout', function () {
        mySwiper.autoplay.start();
    });
});
