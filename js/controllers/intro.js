import {views, initialState} from '../data/gamedata';
import IntroView from '../views/intro-view';
import insertTemplate from '../utils/insert-template';
import renderGreeting from './greeting';


export default (state) => {
  const intro = new IntroView();

  intro.onStartClick = () => {
    state = Object.assign({}, initialState, {
      template: views.greeting
    });

    insertTemplate(renderGreeting(state));
  };

  return intro.element;
};
