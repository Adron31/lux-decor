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