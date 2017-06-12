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

const TYPE_RADIO = `radio_game`;
const TYPE_PICTURE = `picture_game`;

const games = [
  {
    type: TYPE_RADIO,
    task: `Угадайте для каждого изображения, фото это или рисунок?`,
    classModifier: ``,
    requiredOrigin: ``,
    options: 2
  },
  {
    type: TYPE_RADIO,
    task: `Угадай, фото или рисунок?`,
    classModifier: `game__content--wide`,
    requiredOrigin: ``,
    options: 1
  },
  {
    type: TYPE_PICTURE,
    task: `Найдите рисунок среди изображений`,
    classModifier: `game__content--triple`,
    requiredOrigin: `paintings`,
    options: 3
  }
];

const initialState = Object.freeze({
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

export {initialState, picsCollection, games, TYPE_RADIO, TYPE_PICTURE};
