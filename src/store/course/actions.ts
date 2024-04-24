import { CourseType } from '../../types/CourseTypes';
import {
  SET_COURSE,
  SetCourseType,
  RESET_COURSE_REDUCER,
} from '../../types/store/CourseStoreType';
import { ActionWithoutPayloadType } from '../../types/store/StoreType';

const setCourse = (course: CourseType | null): SetCourseType => ({ type: SET_COURSE, payload: course });
const resetCourseReducer = (): ActionWithoutPayloadType => ({ type: RESET_COURSE_REDUCER });

export default {
  setCourse,
  resetCourseReducer,
};
