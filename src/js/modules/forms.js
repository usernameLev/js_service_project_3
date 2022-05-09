export class Form {
  constructor(forms) {
    this.forms = document.querySelectorAll(forms);
    this.inputs = document.querySelectorAll('input');
    this.message = {
      loading: 'Загрузка...',
      success: 'Спасибо! Скоро мы с Вами свяжемся',
      failure: 'Что-то пошло не так...',
    };
    this.path = 'assets/question.php';
  }

  clearInputs() {
    this.inputs.forEach((input) => {
      input.value = '';
    });
  }

  checkMailInputs() {
    const mailInputs = document.querySelectorAll('[type="email"]');

    mailInputs.forEach((txtInput) => {
      txtInput.addEventListener('keypress', (e) => {
        if (e.key.match(/[^a-z 0-9 @ \.]/gi)) {
          e.preventDefault();
        }
      });
    });
  }

  initMask() {
    const setCursorPosition = (pos, elem) => {
      elem.focus();

      if (elem.setSelectionRange) {
        elem.setSelectionRange(pos, pos);
      } else if (elem.createTextRange) {
        const range = elem.createTextRange();

        range.collapse(true);
        range.moveStart('character', pos);
        range.moveEnd('character', pos);
        range.select();
      }
    };

    const createMask = function (event) {
      const matrix = '+1 (___) ___-____';
      let i = 0;
      const def = matrix.replace(/\D/g, '');
      let val = this.value.replace(/\D/g, '');

      if (def.length >= val.length) {
        val = def;
      }

      this.value = matrix.replace(/./g, (a) => {
        return /[_\d]/.test(a) && i < val.length
          ? val.charAt(i++)
          : i >= val.length
          ? ''
          : a;
      });

      if (event.type === 'blur') {
        if (this.value.length == 2) {
          this.value = '';
        }
      } else {
        setCursorPosition(this.value.length, this);
      }
    };

    const inputs = document.querySelectorAll('[name="phone"]');

    inputs.forEach((input) => {
      input.addEventListener('input', createMask);
      input.addEventListener('focus', createMask);
      input.addEventListener('blur', createMask);
    });
  }

  async postData(url, data) {
    const res = await fetch(url, {
      method: 'POST',
      body: data,
    });

    return await res.text();
  }

  init() {
    this.checkMailInputs();
    this.initMask();

    this.forms.forEach((form) => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const statusMessage = document.createElement('div');
        statusMessage.style.cssText = `
        font-size: 18px;
        color: #ccc;
        margin-top: 15px;
        `;
        form.parentNode.append(statusMessage);

        statusMessage.textContent = this.message.loading;

        const formData = new FormData(form);

        this.postData(this.path, formData)
          .then((res) => {
            console.log(res);
            statusMessage.textContent = this.message.success;
          })
          .catch(() => {
            statusMessage.textContent = this.message.failure;
          })
          .finally(() => {
            this.clearInputs();
            setTimeout(() => {
              statusMessage.remove();
            }, 6000);
          });
      });
    });
  }
}
