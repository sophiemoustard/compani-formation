import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  DataOptionsType,
  resetAttendanceSheetReducer,
  setCourse,
  setMissingAttendanceSheets,
  setGroupedSlotsToBeSigned,
} from './slice';
import { getCourse, getMissingAttendanceSheets, getGroupedSlotsToBeSigned } from './selectors';
import { BlendedCourseType, SlotType } from '../../types/CourseTypes';

export const useSetCourse = () => {
  const dispatch = useAppDispatch();

  return useCallback((course: BlendedCourseType | null) => dispatch(setCourse(course)), [dispatch]);
};

export const useSetMissingAttendanceSheets = () => {
  const dispatch = useAppDispatch();

  return useCallback((missingAttendanceSheets: DataOptionsType[]) =>
    dispatch(setMissingAttendanceSheets(missingAttendanceSheets)), [dispatch]);
};

export const useSetGroupedSlotsToBeSigned = () => {
  const dispatch = useAppDispatch();

  return useCallback((groupedSlotsToBeSigned: Record<string, SlotType[]>) =>
    dispatch(setGroupedSlotsToBeSigned(groupedSlotsToBeSigned)), [dispatch]);
};

export const useResetAttendanceSheetReducer = () => {
  const dispatch = useAppDispatch();

  return useCallback(() => dispatch(resetAttendanceSheetReducer()), [dispatch]);
};

export const useGetCourse = () => useAppSelector(getCourse);

export const useGetMissingAttendanceSheets = () => useAppSelector(getMissingAttendanceSheets);

export const useGetGroupedSlotsToBeSigned = () => useAppSelector(getGroupedSlotsToBeSigned);
