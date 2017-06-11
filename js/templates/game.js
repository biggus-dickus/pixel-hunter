import {initialState, games, TYPE_RADIO, TYPE_PICTURE} from '../data/gamedata';
import getElementFromTemplate from '../get-element-from-template';
import insertTemplate from '../insert-template';
import renderInfoBar from './partials/info-bar';
import renderStatusBar from './partials/status-bar';
import renderStats from './stats';

let gameScreen = 0;

const renderGame = (state) => {
  const template = getElementFromTemplate(`
    <div class="game">
      <p class="game__task">${state.gameType.task}</p>
      <form class="game__content ${state.gameType.classModifier}">
        ${renderGameOptions(state.gameType.type)}
      </form>
    </div>`);

  function renderGameOptions(type) {
    let templateString;

    switch (type) {
      case TYPE_RADIO:
        templateString = state.gameType.pics.map((item, i) => {
          return `<div class="game__option">
                    <img src="${item.url}" alt="Option ${++i}" data-origin="${item.origin}">
                    <label class="game__answer game__answer--photo">
                      <input name="question-${i}" type="radio" value="photos" required>
                      <span>Фото</span>
                    </label>
                    <label class="game__answer game__answer--paint">
                      <input name="question-${i}" type="radio" value="paintings" required>
                      <span>Рисунок</span>
                    </label>
                  </div>`;
        }).join(``);
        break;

      case TYPE_PICTURE:
        templateString = state.gameType.pics.map((item, i) => {
          return `<div class="game__option" data-origin="paintings">
                    <img src="${item.url}" alt="Option ${++i}" data-origin="${item.origin}">
                  </div>`;
        }).join(``);
        break;

      default:
        throw new Error(`'type' key (TYPE_RADIO or TYPE_PICTURE) must be set in games Array (gamedata.js)`);
    }

    return templateString;
  }

  const gameElem = template.querySelector(`.game`);
  const formElem = template.querySelector(`.game__content`);

  template.insertBefore(renderInfoBar(state), template.childNodes[0]); // Header
  gameElem.appendChild(renderStatusBar(state)); // Footer

  formElem.addEventListener(`click`, (evt) => {
    if (evt.target.tagName === `INPUT`) {
      if (evt.target.value === evt.target.parentNode.parentNode.firstElementChild.dataset.origin) {
        console.log(`Correct`);
      } else {
        console.log(`Incorrect`);
      }
    } else if (evt.target.tagName === `IMG` && evt.target.parentNode.hasAttribute(`data-origin`)) {
      if (evt.target.dataset.origin === evt.target.parentNode.dataset.origin) {
        console.log(`Correct`);
      } else {
        console.log(`Incorrect`);
      }
    }

    if (formElem.checkValidity()) {
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
