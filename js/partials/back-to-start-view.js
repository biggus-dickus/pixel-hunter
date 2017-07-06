import AbstractView from '../view';
import {views} from '../data/gamedata';
import gameState from '../game-state';

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
    const modal = document.querySelector(`.modal`);
    const innerModal = modal.querySelector(`.modal__inner`);

    const modalClickHandler = (evt) => {
      evt.preventDefault();

      if (evt.target.classList.contains(`js-modal-close`)) {
        modal.classList.remove(`open`);
      } else if (evt.target.classList.contains(`js-game-abort`)) {
        modal.classList.remove(`open`);
        this.onBtnClick();
      }
    };

    // DOM-0 не позволяет вешать более одного обработчика, и теперь коллбэк срабатывает один раз. Я думаю, это быстрое решение вполне подходит для такого случая.
    innerModal.onclick = modalClickHandler;

    btnBack.onclick = (evt) => {
      evt.preventDefault();

      // If game has already started, ask for confirmation before aborting
      if (gameState.props.template === views.game) {
        modal.classList.add(`open`);
      } else {
        this.onBtnClick();
      }
    };
  }

  onBtnClick() {}
}
