import {
  SetCardsType,
  SetCardIndexType,
  SET_CARDS,
  RESET_CARD_REDUCER,
  SET_CARD_INDEX,
} from '../../types/store/CardStoreType';
import { CardType } from '../../types/CardType';
import { ActionWithoutPayloadType } from '../../types/store/StoreType';

const resetCardReducer = (): ActionWithoutPayloadType => ({ type: RESET_CARD_REDUCER });
const setCards = (cards: Array<CardType>): SetCardsType => ({ type: SET_CARDS, payload: cards });
const setCardIndex = (index: number): SetCardIndexType => ({ type: SET_CARD_INDEX, payload: index });

export default {
  setCards,
  resetCardReducer,
  setCardIndex,
};
