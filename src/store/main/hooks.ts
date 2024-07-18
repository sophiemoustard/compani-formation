import { setLoggedUser, setStatusBarVisible } from './slice';
import { UserType } from '../../types/UserType';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getLoggedUser, getLoggedUserId, getStatusBarVisible, getUserVendorRole } from './selectors';

export const useSetLoggedUser = () => {
  const dispatch = useAppDispatch();

  return (user: UserType) => dispatch(setLoggedUser(user));
};

export const useSetStatusBarVisible = () => {
  const dispatch = useAppDispatch();

  return (value: boolean) => dispatch(setStatusBarVisible(value));
};

export const useGetLoggedUserId = () => useAppSelector(getLoggedUserId);

export const useGetUserVendorRole = () => useAppSelector(getUserVendorRole);

export const useGetLoggedUser = () => useAppSelector(getLoggedUser);

export const useGetStatusBarVisible = () => useAppSelector(getStatusBarVisible);
