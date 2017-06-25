import IntroScreen from './intro/intro';
import GreetingScreen from './greeting/greeting';
import RulesScreen from './rules/rules';
import GameScreen from './game/game';
import StatsScreen from './stats/stats';


export default class Application {
  static showIntro() {
    new IntroScreen().init();
  }

  static showGreeting() {
    new GreetingScreen().init();
  }

  static showRules() {
    new RulesScreen().init();
  }

  static showGame() {
    new GameScreen().init();
  }

  static showStats(stats) {
    new StatsScreen().init();
  }
}

Application.showIntro();
