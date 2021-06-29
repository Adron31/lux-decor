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
//price-slider
$(function () {


   $('#price-slider').slider({
      animate: "slow",
      range: true,
      min: 0,
      max: 20000,
      values: [0, 20000],
      slide: function (evt, ui) {
         $("#min-value-price").val(ui.values[0]);
         $("#max-value-price").val(ui.values[1]);
      },
      // slide: function (event, ui) {
      // 	$("#max-value-price").val(ui.values[1]);
      // }
   });
   $("#min-value-price").val($("#price-slider").slider("values", 0));
   $("#max-value-price").val($("#price-slider").slider("values", 1));
   $("#min-value-price").change(function (e) {
      $("#price-slider").slider("values", 0, $(this).val());
   });
   $("#max-value-price").change(function (e) {
      $("#price-slider").slider("values", 1, $(this).val());
   });
});