//==CATALOG===================================
let menuOpened = {
   catalog: false,
   main: false,
   toggleCatalog() {
      this.catalog = !this.catalog;
   },
   toggleMain() {
      this.main = !this.main;
   },
   or() {
      return this.catalog || this.main;
   },
   and() {
      return this.catalog && this.main;
   },
};

resetCatalogMenu();

$('.catalog-menu__head').click(function () {
   $(this).toggleClass('_active');
   if (isMobile.any()) {
      $('.catalog-menu__body').toggleClass('_active');
      resetCatalogMenu();
      menuOpened.toggleCatalog();
      scrollLock();
   } else {
      $('.catalog-menu__body').slideToggle(300)
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
   menuOpened.catalog =
      resetCatalogMenu();
   scrollLock()
}

function resetCatalogMenu() {
   $('.catalog-menu__body ._slide-left').removeClass('_slide-left');
   $('.catalog-menu__body ._active').removeClass('_active');
   $('.catalog-menu__list').scrollTop(0);
   $('.catalog-submenu__body').scrollTop(0);
}

function scrollLock() {
   if (menuOpened.or() && !menuOpened.and()) {
      $('body').addClass('_lock');
   } else if (!menuOpened.and()) {
      $('body').removeClass('_lock');
   }
}

//MAIN-MENU
$('.main-menu__icon').click(function () {
   $(this).toggleClass('_active');
   $(this).parent().toggleClass('_active');
   $('.main-menu__body').toggleClass('_active').scrollTop(0);
   menuOpened.toggleMain();
   scrollLock()
});

//no-focused click
$('button').on('mouseup', function () {
   $(this).blur();
});
$('a').on('mouseup', function () {
   $(this).blur();
});
