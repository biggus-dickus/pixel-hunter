const picsCollection = {
  paintings: [
    `//k42.kn3.net/CF42609C8.jpg`,
    `//k42.kn3.net/D2F0370D6.jpg`,
    `//k32.kn3.net/5C7060EC5.jpg`,
    `//i.imgur.com/pvXnNvI.jpg`,
    `//lurkmore.so/images/b/b0/Hands_resist_him.jpg`,
    `//cdn.fishki.net/upload/post/201401/24/1240025/013.jpg`,
    `//i.imgur.com/7Upp0rL.jpg`
  ],
  photos: [
    `//i.imgur.com/1KegWPz.jpg`,
    `//i.imgur.com/DiHM5Zb.jpg`,
    `//i.imgur.com/DKR1HtB.jpg`,
    `//i.imgur.com/uPk6m0M.jpg`,
    `//lurkmore.so/images/c/c8/Krestianka.jpg`,
    `//img.artlebedev.ru/kovodstvo/idioteka/i/A56D4759-9566-44D4-9D9D-568C0AFAC5A5.jpg`,
    `//lurkmore.so/images/9/91/Tulpachumachechiy.jpg`
  ]
};

const TYPE_RADIO_1 = `Выбор типа представленного изображения.`;
const TYPE_RADIO_2 = `Выбор типа для каждого из двух вариантов: фотографии или фотореалистичного рисунка.`;
const TYPE_PICTURE = `Выбор из трех вариантов изображения одного типа: фотографии или фотореалистичного рисунка.`;

const CORRECT_ANSWER_FLAG = `correct`;
const INCORRECT_ANSWER_FLAG = `incorrect`;

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
  template: `intro`,
  gameType: games[0],
  gameNumber: 0,
  gamesTotal: 10,
  lives: 3,
  time: 30,
  correctAnswers: 0,
  incorrectAnswers: 0,
  slowAnswers: 0,
  fastAnswers: 0
});

const rates = {
  correctAnswerPoints: 100,
  slowAnswerPoints: 50,
  fastAnswerPoints: 50,
  lifeBonusPoints: 50
};

export {initialState, picsCollection, games, rates, TYPE_RADIO_1, TYPE_RADIO_2, TYPE_PICTURE, CORRECT_ANSWER_FLAG, INCORRECT_ANSWER_FLAG};
