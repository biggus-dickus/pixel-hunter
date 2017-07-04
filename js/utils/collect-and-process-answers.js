import {initialState, TYPE_PICTURE, CORRECT_ANSWER_FLAG, INCORRECT_ANSWER_FLAG, SLOW_ANSWER_FLAG, FAST_ANSWER_FLAG, recordedAnswers} from '../data/gamedata';
import gameState from '../game-state';


/**
 * Collect user answers and return a simple array: ['correct', 'incorrect'...]
 *
 * @param {Object} e - DOM event
 * @param {Object} state - current game state
 * @param {Array} arr - array to push results into
 * @return {Array}
 */
const collectAnswerTypes = (e, state, arr) => {
  let event = e.target;

  switch (event.tagName) {
    case `INPUT`:
      event.setAttribute(`checked`, `checked`);
      if (state.gameType.isOptionBlockable) {
        blockInputsOnAnswer(event);
      }

      if (event.value === event.parentNode.children[0].dataset.origin) {
        arr.push(CORRECT_ANSWER_FLAG);
      } else {
        arr.push(INCORRECT_ANSWER_FLAG);
      }
      break;

    case `DIV`:
      if (state.gameType.type === TYPE_PICTURE && event.dataset.origin === event.firstElementChild.dataset.origin) {
        arr.push(CORRECT_ANSWER_FLAG);
      } else {
        arr.push(INCORRECT_ANSWER_FLAG);
      }
      break;

    default: return null;
  }

  /**
   * Block a set of options immediately after an answer has been picked.
   * @param {Element} elem
   */
  function blockInputsOnAnswer(elem) {
    const parent = elem.parentNode;
    const options = parent.querySelectorAll(`input[type="radio"]`);

    for (let option of options) {
      option.disabled = true;
    }
  }

  return arr;
};


/**
 * Check if there are incorrect answers in those supplied by user.
 * @param {Array} arr
 * @return {Boolean}
 */
const checkForCorrectAnswer = (arr) => {
  if (arr.indexOf(INCORRECT_ANSWER_FLAG) === -1) {
    return true;
  }

  return null;
};


/**
 * Process correct and incorrect answers and change current answer stats, which will be used to modify game state.
 * @param {Array} receivedAnswers
 * @param {number} time
 * @param {Object} answerStats
 * @return {Object}
 */
const processUserAnswers = (receivedAnswers, time, answerStats) => {
  if (checkForCorrectAnswer(receivedAnswers)) {

    if (time >= initialState.slowAnswerThreshold && time <= initialState.fastAnswerThreshold) {
      recordedAnswers.push(CORRECT_ANSWER_FLAG);
    } else if (time > initialState.fastAnswerThreshold) {
      recordedAnswers.push(FAST_ANSWER_FLAG);
    } else if (time < initialState.slowAnswerThreshold) {
      recordedAnswers.push(SLOW_ANSWER_FLAG);
    }
  } else {
    answerStats.livesCount--;
    recordedAnswers.push(INCORRECT_ANSWER_FLAG);
  }

  gameState.changeState({playerAnswers: recordedAnswers});

  return answerStats;
};

export {collectAnswerTypes, checkForCorrectAnswer, processUserAnswers};
