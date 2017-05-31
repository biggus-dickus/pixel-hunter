import getElementFromTemplate from '../get-element-from-template';
import insertTemplate from '../insert-template';
import greeting from './greeting';

const template = getElementFromTemplate(`
  <div id="main" class="central__content">
    <div id="intro" class="intro">
      <h1 class="intro__asterisk" title="Начать игру">*</h1>
      <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
    </div>
  </div>`);

const startBtn = template.querySelector(`.intro__asterisk`);

startBtn.addEventListener(`click`, () => insertTemplate(greeting()));

export default template;
