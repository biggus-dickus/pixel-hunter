import {initialState, views, recordedAnswers} from '../data/gamedata';
import BackToStartView from './back-to-start-view';
import insertTemplate from '../utils/insert-template';
import renderGreeting from '../greeting/greeting';


export default () => {
  const goBack = new BackToStartView();

  const state = Object.assign({}, initialState, {
    template: views.greeting
  });

  goBack.onBtnClick = () => {
    recordedAnswers.length = 0;
    insertTemplate(renderGreeting(state));
  };

  return goBack.element;
};
