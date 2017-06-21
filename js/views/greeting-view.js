import AbstractView from './abstract-view';

export default class GreetingView extends AbstractView {
  get template() {
    return `<div class="greeting central--blur">
      <div class="greeting__logo"><img src="img/logo_big.png" width="201" height="89" alt="Pixel Hunter"></div>
        <h1 class="greeting__asterisk">*</h1>
        <div class="greeting__challenge">
          <h3>Лучшие художники-фотореалисты бросают&nbsp;тебе&nbsp;вызов!</h3>
          <p>Правила игры просты.<br>
          Нужно отличить рисунок&nbsp;от&nbsp;фотографии и&nbsp;сделать выбор.<br>
          Задача кажется тривиальной, но&nbsp;не&nbsp;думай, что всё так просто.<br>
          Фотореализм обманчив и&nbsp;коварен.<br>
          Помни, главное&nbsp;— смотреть очень внимательно.</p>
        </div>
      <div class="greeting__continue"><span><img src="img/arrow_right.svg" width="64" height="64" alt="Next"></span></div>
    </div>
    <a href="#" class="greeting__link">Лучшие результаты</a>`;
  }

  bind() {
    const proceedBtn = this.element.querySelector(`.greeting__continue`);
    const statsBtn = this.element.querySelector(`.greeting__link`);

    proceedBtn.onclick = () => this.onProceedBtnClick();

    statsBtn.onclick = (evt) => {
      evt.preventDefault();
      this.onStatsBtnClick();
    };
  }

  onProceedBtnClick() {}
}
