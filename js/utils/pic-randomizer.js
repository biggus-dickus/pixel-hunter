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

  if (gameType === TYPE_PICTURE) {
    if (areAllKeysIdentical(keysArr)) {
      const redundantKey = keysArr[0];
      const newKey = (redundantKey === `photos`) ? `paintings` : `photos`;
      let index = Math.floor(Math.random() * picsCollection[newKey].length);

      picSet.pop();
      picSet.push({origin: newKey, url: picsCollection[newKey][index]});
    }

    // The idea here is that correct answer is the answer, which length is different from two others,
    // e. g. [photos, photos, paintings] => [6 ,6, 9] => paintings are correct answer
    const finalKeys = picSet.map((item) => item.origin).map((item) => item.length);
    const uniqueKey = findUniqueValue(finalKeys);
    const correctAnswer = picSet[finalKeys.indexOf(uniqueKey)].origin;

    for (let pic of picSet) {
      pic.uniqueOrigin = correctAnswer;
    }
  }

  return picSet;
};


/**
 * Check if all array items are identical
 * @param {Array} arr
 * @return {boolean}
 */
function areAllKeysIdentical(arr) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] !== arr[0]) {
      return false;
    }
  }

  return true;
}

/**
 * Find the single unique item in array of duplicates (works with numerical arrays only)
 * @param {Array} arr
 * @return {number}
 */
function findUniqueValue(arr) {
  let result = 0;

  for (let item of arr) {
    result ^= item;
  }

  return result;
}
