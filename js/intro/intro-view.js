import AbstractView from '../view';

export default class IntroView extends AbstractView {
  get template() {
    return `<div id="main" class="central__content">
    <div id="intro" class="intro">
      <h1 class="intro__asterisk" title="Загрузка&hellip;">*</h1>
      <p class="intro__motto">
        <sup>*</sup> Это не&nbsp;фото. Это картина маслом нидерландского художника-фотореалиста Tjalf Sparnaay.
      </p>
    </div>
  </div>`;
  }

  bind() {}

  onStartClick() {}
}
