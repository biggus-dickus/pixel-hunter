import {picsCollection} from './gamedata';

/**
 * Get random image url from gamedata pics collection.
 * @param {string} key
 * @return {string}
 */
export default (key) => {
  return picsCollection[key][Math.floor(Math.random() * picsCollection[key].length)];
};
