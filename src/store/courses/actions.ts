import {
  SetIsCourseType,
  SET_IS_COURSE,
  SET_IS_LEARNER,
  RESET_COURSE_REDUCER,
  SetIsLearnerType,
} from '../../types/store/CourseStoreType';
import { ActionWithoutPayloadType } from '../../types/store/StoreType';

const setIsCourse = (isCourse: boolean): SetIsCourseType => ({ type: SET_IS_COURSE, value: isCourse });
const setIsLearner = (isLearner: boolean): SetIsLearnerType => ({ type: SET_IS_LEARNER, value: isLearner });
const resetCourseReducer = (): ActionWithoutPayloadType => ({ type: RESET_COURSE_REDUCER });

export default {
  setIsCourse,
  setIsLearner,
  resetCourseReducer,
};
