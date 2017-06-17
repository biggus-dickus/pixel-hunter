import {TYPE_PICTURE, CORRECT_ANSWER_FLAG, INCORRECT_ANSWER_FLAG} from '../data/gamedata';


/**
 * Process user answers and return a simple array: ['correct', 'incorrect'...]
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

export {collectAnswerTypes, checkForCorrectAnswer};
