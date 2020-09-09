import { ActivityType } from '../types/ActivityType';

// Actions types
export const SET_ACTIVITY = 'SET_ACTIVITY';
export const SET_CARD_INDEX = 'SET_CARD_INDEX';
export const SET_EXIT_CONFIRMATION_MODAL = 'SET_EXIT_CONFIRMATION_MODAL';

export interface SetActivityType {
  type: typeof SET_ACTIVITY,
  payload: ActivityType,
}
export interface SetCardIndexType {
  type: typeof SET_CARD_INDEX,
  payload: number,
}
export interface SetExitConfirmationModalType {
  type: typeof SET_EXIT_CONFIRMATION_MODAL,
  payload: boolean,
}

export type ActionType = SetActivityType | SetCardIndexType | SetExitConfirmationModalType;

export interface StateType {
  activity: ActivityType | null,
  cardIndex: number | null,
  exitConfirmationModal: boolean,
}
