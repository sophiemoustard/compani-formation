import { LEARNER, TESTER, TRAINER } from '../../core/data/constants';
// Actions types
export const SET_MODE = 'SET_MODE';
export const RESET_COURSE_REDUCER = 'RESET_COURSE_REDUCER';

export type SetModeType = {
  type: typeof SET_MODE,
  value: CourseModeType,
}

export type ResetCourseReducer = {
  type: typeof RESET_COURSE_REDUCER,
}

export type CourseActionWithoutPayloadType = ResetCourseReducer | SetModeType;

export type CourseModeType = typeof LEARNER | typeof TESTER | typeof TRAINER;

export type CourseStateType = {
  mode: CourseModeType,
}
