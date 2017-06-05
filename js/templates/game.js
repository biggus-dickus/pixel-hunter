import {initialState, games} from '../gamedata';
import getElementFromTemplate from '../get-element-from-template';
import insertTemplate from '../insert-template';
import renderInfoBar from './partials/info-bar';
import renderStatusBar from './partials/status-bar';
import renderStats from './stats';


const renderGame = (state) => {
  const template = getElementFromTemplate(`
    <div class="game">
      <p class="game__task">${state.task}</p>
      <form class="game__content ${state.classModifier}">
        ${state.options.join(``)}
      </form>
    </div>`);

  const game = template.querySelector(`.game`);
  const form = template.querySelector(`.game__content`);

  template.insertBefore(renderInfoBar(initialState), template.childNodes[0]); // header
  game.appendChild(renderStatusBar(initialState, state)); // footer

  form.addEventListener(`click`, () => {
    if (form.checkValidity()) {
      renderNextScreen(state.gameNumber);
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
      const newState = Object.assign({}, initialState, {
        currentGame: gameNumber,
        correctAnswers: gameNumber // all answers are correct for now
      });
      insertTemplate(renderGame(games[newState.currentGame]));
    } else {
      insertTemplate(renderStats());
    }
  }

  return template;
};

export default renderGame;
