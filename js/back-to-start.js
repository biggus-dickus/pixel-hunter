import greeting from './templates/greeting';
import insertTemplate from './insert-template';

/**
 * Check whether the "Back to start" button appeared in DOM and handle the click event.
 * Call this function in templates, which have this button.
 * @param {Element} node
 */
export default function clickHandler(node) {
  if (node.length !== 0) {
    node.addEventListener(`click`, () => insertTemplate(greeting));
  }
}
