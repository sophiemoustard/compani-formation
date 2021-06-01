import { ActivityType } from './ActivityType';

interface StepInterface {
  _id: string,
  name: string,
  type: string,
  progress: number,
}

export interface StepType extends StepInterface {
  activities?: ActivityType[]
}

export interface CourseStepType extends StepInterface {
  stepIndex: string,
  firstSlot: Date,
  slots: Date[],
  courseId: string,
}
