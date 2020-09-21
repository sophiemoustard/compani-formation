import { ActivityStateType, ActivityActionType, ResetActivityReducer } from './ActivityStoreType';
import { MainStateType, MainActionType, ResetMainReducer } from './MainStoreType';

export const LOG_OUT = 'log_out';
export type ResetAllReducers = { type: typeof LOG_OUT };
export type ActionType = ActivityActionType | MainActionType;
export type ResetType = ResetActivityReducer | ResetMainReducer | ResetAllReducers;

export interface StateType {
  activities: ActivityStateType
  main: MainStateType,
}
