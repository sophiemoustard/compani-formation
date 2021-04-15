import { ResetCourseReducer, CourseActionWithoutPayloadType, CourseStateType } from './CourseStoreType';
import { MainStateType, MainActionType, ResetMainReducer } from './MainStoreType';
import { CardStateType, CardActionType, CardActionWithoutPayloadType } from './CardStoreType';

export const LOG_OUT = 'log_out';
export type ResetAllReducers = { type: typeof LOG_OUT };
export type ActionType = MainActionType | CardActionType;
export type ActionWithoutPayloadType =
CardActionWithoutPayloadType |
ResetMainReducer |
ResetAllReducers |
ResetCourseReducer |
CourseActionWithoutPayloadType;

export interface StateType {
  main: MainStateType,
  courses: CourseStateType
  cards: CardStateType
}
