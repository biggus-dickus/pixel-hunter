import {initialState, views, ControllerID, recordedAnswers} from '../data/gamedata';
import App from '../main';
import BackToStartView from './back-to-start-view';
import gameState from '../game-state';


export default () => {
  const goBack = new BackToStartView();

  goBack.onBtnClick = () => {
    if (window.gameTimer) {
      window.clearInterval(window.gameTimer);
    }

    recordedAnswers.length = 0;
    gameState.changeState(initialState);
    gameState.changeState({template: views.greeting});

    App.goTo(ControllerID.GREETING);
  };

  return goBack.element;
};
