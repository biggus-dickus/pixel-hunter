import {questions} from './gamedata';

/**
 * Get random image url from gamedata questions collection.
 * @param {string} key
 * @return {string}
 */
export default (key) => {
  return questions[key][Math.floor(Math.random() * questions[key].length)];
};
