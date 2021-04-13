import { CardType } from '../CardType';

export const RESET_CARD_REDUCER = 'RESET_CARD_REDUCER';
export const SET_CARDS = 'SET_CARDS';

export interface SetCardsType {
  type: typeof SET_CARDS,
  payload: Array<CardType>,
}

export interface CardStateType {
  cards: Array<CardType>,
}

export interface ResetCardReducerType {
  type: typeof RESET_CARD_REDUCER,
}

export type CardActionType = SetCardsType | ResetCardReducerType;
