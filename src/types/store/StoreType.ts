import { MainStateType, MainActionType, ResetMainReducer } from './MainStoreType';
import { CardStateType, CardActionType, CardActionWithoutPayloadType } from './CardStoreType';
import {
  CourseActionType,
  CourseStateType,
  ProgramActionType,
  ProgramStateType,
  ResetCourseReducer,
  ResetProgramReducer,
} from './CourseStoreType';

export const LOG_OUT = 'log_out';
export const defaultAction = { type: null };

export type DefaultActionType = typeof defaultAction;
export type ResetAllReducers = { type: typeof LOG_OUT };
export type ActionType = MainActionType | CardActionType | CourseActionType | ProgramActionType;
export type ActionWithoutPayloadType =
CardActionWithoutPayloadType |
ResetMainReducer |
ResetAllReducers |
ResetCourseReducer|
ResetProgramReducer;
export interface StateType {
  main: MainStateType,
  cards: CardStateType,
  course: CourseStateType
  program: ProgramStateType
}
