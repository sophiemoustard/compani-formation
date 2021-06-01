import { ActivityType } from './ActivityType';

type CommonStepType = {
  _id: string,
  name: string,
  type: string,
  progress: number,
}

export type StepType = CommonStepType & {
  activities?: ActivityType[],
}

export type CourseStepType = CommonStepType & {
  stepIndex: string,
  firstSlot: Date,
  slots: Date[],
  courseId: string,
}
