import {initialState} from './data/gamedata';


/**
 * Game state is a singleton, which stores all game-related data during the course of the game.
 * It is mutable and passed from screen to screen.
 */
class GameState {
  constructor(state) {
    this.props = state;
  }

  /**
   * Public method used by screens to change some game properties.
   * @param {Object} newState
   */
  changeState(newState) {
    this.props = Object.assign({}, this.props, newState);
  }

  /**
   * Create a collection of image urls of such pattern:
   * [{photos: [url1, url2...]}, {paintings: [url1, url2...]}]
   * @param {Array} pics
   */
  collectPics(pics) {
    this.props = Object.assign({}, this.props, {images: pics});
  }
}

const gameState = new GameState(initialState);

export default gameState;
