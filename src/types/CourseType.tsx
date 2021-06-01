import { SubProgramType } from './SubProgramType';
import { CourseSlotType } from './CourseSlotType';

export interface CourseType {
  _id: string,
  contact?: ContactType,
  trainees: Array<string>,
  subProgram: SubProgramType,
  company: string,
  type: string,
  trainer?: string,
  slots: Array<CourseSlotType>
  misc: string,
  progress: number,
}

export interface ContactType {
  name: string,
  phone: string,
  email: string,
}
