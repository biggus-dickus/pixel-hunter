class Adapter {
  // Preprocess server data and return only pic URLS split into categories.
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

  static toServer(data) {}
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

  send(data, adapter) {
    const requestSettings = {
      body: adapter.toServer(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };

    return fetch(this.urlWrite, requestSettings)
      .then(this.onUpload);
  }
}
