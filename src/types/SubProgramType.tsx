import { StepType } from './StepType';
import { ProgramType } from './ProgramType';

export interface SubProgramType {
  _id: string,
  steps: Array<StepType>,
  name: string,
  program: ProgramType,
  courses?: Array<any>,
  progress: number,
}
