/* eslint-disable no-case-declarations */
import asyncStorage from '../../core/helpers/asyncStorage';
import { MainStateType, SET_LOGGED_USER, RESET_MAIN_REDUCER } from '../../types/store/MainStoreType';
import { ActionType, ResetType } from '../../types/store/StoreType';
import Users from '../../api/users';

const initialState: MainStateType = { loggedUser: null };

export const main = async (
  state: MainStateType = initialState,
  action: ActionType | ResetType
): Promise<MainStateType> => {
  switch (action.type) {
    case SET_LOGGED_USER:
      const userId = await asyncStorage.getUserId();
      const user = await Users.getById(userId);

      return { ...state, loggedUser: user };
    case RESET_MAIN_REDUCER:
      return initialState;
    default:
      return state;
  }
};
