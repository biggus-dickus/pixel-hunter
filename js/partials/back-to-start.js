import {initialState, views, recordedAnswers} from '../data/gamedata';
import BackToStartView from './back-to-start-view';
import App from '../main';


export default () => {
  const goBack = new BackToStartView();

  const state = Object.assign({}, initialState, {
    template: views.greeting
  });

  goBack.onBtnClick = () => {
    recordedAnswers.length = 0;
    App.showGreeting(state);
  };

  return goBack.element;
};
