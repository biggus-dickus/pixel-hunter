const main = document.querySelector(`main.central`);

/**
 * Insert all template contents into provided DOM node (<main> by default).
 * @param {Object} templateContents
 * @param {Object} container
 */
export default (templateContents, container = main) => {
  container.innerHTML = ``;
  container.appendChild(templateContents);
};
