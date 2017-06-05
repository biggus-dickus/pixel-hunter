import getElementFromTemplate from '../../get-element-from-template';

export default (initialState, currentState) => {
  // return getElementFromTemplate(`<div class="stats">
  //         <ul class="stats">
  //           <li class="stats__result stats__result--wrong"></li>
  //           <li class="stats__result stats__result--slow"></li>
  //           <li class="stats__result stats__result--fast"></li>
  //           <li class="stats__result stats__result--correct"></li>
  //           <li class="stats__result stats__result--unknown"></li>
  //           <li class="stats__result stats__result--unknown"></li>
  //           <li class="stats__result stats__result--unknown"></li>
  //           <li class="stats__result stats__result--unknown"></li>
  //           <li class="stats__result stats__result--unknown"></li>
  //           <li class="stats__result stats__result--unknown"></li>
  //         </ul>
  //       </div>`);


  return getElementFromTemplate(`<div class="stats">
          <ul class="stats">
            ${new Array(initialState.gamesTotal - currentState.gameNumber).fill(`<li class="stats__result stats__result--unknown"></li>`).join(``)}
          </ul>
        </div>`);
};
