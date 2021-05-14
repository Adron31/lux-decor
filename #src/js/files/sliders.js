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