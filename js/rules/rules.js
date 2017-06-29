import {views} from '../data/gamedata';
import routes from '../main';
import RulesView from './rules-view';
import insertTemplate from '../utils/insert-template';
import ScreenPresenter from '../screen';
import gameState from '../game-state';


export default class RulesScreen extends ScreenPresenter {
  constructor() {
    super();
    this._view = new RulesView();
  }

  init() {
    insertTemplate(this._view.element);

    this._view.onFormInput = () => {
      this._view.submit.disabled = !this._view.form.checkValidity();
    };

    this._view.onFormSubmit = () => {
      gameState.changeState({template: views.game});
      location.hash = routes.GAME;
    };
  }
}
