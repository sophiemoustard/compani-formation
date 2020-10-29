import {
  SET_LOGGED_USER, SET_USER_ROLE,
  SetLoggedUserType, SetUserRoleType, RESET_MAIN_REDUCER,
  SET_STATUS_BAR_VISIBLE,
  SetStatusBarVisibleType,
} from '../../types/store/MainStoreType';
import { ActionWithoutPayloadType } from '../../types/store/StoreType';
import { UserType } from '../../types/UserType';

const setLoggedUser = (user: UserType): SetLoggedUserType => ({ type: SET_LOGGED_USER, payload: user });
const setUserRole = (role: string): SetUserRoleType => ({ type: SET_USER_ROLE, payload: role });
const resetMainReducer = (): ActionWithoutPayloadType => ({ type: RESET_MAIN_REDUCER });
const setStatusBarVisible = (statusBarVisible: boolean): SetStatusBarVisibleType => (
  { type: SET_STATUS_BAR_VISIBLE, payload: statusBarVisible }
);

export default {
  setLoggedUser,
  setUserRole,
  resetMainReducer,
  setStatusBarVisible,
};
