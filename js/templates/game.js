import {initialState, games, TYPE_RADIO, TYPE_PICTURE} from '../gamedata';
import getElementFromTemplate from '../get-element-from-template';
import insertTemplate from '../insert-template';
import renderInfoBar from './partials/info-bar';
import renderStatusBar from './partials/status-bar';
import renderStats from './stats';

let gameScreen = 0;

const renderGame = (state) => {
  const template = getElementFromTemplate(`
    <div class="game">
      <p class="game__task">${state.gameType.task}</p>
      <form class="game__content ${state.gameType.classModifier}">
        ${renderGameOptions(state.gameType.type)}
      </form>
    </div>`);

  function renderGameOptions(type) {
    let templateString;

    switch (type) {
      case TYPE_RADIO:
        templateString = state.gameType.picUrls.map((url, i) => {
          return `<div class="game__option">
                  <img src="${url}" alt="Option ${++i}">
                  <label class="game__answer game__answer--photo">
                    <input name="question-${i}" type="radio" value="photo" required>
                    <span>Фото</span>
                  </label>
                  <label class="game__answer game__answer--paint">
                    <input name="question-${i}" type="radio" value="paint" required>
                    <span>Рисунок</span>
                  </label>
                </div>`;
        }).join(``);
        break;

      case TYPE_PICTURE:
        templateString = state.gameType.picUrls.map((url, i) => {
          return `<div class="game__option"><img src="${url}" alt="Option ${++i}"></div>`;
        }).join(``);
    }

    return templateString;
  }

  const gameElem = template.querySelector(`.game`);
  const formElem = template.querySelector(`.game__content`);

  template.insertBefore(renderInfoBar(initialState), template.childNodes[0]); // Header
  gameElem.appendChild(renderStatusBar(state)); // Footer

  formElem.addEventListener(`click`, () => {
    if (formElem.checkValidity()) {
      gameScreen++;
      renderNextScreen(state.gameNumber);
      formElem.reset();
    }
  });


  /**
   * Renders next game screen or results (based on supplied game screen number).
   * This number is then used to override the specified initialState properties, while copying all others.
   * @param {number} count
   */
  function renderNextScreen(count) {
    count++;

    if (gameScreen >= games.length) {
      gameScreen = 0;
    }

    if (count < state.gamesTotal) {
      state = Object.assign({}, initialState, {
        gameType: games[gameScreen],
        gameNumber: count,
        correctAnswers: count // all answers are correct for now
      });
      insertTemplate(renderGame(state));
    } else {
      insertTemplate(renderStats());
      gameScreen = 0;
    }
  }

  return template;
};

export default renderGame;
