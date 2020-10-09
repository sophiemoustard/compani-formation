import { ActivityStateType, ActivityActionType, ActivityActionWithoutPayloadType } from './ActivityStoreType';
import { MainStateType, MainActionType, ResetMainReducer } from './MainStoreType';

export const LOG_OUT = 'log_out';
export type ResetAllReducers = { type: typeof LOG_OUT };
export type ActionType = ActivityActionType | MainActionType;
export type ActionWithoutPayloadType = ActivityActionWithoutPayloadType | ResetMainReducer | ResetAllReducers;

export interface StateType {
  activities: ActivityStateType
  main: MainStateType,
}
