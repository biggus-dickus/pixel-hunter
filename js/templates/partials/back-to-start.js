import {initialState} from '../../data/gamedata';
import BackToStartView from './back-to-start-view';
import insertTemplate from '../../utils/insert-template';
import renderGreeting from '../greeting';


export default () => {
  const goBack = new BackToStartView();

  const state = Object.assign({}, initialState, {
    template: `greeting`
  });

  goBack.onBtnClick = () => insertTemplate(renderGreeting(state));

  return goBack.element;
};
