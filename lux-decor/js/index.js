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
         console.log('2');
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

//==CATALOG===================================

resetCatalogMenu();

$('.catalog-menu__head').click(function () {
   $(this).toggleClass('_active');
   $('.catalog-menu__body').slideToggle(300, function () {
      resetCatalogMenu();
   });

   if (isMobile.any()) {
      scrollLock();
   }
});

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
   $('.catalog-menu__body').slideUp(200, function () {
      resetCatalogMenu();
   });
   $('body').removeClass('_lock');
}

function resetCatalogMenu() {
   $('.catalog-menu__body ._slide-left').removeClass('_slide-left');
   $('.catalog-menu__body ._active').removeClass('_active');
   $('.catalog-menu__list').scrollTop(0);
   $('.catalog-submenu__body').scrollTop(0);
}

function scrollLock() {
   $('body').toggleClass('_lock');
}

//MAIN-MENU
$('.main-menu__icon').click(function () {
   $(this).toggleClass('_active');
   $('.main-menu__body').slideToggle(200, function () {
      scrollLock();
   });
});

//no-focused click
$('button').on('mouseup', function () {
   $(this).blur();
});
$('a').on('mouseup', function () {
   $(this).blur();
});


