import { TraineeType } from './CourseTypes';

type BaseAttendanceSheetType = {
  _id: string,
  course: string,
  file: { publicId: string, link: string },
}

export type IntraOrIntraHoldingAttendanceSheetType = BaseAttendanceSheetType & { date: Date }

export type InterAttendanceSheetType = BaseAttendanceSheetType & { trainee: TraineeType }

export type AttendanceSheetType = IntraOrIntraHoldingAttendanceSheetType | InterAttendanceSheetType

export function isIntraOrIntraHolding(sheet: AttendanceSheetType): sheet is IntraOrIntraHoldingAttendanceSheetType {
  return (sheet as IntraOrIntraHoldingAttendanceSheetType).date !== undefined;
}
