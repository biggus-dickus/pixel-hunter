import {initialState, views, ControllerID} from '../data/gamedata';
import App from '../main';
import BackToStartView from './back-to-start-view';
import Stats from '../stats/stats';
import gameState from '../game-state';
import {timer} from '../game/game';


export default (state) => {
  const goBack = new BackToStartView();

  goBack.onBtnClick = () => {
    if (timer) {
      clearInterval(timer);
    }

    if (state) {
      state.playerAnswers.length = 0;
    }

    gameState.changeState(initialState);
    gameState.changeState({template: views.greeting});
    new Stats().clearData();

    App.goTo(ControllerID.GREETING);
  };

  return goBack.element;
};
