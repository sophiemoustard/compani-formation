import { StateType, ActionType, SET_ACTIVITY } from '../types/StoreType';

const initialState: StateType = { activity: null };

export const activities = (state: StateType = initialState, action: ActionType): StateType => {
  switch (action.type) {
    case SET_ACTIVITY:
      return { ...state, activity: action.payload };
    default:
      return state;
  }
};
