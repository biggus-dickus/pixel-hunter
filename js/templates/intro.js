import getElementFromTemplate from '../getElementFromTemplate.js';
import insertTemplate from '../insertTemplate.js';
import greeting from './greeting.js';

const template = getElementFromTemplate(`
  <div id="main" class="central__content">
    <div id="intro" class="intro">
      <h1 class="intro__asterisk">*</h1>
      <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
    </div>
  </div>`);

const startBtn = template.querySelector(`.intro__asterisk`);

startBtn.addEventListener(`click`, () => insertTemplate(greeting));

export default template;
