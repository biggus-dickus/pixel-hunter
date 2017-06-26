import {initialState} from './data/gamedata';


export default class ScreenPresenter {
  constructor(state = initialState) {
    this._state = state;
  }

  init() {
    throw new Error(`init() is an abstract method, which must be implemented in descendant.`);
  }
}
