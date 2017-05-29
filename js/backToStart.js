import greeting from './templates/greeting';
import insertTemplate from './insertTemplate';

/**
 * Check whether the "Back to start" button appeared in DOM and handle the click event.
 * Call this function in templates, which have this button.
 * @param {Element} node
 * @param {number} time
 */
export default function findNode(node, time) {
  const interval = setInterval(() => {
    if (node.length !== 0) {
      node.addEventListener(`click`, () => insertTemplate(greeting));
      clearInterval(interval);
    }
  }, time);
}
