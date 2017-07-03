import {timer} from '../game/game';
import insertTemplate from '../utils/insert-template';
import StatsView from './stats-view';
import ScreenPresenter from '../screen';
import App from '../main';
import Spinner from '../utils/spinner';


export default class StatsScreen extends ScreenPresenter {
  constructor(playerName) {
    super();
    this._state.playerName = playerName;
  }

  _localInit() {
    Spinner.hide();
    this._view = new StatsView(this._state);
    insertTemplate(this._view.element);
  }

  init() {
    if (timer) {
      clearInterval(timer);
    }

    if (this._state.playerName) {
      Spinner.show();

      App.downloadStats(this._state.playerName)
        .then((data) => this._collectStats(data))
        .then(() => insertTemplate(this._view.element))
        .then(() => Spinner.hide())
        .catch((e) => this._localInit());
    } else {
      this._localInit();
    }
  }

  clearData() {
    delete this._state.serverStats;
    delete this._state.playerName;
  }

  _collectStats(data) {
    this._state.serverStats = data;
    this._view = new StatsView(this._state);
  }
}
