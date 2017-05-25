(function () {
  const main = document.querySelector(`main.central`);
  const templates = document.querySelectorAll(`template`);
  let currentStep = 0;

  document.addEventListener(`keydown`, (evt) => {
    if (evt.altKey && evt.keyCode === 39) {
      evt.preventDefault();
      currentStep++;

      if (currentStep < templates.length) {
        while (main.firstChild) {
          main.removeChild(main.firstChild);
        }

        console.log(currentStep);

        insertTemplateContents(currentStep);

      } else {
        return;
      }
    }

    if (evt.altKey && evt.keyCode === 37) {
      evt.preventDefault();
      currentStep--;

      if (currentStep > 0) {
        while (main.firstChild) {
          main.removeChild(main.firstChild);
        }

        console.log(currentStep);
        insertTemplateContents(currentStep);
      } else {
        return;
      }
    }
  });

  function insertTemplateContents(id) {
    for (let i = 0; i < templates[id].content.children.length; i++) {
      main.appendChild(templates[id].content.children[i].cloneNode(true));
    }
  }
})();
