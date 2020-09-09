import { ActivityType } from '../types/ActivityType';

// Actions types
export const SET_ACTIVITY = 'SET_ACTIVITY';

export interface ActionType {
  type: typeof SET_ACTIVITY,
  payload: ActivityType,
}

export interface StateType {
  activity: ActivityType | null,
}
