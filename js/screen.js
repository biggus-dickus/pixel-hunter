import gameState from './game-state';


export default class ScreenPresenter {
  constructor() {
    this._state = gameState.props;
  }

  init() {
    throw new Error(`init() is an abstract method, which must be implemented in descendant.`);
  }
}
