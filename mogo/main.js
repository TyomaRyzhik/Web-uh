document.addEventListener("DOMContentLoaded", () => {
    const modal = document.querySelector(".subscribe");
    const modalWindow = document.querySelector("#modal");
    const openButton = modal.querySelector("#openModal");
    const closeButton = modalWindow.querySelector(".close-button");
    const inputEmail = modal.querySelector(".subscribe__input");
    const modelOverlay = modalWindow.querySelector('.modal__overlay');
    const modalForm = modalWindow.querySelector("#modalForm");

    openButton.addEventListener("click", onOpenButtonClick);
    modalForm.addEventListener("submit", onModalFormSubmit);

    function onOpenButtonClick() {
        const email = inputEmail.value;
        if (email === "") {
            showErrorEmptyString();
        } else if (isValidEmail(email)) {
            openModalWindow();
        } else {
            showErrorIsNotValidEmail();
        }
    }

    function onCloseButtonClick() {
        closeModalWindow();
    }

    function onWindowOverlayClick(evt) {
        if (evt.target == modelOverlay) {
            closeModalWindow();
        }
    }

    function onKeyEscapeDown(evt) {
        if (evt.key === "Escape") {
            evt.preventDefault();
            closeModalWindow();
        }
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function closeModalWindow() {
        inputEmail.value = "";
        removeEventListenersModalWindow();
        modalWindow.classList.remove("show");
        modalWindow.classList.add("hide");

        // После завершения анимации скрываем окно
        modalWindow.addEventListener('animationend', function handleHide() {
            modalWindow.classList.add("modal-hidden");
            modalWindow.classList.remove("hide");
            modalWindow.removeEventListener('animationend', handleHide);
        });
    }

    function openModalWindow() {
        modalWindow.classList.remove("modal-hidden");
        modalWindow.classList.add("show");
        inputEmail.classList.remove("border-show-red");

        addEventListenersModalWindow();

        // Инициализация Cleave.js для телефона и карты
        new Cleave('#phone', {
            phone: true,
            phoneRegionCode: 'BY',
            delimiters: [' ', '(', ')', ' ', '-', '-'],
            blocks: [4, 2, 3, 2, 2]
        });

        new Cleave('#card', {
            creditCard: true,
            delimiters: ['-', '-', '-', '-'],
            blocks: [4, 4, 4, 4]
        });

        console.log('Email entered correctly');
    }

    function showErrorEmptyString() {
        inputEmail.placeholder = "Empty string";
        inputEmail.classList.add("border-show-red");

        console.log('Please enter an email');
    }

    function showErrorIsNotValidEmail() {
        inputEmail.classList.add("border-show-red");
        inputEmail.value = "";
        inputEmail.placeholder = "Enter valid email address";

        console.log('Invalid Email');
    }

    function addEventListenersModalWindow() {
        closeButton.addEventListener("click", onCloseButtonClick);
        document.addEventListener("keydown", onKeyEscapeDown);
        modelOverlay.addEventListener("click", onWindowOverlayClick);
    }

    function removeEventListenersModalWindow() {
        closeButton.removeEventListener("click", onCloseButtonClick);
        document.removeEventListener("keydown", onKeyEscapeDown);
        modelOverlay.removeEventListener("click", onWindowOverlayClick);
    }

    function onModalFormSubmit(event) {
        event.preventDefault(); // Предотвращаем отправку формы

        // Проверяем форму с помощью Parsley.js
        if ($(modalForm).parsley().isValid()) {
            // Показать уведомление об успешной отправке
            Swal.fire({
                icon: 'success',
                title: 'Form Submitted!',
                text: 'Your subscription has been received.',
                showConfirmButton: true,
            }).then(() => {
                // Закрыть модальное окно и перенаправить пользователя
                closeModalWindow();
                window.location.href = '/';
            });
        }
    }

    const accordionItems = document.querySelectorAll('.accordion__item');

    accordionItems.forEach((item) => {
        const accordionHeader = item.querySelector('.accordion__header');
        accordionHeader.addEventListener('click', () => onAccordionItemClick(item, accordionItems));
    });

    function closeOtherAccordionItems(currentItem, allAccordionItems) {
        allAccordionItems.forEach((otherItem) => {
            if (otherItem !== currentItem) {
                otherItem.classList.remove('active');
            }
        });
    }

    function onAccordionItemClick(item, allAccordionItems) {
        item.classList.toggle('active');
        closeOtherAccordionItems(item, allAccordionItems);
    }

    // Swiper.js
    const reviewsSwiper = new Swiper('.reviews-slider', {
        loop: true,
        navigation: {
            nextEl: '.reviews__btn--next',
            prevEl: '.reviews__btn--prev',
        },
    });

    AOS.init();

    $(function () {
        $('form').parsley();
    });
});

document.addEventListener("DOMContentLoaded", function() {
    // Получаем ссылку на карту и модальное окно
    var openMapLink = document.getElementById("openMapLink");
    var mapModal = document.getElementById("mapModal");

    // Переменная для хранения карты
    var map;

    // Инициализируем карту Яндекс.Карт
    function initMap() {
        if (!map) {
            map = new ymaps.Map("map", {
                center: [53.6995135, 23.7998637],
                zoom: 15
            });
            var placemark = new ymaps.Placemark([53.6995135, 23.7998637], {
                balloonContent: 'Моя точка'
            });
            map.geoObjects.add(placemark);
        }
    }

    // При клике на ссылку открываем модальное окно и инициализируем карту
    openMapLink.addEventListener("click", function(event) {
        event.preventDefault();
        mapModal.style.display = "block";
        ymaps.ready(initMap);
    });

    // Закрытие модального окна при клике на крестик или вне его
    var closeModal = mapModal.getElementsByClassName("close")[0];
    closeModal.addEventListener("click", function() {
        mapModal.style.display = "none";
    });

    window.addEventListener("click", function(event) {
        if (event.target == mapModal) {
            mapModal.style.display = "none";
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    var navLinks = document.querySelectorAll(".nav__link[data-scroll]");
    var scrollToTopBtn = document.getElementById("scrollToTopBtn");

    // Плавная прокрутка при клике на ссылки в навигации
    navLinks.forEach(function(link) {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            var targetId = this.getAttribute("data-scroll");
            var targetElement = document.querySelector(targetId);
            targetElement.scrollIntoView({ behavior: "smooth" });
        });
    });

    // Показать/скрыть кнопку для прокрутки вверх при прокрутке страницы
    window.addEventListener("scroll", function() {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add("show");
        } else {
            scrollToTopBtn.classList.remove("show");
        }
    });

    // Плавная прокрутка вверх при клике на кнопку
    scrollToTopBtn.addEventListener("click", function() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});

document.getElementById('openModal').addEventListener('click', function () {
    var modal = document.getElementById('modal');
    modal.classList.remove('modal-hidden');
    modal.classList.add('show');
    document.body.classList.add('modal-open');
});

document.getElementById('closeModal').addEventListener('click', function () {
    var modal = document.getElementById('modal');
    modal.classList.add('hide');
    setTimeout(function() {
        modal.classList.add('modal-hidden');
        modal.classList.remove('show');
        modal.classList.remove('hide');
        document.body.classList.remove('modal-open');
    }, 500);
});