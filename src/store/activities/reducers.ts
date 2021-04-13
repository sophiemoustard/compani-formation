import {
  ActivityStateType,
  SET_ACTIVITY,
  RESET_ACTIVITY_REDUCER,
  SET_ACTIVITY_HISTORIES,
  ActivityActionType,
  ActivityActionWithoutPayloadType,
} from '../../types/store/ActivityStoreType';

const initialState: ActivityStateType = {
  activity: null,
  activityHistories: [],
};

export const activities = (
  state: ActivityStateType = initialState,
  action: ActivityActionType | ActivityActionWithoutPayloadType
): ActivityStateType => {
  switch (action.type) {
    case SET_ACTIVITY:
      return { ...state, activity: action.payload };
    case SET_ACTIVITY_HISTORIES:
      return { ...state, activityHistories: action.payload };
    case RESET_ACTIVITY_REDUCER:
      return initialState;
    default:
      return state;
  }
};
