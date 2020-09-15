import { ActivityStateType, ActivityActionType, ResetActivityReducer } from './ActivityStoreType';
import { MainStateType, MainActionType, ResetMainReducer } from './MainStoreType';

export type ActionType = ActivityActionType | MainActionType;
export type ResetType = ResetActivityReducer | ResetMainReducer;

export interface StateType {
  activities: ActivityStateType
  main: MainStateType,
}
