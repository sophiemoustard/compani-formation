import {
  CourseStateType,
  SET_IS_COURSE,
  CourseActionType,
  CourseActionWithoutPayloadType,
  SET_COURSE,
} from '../../types/store/CourseStoreType';

const initialState: CourseStateType = { isCourse: true, course: null };

export const courses = (
  state: CourseStateType = initialState,
  action: CourseActionWithoutPayloadType | CourseActionType
): CourseStateType => {
  switch (action.type) {
    case SET_IS_COURSE:
      return { ...state, isCourse: action.value };
    case SET_COURSE:
      return { ...state, course: action.payload };
    default:
      return state;
  }
};
