import {views} from '../data/gamedata';
import IntroView from './intro-view';
import insertTemplate from '../utils/insert-template';
import ScreenPresenter from '../screen';
import App from '../main';


export default class IntroScreen extends ScreenPresenter {
  constructor() {
    super();
    this._view = new IntroView();
  }

  init() {
    insertTemplate(this._view.element);

    this._view.onStartClick = () => {
      this._state = Object.assign({}, this._state, {
        template: views.greeting
      });

      App.showGreeting(this._state);
    };
  }
}
