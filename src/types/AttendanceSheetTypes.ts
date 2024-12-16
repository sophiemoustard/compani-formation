import { SlotType, TraineeType } from './CourseTypes';

type BaseAttendanceSheetType = {
  _id: string,
  course: string,
  file: { publicId: string, link: string },
  slots?: SlotType[]
}

export type IntraOrIntraHoldingAttendanceSheetType = BaseAttendanceSheetType & { date: Date }

export type InterAttendanceSheetType = BaseAttendanceSheetType & { trainee: TraineeType }

export type SingleAttendanceSheetType = BaseAttendanceSheetType & { trainee: TraineeType, slots: SlotType[] }

export type AttendanceSheetType = IntraOrIntraHoldingAttendanceSheetType | InterAttendanceSheetType
| SingleAttendanceSheetType

export function isIntraOrIntraHolding(sheet: AttendanceSheetType): sheet is IntraOrIntraHoldingAttendanceSheetType {
  return (sheet as IntraOrIntraHoldingAttendanceSheetType).date !== undefined;
}
