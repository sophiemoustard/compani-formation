import {
  CourseStateType,
  SET_IS_COURSE,
  CourseActionWithoutPayloadType,
  RESET_COURSE_REDUCER,
} from '../../types/store/CourseStoreType';
import { defaultAction, DefaultActionType } from '../../types/store/StoreType';

const initialState: CourseStateType = { isCourse: true };

export const courses = (
  state: CourseStateType = initialState,
  action: CourseActionWithoutPayloadType | DefaultActionType = defaultAction
): CourseStateType => {
  switch (action.type) {
    case SET_IS_COURSE:
      return { ...state, isCourse: action.value };
    case RESET_COURSE_REDUCER:
      return initialState;
    default:
      return state;
  }
};
