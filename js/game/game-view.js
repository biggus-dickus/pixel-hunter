import {TYPE_RADIO_1, TYPE_RADIO_2, TYPE_PICTURE} from '../data/gamedata';
import AbstractView from '../view';
import renderInfoBar from '../partials/info-bar';
import renderStatusBar from '../partials/status-bar';
import getRandomPic from '../utils/pic-randomizer';
import gameState from '../game-state';


export default class GameView extends AbstractView {
  constructor(state) {
    super();
    this._state = state;
  }

  get template() {
    return `<div class="game">
      <p class="game__task">${this._state.gameType.task}</p>
      <form class="game__content ${this._state.gameType.classModifier}">
        ${renderGameOptions(this._state.gameType.options, this._state.gameType.type)}
      </form>
    </div>`;
  }

  bind() {
    this.formElem = this.element.querySelector(`.game__content`);
    const gameElem = this.element.querySelector(`.game`);

    // Header
    this.element.insertBefore(renderInfoBar(this._state), this.element.childNodes[0]);
    // Footer
    gameElem.appendChild(renderStatusBar(this._state, this._state.playerAnswers));

    this.formElem.onclick = (evt) => {
      this.onFormClick(evt);
      this.formElem.reset();
    };
  }

  onFormClick(evt) {}
}

/**
 * Return template string for rendering, depending on game type.
 * @param  {number} options how many options to render
 * @param  {string} type current game type
 * @return {string}
 */
function renderGameOptions(options, type) {
  let templateString;
  let randomPics = getRandomPic(gameState.props.images, options, type);

  switch (type) {
    case TYPE_RADIO_1:
    case TYPE_RADIO_2:
      templateString = randomPics.map((item, i) => {
        return `<div class="game__option">
                  <img src="${item.url}" data-origin="${item.origin}" alt="Option ${++i}">
                  <input id="photo-${i}" name="question-${i}" type="radio" value="photos" required>
                  <label for="photo-${i}" class="game__answer game__answer--photo">Фото</label>
                  <input id="paintings-${i}" name="question-${i}" type="radio" value="paintings" required>
                  <label for="paintings-${i}" class="game__answer game__answer--paint">Рисунок</label>
                </div>`;
      }).join(``);
      break;

    case TYPE_PICTURE:
      templateString = randomPics.map((item, i) => {
        return `<div class="game__option" data-origin="${item.uniqueOrigin}">
                  <img src="${item.url}" alt="Option ${++i}" data-origin="${item.origin}">
                </div>`;
      }).join(``);
      break;

    default:
      throw new Error(`'type' key (TYPE_RADIO or TYPE_PICTURE) must be set in games Array (gamedata.js)`);
  }

  return templateString;
}
