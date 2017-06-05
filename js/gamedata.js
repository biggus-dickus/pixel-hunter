import getRandomPic from './pic-randomizer';

const questions = {
  paintings: [
    `//k42.kn3.net/CF42609C8.jpg`,
    `//k42.kn3.net/D2F0370D6.jpg`,
    `//k32.kn3.net/5C7060EC5.jpg`,
    `//zelslonik.info/files/4633/%D0%B3%D0%B0%D1%83%D0%BF%D1%82%D0%B2%D0%B0%D1%85%D1%82%D0%B0-%D0%B0%D0%BA%D0%B2%D0%B0%D1%80%D0%B5%D0%BB%D1%8C-%D1%80%D0%B8%D1%81%D1%83%D0%BD%D0%BE%D0%BA.jpg`,
    `//lurkmore.so/images/b/b0/Hands_resist_him.jpg`
  ],
  photos: [
    `//i.imgur.com/1KegWPz.jpg`,
    `//i.imgur.com/DiHM5Zb.jpg`,
    `//i.imgur.com/DKR1HtB.jpg`,
    `//zelslonik.info/files/3236/14188500266250.jpg`,
    `//lurkmore.so/images/c/c8/Krestianka.jpg`
  ]
};

const games = [
  {
    gameNumber: 0,
    task: `Угадайте для каждого изображения, фото это или рисунок?`,
    classModifier: ``,
    options: [
      `<div class="game__option">
          <img src="${getRandomPic(`paintings`)}" alt="Option 1">
          <label class="game__answer game__answer--photo">
            <input name="question1" type="radio" value="photo" required>
            <span>Фото</span>
          </label>
          <label class="game__answer game__answer--paint">
            <input name="question1" type="radio" value="paint" required>
            <span>Рисунок</span>
          </label>
        </div>`,
      `<div class="game__option">
          <img src="${getRandomPic(`photos`)}" alt="Option 2">
          <label class="game__answer  game__answer--photo">
            <input name="question2" type="radio" value="photo" required>
            <span>Фото</span>
          </label>
          <label class="game__answer  game__answer--paint">
            <input name="question2" type="radio" value="paint" required>
            <span>Рисунок</span>
          </label>
        </div>`]
  },
  {
    gameNumber: 1,
    task: `Угадай, фото или рисунок?`,
    classModifier: `game__content--wide`,
    options: [
      `<div class="game__option">
        <img src="${getRandomPic(`photos`)}" alt="Option 1">
        <label class="game__answer  game__answer--photo">
          <input name="question1" type="radio" value="photo" required>
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--wide  game__answer--paint">
          <input name="question1" type="radio" value="paint" required>
           <span>Рисунок</span>
        </label>
       </div>`]
  },
  {
    gameNumber: 2,
    task: `Найдите рисунок среди изображений`,
    classModifier: `game__content--triple`,
    options: [
      `<div class="game__option">
        <img src="${getRandomPic(`photos`)}" alt="Option 1">
      </div>
      <div class="game__option  game__option--selected">
        <img src="${getRandomPic(`paintings`)}" alt="Option 2">
      </div>
      <div class="game__option">
        <img src="${getRandomPic(`photos`)}" alt="Option 3">
      </div>`]
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

export {initialState, questions, games};
