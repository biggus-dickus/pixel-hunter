(function () {
  const main = document.querySelector(`main.central`);
  const templates = document.querySelectorAll(`template`);

  window.addEventListener(`keydown`, (evt) => {
    if (evt.altKey && evt.keyCode === 39) {
      let currentStep = 0;

      while (main.firstChild) {
        main.removeChild(main.firstChild);
      }

      main.appendChild(templates[currentStep].content.children[0].cloneNode(true));
      currentStep++;

      if (currentStep > templates.length || currentStep < 0) {
        return;
      }
    }

    // function iterateThroughElement(elem) {
    //   for (let i = 0; i < elem.length; i++) {
    //     return elem[i];
    //   }
    // }
  });
})();
