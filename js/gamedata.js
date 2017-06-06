import getRandomPic from './pic-randomizer';

const picsCollection = {
  paintings: [
    `//k42.kn3.net/CF42609C8.jpg`,
    `//k42.kn3.net/D2F0370D6.jpg`,
    `//k32.kn3.net/5C7060EC5.jpg`,
    `//zelslonik.info/files/4633/%D0%B3%D0%B0%D1%83%D0%BF%D1%82%D0%B2%D0%B0%D1%85%D1%82%D0%B0-%D0%B0%D0%BA%D0%B2%D0%B0%D1%80%D0%B5%D0%BB%D1%8C-%D1%80%D0%B8%D1%81%D1%83%D0%BD%D0%BE%D0%BA.jpg`,
    `//lurkmore.so/images/b/b0/Hands_resist_him.jpg`,
    `//cdn.fishki.net/upload/post/201401/24/1240025/013.jpg`
  ],
  photos: [
    `//i.imgur.com/1KegWPz.jpg`,
    `//i.imgur.com/DiHM5Zb.jpg`,
    `//i.imgur.com/DKR1HtB.jpg`,
    `//zelslonik.info/files/3236/14188500266250.jpg`,
    `//lurkmore.so/images/c/c8/Krestianka.jpg`,
    `//img.artlebedev.ru/kovodstvo/idioteka/i/A56D4759-9566-44D4-9D9D-568C0AFAC5A5.jpg`
  ]
};

const games = [
  {
    task: `Угадайте для каждого изображения, фото это или рисунок?`,
    classModifier: ``,
    picUrls: [getRandomPic(`paintings`), getRandomPic(`photos`)]
  },
  {
    task: `Угадай, фото или рисунок?`,
    classModifier: `game__content--wide`,
    picUrls: [getRandomPic(`paintings`)]
  },
  {
    task: `Найдите рисунок среди изображений`,
    classModifier: `game__content--triple`,
    picUrls: [getRandomPic(`photos`), getRandomPic(`paintings`), getRandomPic(`photos`)]
  }
];

const initialState = Object.freeze({
  currentGame: 0,
  gamesTotal: games.length,
  lives: 3,
  time: 30,
  correctAnswers: 0,
  incorrectAnswers: 0,
  slowAnswers: 0,
  fastAnswers: 0
});

export {initialState, picsCollection, games};
