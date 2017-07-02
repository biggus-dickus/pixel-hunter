import insertTemplate from '../utils/insert-template';
import StatsView from './stats-view';
import ScreenPresenter from '../screen';
import App from '../main';
import Spinner from '../utils/spinner';


export default class StatsScreen extends ScreenPresenter {
  constructor(playerName) {
    super();
    this.playerName = playerName;
  }

  onRequestError() {
    Spinner.hide();
    this._view = new StatsView(this._state);
    insertTemplate(this._view.element);
  }

  init() {
    App.downloadStats(this.playerName)
      .then((data) => this._collectStats(data))
      .then(() => Spinner.hide())
      .then(() => insertTemplate(this._view.element))
      .catch((e) => this.onRequestError());
  }

  _collectStats(data) {
    this._state.serverStats = data;
    this._view = new StatsView(this._state);
  }
}
