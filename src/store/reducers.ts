import { StateType, SET_ACTIVITY, SET_CARD_INDEX, ActionType } from '../types/StoreType';

const initialState: StateType = { activity: null, cardIndex: null };

export const activities = (state: StateType = initialState, action: ActionType): StateType => {
  switch (action.type) {
    case SET_ACTIVITY:
      return { ...state, activity: action.payload };
    case SET_CARD_INDEX:
      return { ...state, cardIndex: action.payload };
    default:
      return state;
  }
};
