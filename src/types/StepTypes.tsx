import { E_LEARNING, ON_SITE, REMOTE } from '../core/data/constants';
import { ActivityType } from './ActivityTypes';

type BaseStepType = {
  _id: string,
  progress: number,
  type: string,
  name: string,
}

export type ELearningStepType = BaseStepType & { type: typeof E_LEARNING, activities: ActivityType[] }
export type LiveStepType = BaseStepType & { type: typeof ON_SITE | typeof REMOTE, activities: ActivityType[] }
export type StepType = ELearningStepType | LiveStepType;

export type NextSlotsStepType = BaseStepType & {
  type: typeof ON_SITE | typeof REMOTE,
  stepIndex: string,
  firstSlot: Date,
  slots: Date[],
  courseId: string,
};
