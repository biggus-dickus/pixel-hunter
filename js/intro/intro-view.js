import AbstractView from '../view';

export default class IntroView extends AbstractView {
  get template() {
    return `<div id="main" class="central__content">
    <div id="intro" class="intro">
      <h1 class="intro__asterisk" title="Начать игру">*</h1>
      <p class="intro__motto">
        <sup>*</sup> Это не&nbsp;фото. Это картина маслом нидерландского художника-фотореалиста Tjalf Sparnaay.
      </p>
    </div>
  </div>`;
  }

  bind() {
    const startBtn = this.element.querySelector(`.intro__asterisk`);
    startBtn.onclick = (evt) => {
      evt.preventDefault();
      this.onStartClick();
    };
  }

  onStartClick() {}
}