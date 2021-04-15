import { combineReducers } from 'redux';
import { courses } from './courses/reducers';
import { main } from './main/reducers';
import { cards } from './cards/reducers';
import { LOG_OUT } from '../types/store/StoreType';

const appReducer = combineReducers({ main, courses, cards });

const rootReducer = (state, action) => {
  if (action.type === LOG_OUT) return appReducer(undefined, action);
  return appReducer(state, action);
};

export default rootReducer;
