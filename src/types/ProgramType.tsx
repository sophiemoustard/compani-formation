import { SubProgramType } from './SubProgramType';

export interface ProgramType {
  _id: string,
  name: string,
  description: string,
  image: { link: string },
  subPrograms?: Array<SubProgramType>,
}
