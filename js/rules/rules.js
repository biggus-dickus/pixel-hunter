import {views} from '../data/gamedata';
import RulesView from './rules-view';
import insertTemplate from '../utils/insert-template';
import ScreenPresenter from '../screen';
import App from '../main';


export default class RulesScreen extends ScreenPresenter {
  constructor(state) {
    super(state);
    this._view = new RulesView();
  }

  init() {
    insertTemplate(this._view.element);

    this._view.onFormInput = () => {
      this._view.submit.disabled = !this._view.form.checkValidity();
    };

    this._view.onFormSubmit = () => {
      this._state = Object.assign({}, this._state, {
        template: views.game
      });

      App.showGame(this._state);
    };
  }
}
