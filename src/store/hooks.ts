import { useDispatch, useSelector } from 'react-redux';
import type { DispatchType, StateType } from './store';

export const useAppDispatch = useDispatch.withTypes<DispatchType>();
export const useAppSelector = useSelector.withTypes<StateType>();
