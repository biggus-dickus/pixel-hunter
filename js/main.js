(function () {
  const main = document.querySelector(`main.central`);
  const templates = [`greeting`, `rules`, `game-1`, `game-2`, `game-3`, `stats`]
    .map((template) => {
      return document.getElementById(`${template}`);
    });

  let currentScreen = 0;


  document.addEventListener(`keydown`, (evt) => {
    if (evt.altKey) {
      evt.preventDefault();

      if (evt.keyCode === 39) {
        showScreen(1);
      } else if (evt.keyCode === 37) {
        showScreen(-1);
      }
    }
  });

  /**
   * Increment counter with provided value, check and restrict its min/max range,
   * then show required screen to user.
   * @param {Number} step
   */
  function showScreen(step) {
    currentScreen += step;

    if (currentScreen === templates.length) {
      currentScreen = templates.length - 1;
      return;
    } else if (currentScreen === -1) {
      currentScreen = 0;
      return;
    }

    cleanNode(main);
    insertTemplateContents(currentScreen);
  }

  /**
   * Clean all children of provided DOM node.
   * @param {Object} node
   */
  function cleanNode(node) {
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
  }

  /**
   * Insert all contents of number-specified DOM template into provided node (<main> by default).
   * @param {Number} templateId
   * @param {Object} container
   */
  function insertTemplateContents(templateId, container = main) {
    let templateContents;

    // Ensure compatibility with IE11-
    if (`content` in templates[templateId]) {
      templateContents = templates[templateId].content.children;
    } else {
      templateContents = templates[templateId].children;
    }

    for (let i = 0; i < templateContents.length; i++) {
      container.appendChild(templateContents[i].cloneNode(true));
    }
  }
})();
