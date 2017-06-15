import {TYPE_PICTURE} from '../data/gamedata';


/**
 * Collect and return an array with user answers, which will be used for comparison with correct answers.
 *
 * @param {Object} e - DOM event
 * @param {Object} state - current game state
 * @param {Array} arr - array to push answers into
 * @return {Array}
 */
const collectUserAnswers = (e, state, arr) => {
  let event = e.target;

  switch (event.tagName) {
    case `INPUT`:
      arr.push(event.value);
      if (state.gameType.isOptionBlockable) {
        blockInputsOnAnswer(event);
      }
      break;

    case `DIV`:
      if (state.gameType.type === TYPE_PICTURE) {
        arr.push(event.firstElementChild.dataset.origin);
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

    for (let i = 0; i < options.length; i++) {
      options[i].disabled = true;
    }
  }

  return arr;
};


/**
 * Stringify and compare two arrays of answers.
 * @param {Array} benchmarkArr
 * @param {Array} suppliedArr
 * @return {Boolean}
 */
const checkForCorrectAnswer = (benchmarkArr, suppliedArr) => {
  if (benchmarkArr.sort().join(``) === suppliedArr.sort().join(``)) {
    return true;
  }

  return null;
};

export {collectUserAnswers, checkForCorrectAnswer};
