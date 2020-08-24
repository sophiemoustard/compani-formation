import { SubProgramType } from './SubProgramType';

export interface CourseType {
  _id: string,
  contact: ContactType,
  trainees: Array<string>,
  subProgram: SubProgramType,
  company: string,
  type: string,
  trainer: string,
}

export interface ContactType {
  name: string,
  phone: string,
  email: string,
}
