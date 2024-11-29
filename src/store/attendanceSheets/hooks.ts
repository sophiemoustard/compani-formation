import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  DataOptionsType,
  resetAttendanceSheetReducer,
  setCourse,
  setMissingAttendanceSheets,
  setSlotsToBeSignedOptions,
} from './slice';
import { getCourse, getMissingAttendanceSheets, getSlotsToBeSignedOptions } from './selectors';
import { BlendedCourseType } from '../../types/CourseTypes';

export const useSetCourse = () => {
  const dispatch = useAppDispatch();

  return useCallback((course: BlendedCourseType | null) => dispatch(setCourse(course)), [dispatch]);
};

export const useSetMissingAttendanceSheets = () => {
  const dispatch = useAppDispatch();

  return useCallback((missingAttendanceSheets: DataOptionsType) =>
    dispatch(setMissingAttendanceSheets(missingAttendanceSheets)), [dispatch]);
};

export const useSetSlotsToBeSignedOptions = () => {
  const dispatch = useAppDispatch();

  return useCallback((slotsToBeSignedOptions: DataOptionsType) =>
    dispatch(setSlotsToBeSignedOptions(slotsToBeSignedOptions)), [dispatch]);
};

export const useResetAttendanceSheetReducer = () => {
  const dispatch = useAppDispatch();

  return useCallback(() => dispatch(resetAttendanceSheetReducer()), [dispatch]);
};

export const useGetCourse = () => useAppSelector(getCourse);

export const useGetMissingAttendanceSheets = () => useAppSelector(getMissingAttendanceSheets);

export const useGetSlotsToBeSignedOptions = () => useAppSelector(getSlotsToBeSignedOptions);
