import {views, initialState} from '../data/gamedata';
import GreetingView from './greeting-view';
import insertTemplate from '../utils/insert-template';
import renderRules from './rules';
import renderStats from './stats';


export default (state) => {
  const greeting = new GreetingView();

  // Go to rules
  greeting.onProceedBtnClick = () => {
    state = Object.assign({}, initialState, {
      template: views.rules
    });

    insertTemplate(renderRules(state));
  };

  // Go to stats
  greeting.onStatsBtnClick = () => {
    state = Object.assign({}, initialState, {
      template: views.stats
    });

    insertTemplate(renderStats(state));
  };

  return greeting.element;
};
