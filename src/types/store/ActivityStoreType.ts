import { ActivityType } from '../ActivityType';
import { ActivityHistoryType } from '../ActivityHistoryType';

// Actions types
export const SET_ACTIVITY = 'SET_ACTIVITY';
export const RESET_ACTIVITY_REDUCER = 'RESET_ACTIVITY_REDUCER';
export const SET_ACTIVITY_HISTORIES = 'SET_ACTIVITY_HISTORIES';

export interface SetActivityType {
  type: typeof SET_ACTIVITY,
  payload: ActivityType,
}

export interface SetActivityHistories {
  type: typeof SET_ACTIVITY_HISTORIES,
  payload: Array<ActivityHistoryType>,
}

export interface ResetActivityReducer {
  type: typeof RESET_ACTIVITY_REDUCER,
}

export type ActivityActionType = SetActivityType | SetActivityHistories;

export type ActivityActionWithoutPayloadType = ResetActivityReducer;

export interface ActivityStateType {
  activity: ActivityType | null,
  activityHistories: Array<ActivityHistoryType>
}
