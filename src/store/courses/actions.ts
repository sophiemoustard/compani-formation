import {
  SetIsCourseType,
  SetCourseType,
  SET_IS_COURSE,
  SET_COURSE,
  RESET_COURSE_REDUCER,
} from '../../types/store/CourseStoreType';
import { ActionWithoutPayloadType } from '../../types/store/StoreType';
import { CourseType } from '../../types/CourseType';

const setIsCourse = (isCourse: boolean): SetIsCourseType => ({ type: SET_IS_COURSE, value: isCourse });
const setCourse = (course: CourseType): SetCourseType => ({ type: SET_COURSE, payload: course });
const resetCourseReducer = (): ActionWithoutPayloadType => ({ type: RESET_COURSE_REDUCER });

export default {
  setIsCourse,
  setCourse,
  resetCourseReducer,
};
