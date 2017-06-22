import {initialState} from './data/gamedata';
import insertTemplate from './utils/insert-template';
import renderIntro from './containers/intro';

insertTemplate(renderIntro(initialState));
