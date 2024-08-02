import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import type { DispatchType, StateType } from './store';
import { resetAllReducers } from './actions';

export const useAppDispatch = useDispatch.withTypes<DispatchType>();
export const useAppSelector = useSelector.withTypes<StateType>();

export const useResetAllReducers = () => {
  const dispatch = useAppDispatch();

  return useCallback(() => dispatch(resetAllReducers()), [dispatch]);
};
