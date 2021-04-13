import { CardType } from '../CardType';

export const RESET_CARD_REDUCER = 'RESET_CARD_REDUCER';
export const SET_CARDS = 'SET_CARDS';
export const SET_CARD_INDEX = 'SET_CARD_INDEX';

// STATE
export interface CardStateType {
  cards: Array<CardType>,
  cardIndex: number | null,
}

// ACTION
export interface ResetCardReducerType {
  type: typeof RESET_CARD_REDUCER,
}

export interface SetCardsType {
  type: typeof SET_CARDS,
  payload: Array<CardType>,
}
export interface SetCardIndexType {
  type: typeof SET_CARD_INDEX,
  payload: number,
}

export type CardActionType = SetCardsType | SetCardIndexType;
export type CardActionWithoutPayloadType = ResetCardReducerType;
