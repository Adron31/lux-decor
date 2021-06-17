"use strict"
let ua = window.navigator.userAgent;
let msie = ua.indexOf("MSIE");
let isMobile = {
   Android: function () { return navigator.userAgent.match(/Android/i); },
   BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); },
   iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
   Opera: function () { return navigator.userAgent.match(/Opera Mini/i); },
   Windows: function () { return navigator.userAgent.match(/IEMobile/i); },
   any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); }
};
//Adaptive functions
let move_array = [];
if ($('*[data-move]')) {
   $.each($('*[data-move]'), function (index, val) {
      if ($(this).data('move') != '' && $(this).data('move') != null) {
         $(this).attr('data-move-index', index);
         move_array[index] = {
            'parent': $(this).parent(),
            "index": $(this).index()
         };
      }
   });
}

function dynamic_adaptive() {
   let w = $(window).outerWidth();
   $.each($('*[data-move]'), function (index, val) {
      if ($(this).data('move') != '' && $(this).data('move') != null) {
         let dat_array = $(this).data('move').split(',');
         let dat_parent = $('.' + dat_array[0]);
         let dat_index = dat_array[1];
         let dat_bp = dat_array[2];
         if (w < dat_bp) {
            if (!$(this).hasClass('js-move_done_' + dat_bp)) {
               if (dat_index > 0) {
                  $(this).insertAfter(dat_parent.find('*').eq(dat_index - 1));
               } else if (dat_index == "last") {
                  $(this).appendTo(dat_parent);
               } else {
                  $(this).prependTo(dat_parent);
               }
               $(this).addClass('js-move_done_' + dat_bp);
            }
         } else {
            if ($(this).hasClass('js-move_done_' + dat_bp)) {
               dynamic_adaptive_back($(this));
               $(this).removeClass('js-move_done_' + dat_bp);
            }
         }
      }
   });
}

function dynamic_adaptive_back(el) {
   let index_original = el.data('move-index');
   let move_place = move_array[index_original];
   let parent_place = move_place['parent'];
   let index_place = move_place['index'];
   if (index_place > 0) {
      if (parent_place.children().eq(index_place - 1).length) {
         el.insertAfter(parent_place.children().eq(index_place - 1));
      } else {
         el.appendTo(parent_place);
      }
   } else {
      el.prependTo(parent_place);
   }
}

$(window).resize(function (event) {
   dynamic_adaptive();
});
dynamic_adaptive();

//main slider
$('.main-slider').slick({
	dots: true,
	infinite: true,
	speed: 800,
	slidesToShow: 1,
	autoplay: true,
	autoplaySpeed: 5000,
	responsive: [
		{
			breakpoint: 968,
			settings: {
				arrows: false,
			}
		},
	]
});

//product slider
$('.slider-products').slick({
	// dots: true,
	infinite: true,
	speed: 800,
	slidesToShow: 4,
	slidesToScroll: 4,
	adaptiveHeight: false,
	// autoplay: true,
	// autoplaySpeed: 5000,

	responsive: [
		{
			breakpoint: 768,
			settings: {
				arrows: false,
				slidesToShow: 3,
				slidesToScroll: 3,
			}
		},
		{
			breakpoint: 560,
			settings: {
				arrows: false,
				centerMode: false,
				centerPadding: '0px',
				slidesToShow: 2,
				slidesToScroll: 2,
			}
		}
	]
});

//slider-useful
$('.slider-useful').slick({
	dots: true,
	arrows: false,
	infinite: true,
	speed: 800,
	slidesToShow: 2,
	slidesToScroll: 2,
	// autoplay: true,
	autoplaySpeed: 5000,
	responsive: [
		{
			breakpoint: 660,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
			}
		},
	]
});





//BildSlider
/*
let sliders = document.querySelectorAll('._swiper');
if (sliders) {
	for (let index = 0; index < sliders.length; index++) {
		let slider = sliders[index];
		if (!slider.classList.contains('swiper-bild')) {
			let slider_items = slider.children;
			if (slider_items) {
				for (let index = 0; index < slider_items.length; index++) {
					let el = slider_items[index];
					el.classList.add('swiper-slide');
				}
			}
			let slider_content = slider.innerHTML;
			let slider_wrapper = document.createElement('div');
			slider_wrapper.classList.add('swiper-wrapper');
			slider_wrapper.innerHTML = slider_content;
			slider.innerHTML = '';
			slider.appendChild(slider_wrapper);
			slider.classList.add('swiper-bild');

			if (slider.classList.contains('_swiper_scroll')) {
				let sliderScroll = document.createElement('div');
				sliderScroll.classList.add('swiper-scrollbar');
				slider.appendChild(sliderScroll);
			}
		}
		if (slider.classList.contains('_gallery')) {
			//slider.data('lightGallery').destroy(true);
		}
	}
	sliders_bild_callback();
}

function sliders_bild_callback(params) { }

let sliderScrollItems = document.querySelectorAll('._swiper_scroll');
if (sliderScrollItems.length > 0) {
	for (let index = 0; index < sliderScrollItems.length; index++) {
		const sliderScrollItem = sliderScrollItems[index];
		const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
		const sliderScroll = new Swiper(sliderScrollItem, {
			observer: true,
			observeParents: true,
			direction: 'vertical',
			slidesPerView: 'auto',
			freeMode: true,
			scrollbar: {
				el: sliderScrollBar,
				draggable: true,
				snapOnRelease: false
			},
			mousewheel: {
				releaseOnEdges: true,
			},
		});
		sliderScroll.scrollbar.updateSize();
	}
}


function sliders_bild_callback(params) { }

let slider_about = new Swiper('.about__slider', {

	effect: 'fade',
	autoplay: {
		delay: 3000,
		disableOnInteraction: false,
	},

	observer: true,
	observeParents: true,
	slidesPerView: 1,
	spaceBetween: 0,
	autoHeight: true,
	speed: 800,
	//touchRatio: 0,
	//simulateTouch: false,
	//loop: true,
	//preloadImages: false,
	//lazy: true,
	// Dotts
	//pagination: {
	//	el: '.slider-quality__pagging',
	//	clickable: true,
	//},
	// Arrows
	navigation: {
		nextEl: '.about__more .more__item_next',
		prevEl: '.about__more .more__item_prev',
	},

	breakpoints: {
		320: {
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: true,
		},
		768: {
			slidesPerView: 2,
			spaceBetween: 20,
		},
		992: {
			slidesPerView: 3,
			spaceBetween: 20,
		},
		1268: {
			slidesPerView: 4,
			spaceBetween: 30,
		},
	},

	on: {
		lazyImageReady: function () {
			ibg();
		},
	}
	// And if we need scrollbar
	//scrollbar: {
	//	el: '.swiper-scrollbar',
	//},
});

//filter-slider
let priceSlider = document.querySelector('.price-filter__slider');

if (priceSlider) {

	noUiSlider.create(priceSlider, {
		start: [0, 100000],
		connect: true,
		tooltips: [true, true],
		range: {
			'min': 0,
			'max': 200000,
		},
		format: {
			// 'to' the formatted value. Receives a number.
			to: function (value) {
				return value.toFixed(0);
			},
			// 'from' the formatted value.
			// Receives a string, should return a number.
			from: function (value) {
				return Number(value.replace('', '')).toFixed(0);
			}
		}
	});

	let sliderInputFrom = document.querySelector('#slider-input_from');
	let sliderInputTo = document.querySelector('#slider-input_to');
	let sliderInputs = [sliderInputFrom, sliderInputTo];

	priceSlider.noUiSlider.on('update', function (values, handle) {
		sliderInputs[handle].value = values[handle];
	});

	// Listen to keydown events on the input field.
	sliderInputs.forEach(function (input, handle) {
		input.addEventListener('change', function () {
			priceSlider.noUiSlider.setHandle(handle, this.value);
		});
	});

}
*/
$('.js-popup-link').click(function (evt) {
   const popupId = $(this).attr('href');
   evt.preventDefault();
   popupClose();
   popupOpen($(popupId));
   bodyScrollLock();
});

$('.js-popup-close').click(function (evt) {
   popupClose();
   bodyScrollUnlock();
});

$('.product-card__button').click(function (evt) {
   evt.preventDefault();
   popupClose();
   popupOpen($('#popup-order'));
   bodyScrollLock();
});

let popupClickHandler = function (evt) {
   //закрывает попап при клике вне окна
   if (evt.target === $(this).find('.popup__body')[0] || evt.target === $(this)[0]) {
      popupClose();
      bodyScrollUnlock();
   }
};

let windowKeydownHandler = function (evt) {
   const ESC_CODE = 27;
   if (evt.keyCode === ESC_CODE) {
      evt.preventDefault;
      popupClose();
      bodyScrollUnlock();
   }
};

function popupOpen(popup) {
   popup.addClass('_open');
   popup.on('click', popupClickHandler);
   $(window).on('keydown', windowKeydownHandler);
}

function popupClose() {
   if ($('.popup').hasClass('_open')) {
      const popupForm = $('.popup._open').find('.form');
      if (popupForm[0]) {
         formClear(popupForm);
      }
      $('.popup._open').off('click', popupClickHandler);
      $('.popup._open').removeClass('_open');
      $(window).off('keydown', windowKeydownHandler);
   }
}

function bodyScrollLock() {
   const paddingValue = $(window).outerWidth() - $('body').innerWidth();
   if ($('body').css('paddingRight') === '0px') {
      $('body').addClass('_popup-open').css('paddingRight', paddingValue + 'px');
   }
}

function bodyScrollUnlock() {
   const timeout = 300;
   setTimeout(function () {
      $('body').removeClass('_popup-open').css('paddingRight', '0px');
   }, timeout);
}

function popupMessageOpen(message) {
   $('.popup__content_message').html(message);
   popupOpen($('#popup-message'));
   setTimeout(popupClose, 2500);
}

const forms = $('.form');
const popupForms = $('.form-popup');
const feedbackForms = $('.form_feedback');
const timeout = 10000;
const duration = 400;
let timerId = null;

//фокус на полях ввода
forms.find('.form__input').focus(function () {
   $(this).parent('.form__item').addClass('_focus');
   removeError($(this));
   if ($(this).siblings('.form__popup-message').length) {
      hidePopupFormMessage($(this).siblings('.form__popup-message'));
   }
});
forms.find('.form__input').blur(function () {
   $(this).parent('.form__item').removeClass('_focus');
});

forms.find('.form__toggle-pass').click(function () {
   $(this).toggleClass('_active');
   const input = $(this).siblings('.form__input');
   if (input.attr('type') === 'password') {
      input.attr('type', 'text');
   } else {
      input.attr('type', 'password');
   }
});

//feedback-form
feedbackForms.submit(function (evt) {
   formSend($(this), evt);
});

//popup-form
$('.form-popup').on('change', 'input', function () {
   formValidation($(this));
});
$('.form-popup').submit(function (evt) {
   formSend($(this), evt)
});
//masc-phone
$('#user-tel').inputmask({
   "mask": "+38(999) 999 99 99",
   placeholder: '  ',
   "onincomplete": function () {
      removeValid($('#user-tel'));
   },
   onKeyValidation: function (key, result) {
      if (!result) {
         addValid($('#user-tel'));
      }
   },
});

//всплывающие сообщения полей попап-форм
createFormPopupMessage(popupForms);
createFormPopupMessage(feedbackForms);

function createFormPopupMessage(form) {
   const inputs = form.find('.js-req');
   const formItems = inputs.parent();
   let formPopupMessage = `
   <div class="form__popup-message">
      <span></span>
      <button type="button">x</button>
   </div>`;

   formItems.prepend(formPopupMessage);
}

function showFormPopupMessage(input, message = 'Заполните это поле') {
   const formPopupMessage = input.siblings('.form__popup-message');

   formPopupMessage.find('span').html(message);
   formPopupMessage.fadeIn(duration).on('click.message', 'button', function () {
      hidePopupFormMessage(formPopupMessage);
   });
   timerId = setTimeout(function () {
      hidePopupFormMessage(formPopupMessage);
   }, timeout);
}

function hidePopupFormMessage(formPopupMessage) {
   formPopupMessage.fadeOut(duration).off('click.message');
   if (timerId) {
      clearTimeout(timerId);
      timerId = null;
   }
}

//отправка форм
function formSend(form, evt) {
   if (formTestError(form)) {
      evt.preventDefault();
   } else {
      const formAction = form.attr('action') ? form.attr('action').trim() : '#';
      const formMethod = form.attr('method') ? form.attr('method').trim() : 'GET';
      const ajax = form.attr('data-ajax');
      const messageSubmit = form.attr('data-message') ? form.attr('data-message') : 'Форма отправлена';
      if (ajax) {
         evt.preventDefault();
         let formData = new FormData(form[0]);
         form.addClass('_sending');
         $.ajax({
            url: formAction,
            type: formMethod,
            data: formData,
            contentType: false,
            cache: false,
            processData: false,

         }).done(function () {
            if (form.hasClass('form_feedback')) {
               popupMessageOpen(messageSubmit);
            }

         }).fail(function (xhr, status, err) {
            popupMessageOpen(`Ошибка отправки <br> ${status} ${xhr.status}`);

         }).always(function () {
            form[0].reset();
            form.removeClass('_sending');
         });
      }
   }
}

//проверка на ошибки обязательных полей формы перед отправкой
function formTestError(form) {
   let input = form.find('.js-req').not('._valid').first();

   if (input.hasClass('js-email') && !emailValid(input)) {
      addError(input);
      return true;
   } else if (input.hasClass('js-pass') && !passValid(input)) {
      addError(input);
      return true;
   } else if (input.hasClass('js-pass-repeat') && !passCompare(form)) {
      addError(input);
      return true;
   }
   return false;
}

//валидация полей формы при их заполнении
function formValidation(input) {
   if (input.hasClass('js-email')) {
      if (emailValid(input)) {
         addValid(input);
      } else {
         removeValid(input);
      }
   } else if (input.hasClass('js-pass')) {
      if (passValid(input)) {
         addValid(input);
      } else {
         removeValid(input);
      }
   } else if (input.hasClass('js-pass-repeat')) {
      if (passCompare(input.closest('.form'))) {
         addValid(input);
      } else {
         removeValid(input);
      }
   } else if (!input.hasClass('js-tel')) {
      if (input.val().length > 0) {
         addValid(input);
      } else {
         removeValid(input);
      }
   }
}
// проверка валидности email-поля формы
function emailValid(input) {
   if (emailTest(input)) {
      return true;
   } else if (input.val().trim() === '') {
      showFormPopupMessage(input, 'Введите свой адресс электронной почты.');
      return false;
   } else {
      showFormPopupMessage(input, 'Введите коректный адресс электронной почты.');
      return false;
   }
}
// проверка валидности password-поля формы
function passValid(input) {
   if (passTest(input)) {
      return true;
   } else if (input.val().trim() === '') {
      showFormPopupMessage(input, 'Введите пароль.');
      return false;
   } else if (input.val().trim().length < 8) {
      showFormPopupMessage(input, 'Пароль должен иметь длину не меннее 8 символов');
      return false;
   } else if (!/(\p{Lu})(\p{Ll})/gu.test(input.val())) {
      showFormPopupMessage(input, 'Пароль должен содержать хотя бы одну заглавную и одну строчную буквы');
      return false;
   } else if (!/\p{N}/gu.test(input.val())) {
      showFormPopupMessage(input, 'Пароль должен содержать хотя бы одну цифру или символ !@#$%^&*_');
      return false;
   } else {
      showFormPopupMessage(input, 'Пароль может содержать только цифры и буквы латинского алфавита, а также символы !@#$%^&*_');
      return false;
   }
}
// проверка повторного ввода пароля на совпадение
function passCompare(form) {
   const userPass = form.find('#user-pass').val();
   const userPassRepeat = form.find('#user-pass-repeat').val();
   if (userPass === userPassRepeat) {
      return true;
   } else {
      showFormPopupMessage(form.find('#user-pass-repeat'), 'Пароли не совпадают');
      return false;
   }
}
//добавление класса _valid
function addValid(input) {
   input.addClass('_valid').parent().addClass('_valid');
}
//удаление класса _valid
function removeValid(input) {
   input.removeClass('_valid').parent().removeClass('_valid');
}
//добавление класса _error
function addError(input) {
   input.addClass('_error').parent().addClass('_error');
}
//удаление класса _error
function removeError(input) {
   input.removeClass('_error').parent().removeClass('_error');
}
//регулярное выражение для почты
function emailTest(input) {
   return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.val());
}
//регулярное выражение для пароля
function passTest(input) {
   return /(?=.*[0-9!@#$%^&*_])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g.test(input.val());
}
//очистка полей формы
function formClear(form) {
   const inputs = form.find('.form__input');
   form[0].reset();
   removeValid(inputs);
   removeError(inputs);
}
//==CATALOG===================================
let breakpoint_md4 = 660;

resetCatalogMenu();

$('.catalog-menu__head').click(function () {
   $(this).toggleClass('_active');
   if (isMobile.any()) {
      if ($(window).outerWidth() < breakpoint_md4) {
         $('.catalog-menu__body').slideDown(0);
         $('.catalog-menu__body').toggleClass('_active');
      } else {
         $('.catalog-menu__body').slideToggle(300);
      }
      resetCatalogMenu();
      $('body').toggleClass('_catalog-menu-open');
   } else {
      $('.catalog-menu__body').slideToggle(300);
   }
});

//catalog-submenu
if (isMobile.any()) {
   $('.catalog-menu__item').click(function (e) {
      $(this).siblings().has('._active').children().removeClass('_active');
      $(this).children().addClass('_active');
      $(this).closest('.catalog-menu__wrap').addClass('_slide-left');
   });

   $('.catalog-submenu__back').click(function (e) {
      e.stopPropagation();
      let elem = $(this);
      setTimeout(function () {
         elem.closest('._active').removeClass('_active');
      }, 300);
      elem.closest('._slide-left').removeClass('_slide-left');
   });

   $('body').click(function (e) {
      let el = $('.catalog-menu').find('*');

      if (!el.is(e.target) && $('.catalog-menu__head').hasClass('_active')) {
         collapsCatalog();
      }
   });
} else {
   $('.catalog-menu__item').mouseenter(function () {
      $(this).children().addClass('_active');
   });
   $('.catalog-menu__item').mouseleave(function () {
      $(this).children().removeClass('_active');
   });
}


function collapsCatalog() {
   $('.catalog-menu__head').removeClass('_active');
   $('.catalog-menu__body').removeClass('_active');
   resetCatalogMenu();
}

function resetCatalogMenu() {
   $('.catalog-menu__body ._slide-left').removeClass('_slide-left');
   $('.catalog-menu__body ._active').removeClass('_active');
   $('.catalog-menu__list').scrollTop(0);
   $('.catalog-submenu__body').scrollTop(0);
}

//MAIN-MENU
$('.main-menu__icon').click(function () {
   $(this).toggleClass('_active');
   $(this).parent().toggleClass('_active');
   $('.main-menu__body').toggleClass('_active').scrollTop(0);
   $('body').toggleClass('_main-menu-open');
});

//no-focused click
$('button').on('mouseup', function () {
   $(this).blur();
});
$('a').on('mouseup', function () {
   $(this).blur();
});

//back-up
const initialBottomValue = $('.back-up').css('bottom');

$(document).scroll(function (evt) {
   let bottomValue = ($(document).scrollTop() + $(window).height()) - ($(document).height() - 350);
   if ($(document).scrollTop() > $(window).height() * 0.6) {
      $('.back-up').addClass('_active');
   } else {
      $('.back-up').removeClass('_active');
   }
   if (bottomValue > 0) {
      $('.back-up').css('bottom', bottomValue);
   } else {
      $('.back-up').css('bottom', initialBottomValue);
   }
});

$('.back-up__button').on('click', function () {
   $('html, body').animate({ scrollTop: 0, }, 500);
});

