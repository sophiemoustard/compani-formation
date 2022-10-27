import { UserType } from './UserType';
import { StepType, ELearningStepType } from './StepTypes';
import { BLENDED, LEARNER, OPERATIONS, PEDAGOGY, STRICTLY_E_LEARNING, TESTER, TRAINER } from '../core/data/constants';

// query
export type actionQueryCourseType = typeof PEDAGOGY | typeof OPERATIONS;

// Program
export type BaseProgramType = {
  _id: string,
  name: string,
  image: { link: string },
  description?: string,
  learningGoals?: string,
  subPrograms?: SubProgramType[],
}

export type ELearningProgramType = BaseProgramType & {
  subPrograms: ELearningSubProgramType[],
}

export type ProgramType = BaseProgramType | ELearningProgramType;

// Sub-program
export type SubProgramType = {
  _id: string,
  steps: StepType[],
  isStrictlyELearning: boolean,
  courses?: CourseType[],
}

export type ELearningSubProgramType = SubProgramType & {
  isStrictlyElearning: true,
  courses: { _id: string, trainees: String[] }[],
  steps: ELearningStepType[],
  program?: BaseProgramType,
}

// Course
type AddressType = {
  fullAddress: string,
  street: string,
  city: string,
  zipCode: string,
  location: { coordinates: number[], type: string }
}

export type SlotType = {
  _id: string,
  startDate: Date,
  endDate: Date,
  address?: AddressType,
  meetingLink?: string,
  step: { _id: string, type: string },
}

export type SlotToPlanType = {
  _id: string,
  address?: AddressType,
  meetingLink?: string,
  step: { _id: string, type: string },
}

type BaseCourseType = {
  _id: string,
  progress: { blended: number, eLearning?: number },
  subProgram: SubProgramType & { program: ProgramType },
  areLastSlotAttendancesValidated?: boolean,
  type: string,
  format: typeof STRICTLY_E_LEARNING | typeof BLENDED,
};

export type ELearningCourseType = BaseCourseType & {
  subProgram: { isStrictlyELearning: true },
  trainees?: string[],
};

export type TraineeType = {
  _id: string,
  identity: { lastname: string, firstname: string },
  local: { email: string },
  picture: { link: '' },
  firstMobileConnection: string,
}

export type BlendedCourseType = BaseCourseType & {
  subProgram: { isStrictlyELearning: false },
  archivedAt: Date,
  slots: SlotType[],
  slotsToPlan: SlotToPlanType[],
  trainer: { _id: string, identity: { lastname: string, firstname: string }, picture: { link: '' }, biography: '' },
  contact: UserType,
  companyRepresentative: UserType,
  misc: string,
  trainees?: TraineeType[],
}

export type CourseModeType = typeof LEARNER | typeof TESTER | typeof TRAINER;

export type CourseType = ELearningCourseType | BlendedCourseType;
