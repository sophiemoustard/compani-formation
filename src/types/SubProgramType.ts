import { StepType } from './CourseType';
import { ProgramType } from './ProgramType';

export interface SubProgramType {
  _id: string,
  steps: Array<StepType>,
  name: string,
  program: ProgramType,
  isStrictlyELearning: boolean,
  courses?: Array<any>,
}
