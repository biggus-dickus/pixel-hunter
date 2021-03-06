import {views, ControllerID, games} from '../data/gamedata';
import App from '../main';
import Game from '../game/game';
import gameState from '../game-state';
import Spinner from './spinner';


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
  } else if (count === gameState.props.gamesTotal && gameState.props.lives > 0) {
    const dataToSend = {
      stats: gameState.props.playerAnswers,
      lives: gameState.props.lives
    };

    Spinner.show();
    gameState.changeState({
      template: views.stats,
      victory: true
    });

    // Stats is sent to server only if player has won
    App.uploadStats(dataToSend, gameState.props.player)
      .then(() => Spinner.hide())
      .then(() => App.goTo(ControllerID.STATS));
  } else {
    gameState.changeState({template: views.stats});
    App.goTo(ControllerID.STATS);
  }
};
