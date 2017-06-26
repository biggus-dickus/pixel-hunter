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


export default class Application {
  constructor() {
    this.routes = {
      [ControllerID.INTRO]: IntroScreen,
      [ControllerID.GREETING]: GreetingScreen,
      [ControllerID.RULES]: RulesScreen,
      [ControllerID.GAME]: GameScreen,
      [ControllerID.STATS]: StatsScreen,
    };

    this.currentState = initialState;

    window.onhashchange = () => {
      this.changeController(getControllerIDFromHash(location.hash));
    };
  }

  changeController(route = ``) {
    const Controller = this.routes[route];

    new Controller(this.currentState).init();
  }

  init() {
    Application.showIntro();
    this.changeController(getControllerIDFromHash(location.hash));
  }

  static showIntro() {
    // new IntroScreen().init();
    location.hash = ControllerID.INTRO;
  }

  static showGreeting(state) {
    // new GreetingScreen(state).init();
    this.currentState = state;
    location.hash = ControllerID.INTRO;
  }

  static showRules(state) {
    // new RulesScreen(state).init();
    this.currentState = state;
    location.hash = ControllerID.RULES;
  }

  static showGame(state) {
    // new GameScreen(state).init();
    this.currentState = state;
    location.hash = ControllerID.GAME;
  }

  static showStats(stats) {
    // new StatsScreen(stats).init();
    this.currentState = stats;
    location.hash = ControllerID.STATS;
  }
}

new Application().init();

// Application.showIntro();
