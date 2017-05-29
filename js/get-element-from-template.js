/**
 * Return DOM elements based on received markup
 * @param {string} markup
 * @return {Element}
 */
export default (markup) => {
  const wrapper = document.createElement(`div`);
  wrapper.innerHTML = markup;

  return wrapper;
};
