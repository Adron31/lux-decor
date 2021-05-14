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
   if (evt.target === $(this).find('.popup__body')[0]) {
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
      $('body').addClass('_lock').css('paddingRight', paddingValue + 'px');
   }
}

function bodyScrollUnlock() {
   const timeout = 300;
   setTimeout(function () {
      $('body').removeClass('_lock').css('paddingRight', '0px');
   }, timeout);
}

function popupMessageOpen(message) {
   $('.popup__content_message').html(message);
   popupOpen($('#popup-message'));
   setTimeout(popupClose, 2500);
}
