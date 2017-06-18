import {initialState} from './data/gamedata';
import insertTemplate from './utils/insert-template';
import renderIntro from './templates/intro';

insertTemplate(renderIntro(initialState));
