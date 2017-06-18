import {views, initialState} from '../data/gamedata';
import IntroView from './intro-view';
// import getElementFromTemplate from '../utils/get-element-from-template';
// import insertTemplate from '../utils/insert-template';
// import renderGreeting from './greeting';
//
//
// export default (state) => {
//   const template = getElementFromTemplate(`
//   <div id="main" class="central__content">
//     <div id="intro" class="intro">
//       <h1 class="intro__asterisk" title="Начать игру">*</h1>
//       <p class="intro__motto"><sup>*</sup> Это не&nbsp;фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
//     </div>
//   </div>`);
//
//
//   const startBtn = template.querySelector(`.intro__asterisk`);
//
//   startBtn.addEventListener(`click`, () => {
//     state = Object.assign({}, initialState, {
//       template: views.greeting
//     });
//
//     insertTemplate(renderGreeting(state));
//   });
//
//   return template;
// };
export default (state) => {
  const intro = new IntroView();

  intro.onClick = () => {
    state = Object.assign({}, initialState, {
      template: views.greeting
    });
    console.log(state);
  };

  return intro.element;
};
