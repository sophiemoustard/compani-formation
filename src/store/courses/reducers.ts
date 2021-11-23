import {
  CourseStateType,
  SET_IS_COURSE,
  CourseActionWithoutPayloadType,
  RESET_COURSE_REDUCER,
} from '../../types/store/CourseStoreType';

const initialState: CourseStateType = { isCourse: true };

export const courses = (
  inputState: CourseStateType,
  action: CourseActionWithoutPayloadType
): CourseStateType => {
  const state = inputState || initialState;

  switch (action.type) {
    case SET_IS_COURSE:
      return { ...state, isCourse: action.value };
    case RESET_COURSE_REDUCER:
      return initialState;
    default:
      return state;
  }
};
