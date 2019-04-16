import {combineReducers} from 'redux';

import common from './commonReducer';
import game from './gameReducer';
import stats from './statsReducer';
import notifications from './notificationsReducer';
import options from './optionsReducer';

export default combineReducers({game, stats, options, common, notifications});