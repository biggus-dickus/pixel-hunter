import {games, TYPE_RADIO_1, TYPE_RADIO_2, TYPE_PICTURE} from '../data/gamedata';
import getRandomPic from '../utils/pic-randomizer';
import getElementFromTemplate from '../utils/get-element-from-template';
import renderInfoBar from './partials/info-bar';
import renderStatusBar from './partials/status-bar';
import renderNextScreen from '../utils/render-next-screen';
import {collectAnswerTypes, processUserAnswers} from '../utils/collect-and-process-answers';


let gameScreen = 0;

const renderGame = (state) => {
  const userAnswers = [];

  const statsCounter = {
    correctCount: state.correctAnswers,
    incorrectCount: state.incorrectAnswers,
    fastCount: state.fastAnswers,
    slowCount: state.slowAnswers,
    livesCount: state.lives
  };

  gameScreen = (state.gameNumber === 0) ? 0 : gameScreen;


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
      processUserAnswers(userAnswers, 15, statsCounter);
      incrementGameScreen();
      renderNextScreen(state, gameScreen, statsCounter, state.gameNumber);
      formElem.reset();
    }
  });

  function incrementGameScreen() {
    gameScreen++;

    if (gameScreen >= games.length) {
      gameScreen = 0;
    }
  }

  return template;
};

export default renderGame;
