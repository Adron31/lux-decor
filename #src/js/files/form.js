const forms = $('.form');
const popupForms = $('.form-popup');
const timeout = 10000;
const duration = 600;
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
$('.form_feedback').submit(function (evt) {
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