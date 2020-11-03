import { SetIsCourseType, SET_IS_COURSE, RESET_COURSE_REDUCER } from '../../types/store/CourseStoreType';
import { ActionWithoutPayloadType } from '../../types/store/StoreType';

const setIsCourse = (isCourse: boolean): SetIsCourseType => ({ type: SET_IS_COURSE, value: isCourse });
const resetCourseReducer = (): ActionWithoutPayloadType => ({ type: RESET_COURSE_REDUCER });

export default {
  setIsCourse,
  resetCourseReducer,
};
