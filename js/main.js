import IntroScreen from './intro/intro';
import GreetingScreen from './greeting/greeting';
import RulesScreen from './rules/rules';
import GameScreen from './game/game';
import StatsScreen from './stats/stats';


const ControllerID = {
  INTRO: ``,
  GREETING: `greeting`,
  RULES: `rules`,
  GAME: `game`,
  STATS: `stats`,
};

const getControllerIDFromHash = (hash) => hash.replace(`#`, ``);


class Application {
  constructor() {
    this._routes = {
      [ControllerID.INTRO]: IntroScreen,
      [ControllerID.GREETING]: GreetingScreen,
      [ControllerID.RULES]: RulesScreen,
      [ControllerID.GAME]: GameScreen,
      [ControllerID.STATS]: StatsScreen,
    };

    window.onhashchange = () => {
      this._changeController(getControllerIDFromHash(location.hash));
    };
  }

  init() {
    location.hash = ControllerID.INTRO;
    this._changeController(getControllerIDFromHash(location.hash));
  }

  showGreeting(state) {
    this._currentState = state;
    location.hash = ControllerID.GREETING;
  }

  showRules(state) {
    this._currentState = state;
    location.hash = ControllerID.RULES;
  }

  showGame(state) {
    this._currentState = state;
    location.hash = ControllerID.GAME;
  }

  showStats(stats) {
    this._currentState = stats;
    location.hash = ControllerID.STATS;
  }

  _changeController(route = ``) {
    const Controller = this._routes[route];

    try {
      new Controller(this._currentState).init();
    } catch (e) {
      throw new Error(`Invalid router: location.hash must be an entry of Application._routes.`);
    }
  }
}

const app = new Application();

app.init();

export default app;
