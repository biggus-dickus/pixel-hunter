import {ControllerID} from './data/gamedata';
import gameState from './game-state';
import Model from './model';
import IntroScreen from './intro/intro';
import GreetingScreen from './greeting/greeting';
import RulesScreen from './rules/rules';
import GameScreen from './game/game';
import StatsScreen from './stats/stats';

// Polyfills
import 'babel-polyfill';
import 'whatwg-fetch';

const API = {
  readUrl: `https://intensive-ecmascript-server-btfgudlkpi.now.sh/pixel-hunter/questions`,
  writeUrl: `https://intensive-ecmascript-server-btfgudlkpi.now.sh/pixel-hunter/stats/:username`
};

const getControllerIDFromHash = (hash) => hash.replace(`#`, ``);


export default class Application {
  constructor() {
    this._model = new class extends Model {
      get urlRead() {
        return API.readUrl;
      }
    }();

    this._routes = {
      [ControllerID.INTRO]: IntroScreen,
      [ControllerID.GREETING]: GreetingScreen,
      [ControllerID.RULES]: RulesScreen,
      [ControllerID.GAME]: GameScreen,
      [ControllerID.STATS]: StatsScreen,
    };

    addEventListener(`hashchange`, () => {
      this._changeController(getControllerIDFromHash(location.hash));
    }, false);
  }

  init() {
    // Fetch stats by direct link
    if (location.hash.split(`=`)[0] === `#${ControllerID.STATS}`) {
      gameState.changeState({
        playerName: location.hash.split(`=`)[1]
      });

      this._changeController(getControllerIDFromHash(location.hash));
      return;
    }

    this._model.load()
      .then((data) => Application.preloadData(data))
      .catch((err) => document.write(`Не удалось загрузить данные с сервера по причине <b>${err}.</b>. Попробуйте сыграть позже.`));

    location.hash = ControllerID.INTRO;
    this._changeController(getControllerIDFromHash(location.hash));
  }

  _changeController(route = ``) {
    let [id, params] = route.split(`=`);
    const Controller = this._routes[id];

    new Controller(params).init();
  }

  static preloadData(data) {
    const images = [
      ...data.paintings,
      ...data.photos
    ];

    const preloadImage = (path) => new Promise((resolve, reject) => {
      const image = new Image();

      image.addEventListener(`load`, () => resolve(image));
      image.addEventListener(`error`, reject);

      image.src = path;
    });

    Promise.all(images.map(preloadImage))
      .then(Application.goTo(ControllerID.GREETING));

    gameState.collectPics(data);
  }

  static goTo(route) {
    location.hash = route;
  }

  static uploadStats(data, name) {
    this._model = new class extends Model {
      get urlWrite() {
        return API.writeUrl;
      }
    }();

    return this._model.send(data, name);
  }

  static downloadStats(playerName) {
    return fetch(API.writeUrl.replace(`username`, playerName))
      .then((resp) => resp.json());
  }
}

new Application().init();
