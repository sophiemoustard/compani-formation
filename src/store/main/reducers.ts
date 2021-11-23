import pick from 'lodash/pick';
import {
  MainStateType,
  SET_LOGGED_USER,
  RESET_MAIN_REDUCER,
  MainActionType,
  ResetMainReducer,
  SET_STATUS_BAR_VISIBLE,
} from '../../types/store/MainStoreType';

const initialState: MainStateType = { loggedUser: null, statusBarVisible: true };

export const main = (
  inputState: MainStateType,
  action: MainActionType | ResetMainReducer
): MainStateType => {
  const state = inputState || initialState;

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
