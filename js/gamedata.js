import getRandomPic from './pic-randomizer';

const picsCollection = {
  paintings: [
    `//k42.kn3.net/CF42609C8.jpg`,
    `//k42.kn3.net/D2F0370D6.jpg`,
    `//k32.kn3.net/5C7060EC5.jpg`,
    `//i.imgur.com/pvXnNvI.jpg`,
    `//lurkmore.so/images/b/b0/Hands_resist_him.jpg`,
    `//cdn.fishki.net/upload/post/201401/24/1240025/013.jpg`
  ],
  photos: [
    `//i.imgur.com/1KegWPz.jpg`,
    `//i.imgur.com/DiHM5Zb.jpg`,
    `//i.imgur.com/DKR1HtB.jpg`,
    `//2ch.hk/b/arch/2017-01-10/src/144161951/14840597638600.jpg`,
    `//lurkmore.so/images/c/c8/Krestianka.jpg`,
    `//img.artlebedev.ru/kovodstvo/idioteka/i/A56D4759-9566-44D4-9D9D-568C0AFAC5A5.jpg`
  ]
};

const games = [
  {
    gameNumber: 0,
    alias: `two pics`,
    task: `Угадайте для каждого изображения, фото это или рисунок?`,
    classModifier: ``,
    picUrls: [getRandomPic(`paintings`), getRandomPic(`photos`)]
  },
  {
    gameNumber: 1,
    alias: `one pic`,
    task: `Угадай, фото или рисунок?`,
    classModifier: `game__content--wide`,
    picUrls: [getRandomPic(`paintings`)]
  },
  {
    gameNumber: 2,
    alias: `three pics`,
    task: `Найдите рисунок среди изображений`,
    classModifier: `game__content--triple`,
    picUrls: [getRandomPic(`photos`), getRandomPic(`paintings`), getRandomPic(`photos`)]
  }
];

const initialState = Object.freeze({
  currentGame: games[0],
  gamesTotal: games.length,
  lives: 3,
  time: 30,
  correctAnswers: 0,
  incorrectAnswers: 0,
  slowAnswers: 0,
  fastAnswers: 0
});

export {initialState, picsCollection, games};
