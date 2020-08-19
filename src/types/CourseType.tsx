import { ProgramType } from './ProgramType';

export interface CourseType {
  _id: string,
  contact: ContactType,
  trainees: Array<string>,
  program: ProgramType,
  company: string,
  type: string,
  trainer: string,
}

export interface ContactType {
  name: string,
  phone: string,
  email: string,
}
