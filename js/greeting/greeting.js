import {views, ControllerID} from '../data/gamedata';
import App from '../main';
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
      App.goTo(ControllerID.RULES);
    };

    // Go to stats (best results)
    this._view.onStatsBtnClick = () => {
      gameState.changeState({template: views.stats});
      App.goTo(ControllerID.STATS);
    };
  }
}
