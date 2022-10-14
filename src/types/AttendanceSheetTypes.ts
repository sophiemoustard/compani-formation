import { TraineeType } from './CourseTypes';

type BaseAttendanceSheetType = {
  _id: string,
  course: string,
  file: { publicId: string, link: string },
}

export type IntraAttendanceSheetType = BaseAttendanceSheetType & { date: Date }

export type InterAttendanceSheetType = BaseAttendanceSheetType & { trainee: TraineeType }

export type AttendanceSheetType = IntraAttendanceSheetType | InterAttendanceSheetType

export function isIntra(sheet: AttendanceSheetType): sheet is IntraAttendanceSheetType {
  return (sheet as IntraAttendanceSheetType).date !== undefined;
}
