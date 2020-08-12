import { StepType } from './StepType';

export interface SubProgramType {
  _id: string,
  steps: Array<StepType>,
  name: string,
}
