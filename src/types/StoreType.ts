import { ActivityType } from '../types/ActivityType';

// Actions types
export const SET_ACTIVITY = 'SET_ACTIVITY';
export const SET_CARD_INDEX = 'SET_CARD_INDEX';

export interface SetActivityType {
  type: typeof SET_ACTIVITY,
  payload: ActivityType,
}
export interface SetCardIndexType {
  type: typeof SET_CARD_INDEX,
  payload: number,
}

export type ActionType = SetActivityType | SetCardIndexType;

export interface StateType {
  activity: ActivityType | null,
  cardIndex: number | null,
}
