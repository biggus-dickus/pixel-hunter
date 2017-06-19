/**
 * Return DOM elements based on received markup
 * @param {string} markup
 * @return {Element}
 */
export default (markup) => {
  const template = document.createElement(`template`);
  template.innerHTML = markup;

  return template.content;
};
