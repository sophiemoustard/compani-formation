import pick from 'lodash/pick';
import {
  ProgramStateType,
  SET_PROGRAM,
  RESET_PROGRAM_REDUCER,
  ProgramActionType,
  ResetProgramReducer,
} from '../../types/store/CourseStoreType';
import { defaultAction, DefaultActionType } from '../../types/store/StoreType';

const initialState: ProgramStateType = { program: null };

export const program = (
  state: ProgramStateType = initialState,
  action: ProgramActionType | ResetProgramReducer | DefaultActionType = defaultAction
): ProgramStateType => {
  switch (action.type) {
    case SET_PROGRAM:
      return {
        ...state,
        program: pick(action.payload, [
          '_id',
          'name',
          'image',
          'description',
          'learningGoals',
          'subPrograms',
        ]),
      };
    case RESET_PROGRAM_REDUCER:
      return initialState;
    default:
      return state;
  }
};
