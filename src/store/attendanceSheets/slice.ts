import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { resetAllReducers } from '../actions';
import { BlendedCourseType } from '../../types/CourseTypes';

export type MissingAttendanceSheetType = {value: string; label: string;}[]

export type AttendanceSheetStateType = {
  course: BlendedCourseType | null,
  missingAttendanceSheets: MissingAttendanceSheetType,
}
const initialState: AttendanceSheetStateType = {
  course: null,
  missingAttendanceSheets: [],
};

const resetReducer = () => initialState;

const setBlendedCourse = (state: AttendanceSheetStateType, action: PayloadAction<BlendedCourseType | null>) => (
  { ...state, course: action.payload }
);

const setMissingAttendanceSheetList =
  (state: AttendanceSheetStateType, action: PayloadAction<MissingAttendanceSheetType>) => (
    { ...state, missingAttendanceSheets: action.payload }
  );

const attendanceSheetSlice = createSlice({
  name: 'attendanceSheets',
  initialState,
  reducers: {
    setCourse: setBlendedCourse,
    setMissingAttendanceSheets: setMissingAttendanceSheetList,
    resetAttendanceSheetReducer: resetReducer,
  },
  extraReducers: (builder) => { builder.addCase(resetAllReducers, () => initialState); },
});

export const { setCourse, setMissingAttendanceSheets, resetAttendanceSheetReducer } = attendanceSheetSlice.actions;

export default attendanceSheetSlice.reducer;
