window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.header__menu'),
        menuItem = document.querySelectorAll('.header__link'),
        burger = document.querySelector('.burger');

    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        menu.classList.toggle('active');
    });

    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            burger.classList.toggle('active');
            menu.classList.toggle('active');
        })
    })
})

$(document).ready(function () {
    $(function () {
        $('ul.tabs__caption').on('click', 'li:not(.active)', function () {
            $(this)
                .addClass('active').siblings().removeClass('active')
                .closest('div.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
        });
    });

    $(function () {
        $('ul.block__foto').on('click', 'li:not(.active)', function () {
            $(this)
                .addClass('active').siblings().removeClass('active')
                .closest('div.block__img').find('div.block__img-img').removeClass('active').eq($(this).index()).addClass('active');
        });
    });

    $('.slider__carousel').slick({
        infinite: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="assets/arr-left.jpg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="assets/arr-right.jpg"></button>',
    });

    $('.team__slider').slick({
        infinite: true,
        centerMode: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        prevArrow: '<button type="button" class="slick-prev"><img src="assets/arrow-l.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="assets/arrow-r.png"></button>',
        responsive: [{
                breakpoint: 768,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });

    $("a[href^='#']").click(function () {
        var _href = $(this).attr("href");
        $("html, body").animate({
            scrollTop: $(_href).offset().top + "px"
        });
        return false;
    });
});

document.getElementById('subscribe-form').addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    var notification = document.getElementById('notification');
    notification.style.display = 'block';

    setTimeout(function() {
        window.location.href = '/'; 
    }, 2000);
});