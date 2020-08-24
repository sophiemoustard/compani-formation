import { ActivityType } from './ActivityType';

export interface StepType {
  _id?: string,
  activities?: Array<ActivityType>,
  name: string,
  type: string,
}
