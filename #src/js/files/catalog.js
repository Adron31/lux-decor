const breakpoint_md3 = 768;

if ($(window).outerWidth() < breakpoint_md3) {
	$('.filter-catalog__form').css('display', 'none');
	$('.filter-catalog__btn').click(function () {
		$(this).toggleClass('_active');
		$('.filter-catalog__form').slideToggle(300);
	});

}
