const main = document.querySelector(`main.central`);

/**
 * Insert all template contents into provided DOM node (<main> by default).
 * @param {Element} templateContents
 * @param {Element} container
 */
export default (templateContents, container = main) => {
  container.innerHTML = ``;
  container.appendChild(templateContents);
};
