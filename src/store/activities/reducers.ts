import {
  ActivityStateType,
  SET_ACTIVITY,
  SET_EXIT_CONFIRMATION_MODAL,
  RESET_ACTIVITY_REDUCER,
  INC_GOOD_ANSWERS_COUNT,
  SET_ACTIVITY_HISTORIES,
  ActivityActionType,
  ActivityActionWithoutPayloadType,
} from '../../types/store/ActivityStoreType';

const initialState: ActivityStateType = {
  activity: null,
  exitConfirmationModal: false,
  score: 0,
  activityHistories: [],
};

export const activities = (
  state: ActivityStateType = initialState,
  action: ActivityActionType | ActivityActionWithoutPayloadType
): ActivityStateType => {
  switch (action.type) {
    case SET_ACTIVITY:
      return { ...state, activity: action.payload };
    case SET_EXIT_CONFIRMATION_MODAL:
      return { ...state, exitConfirmationModal: action.payload };
    case SET_ACTIVITY_HISTORIES:
      return { ...state, activityHistories: action.payload };
    case RESET_ACTIVITY_REDUCER:
      return initialState;
    case INC_GOOD_ANSWERS_COUNT:
      return { ...state, score: state.score + 1 };
    default:
      return state;
  }
};
