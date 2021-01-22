import { SubProgramType } from './SubProgramType';

export interface ProgramType {
  _id: string,
  name: string,
  description: string,
  learningGoals: string,
  image: { link: string },
  subPrograms?: Array<SubProgramType>,
}
