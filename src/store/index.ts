import { combineReducers } from 'redux';
import { activities } from './activities/reducers';
import { main } from './main/reducers';

export default combineReducers({ activities, main });
