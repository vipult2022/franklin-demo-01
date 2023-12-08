let currentSlide = 0;

const slideSlides = (slides) => {
	slides.forEach((slide, slideIndex) => {
		const xValue = (slideIndex - currentSlide) * 100;
		slide.style.transform = `translateX(${xValue}%)`;
	});
};

const initializeSlides = slideSlides;

const gotoNextSlide = (slides) => (event) => {
	if (currentSlide === slides.length - 1) {
		currentSlide = 0;
	} else {
		currentSlide++;
	}
	slideSlides(slides);
};

const gotoPrevSlide = (slides) => (event) => {
	if (currentSlide === 0) {
		currentSlide = slides.length - 1;
	} else {
		currentSlide--;
	}
	slideSlides(slides);
};

const gotoSlide = (slides, gotoIndex) => (event) => {
	currentSlide = gotoIndex;
	slideSlides(slides);
};

export { initializeSlides, gotoNextSlide, gotoPrevSlide, gotoSlide };
