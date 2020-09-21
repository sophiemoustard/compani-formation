import { UserType } from '../UserType';

// Actions types
export const SET_LOGGED_USER = 'SET_LOGGED_USER';
export const RESET_MAIN_REDUCER = 'RESET_MAIN_REDUCER';

export interface SetLoggedUserType {
  type: typeof SET_LOGGED_USER,
  payload: UserType,
}

export interface ResetMainReducer {
  type: typeof RESET_MAIN_REDUCER,
}

export type MainActionType = SetLoggedUserType;

export interface MainStateType {
  loggedUser: object | null,
}
