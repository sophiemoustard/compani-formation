import { StateType } from '../store';

export const getCourse = (state: StateType) => state.attendanceSheets.course;

export const getMissingAttendanceSheets = (state: StateType) => state.attendanceSheets.missingAttendanceSheets;
