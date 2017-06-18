import {initialState, games} from '../data/gamedata';
import insertTemplate from '../utils/insert-template';
import renderStats from '../templates/stats';
import renderGame from '../templates/game';


/**
 * Renders next game screen or results (based on supplied game screen number; if there are lives left).
 * @param {Object} currentState
 * @param {number} currentScreen (if > 3, will be turned to 0)
 * @param {Object} newState
 * @param {number} count
 */
export default (currentState, currentScreen, newState, count) => {
  count++;

  if (count < currentState.gamesTotal && newState.livesCount > 0 && currentState.time > 0) {
    currentState = Object.assign({}, initialState, {
      template: `game`,
      gameType: games[currentScreen],
      gameNumber: count,
      lives: newState.livesCount,
      correctAnswers: newState.correctCount,
      incorrectAnswers: newState.incorrectCount
    });
    insertTemplate(renderGame(currentState));
  } else {
    currentState.template = `stats`;
    insertTemplate(renderStats(currentState));
  }
};
