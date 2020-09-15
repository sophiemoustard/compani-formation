import { MainStateType, SET_LOGGED_USER, RESET_MAIN_REDUCER } from '../../types/store/MainStoreType';
import { ActionType, ResetType } from '../../types/store/StoreType';

const initialState: MainStateType = { loggedUser: null };

export const main = (
  state: MainStateType = initialState,
  action: ActionType | ResetType
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
