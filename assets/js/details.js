document.addEventListener('DOMContentLoaded', function () {
    console.log('Swiper initialization code executed');
    var mySwiper = new Swiper('.swiper-container', {
        direction: 'vertical', 
        loop: true, 
        slidesPerView: 1,
        spaceBetween: 10, 
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
  });