import {views} from '../data/gamedata';
import routes from '../main';
import GreetingView from './greeting-view';
import insertTemplate from '../utils/insert-template';
import ScreenPresenter from '../screen';
import gameState from '../game-state';


export default class GreetingScreen extends ScreenPresenter {
  constructor() {
    super();
    this._view = new GreetingView();
  }

  init() {
    insertTemplate(this._view.element);

    // Go to rules
    this._view.onProceedBtnClick = () => {
      gameState.changeState({template: views.rules});
      location.hash = routes.RULES;
    };

    // Go to stats
    this._view.onStatsBtnClick = () => {
      gameState.changeState({template: views.stats});
      location.hash = routes.STATS;
    };
  }
}
