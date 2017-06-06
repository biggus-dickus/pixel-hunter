import {initialState, games} from '../gamedata';
import getElementFromTemplate from '../get-element-from-template';
import insertTemplate from '../insert-template';
import renderInfoBar from './partials/info-bar';
import renderStatusBar from './partials/status-bar';
import renderStats from './stats';


const renderGame = (currentGame, currentState) => {
  const template = getElementFromTemplate(`
    <div class="game">
      <p class="game__task">${currentGame.task}</p>
      <form class="game__content ${currentGame.classModifier}">
        ${currentGame.options.join(``)}
      </form>
    </div>`);

  const game = template.querySelector(`.game`);
  const form = template.querySelector(`.game__content`);

  // Header
  template.insertBefore(renderInfoBar(initialState), template.childNodes[0]);

  // Footer
  if (currentState) {
    game.appendChild(renderStatusBar(currentState));
  } else {
    game.appendChild(renderStatusBar(initialState));
  }

  form.addEventListener(`click`, () => {
    if (form.checkValidity()) {
      renderNextScreen(currentGame.gameNumber);
      form.reset();
    }
  });


  /**
   * Renders next game screen or results (based on supplied game screen number).
   * This number is then used to override the initialState.game, while copying all other properties.
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
