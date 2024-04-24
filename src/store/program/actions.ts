import { ProgramType } from '../../types/CourseTypes';
import {
  SET_PROGRAM,
  SetProgramType,
  RESET_PROGRAM_REDUCER,
} from '../../types/store/CourseStoreType';
import { ActionWithoutPayloadType } from '../../types/store/StoreType';

const setProgram = (program: ProgramType | null): SetProgramType => ({ type: SET_PROGRAM, payload: program });
const resetProgramReducer = (): ActionWithoutPayloadType => ({ type: RESET_PROGRAM_REDUCER });

export default {
  setProgram,
  resetProgramReducer,
};
