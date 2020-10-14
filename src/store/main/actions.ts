import {
  SET_LOGGED_USER,
  SetLoggedUserType, RESET_MAIN_REDUCER,
  SET_STATUS_BAR_VISIBLE,
  SetStatusBarVisibleType,
} from '../../types/store/MainStoreType';
import { ActionWithoutPayloadType } from '../../types/store/StoreType';
import { UserType } from '../../types/UserType';

const setLoggedUser = (user: UserType): SetLoggedUserType => ({ type: SET_LOGGED_USER, payload: user });
const resetMainReducer = (): ActionWithoutPayloadType => ({ type: RESET_MAIN_REDUCER });
const setStatusBarVisible = (statusBarVisible: boolean): SetStatusBarVisibleType => (
  { type: SET_STATUS_BAR_VISIBLE, payload: statusBarVisible }
);

export default {
  setLoggedUser,
  resetMainReducer,
  setStatusBarVisible,
};
