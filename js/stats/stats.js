import insertTemplate from '../utils/insert-template';
import StatsView from './stats-view';
import ScreenPresenter from '../screen';


export default class StatsScreen extends ScreenPresenter {
  constructor() {
    super();
    this._view = new StatsView(this._state);
  }

  init() {
    insertTemplate(this._view.element);
  }
}
