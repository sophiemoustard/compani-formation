import { SET_LOGGED_USER, SetLoggedUserType, RESET_MAIN_REDUCER } from '../../types/store/MainStoreType';
import { ResetType } from '../../types/store/StoreType';
import { UserType } from '../../types/UserType';

const setLoggedUser = (user: UserType): SetLoggedUserType => ({ type: SET_LOGGED_USER, user });
const resetMainReducer = (): ResetType => ({ type: RESET_MAIN_REDUCER });

export default {
  setLoggedUser,
  resetMainReducer,
};
