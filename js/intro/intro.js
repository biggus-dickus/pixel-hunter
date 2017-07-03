import IntroView from './intro-view';
import insertTemplate from '../utils/insert-template';
import ScreenPresenter from '../screen';


export default class IntroScreen extends ScreenPresenter {
  constructor() {
    super();
    this._view = new IntroView();
  }

  init() {
    insertTemplate(this._view.element);
  }
}
