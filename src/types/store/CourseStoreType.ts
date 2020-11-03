import { CourseType } from '../CourseType';

// Actions types
export const SET_IS_COURSE = 'SET_IS_COURSE';
export const SET_COURSE = 'SET_COURSE';
export const RESET_COURSE_REDUCER = 'RESET_COURSE_REDUCER';

export interface SetIsCourseType {
  type: typeof SET_IS_COURSE,
  value: boolean,
}

export interface SetCourseType {
  type: typeof SET_COURSE,
  payload: CourseType,
}

export interface ResetCourseReducer {
  type: typeof RESET_COURSE_REDUCER,
}

export type CourseActionType = SetCourseType;

export type CourseActionWithoutPayloadType = ResetCourseReducer | SetIsCourseType;

export interface CourseStateType {
  isCourse: boolean,
  course: CourseType | null,
}
