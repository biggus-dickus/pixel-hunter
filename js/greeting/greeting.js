import {views} from '../data/gamedata';
import GreetingView from './greeting-view';
import insertTemplate from '../utils/insert-template';
import ScreenPresenter from '../screen';
import App from '../main';


export default class GreetingScreen extends ScreenPresenter {
  constructor(state) {
    super(state);
    this._view = new GreetingView();
  }

  init() {
    insertTemplate(this._view.element);

    // Go to rules
    this._view.onProceedBtnClick = () => {
      this._state = Object.assign({}, this._state, {
        template: views.rules
      });

      App.showRules(this._state);
    };

    // Go to stats
    this._view.onStatsBtnClick = () => {
      this._state = Object.assign({}, this._state, {
        template: views.stats
      });

      App.showStats(this._state);
    };
  }
}
