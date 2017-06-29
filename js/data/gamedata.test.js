import assert from 'assert'; // assert is a built-in NodeJS module
import {initialState, games, views, TYPE_RADIO_1, TYPE_RADIO_2, TYPE_PICTURE, CORRECT_ANSWER_FLAG, INCORRECT_ANSWER_FLAG} from './gamedata';
import {checkForCorrectAnswer, processUserAnswers} from '../utils/collect-and-process-answers';
import getResults from '../utils/calculate-score';
import gameState from '../game-state';


describe(`Game`, () => {
  it(`should contain 10 levels`, () => {
    assert.equal(10, initialState.gamesTotal);
  });


  it(`should give the player three shots (lives) when new game is started`, () => {
    assert.equal(3, initialState.lives);
  });


  it(`should give the player 30 seconds to answer every question`, () => {
    assert.equal(30, initialState.time);
  });


  it(`should have 3 level types: pick either photo or painting out of 3 images; choose type for each of 2 images; choose type for 1 image`, () => {
    const gamesArr = [TYPE_RADIO_1, TYPE_RADIO_2, TYPE_PICTURE];

    for (let game of games) {
      assert.notEqual(-1, gamesArr.indexOf(game.type));
    }
  });


  it(`should let the player make mistakes, but count an answer as incorrect if at least one mistake was made`, () => {
    assert.equal(true, checkForCorrectAnswer([CORRECT_ANSWER_FLAG, CORRECT_ANSWER_FLAG]));
    assert.notEqual(true, checkForCorrectAnswer([CORRECT_ANSWER_FLAG, INCORRECT_ANSWER_FLAG]));
    assert.notEqual(true, checkForCorrectAnswer([INCORRECT_ANSWER_FLAG, INCORRECT_ANSWER_FLAG]));
  });


  it(`should increment the fast answers count if it took the player less than 10 seconds to respond, and the slow answers count if it took more than 20 seconds`, () => {
    const testStats = {
      fastCount: 1,
      slowCount: 3
    };

    // Fast answer test
    processUserAnswers([CORRECT_ANSWER_FLAG, CORRECT_ANSWER_FLAG], 22, testStats);
    assert.equal(2, testStats.fastCount);

    // Slow answer test
    processUserAnswers([CORRECT_ANSWER_FLAG, CORRECT_ANSWER_FLAG], 5, testStats);
    assert.equal(4, testStats.slowCount);
  });

  it(`should show game stats screen when all levels are beaten`, () => {
    gameState.changeState({template: views.stats});
    assert.equal(views.stats, gameState.props.template);
  });

  it(`should subtract from player's lives if an answer is incorrect, and go to stats screen when there are no lives left`, () => {
    const testNewState = {
      livesCount: 2
    };

    processUserAnswers([CORRECT_ANSWER_FLAG, INCORRECT_ANSWER_FLAG], 5, testNewState);
    assert.equal(1, testNewState.livesCount);

    testNewState.livesCount = 0;
    gameState.changeState({template: views.stats});
    assert.equal(views.stats, gameState.props.template);
  });


  it(`should count all stats correctly`, () => {
    const testStats = {
      lives: 2,
      correctAnswers: 0,
      incorrectAnswers: 0,
      fastAnswers: 0,
      slowAnswers: 0
    };
    let score;

    // 9 correct answers
    testStats.correctAnswers = 9;
    score = getResults(testStats);
    assert.equal(900, score.correctPoints);

    // 9 correct, 2 fast answers and a bonus for 2 lives
    testStats.fastAnswers = 2;
    score = getResults(testStats);
    assert.equal(1100, score.total);

    // 4 correct, 1 fast answer, 3 slow answers and a bonus for 1 life
    testStats.correctAnswers = 4;
    testStats.fastAnswers = 1;
    testStats.slowAnswers = 3;
    testStats.lives = 1;
    score = getResults(testStats);
    assert.equal(350, score.total);
  });
});
