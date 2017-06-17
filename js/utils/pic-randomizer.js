import {picsCollection, TYPE_PICTURE} from '../data/gamedata';

/**
 * Get a random array of unique objects with image urls and their origins
 * (ex.: {origin: 'pictures', url: '//imgur.com/blablabla.jpg'} ).
 *
 * @param {number} quantity
 * @param {string} gameType
 *
 * @return {Array}
 */
export default (quantity, gameType) => {
  const picSet = [];
  const addedIndex = [];

  while (picSet.length < quantity) {
    let key = (Math.round(Math.random()) === 0) ? `paintings` : `photos`;
    let picIndex = Math.floor(Math.random() * picsCollection[key].length);

    if (addedIndex.indexOf(picIndex) >= 0) {
      continue;
    }

    addedIndex.push(picIndex);
    addedIndex.push(key);

    let urlString = picsCollection[key][picIndex];

    picSet.push({origin: key, url: urlString});
  }

  const keysArr = addedIndex.filter((el) => el.length);

  function areAllKeysIdentical(arr) {
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] !== arr[0]) {
        return false;
      }
    }

    return true;
  }

  if (areAllKeysIdentical(keysArr) && gameType === TYPE_PICTURE) {
    const redundantKey = keysArr[0];
    const newKey = (redundantKey === `photos`) ? `paintings` : `photos`;
    let index = Math.floor(Math.random() * picsCollection[newKey].length);

    picSet.pop();
    picSet.push({origin: newKey, url: picsCollection[newKey][index]});
  }

  return picSet;
};
