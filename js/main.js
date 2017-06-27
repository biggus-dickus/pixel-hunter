import ScreenPresenter from './screen';
import IntroScreen from './intro/intro';
import GreetingScreen from './greeting/greeting';
import RulesScreen from './rules/rules';
import GameScreen from './game/game';
import StatsScreen from './stats/stats';
import {initialState} from './data/gamedata';


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
      this.changeController(getControllerIDFromHash(location.hash));
    };
  }

  init() {
    this.showIntro();
    this.changeController(getControllerIDFromHash(location.hash));
  }

  changeController(route = ``) {
    const Controller = this._routes[route];

    if (new Controller() instanceof ScreenPresenter) {
      new Controller(this._currentState).init();
    }
  }

  showIntro() {
    this._currentState = initialState;
    location.hash = ControllerID.INTRO;
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
    location.hash = ``; // to reflow game screen, location.hash must actually change
    location.hash = ControllerID.GAME;
  }

  showStats(stats) {
    this._currentState = stats;
    location.hash = ControllerID.STATS;
  }
}

const app = new Application();

app.init();

export default app;
