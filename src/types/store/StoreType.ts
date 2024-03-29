import { MainStateType, MainActionType, ResetMainReducer } from './MainStoreType';
import { CardStateType, CardActionType, CardActionWithoutPayloadType } from './CardStoreType';

export const LOG_OUT = 'log_out';
export const defaultAction = { type: null };

export type DefaultActionType = typeof defaultAction;
export type ResetAllReducers = { type: typeof LOG_OUT };
export type ActionType = MainActionType | CardActionType;
export type ActionWithoutPayloadType =
CardActionWithoutPayloadType |
ResetMainReducer |
ResetAllReducers;
export interface StateType {
  main: MainStateType,
  cards: CardStateType
}
