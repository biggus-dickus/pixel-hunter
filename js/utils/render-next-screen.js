import {views, ControllerID, games} from '../data/gamedata';
import App from '../main';
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
    lives: newState.livesCount
  });

  if (count < gameState.props.gamesTotal && gameState.props.lives > 0) {
    new Game(gameState).init();
  } else {
    gameState.changeState({template: views.stats});
    App.goTo(ControllerID.STATS);
  }
};
