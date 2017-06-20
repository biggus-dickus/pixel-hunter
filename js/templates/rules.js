import {views, initialState} from '../data/gamedata';
import RulesView from './rules-view';
import insertTemplate from '../utils/insert-template';
import renderGame from './game';


export default (state) => {
  const rules = new RulesView();
  const form = rules.element.querySelector(`.rules__form`);
  const submit = rules.element.querySelector(`.rules__button`);

  rules.onFormInput = () => {
    submit.disabled = !form.checkValidity();
  };

  rules.onFormSubmit = () => {
    state = Object.assign({}, initialState, {
      template: views.game
    });

    insertTemplate(renderGame(state));
  };

  return rules.element;
};
