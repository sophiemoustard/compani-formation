import { ActivityStateType, ActivityActionType, ActivityActionWithoutPayloadType } from './ActivityStoreType';
import { ResetCourseReducer, CourseActionWithoutPayloadType, CourseStateType } from './CourseStoreType';
import { MainStateType, MainActionType, ResetMainReducer } from './MainStoreType';

export const LOG_OUT = 'log_out';
export type ResetAllReducers = { type: typeof LOG_OUT };
export type ActionType = ActivityActionType | MainActionType;
export type ActionWithoutPayloadType =
ActivityActionWithoutPayloadType |
ResetMainReducer |
ResetAllReducers |
ResetCourseReducer |
CourseActionWithoutPayloadType;

export interface StateType {
  activities: ActivityStateType,
  main: MainStateType,
  courses: CourseStateType
}
