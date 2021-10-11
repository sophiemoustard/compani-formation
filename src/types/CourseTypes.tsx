import { StepType, ELearningStepType } from './StepTypes';

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

export type ProgramType = {
  _id: string,
  name: string,
  description: string,
  image: { link: string },
  learningGoals?: string,
}

export type ELearningSubProgramType = SubProgramType & {
  isStrictlyElearning: true,
  courses: { _id: string, trainees: String[] }[],
  steps: ELearningStepType[],
}

export type ELearningCourseProgramType = ProgramType & {
  subPrograms: ELearningSubProgramType[],
}

export type SubProgramType = {
  _id: string,
  steps: StepType[],
  isStrictlyELearning: boolean,
}

type BaseCourseType = {
  _id: string,
  progress: number,
  subProgram: SubProgramType & { program: ProgramType },
};

export type ELearningCourseType = BaseCourseType & {
  subProgram: { isStrictlyELearning: true }
};

export type BlendedCourseType = BaseCourseType & {
  subProgram: { isStrictlyELearning: false },
  slots: SlotType[],
  trainer: { _id: string, identity: { lastname: string, firstname: string }, picture: { link: '' }, biography: '' },
  contact: { name: string, phone: string, email: string },
  misc: string,
}

export type CourseType = ELearningCourseType | BlendedCourseType;
