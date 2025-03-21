$(document).ready(function() {

    $('.fade').slick({
      dots: true,
      infinite: true,
      speed: 500,
      fade: true,
      slide: 'div',
      cssEase: 'linear',
      autoplay: true,
      autoplaySpeed: 2000
    });
});

let lastScrollY = window.scrollY;
const header = document.querySelector('.primary');

window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY) {
        // Scrolling down - hide header
        header.classList.add('hidden');
    } else {
        // Scrolling up - show header
        header.classList.remove('hidden');
    }
    lastScrollY = window.scrollY;
});
