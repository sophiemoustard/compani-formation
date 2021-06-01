import { SubProgramType } from './SubProgramType';
import { CourseSlotType } from './CourseSlotType';

export interface CourseType {
  _id: string,
  contact?: ContactType,
  trainees: String[],
  subProgram: SubProgramType,
  company: string,
  type: string,
  trainer?: string,
  slots: CourseSlotType[],
  misc: string,
  progress: number,
}

export interface ContactType {
  name: string,
  phone: string,
  email: string,
}
