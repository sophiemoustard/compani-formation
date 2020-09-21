import { combineReducers } from 'redux';
import { activities } from './activities/reducers';
import { main } from './main/reducers';
import { LOG_OUT } from '../types/store/StoreType';

const appReducer = combineReducers({ activities, main });

const rootReducer = (state, action) => {
  if (action.type === LOG_OUT) return appReducer(undefined, action);
  return appReducer(state, action);
};

export default rootReducer;
