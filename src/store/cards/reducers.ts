import {
  CardStateType,
  CardActionType,
  SET_CARDS,
  RESET_CARD_REDUCER,
  SET_CARD_INDEX,
} from '../../types/store/CardStoreType';

const initialState: CardStateType = {
  cards: [],
  cardIndex: null,
};

export const cards = (state: CardStateType = initialState, action: CardActionType) => {
  switch (action.type) {
    case SET_CARDS:
      return { ...state, cards: action.payload };
    case SET_CARD_INDEX:
      return { ...state, cardIndex: action.payload };
    case RESET_CARD_REDUCER:
      return initialState;
    default:
      return state;
  }
};
