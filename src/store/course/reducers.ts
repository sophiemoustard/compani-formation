import pick from 'lodash/pick';
import {
  CourseStateType,
  SET_COURSE,
  RESET_COURSE_REDUCER,
  CourseActionType,
  ResetCourseReducer,
} from '../../types/store/CourseStoreType';
import { defaultAction, DefaultActionType } from '../../types/store/StoreType';

const initialState: CourseStateType = { course: null };

export const course = (
  state: CourseStateType = initialState,
  action: CourseActionType | ResetCourseReducer | DefaultActionType = defaultAction
): CourseStateType => {
  switch (action.type) {
    case SET_COURSE:
      return {
        ...state,
        course: pick(action.payload, [
          '_id',
          'progress',
          'subProgram',
          'areLastSlotAttendancesValidated',
          'type',
          'format',
          'trainees',
          'archivedAt',
          'slots',
          'slotsToPlan',
          'trainer',
          'contact',
          'companyRepresentative',
          'misc',
        ]),
      };
    case RESET_COURSE_REDUCER:
      return initialState;
    default:
      return state;
  }
};
