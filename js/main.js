import IntroScreen from './intro/intro';
import GreetingScreen from './greeting/greeting';
import RulesScreen from './rules/rules';
import GameScreen from './game/game';
import StatsScreen from './stats/stats';


export default class Application {
  static showIntro() {
    new IntroScreen().init();
  }

  static showGreeting(state) {
    new GreetingScreen(state).init();
  }

  static showRules(state) {
    new RulesScreen(state).init();
  }

  static showGame(state) {
    new GameScreen(state).init();
  }

  static showStats(stats) {
    new StatsScreen(stats).init();
  }
}

Application.showIntro();
