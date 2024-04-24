import { combineReducers } from 'redux';
import { main } from './main/reducers';
import { cards } from './cards/reducers';
import { course } from './course/reducers';
import { program } from './program/reducers';
import { ActionType, LOG_OUT, StateType, ActionWithoutPayloadType } from '../types/store/StoreType';

const appReducer = combineReducers({ main, cards, course, program });

const rootReducer = (state: StateType, action: ActionType | ActionWithoutPayloadType) => {
  if (action.type === LOG_OUT) return appReducer(undefined, action);
  return appReducer(state, action);
};

export default rootReducer;
