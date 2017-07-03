class Adapter {
  // Preprocess server data and return only pic URLs split into categories.
  // Levels are generated on client side.
  static preprocess(data) {
    const pics = [];
    const myCollection = {
      paintings: [],
      photos: []
    };

    data.forEach((item) => pics.push(item.answers));

    [].concat(...pics).forEach((item) => {
      if (item.type === `photo`) {
        myCollection.photos.push(item.image.url);
      } else {
        myCollection.paintings.push(item.image.url);
      }
    });

    return myCollection;
  }

  static toServer(data) {
    return JSON.stringify(data);
  }
}

export default class Model {
  get urlRead() {
    throw new Error(`Abstract method. Define the URL to GET data.`);
  }

  get urlWrite() {
    throw new Error(`Abstract method. Define the URL to POST data.`);
  }

  load() {
    return fetch(this.urlRead)
      .then((resp) => resp.json())
      .then(Adapter.preprocess);
  }

  /**
   * Send data to server API. The data must be a json string with two props:
   * {"lives": "3", "stats": "['slow', 'fast', 'wrong', 'correct'...]"}
   * @param {Object} data
   * @param {string} playerName
   * @return {Promise}
   */
  send(data, playerName) {
    const requestSettings = {
      body: Adapter.toServer(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };

    return fetch(this.urlWrite.replace(`username`, playerName), requestSettings);
  }
}
