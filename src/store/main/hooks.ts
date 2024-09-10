import { useCallback } from 'react';
import { setLoggedUser, setStatusBarVisible } from './slice';
import { UserType } from '../../types/UserType';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getLoggedUser, getLoggedUserId, getStatusBarVisible, getUserVendorRole } from './selectors';

export const useSetLoggedUser = () => {
  const dispatch = useAppDispatch();

  return useCallback((user: UserType) => dispatch(setLoggedUser(user)), [dispatch]);
};

export const useSetStatusBarVisible = () => {
  const dispatch = useAppDispatch();

  return useCallback((value: boolean) => dispatch(setStatusBarVisible(value)), [dispatch]);
};

export const useGetLoggedUserId = () => useAppSelector(getLoggedUserId);

export const useGetUserVendorRole = () => useAppSelector(getUserVendorRole);

export const useGetLoggedUser = () => useAppSelector(getLoggedUser);

export const useGetStatusBarVisible = () => useAppSelector(getStatusBarVisible);
