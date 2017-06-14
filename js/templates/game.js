import {initialState, games, TYPE_RADIO, TYPE_PICTURE} from '../data/gamedata';
import getRandomPic from '../pic-randomizer';
import getElementFromTemplate from '../get-element-from-template';
import insertTemplate from '../insert-template';
import renderInfoBar from './partials/info-bar';
import renderStatusBar from './partials/status-bar';
import renderStats from './stats';
import collectUserAnswers from '../utils/collect-answers';


let gameScreen = 0;

const renderGame = (state) => {
  const correctAnswers = [];
  const userAnswers = [];

  const template = getElementFromTemplate(`
    <div class="game">
      <p class="game__task">${state.gameType.task}</p>
      <form class="game__content ${state.gameType.classModifier}">
        ${renderGameOptions(state.gameType.type)}
      </form>
    </div>`);

  function renderGameOptions(type) {
    let templateString;
    let randomPics = getRandomPic(state.gameType.options, state.gameType.requiredOrigin);

    switch (type) {
      case TYPE_RADIO:
        templateString = randomPics.map((item, i) => {
          return `<div class="game__option">
                    <img src="${item.url}" alt="Option ${++i}">
                    <input id="photo-${i}" name="question-${i}" type="radio" value="photos" required>
                    <label for="photo-${i}" class="game__answer game__answer--photo">Фото</label>
                    <input id="paintings-${i}" name="question-${i}" type="radio" value="paintings" required>
                    <label for="paintings-${i}" class="game__answer game__answer--paint">Рисунок</label>
                  </div>`;
        }).join(``);

        randomPics.forEach((item) => correctAnswers.push(item.origin));
        break;

      case TYPE_PICTURE:
        templateString = randomPics.map((item, i) => {
          return `<div class="game__option">
                    <img src="${item.url}" alt="Option ${++i}" data-origin="${item.origin}">
                  </div>`;
        }).join(``);

        correctAnswers.push(`paintings`); // spec.md: only paintings is a correct answer for this type of game
        break;

      default:
        throw new Error(`'type' key (TYPE_RADIO or TYPE_PICTURE) must be set in games Array (gamedata.js)`);
    }

    return templateString;
  }

  // console.log(correctAnswers);

  const gameElem = template.querySelector(`.game`);
  const formElem = template.querySelector(`.game__content`);

  template.insertBefore(renderInfoBar(state), template.childNodes[0]); // Header
  gameElem.appendChild(renderStatusBar(state)); // Footer

  formElem.addEventListener(`click`, (evt) => {
    collectUserAnswers(evt, state, userAnswers);

    if (formElem.checkValidity()) {
      // console.log(userAnswers);
      gameScreen++;
      renderNextScreen(state.gameNumber);
      formElem.reset();
    }
  });


  /**
   * Renders next game screen or results (based on supplied game screen number).
   * This number is then used to override the specified initialState properties, while copying all others.
   * @param {number} count
   */
  function renderNextScreen(count) {
    count++;

    if (gameScreen >= games.length) {
      gameScreen = 0;
    }

    if (count < state.gamesTotal) {
      state = Object.assign({}, initialState, {
        gameType: games[gameScreen],
        gameNumber: count,
        correctAnswers: count // all answers are correct for now
      });
      insertTemplate(renderGame(state));
    } else {
      insertTemplate(renderStats());
      gameScreen = 0;
    }
  }

  return template;
};

export default renderGame;
