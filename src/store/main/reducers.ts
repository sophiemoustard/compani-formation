import pick from 'lodash/pick';
import { LOGGED_USER } from '../../core/data/constants';
import {
  MainStateType,
  SET_LOGGED_USER,
  RESET_MAIN_REDUCER,
  MainActionType,
  ResetMainReducer,
  SET_STATUS_BAR_VISIBLE,
} from '../../types/store/MainStoreType';

const initialState: MainStateType = { loggedUser: null, statusBarVisible: true };

export const main = (
  state: MainStateType = initialState,
  action: MainActionType | ResetMainReducer
): MainStateType => {
  switch (action.type) {
    case SET_LOGGED_USER:
      return { ...state, loggedUser: pick(action.payload, LOGGED_USER) };
    case SET_STATUS_BAR_VISIBLE:
      return { ...state, statusBarVisible: action.payload };
    case RESET_MAIN_REDUCER:
      return initialState;
    default:
      return state;
  }
};
