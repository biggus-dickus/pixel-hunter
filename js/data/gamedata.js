const TYPE_RADIO_1 = `Выбор типа представленного изображения.`;
const TYPE_RADIO_2 = `Выбор типа для каждого из двух вариантов: фотографии или фотореалистичного рисунка.`;
const TYPE_PICTURE = `Выбор из трех вариантов изображения одного типа: фотографии или фотореалистичного рисунка.`;

const CORRECT_ANSWER_FLAG = `correct`;
const INCORRECT_ANSWER_FLAG = `wrong`;
const SLOW_ANSWER_FLAG = `slow`;
const FAST_ANSWER_FLAG = `fast`;

const MAX_LIVES = 3;

const recordedAnswers = [];

const views = {
  intro: `intro`,
  greeting: `greeting`,
  rules: `rules`,
  game: `game`,
  stats: `stats`
};

const ControllerID = {
  INTRO: ``,
  GREETING: `greeting`,
  RULES: `rules`,
  GAME: `game`,
  STATS: `stats`,
};

const games = [
  {
    type: TYPE_RADIO_2,
    task: `Угадайте для каждого изображения, фото это или рисунок?`,
    classModifier: ``,
    isOptionBlockable: true,
    options: 2
  },
  {
    type: TYPE_RADIO_1,
    task: `Угадай, фото или рисунок?`,
    classModifier: `game__content--wide`,
    options: 1
  },
  {
    type: TYPE_PICTURE,
    task: `Среди изображений есть только один рисунок или фотография. Найдите его.`,
    classModifier: `game__content--triple`,
    options: 3
  }
];

const initialState = Object.freeze({
  player: `Unknown Raccoon`,
  template: views.intro,
  gameType: games[0],
  gameNumber: 0,
  gamesTotal: 10,
  lives: MAX_LIVES,
  time: 30,
  slowAnswerThreshold: 10,
  fastAnswerThreshold: 20,
  victory: false,
  playerAnswers: []
});

const rates = {
  correctAnswerPoints: 100,
  slowAnswerPoints: 50,
  fastAnswerPoints: 50,
  lifeBonusPoints: 50
};

export {initialState, views, ControllerID, games, rates, TYPE_RADIO_1, TYPE_RADIO_2, TYPE_PICTURE, CORRECT_ANSWER_FLAG, INCORRECT_ANSWER_FLAG, SLOW_ANSWER_FLAG, FAST_ANSWER_FLAG, MAX_LIVES, recordedAnswers};
