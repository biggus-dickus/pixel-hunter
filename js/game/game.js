import {games, recordedAnswers, INCORRECT_ANSWER_FLAG} from '../data/gamedata';
import GameView from './game-view';
import renderNextScreen from '../utils/render-next-screen';
import {collectAnswerTypes, processUserAnswers} from '../utils/collect-and-process-answers';

let gameScreen = 0;

export default(state) => {
  const userAnswers = [];

  const statsCounter = {
    correctCount: state.correctAnswers,
    incorrectCount: state.incorrectAnswers,
    fastCount: state.fastAnswers,
    slowCount: state.slowAnswers,
    livesCount: state.lives
  };

  let time = state.time;

  const interval = setInterval(() => {
    time--;

    if (time === 0) {
      clearInterval(interval);
      statsCounter.incorrectCount++;
      statsCounter.livesCount--;
      recordedAnswers.push(INCORRECT_ANSWER_FLAG);
      incrementGameScreen();
      renderNextScreen(state, gameScreen, statsCounter, state.gameNumber);
    }
  }, 1000);

  function getTime() {
    clearInterval(interval);
    return time;
  }

  const game = new GameView(state);

  const formElem = game.element.querySelector(`.game__content`);

  gameScreen = (state.gameNumber === 0) ? 0 : gameScreen;

  game.onFormClick = (evt) => {
    collectAnswerTypes(evt, state, userAnswers);

    if (formElem.checkValidity()) {
      processUserAnswers(userAnswers, getTime(), statsCounter);
      incrementGameScreen();
      renderNextScreen(state, gameScreen, statsCounter, state.gameNumber);
    }
  };

  function incrementGameScreen() {
    gameScreen++;

    if (gameScreen === games.length) {
      gameScreen = 0;
    }
  }

  return game.element;
};
