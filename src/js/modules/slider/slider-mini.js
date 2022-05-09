import { Slider } from './slider';

export class MiniSlider extends Slider {
  constructor(container, next, prev, activeClass, animate, autoplay) {
    super(container, next, prev, activeClass, animate, autoplay);
  }

  decorateSlides() {
    this.slides.forEach((slide) => {
      slide.classList.remove(this.activeClass);
      if (this.animate) {
        slide.querySelector('.card__title').style.opacity = '0.4';
        slide.querySelector('.card__controls-arrow').style.opacity = '0';
      }
    });

    if (!this.slides[0].closest('button')) {
      this.slides[0].classList.add(this.activeClass);
    }

    if (this.animate) {
      this.slides[0].querySelector('.card__title').style.opacity = '1';
      this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
    }
  }

  nextSlide() {
    if (
      this.slides[1].tagName == 'BUTTON' &&
      this.slides[2].tagName == 'BUTTON'
    ) {
      this.container.append(this.slides[0]);
      this.container.append(this.slides[1]);
      this.container.append(this.slides[2]);
      this.decorateSlides();
    } else if (this.slides[1].tagName == 'BUTTON') {
      this.container.append(this.slides[0]);
      this.container.append(this.slides[1]);
      this.decorateSlides();
    } else {
      this.container.append(this.slides[0]);
      this.decorateSlides();
    }
  }

  bindTriggers() {
    this.next.addEventListener('click', () => this.nextSlide());

    this.prev.addEventListener('click', () => {
      for (let i = this.slides.length - 1; i > 0; i--) {
        if (this.slides[i].tagName !== 'BUTTON') {
          const active = this.slides[i];
          this.container.insertBefore(active, this.slides[0]);
          this.decorateSlides();
          break;
        }
      }
    });
  }

  init() {
    this.container.style.cssText = `
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    align-items: flex-start;
    `;

    this.bindTriggers();
    this.decorateSlides();

    if (this.autoplay) {
      setInterval(() => this.nextSlide(), 5000);
    }
  }
}