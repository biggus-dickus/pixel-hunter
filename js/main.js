import {ControllerID} from './data/gamedata';
import gameState from './game-state';
import Model from './model';
import IntroScreen from './intro/intro';
import GreetingScreen from './greeting/greeting';
import RulesScreen from './rules/rules';
import GameScreen from './game/game';
import StatsScreen from './stats/stats';


const getControllerIDFromHash = (hash) => hash.replace(`#`, ``);


export default class Application {
  constructor() {
    this._model = new class extends Model {
      get urlRead() {
        return `https://intensive-ecmascript-server-btfgudlkpi.now.sh/pixel-hunter/questions`;
      }

      get urlWrite() {
        return `https://intensive-ecmascript-server-btfgudlkpi.now.sh/pixel-hunter/stats`;
      }
    }();

    this._model.load()
      .then((data) => Application.getPics(data))
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
    const Controller = this._routes[route];

    try {
      new Controller().init();
    } catch (e) {
      throw new Error(`Invalid router: location.hash must be an entry of Application._routes.`);
    }
  }

  static getPics(data) {
    gameState.collectPics(data);
  }

  static goTo(route) {
    location.hash = route;
  }
}

new Application().init();
