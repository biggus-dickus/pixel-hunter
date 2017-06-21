import {initialState} from './data/gamedata';
import insertTemplate from './utils/insert-template';
import renderIntro from './controllers/intro';

insertTemplate(renderIntro(initialState));
