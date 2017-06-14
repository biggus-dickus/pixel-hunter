import {picsCollection} from './data/gamedata';

/**
 * Get a random array of unique objects with image urls and their origins
 * (ex.: {origin: 'pictures', url: '//imgur.com/blablabla.jpg'} ).
 *
 * @param {number} quantity
 * @param {string} requiredOrigin - optional argument, which will initiate the check for a picture from required category
 * and its subsequent insertion into array (randomly generated array might contain ONLY photos or paintings).
 *
 * @return {Array}
 */
export default (quantity, requiredOrigin) => {
  const picSet = [];
  const addedIndex = [];

  while (picSet.length < quantity) {
    let key = (Math.round(Math.random()) === 0) ? `paintings` : `photos`;
    let picIndex = Math.floor(Math.random() * picsCollection[key].length);

    if (addedIndex.indexOf(picIndex) >= 0) {
      continue;
    }

    addedIndex.push(picIndex);

    let urlString = picsCollection[key][picIndex];

    picSet.push({origin: key, url: urlString});
  }

  function hasRequiredOrigin(item) {
    return item.origin === requiredOrigin;
  }

  // Do not let the Array contain only photos or pictures (if that's the issue)
  if (requiredOrigin && !picSet.some(hasRequiredOrigin)) {
    let index = Math.floor(Math.random() * picsCollection[requiredOrigin].length);

    picSet.pop();
    picSet.push({origin: requiredOrigin, url: picsCollection[requiredOrigin][index]});
  }

  return picSet;
};
