import {initialState} from './data/gamedata';


export default class ScreenPresenter {
  constructor(state = initialState) {
    this._state = state;
  }
}
