import {views, recordedAnswers} from '../data/gamedata';
import routes from '../main';
import BackToStartView from './back-to-start-view';
import gameState from '../game-state';


export default () => {
  const goBack = new BackToStartView();

  goBack.onBtnClick = () => {
    if (window.gameTimer) {
      window.clearInterval(window.gameTimer);
    }

    recordedAnswers.length = 0;
    gameState.changeState({template: views.greeting});
    location.hash = routes.GREETING;
  };

  return goBack.element;
};
