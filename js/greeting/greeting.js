import {views, initialState} from '../data/gamedata';
import GreetingView from './greeting-view';
import insertTemplate from '../utils/insert-template';
import renderRules from '../rules/rules';
import renderStats from '../stats/stats';


export default class GreetingScreen {
  constructor(state) {
    this._view = new GreetingView();
    this._state = state;
  }

  init() {
    insertTemplate(this._view.element);

    // Go to rules
    this._view.onProceedBtnClick = () => {
      this._state = Object.assign({}, initialState, {
        template: views.rules
      });

      insertTemplate(renderRules(this._state));
    };

    // Go to stats
    this._view.onStatsBtnClick = () => {
      this._state = Object.assign({}, initialState, {
        template: views.stats
      });

      insertTemplate(renderStats(this._state));
    };
  }
}
