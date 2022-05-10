export class Download {
  constructor(triggers) {
    this.btns = document.querySelectorAll(triggers);
    this.path = 'assets/img/mainbg.jpg';
  }

  downloadPath(path) {
    const element = document.createElement('a');

    element.setAttribute('href', path);
    element.setAttribute('download', 'nice_picture');

    element.style.display = 'none';
    document.body.append(element);

    element.click();

    document.body.removeChild(element);
  }

  init() {
    this.btns.forEach((btn) => {
      btn.addEventListener('click', () => {
        this.downloadPath(this.path);
      });
    });
  }
}
