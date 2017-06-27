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


export default class Application {
  constructor(state) {
    this.routes = {
      [ControllerID.INTRO]: IntroScreen,
      [ControllerID.GREETING]: GreetingScreen,
      [ControllerID.RULES]: RulesScreen,
      [ControllerID.GAME]: GameScreen,
      [ControllerID.STATS]: StatsScreen,
    };

    this.currentState = state;

    window.onhashchange = () => {
      this.changeController(getControllerIDFromHash(location.hash, this.currentState));
    };
  }

  init() {
    Application.showIntro();
    this.changeController(getControllerIDFromHash(location.hash));
  }

  changeController(route = ``) {
    const Controller = this.routes[route];

    if (new Controller() instanceof ScreenPresenter) {
      new Controller(this.currentState).init();
    }
  }

  static showIntro() {
    // new IntroScreen().init();
    location.hash = ControllerID.INTRO;
  }

  static showGreeting(state) {
    // new GreetingScreen(state).init();
    this.currentState = state;
    location.hash = ControllerID.GREETING;
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

new Application(initialState).init();

// Application.showIntro();
