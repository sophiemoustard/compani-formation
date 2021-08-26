import { E_LEARNING, ON_SITE } from '../core/data/constants';
import { ActivityType } from './ActivityTypes';

type BaseStepType = {
  _id: string,
  progress: number,
  type: string,
  name: string,
}

export type ELearningStepType = BaseStepType & { type: typeof E_LEARNING, activities: ActivityType[] }
export type OnSiteStepType = BaseStepType & { type: typeof ON_SITE, activities: ActivityType[] }
export type StepType = ELearningStepType | OnSiteStepType;

export type NextSlotsStepType = BaseStepType & {
  type: typeof ON_SITE,
  stepIndex: string,
  firstSlot: Date,
  slots: Date[],
  courseId: string,
};
