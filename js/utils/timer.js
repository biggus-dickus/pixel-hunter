import {initialState} from '../data/gamedata';


/**
 * Sets game timer and injects current value into the specified DOM node.
 * @param {Element} node
 * @param {number} timeLeft (30 seconds by default)
 */
export default (node, timeLeft = initialState.time) => {
  const interval = setInterval(() => {
    timeLeft--;

    if (timeLeft <= 5) {
      node.classList.add(`game__timer--flashing`);

      if (timeLeft === 0) {
        node.classList.remove(`game__timer--flashing`);
        node.classList.add(`game__timer--timeup`);
        clearInterval(interval);
      }
    }

    node.innerHTML = `${timeLeft}`;
  }, 1000);
};
