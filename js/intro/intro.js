import {views, initialState} from '../data/gamedata';
import IntroView from './intro-view';
import insertTemplate from '../utils/insert-template';
import App from '../main';


export default class IntroScreen {
  constructor(state = initialState) {
    this._view = new IntroView();
    this._state = state;
  }

  init() {
    insertTemplate(this._view.element);

    this._view.onStartClick = () => {
      this._state = Object.assign({}, initialState, {
        template: views.greeting
      });

      App.showGreeting(this._state);
    };
  }
}
