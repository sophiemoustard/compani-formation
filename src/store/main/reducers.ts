import {
  MainStateType,
  SET_LOGGED_USER,
  RESET_MAIN_REDUCER,
  MainActionType,
  ResetMainReducer,
} from '../../types/store/MainStoreType';

const initialState: MainStateType = { loggedUser: null };

export const main = (
  state: MainStateType = initialState,
  action: MainActionType | ResetMainReducer
): MainStateType => {
  switch (action.type) {
    case SET_LOGGED_USER:
      return { ...state, loggedUser: action.payload };
    case RESET_MAIN_REDUCER:
      return initialState;
    default:
      return state;
  }
};
