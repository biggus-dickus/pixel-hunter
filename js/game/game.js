import {games, recordedAnswers, INCORRECT_ANSWER_FLAG} from '../data/gamedata';
import insertTemplate from '../utils/insert-template';
import GameView from './game-view';
import renderNextScreen from '../utils/render-next-screen';
import {collectAnswerTypes, processUserAnswers} from '../utils/collect-and-process-answers';
import ScreenPresenter from '../screen';

let gameScreen = 0;
let timer;
export {timer};

export default class GameScreen extends ScreenPresenter {
  constructor() {
    super();
    this._time = this._state.time;
    this._view = new GameView(this._state);

    this._statsCounter = {
      livesCount: this._state.lives
    };

    timer = setInterval(() => {
      this._time--;

      if (this._time === 0) {
        this._stopTimer();
        this._statsCounter.livesCount--;
        recordedAnswers.push(INCORRECT_ANSWER_FLAG);
        GameScreen._incrementGameScreen();
        renderNextScreen(gameScreen, this._statsCounter, this._state.gameNumber);
      }
    }, 1000);
  }

  init() {
    const userAnswers = [];

    insertTemplate(this._view.element);

    gameScreen = (this._state.gameNumber === 0) ? 0 : gameScreen;

    this._view.onFormClick = (evt) => {
      collectAnswerTypes(evt, this._state, userAnswers);

      if (this._view.formElem.checkValidity()) {
        processUserAnswers(userAnswers, this._stopTimer(), this._statsCounter);
        GameScreen._incrementGameScreen();
        renderNextScreen(gameScreen, this._statsCounter, this._state.gameNumber);
      }
    };
  }

  _stopTimer() {
    clearInterval(timer);
    return this._time;
  }

  static _incrementGameScreen() {
    gameScreen++;

    if (gameScreen === games.length) {
      gameScreen = 0;
    }
  }
}
