import {
  SetCardsType,
  SET_CARDS,
  RESET_CARD_REDUCER,
} from '../../types/store/CardStoreType';
import { CardType } from '../../types/CardType';
import { ActionWithoutPayloadType } from '../../types/store/StoreType';

const resetCardReducer = (): ActionWithoutPayloadType => ({ type: RESET_CARD_REDUCER });
const setCards = (cards: Array<CardType>): SetCardsType => ({ type: SET_CARDS, payload: cards });

export default {
  setCards,
  resetCardReducer,
};
