import { SubProgramType } from './SubProgramType';
import { StepType } from './StepType';

export interface ProgramType {
  _id: string,
  name: string,
  learningGoals: string,
  steps: Array<StepType>,
  subPrograms: Array<SubProgramType>,
}
