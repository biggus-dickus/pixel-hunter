import {initialState} from '../../data/gamedata';
import getElementFromTemplate from '../../utils/get-element-from-template';
import insertTemplate from '../../utils/insert-template';
import renderGreeting from '../greeting';


export default () => {
  const template = getElementFromTemplate(`<div class="header__back" title="В начало игры">
    <span class="back">
       <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
       <img src="img/logo_small.png" width="101" height="44">
     </span>
   </div>`);

  const btnBack = template.querySelector(`.header__back`);
  const state = Object.assign({}, initialState, {
    template: `greeting`
  });

  btnBack.addEventListener(`click`, () => insertTemplate(renderGreeting(state)));

  return template;
};
