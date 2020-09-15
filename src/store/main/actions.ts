import { SET_LOGGED_USER, SetLoggedUserType, RESET_MAIN_REDUCER } from '../../types/store/MainStoreType';
import { ResetType } from '../../types/store/StoreType';

const setLoggedUser = (): SetLoggedUserType => ({ type: SET_LOGGED_USER });
const resetMainReducer = (): ResetType => ({ type: RESET_MAIN_REDUCER });

export default {
  setLoggedUser,
  resetMainReducer,
};
