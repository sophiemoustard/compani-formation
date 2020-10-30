import {
  MainStateType,
  SET_LOGGED_USER,
  SET_USER_ROLE,
  RESET_MAIN_REDUCER,
  MainActionType,
  ResetMainReducer,
  SET_STATUS_BAR_VISIBLE,
} from '../../types/store/MainStoreType';

const initialState: MainStateType = { loggedUser: null, userRole: null, statusBarVisible: true };

export const main = (
  state: MainStateType = initialState,
  action: MainActionType | ResetMainReducer
): MainStateType => {
  switch (action.type) {
    case SET_LOGGED_USER:
      return { ...state, loggedUser: action.payload };
    case SET_USER_ROLE:
      return { ...state, userRole: action.payload };
    case SET_STATUS_BAR_VISIBLE:
      return { ...state, statusBarVisible: action.payload };
    case RESET_MAIN_REDUCER:
      return initialState;
    default:
      return state;
  }
};
