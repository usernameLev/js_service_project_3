import { MainSlider } from './modules/slider/slider-main';
import { VideoPlayer } from './modules/playVideo';

window.addEventListener('DOMContentLoaded', () => {
  const slider = new MainSlider({
    btns: '.next',
    page: '.page',
  });
  slider.render();

  const player = new VideoPlayer({
    triggers: '.showup .play',
    overlay: '.overlay',
  });
  player.init();
});
