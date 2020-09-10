import {
  StateType,
  SET_ACTIVITY,
  SET_CARD_INDEX,
  SET_EXIT_CONFIRMATION_MODAL,
  RESET_ACTIVITY_REDUCER,
  ActionType,
  ResetType,
} from '../types/StoreType';

const initialState: StateType = { activity: null, cardIndex: null, exitConfirmationModal: false };

export const activities = (state: StateType = initialState, action: ActionType | ResetType): StateType => {
  switch (action.type) {
    case SET_ACTIVITY:
      return { ...state, activity: action.payload };
    case SET_CARD_INDEX:
      return { ...state, cardIndex: action.payload };
    case SET_EXIT_CONFIRMATION_MODAL:
      return { ...state, exitConfirmationModal: action.payload };
    case RESET_ACTIVITY_REDUCER:
      return { activity: null, cardIndex: null, exitConfirmationModal: false };
    default:
      return state;
  }
};
