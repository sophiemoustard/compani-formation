import {
  CourseStateType,
  SET_IS_COURSE,
  CourseActionType,
} from '../../types/store/CourseStoreType';

const initialState: CourseStateType = { isCourse: true };

export const courses = (
  state: CourseStateType = initialState,
  action: CourseActionType
): CourseStateType => {
  switch (action.type) {
    case SET_IS_COURSE:
      return { ...state, isCourse: action.value };
    default:
      return state;
  }
};
