import pick from 'lodash/pick';
import {
  MainStateType,
  SET_LOGGED_USER,
  RESET_MAIN_REDUCER,
  MainActionType,
  ResetMainReducer,
  SET_STATUS_BAR_VISIBLE,
} from '../../types/store/MainStoreType';
import { defaultAction, DefaultActionType } from '../../types/store/StoreType';

const initialState: MainStateType = { loggedUser: null, statusBarVisible: true };

export const main = (
  state: MainStateType = initialState,
  action: MainActionType | ResetMainReducer | DefaultActionType = defaultAction
): MainStateType => {
  switch (action.type) {
    case SET_LOGGED_USER:
      return {
        ...state,
        loggedUser: pick(action.payload, [
          '_id',
          'identity.firstname',
          'identity.lastname',
          'local.email',
          'picture.link',
          'company.name',
          'contact.phone',
          'role',
          'companyLinkRequest',
        ]),
      };
    case SET_STATUS_BAR_VISIBLE:
      return { ...state, statusBarVisible: action.payload };
    case RESET_MAIN_REDUCER:
      return initialState;
    default:
      return state;
  }
};
