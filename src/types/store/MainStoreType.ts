import { UserType } from '../UserType';

// Actions types
export const SET_LOGGED_USER = 'SET_LOGGED_USER';
export const RESET_MAIN_REDUCER = 'RESET_MAIN_REDUCER';
export const SET_STATUS_BAR_VISIBLE = 'SET_STATUS_BAR_VISIBLE';

export interface SetLoggedUserType {
  type: typeof SET_LOGGED_USER,
  payload: UserType,
}

export interface ResetMainReducer {
  type: typeof RESET_MAIN_REDUCER,
}

export interface SetStatusBarVisibleType {
  type: typeof SET_STATUS_BAR_VISIBLE,
  payload: boolean,
}

export type MainActionType = SetLoggedUserType | SetStatusBarVisibleType;

export interface MainStateType {
  loggedUser: object | null,
  statusBarVisible: boolean,
}
