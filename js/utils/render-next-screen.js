import {views, games} from '../data/gamedata';
import routes from '../main';
import Game from '../game/game';
import gameState from '../game-state';


/**
 * Renders next game screen or results (based on supplied game screen number; if there are lives left).
 * @param {number} currentScreen (if > 3, will be turned to 0)
 * @param {Object} newState
 * @param {number} count
 */
export default (currentScreen, newState, count) => {
  count++;

  gameState.changeState({
    template: views.game,
    gameType: games[currentScreen],
    gameNumber: count,
    lives: newState.livesCount,
    correctAnswers: newState.correctCount,
    incorrectAnswers: newState.incorrectCount,
    slowAnswers: newState.slowCount,
    fastAnswers: newState.fastCount
  });

  if (count < gameState.props.gamesTotal && gameState.props.lives > 0) {
    new Game(gameState).init();
  } else {
    gameState.changeState({template: views.stats});
    location.hash = routes.STATS;
  }
};
