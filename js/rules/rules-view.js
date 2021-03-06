import AbstractView from '../view';
import renderBackBtn from '../partials/back-to-start';


export default class RulesView extends AbstractView {
  get template() {
    return `<header class="header"></header>
    <div class="rules">
      <h1 class="rules__title">Правила</h1>
      <p class="rules__description">Угадай 10&nbsp;раз для каждого изображения, фото это 
      <img src="img/photo_icon.png" width="16" height="16"> или рисунок 
      <img src="img/paint_icon.png" width="16" height="16" alt="">.<br>
        Фотографиями или рисунками могут быть оба изображения.<br>
        На&nbsp;каждую попытку отводится 30&nbsp;секунд.<br>
        Ошибиться можно не&nbsp;более 3&nbsp;раз.<br>
        <br>
        Готовы?
      </p>
      <form class="rules__form">
        <input class="rules__input" type="text" placeholder="Ваше имя" required>
        <button class="rules__button continue" disabled>Go!</button>
      </form>
    </div>`;
  }

  bind() {
    this.header = this.element.querySelector(`.header`);
    this.form = this.element.querySelector(`.rules__form`);
    this.input = this.element.querySelector(`.rules__input`);
    this.submit = this.element.querySelector(`.rules__button`);

    this.header.insertBefore(renderBackBtn(), this.header.childNodes[0]);

    this.form.oninput = () => this.onFormInput();

    this.form.onsubmit = (evt) => {
      evt.preventDefault();
      this.onFormSubmit();
      this.form.reset();
    };
  }

  onFormInput() {}

  onFormSubmit() {}
}
