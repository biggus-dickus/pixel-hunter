import {rates} from '../data/gamedata';


/**
 * Calculate and return the object with game score and a few captions.
 * @param {Object} gameState
 * @return {Object}
 */
export default (gameState) => {
  const score = {};

  score.caption = (gameState.lives > 0) ? `Победа!` : `POTRACHENO!`;

  score.correctPoints = (gameState.lives > 0) ? gameState.correctAnswers * rates.correctAnswerPoints : `Fail`;

  score.fastPoints = gameState.fastAnswers * rates.fastAnswerPoints;

  score.lifeBonusPoints = gameState.lives * rates.lifeBonusPoints;

  score.slowPokePoints = -gameState.slowAnswers * rates.slowAnswerPoints;

  score.total = (gameState.correctAnswers * rates.correctAnswerPoints) + (gameState.fastAnswers * rates.fastAnswerPoints)
  + (gameState.lives * rates.lifeBonusPoints) - (gameState.slowAnswers * rates.slowAnswerPoints);

  return score;
};
