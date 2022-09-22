import {
  CourseStateType,
  SET_MODE,
  CourseActionWithoutPayloadType,
  RESET_COURSE_REDUCER,
} from '../../types/store/CourseStoreType';
import { defaultAction, DefaultActionType } from '../../types/store/StoreType';
import { LEARNER } from '../../core/data/constants';

const initialState: CourseStateType = { mode: LEARNER };

export const courses = (
  state: CourseStateType = initialState,
  action: CourseActionWithoutPayloadType | DefaultActionType = defaultAction
): CourseStateType => {
  switch (action.type) {
    case SET_MODE:
      return { ...state, mode: action.value };
    case RESET_COURSE_REDUCER:
      return initialState;
    default:
      return state;
  }
};
