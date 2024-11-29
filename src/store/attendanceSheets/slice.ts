import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { resetAllReducers } from '../actions';
import { BlendedCourseType } from '../../types/CourseTypes';

export type DataOptionsType = {value: string; label: string;}[]

export type AttendanceSheetStateType = {
  course: BlendedCourseType | null,
  missingAttendanceSheets: DataOptionsType,
  slotsToBeSignedOptions: DataOptionsType,
}
const initialState: AttendanceSheetStateType = {
  course: null,
  missingAttendanceSheets: [],
  slotsToBeSignedOptions: [],
};

const resetReducer = () => initialState;

const setBlendedCourse = (state: AttendanceSheetStateType, action: PayloadAction<BlendedCourseType | null>) => (
  { ...state, course: action.payload }
);

const setMissingAttendanceSheetList =
  (state: AttendanceSheetStateType, action: PayloadAction<DataOptionsType>) => (
    { ...state, missingAttendanceSheets: action.payload }
  );

const setSlotsToBeSignedList =
  (state: AttendanceSheetStateType, action: PayloadAction<DataOptionsType>) => (
    { ...state, slotsToBeSignedOptions: action.payload }
  );

const attendanceSheetSlice = createSlice({
  name: 'attendanceSheets',
  initialState,
  reducers: {
    setCourse: setBlendedCourse,
    setMissingAttendanceSheets: setMissingAttendanceSheetList,
    setSlotsToBeSignedOptions: setSlotsToBeSignedList,
    resetAttendanceSheetReducer: resetReducer,
  },
  extraReducers: (builder) => { builder.addCase(resetAllReducers, () => initialState); },
});

export const {
  setCourse,
  setMissingAttendanceSheets,
  setSlotsToBeSignedOptions,
  resetAttendanceSheetReducer,
} = attendanceSheetSlice.actions;

export default attendanceSheetSlice.reducer;
