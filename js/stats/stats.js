import insertTemplate from '../utils/insert-template';
import StatsView from './stats-view';


export default class StatsScreen {
  constructor(state) {
    this._view = new StatsView(state);
  }

  init() {
    insertTemplate(this._view.element);
  }
}
