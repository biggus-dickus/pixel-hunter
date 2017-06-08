import {initialState, games, TYPE_RADIO, TYPE_PICTURE} from '../gamedata';
import getElementFromTemplate from '../get-element-from-template';
import insertTemplate from '../insert-template';
import renderInfoBar from './partials/info-bar';
import renderStatusBar from './partials/status-bar';
import renderStats from './stats';


const renderGame = (state) => {
  const template = getElementFromTemplate(`
    <div class="game">
      <p class="game__task">${state.currentGame.task}</p>
      <form class="game__content ${state.currentGame.classModifier}">
        ${renderGameOptions(state.currentGame.type)}
      </form>
    </div>`);

  function renderGameOptions(type) {
    let templateString;

    switch (type) {
      case TYPE_RADIO:
        templateString = state.currentGame.picUrls.map((url, i) => {
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
        templateString = state.currentGame.picUrls.map((url, i) => {
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
      renderNextScreen(state.currentGame.gameNumber);
      formElem.reset();
    }
  });


  /**
   * Renders next game screen or results (based on supplied game screen number).
   * This number is then used to override the specified initialState properties, while copying all others.
   * @param {number} gameNumber
   */
  function renderNextScreen(gameNumber) {
    gameNumber++;

    if (gameNumber < games.length) {
      state = Object.assign({}, initialState, {
        currentGame: games[gameNumber],
        correctAnswers: gameNumber // all answers are correct for now
      });
      insertTemplate(renderGame(state));
    } else {
      insertTemplate(renderStats());
    }
  }

  return template;
};

export default renderGame;
