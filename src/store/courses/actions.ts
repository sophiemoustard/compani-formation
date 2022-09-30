import {
  CourseModeType,
  SET_MODE,
  RESET_COURSE_REDUCER,
  SetModeType,
} from '../../types/store/CourseStoreType';
import { ActionWithoutPayloadType } from '../../types/store/StoreType';

const setMode = (mode: CourseModeType): SetModeType => ({ type: SET_MODE, value: mode });
const resetCourseReducer = (): ActionWithoutPayloadType => ({ type: RESET_COURSE_REDUCER });

export default {
  setMode,
  resetCourseReducer,
};
