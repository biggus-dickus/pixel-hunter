import {initialState, games, TYPE_RADIO_1, TYPE_RADIO_2, TYPE_PICTURE} from '../data/gamedata';
import getRandomPic from '../utils/pic-randomizer';
import getElementFromTemplate from '../utils/get-element-from-template';
import insertTemplate from '../utils/insert-template';
import renderInfoBar from './partials/info-bar';
import renderStatusBar from './partials/status-bar';
import renderStats from './stats';
import {collectAnswerTypes, checkForCorrectAnswer} from '../utils/collect-and-check-answers';


let gameScreen = 0;

const renderGame = (state) => {
  const userAnswers = [];

  let correctCount = state.correctAnswers;
  let incorrectCount = state.incorrectAnswers;
  let livesCount = state.lives;

  const template = getElementFromTemplate(`
    <div class="game">
      <p class="game__task">${state.gameType.task}</p>
      <form class="game__content ${state.gameType.classModifier}">
        ${renderGameOptions(state.gameType.type)}
      </form>
    </div>`);

  function renderGameOptions(type) {
    let templateString;
    let randomPics = getRandomPic(state.gameType.options, type);

    switch (type) {
      case TYPE_RADIO_1:
      case TYPE_RADIO_2:
        templateString = randomPics.map((item, i) => {
          return `<div class="game__option">
                    <img src="${item.url}" data-origin="${item.origin}" alt="Option ${++i}">
                    <input id="photo-${i}" name="question-${i}" type="radio" value="photos" required>
                    <label for="photo-${i}" class="game__answer game__answer--photo">Фото</label>
                    <input id="paintings-${i}" name="question-${i}" type="radio" value="paintings" required>
                    <label for="paintings-${i}" class="game__answer game__answer--paint">Рисунок</label>
                  </div>`;
        }).join(``);
        break;

      case TYPE_PICTURE:
        templateString = randomPics.map((item, i) => {
          return `<div class="game__option" data-origin="${item.origin}">
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
    collectAnswerTypes(evt, state, userAnswers);

    if (formElem.checkValidity()) {
      processUserAnswers(userAnswers);
      gameScreen++;
      renderNextScreen(state.gameNumber);
      formElem.reset();
    }
  });

  /**
   * Process correct and incorrect answers and change vars from closure, which will be used to modify game state.
   * @param {Array} receivedAnswers
   */
  function processUserAnswers(receivedAnswers) {
    if (checkForCorrectAnswer(receivedAnswers)) {
      correctCount++;
    } else {
      incorrectCount++;
      livesCount--;
    }
  }


  /**
   * Renders next game screen or results (based on supplied game screen number; if there are lives left).
   * @param {number} count
   */
  function renderNextScreen(count) {
    count++;

    if (gameScreen >= games.length) {
      gameScreen = 0;
    }

    if (count < state.gamesTotal && livesCount > 0 && state.time > 0) {
      state = Object.assign({}, initialState, {
        gameType: games[gameScreen],
        gameNumber: count,
        lives: livesCount,
        correctAnswers: correctCount,
        incorrectAnswers: incorrectCount
      });
      insertTemplate(renderGame(state));
    } else {
      insertTemplate(renderStats(state));
      gameScreen = 0;
    }
  }

  return template;
};

export default renderGame;
