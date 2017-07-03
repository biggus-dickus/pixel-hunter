import {ControllerID} from './data/gamedata';
import gameState from './game-state';
import Model from './model';
import IntroScreen from './intro/intro';
import GreetingScreen from './greeting/greeting';
import RulesScreen from './rules/rules';
import GameScreen from './game/game';
import StatsScreen from './stats/stats';

const API = {
  read: `https://intensive-ecmascript-server-btfgudlkpi.now.sh/pixel-hunter/questions`,
  write: `https://intensive-ecmascript-server-btfgudlkpi.now.sh/pixel-hunter/stats/:username`
};

const getControllerIDFromHash = (hash) => hash.replace(`#`, ``);


export default class Application {
  constructor() {
    this._model = new class extends Model {
      get urlRead() {
        return API.read;
      }
    }();

    this._model.load()
      .then((data) => Application.preloadData(data))
      .catch((err) => document.write(`Не удалось загрузить данные с сервера по причине <b>${err}.</b>. Попробуйте сыграть позже.`));

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
    location.hash = ControllerID.INTRO;
    this._changeController(getControllerIDFromHash(location.hash));
  }

  _changeController(route = ``) {
    let [id, params] = route.split(`=`);
    const Controller = this._routes[id];

    try {
      new Controller(params).init();
    } catch (e) {
      throw new Error(`Invalid router: location.hash must be an entry of Application._routes.`);
    }
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
        return API.write;
      }
    }();

    return this._model.send(data, name);
  }

  static downloadStats(playerName) {
    return fetch(API.write.replace(`username`, playerName))
      .then((resp) => resp.json());
  }
}

new Application().init();
