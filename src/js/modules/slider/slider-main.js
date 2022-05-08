import {Slider} from './slider';

export class MainSlider extends Slider {
  constructor(page, btns) {
    super(page, btns);
  }

  showSlides(n) {
    if (n > this.slides.length) this.slideIndex = 1;

    if (n < 1) this.slideIndex = this.slides.length;

    this.slides.forEach((slide) => (slide.style.display = 'none'));

    this.slides[this.slideIndex - 1].style.display = 'block';
  }

  plusSlides(n) {
    this.showSlides((this.slideIndex += n));
  }

  render() {
    this.btns.forEach((btn) => {
      btn.addEventListener('click', () => this.plusSlides(1));

      btn.parentNode.previousElementSibling.addEventListener('click', (e) => {
        e.preventDefault();
        this.slideIndex = 1;
        this.showSlides(this.slideIndex);
      });
    });

    this.showSlides(this.slideIndex);
  }
}
