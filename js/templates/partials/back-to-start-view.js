import AbstractView from '../../utils/abstract-view';

export default class BackToStartView extends AbstractView {
  get template() {
    return `<div class="header__back" title="В начало игры">
    <span class="back">
       <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
       <img src="img/logo_small.png" width="101" height="44">
     </span>
   </div>`;
  }

  bind() {
    const btnBack = this.element.querySelector(`.header__back`);
    btnBack.onclick = () => this.onBtnClick();
  }
}
