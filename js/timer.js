import {initialState} from './gamedata';

/**
 * Sets game timer and injects current value into the specified DOM node.
 * @param {Element} node
 * @param {number} time (30 seconds by default)
 */
export default (node, time = initialState.time) => {
  const interval = setInterval(() => {
    time--;

    if (time <= 5) {
      node.classList.add(`game__timer--flashing`);

      if (time === 0) {
        node.classList.remove(`game__timer--flashing`);
        node.classList.add(`game__timer--timeup`);
        clearInterval(interval);
      }
    }

    node.innerHTML = `${time}`;
  }, 1000);
};
