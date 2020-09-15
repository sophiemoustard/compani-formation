import { SET_LOGGED_USER, SetLoggedUserType, RESET_MAIN_REDUCER } from '../../types/store/MainStoreType';
import { ResetType } from '../../types/store/StoreType';
import { ActivityType } from '../../types/ActivityType';

const setLoggedUser = (activity: ActivityType): SetLoggedUserType => ({ type: SET_LOGGED_USER, payload: activity });
const resetMainReducer = (): ResetType => ({ type: RESET_MAIN_REDUCER });

export default {
  setLoggedUser,
  resetMainReducer,
};
