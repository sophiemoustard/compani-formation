import { LESSON, VIDEO, QUIZ, SHARING_EXPERIENCE } from '../core/data/constants';

type BaseActivityType = {
  _id: string,
  name: string,
  cards: { _id: string, template: string }[],
  quizCount: number,
  activityHistories: {
    questionnaireAnswersList: { _id: string, card: string, answerList: string[] }[],
    score: number,
  }[],
};

type QuizActivityType = BaseActivityType & { type: typeof QUIZ };

type VideoActivityType = BaseActivityType & { type: typeof VIDEO };

type SharingExperienceActivityType = BaseActivityType & { type: typeof SHARING_EXPERIENCE };

type LessonActivityType = BaseActivityType & { type: typeof LESSON };

export type ActivityType = QuizActivityType | VideoActivityType | SharingExperienceActivityType | LessonActivityType;

type BaseStepType = {
  _id: string,
  progress: number,
  type: string,
  name: string,
}

export type ELearningStepType = BaseStepType & { type: 'e_learning', activities: ActivityType[] }
export type OnSiteStepType = BaseStepType & { type: 'on_site', activities: ActivityType[] }
export type StepType = ELearningStepType | OnSiteStepType;

export type NextSlotsStepType = BaseStepType & {
  type: 'on_site',
  stepIndex: string,
  firstSlot: Date,
  slots: Date[],
  courseId: string,
}

type AddressType = {
  fullAddress: string,
  street: string,
  city: string,
  zipCode: string,
  location: {
    coordinates: Array<number>,
    type: string,
  }
}

export type SlotType = {
  _id: string,
  startDate: Date,
  endDate: Date,
  address?: AddressType,
  step: string,
}

// faut il separer avec et sans learningGoals
export type ProgramType = {
  _id: string,
  name: string,
  description: string,
  image: { link: string },
  learningGoals?: string,
}

export type ELearningSubProgramType = {
  isStrictlyElearning: true,
  courses: { _id: string, trainees: String[] }[],
  steps: ELearningStepType[],
}

export type ELearningProgramType = ProgramType & {
  subPrograms: ELearningSubProgramType[],
}

export type CourseType = {
  _id: string,
  trainer: { identity: { lastname: string, firstname: string }, _id: string, biography: string }
  contact: { phone: string, email: string, name: string },
  misc: string,
  progress: number,
  subProgram: {
    program: { image: { link: string }, name: string, description: string, eLearningGoals: string },
    isStrictlyELearning: string,
    steps: StepType[],
  },
  slots: {
    startDate: string,
    endDate: string,
    address: { fullAddress: string },
    step: OnSiteStepType,
  }[],

  trainees?: String[],
}

export interface ContactType {
  name: string,
  phone: string,
  email: string,
}
