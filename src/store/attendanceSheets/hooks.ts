import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  MissingAttendanceSheetType,
  resetAttendanceSheetReducer,
  setCourse,
  setMissingAttendanceSheets,
} from './slice';
import { getCourse, getMissingAttendanceSheets } from './selectors';
import { BlendedCourseType } from '../../types/CourseTypes';

export const useSetCourse = () => {
  const dispatch = useAppDispatch();

  return useCallback((course: BlendedCourseType) => dispatch(setCourse(course)), [dispatch]);
};

export const useSetMissingAttendanceSheets = () => {
  const dispatch = useAppDispatch();

  return useCallback((missingAttendanceSheets: MissingAttendanceSheetType) =>
    dispatch(setMissingAttendanceSheets(missingAttendanceSheets)), [dispatch]);
};

export const useResetAttendanceSheetReducer = () => {
  const dispatch = useAppDispatch();

  return useCallback(() => dispatch(resetAttendanceSheetReducer()), [dispatch]);
};

export const useGetCourse = () => useAppSelector(getCourse);

export const useGetMissingAttendanceSheets = () => useAppSelector(getMissingAttendanceSheets);
