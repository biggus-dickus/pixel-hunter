import {views} from '../data/gamedata';
import routes from '../main';
import IntroView from './intro-view';
import insertTemplate from '../utils/insert-template';
import ScreenPresenter from '../screen';
import gameState from '../game-state';


export default class IntroScreen extends ScreenPresenter {
  constructor() {
    super();
    this._view = new IntroView();
  }

  init() {
    insertTemplate(this._view.element);

    this._view.onStartClick = () => {
      gameState.changeState({template: views.greeting});
      location.hash = routes.GREETING;
    };
  }
}
