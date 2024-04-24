import { CourseType, ProgramType } from '../CourseTypes';

// Actions types
export const SET_COURSE = 'SET_COURSE';
export const RESET_COURSE_REDUCER = 'RESET_COURSE_REDUCER';
export const SET_PROGRAM = 'SET_PROGRAM';
export const RESET_PROGRAM_REDUCER = 'RESET_PROGRAM_REDUCER';

export type SetCourseType = {
  type: typeof SET_COURSE,
  payload: CourseType | null,
}

export type ResetCourseReducer = {
  type: typeof RESET_COURSE_REDUCER,
}

export type SetProgramType = {
  type: typeof SET_PROGRAM,
  payload: ProgramType | null,
}

export type ResetProgramReducer = {
  type: typeof RESET_PROGRAM_REDUCER,
}

export type CourseActionType = SetCourseType;

export type ProgramActionType = SetProgramType;

export type CourseStateType = {
  course: object | null,
}

export type ProgramStateType = {
  program: object | null,
}
