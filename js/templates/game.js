import {initialState, games} from '../gamedata';
import getElementFromTemplate from '../get-element-from-template';
import insertTemplate from '../insert-template';
import renderInfoBar from './partials/info-bar';
import renderStatusBar from './partials/status-bar';
import renderStats from './stats';


const renderGame = (game, state) => {
  let currentState = (state) ? state : initialState;

  const template = getElementFromTemplate(`
    <div class="game">
      <p class="game__task">${game.task}</p>
      <form class="game__content ${game.classModifier}">
        ${renderGameOptions(currentState.currentGame)}
      </form>
    </div>`);

  function renderGameOptions(gameNumber) {
    if (gameNumber === 0 || gameNumber === 1) {
      return game.picUrls.map((url, i) => {
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
    } else {
      return game.picUrls.map((url, i) => {
        return `<div class="game__option"><img src="${url}" alt="Option ${++i}"></div>`;
      }).join(``);
    }
  }

  const gameElem = template.querySelector(`.game`);
  const formElem = template.querySelector(`.game__content`);

  template.insertBefore(renderInfoBar(initialState), template.childNodes[0]); // Header
  gameElem.appendChild(renderStatusBar(currentState)); // Footer

  formElem.addEventListener(`click`, () => {
    if (formElem.checkValidity()) {
      renderNextScreen(currentState.currentGame);
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
      currentState = Object.assign({}, initialState, {
        currentGame: gameNumber,
        correctAnswers: gameNumber // all answers are correct for now
      });
      insertTemplate(renderGame(games[currentState.currentGame], currentState));
    } else {
      insertTemplate(renderStats());
    }
  }

  return template;
};

export default renderGame;
