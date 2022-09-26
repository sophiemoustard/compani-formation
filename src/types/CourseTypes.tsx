import { StepType, ELearningStepType } from './StepTypes';
import { OPERATIONS, PEDAGOGY } from '../core/data/constants';

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
  progress: number,
  subProgram: SubProgramType & { program: ProgramType },
  areLastSlotAttendancesValidated?: boolean,
};

export type ELearningCourseType = BaseCourseType & {
  subProgram: { isStrictlyELearning: true },
  trainees?: string[],
};

export type BlendedCourseType = BaseCourseType & {
  subProgram: { isStrictlyELearning: false },
  slots: SlotType[],
  slotsToPlan: SlotToPlanType[],
  trainer: { _id: string, identity: { lastname: string, firstname: string }, picture: { link: '' }, biography: '' },
  contact: {
    _id: string,
    identity: { lastname: string, firstname: string },
    contact: { phone: string },
    local: { email: string}
  },
  misc: string,
}

export type CourseType = ELearningCourseType | BlendedCourseType;
