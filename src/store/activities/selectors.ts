import { TRANSITION } from '../../core/data/constants';

const getCard = state => state.cards.cards[state.cards.cardIndex];

const getMaxProgress = state => state.cards.cards.filter(card => card.template !== TRANSITION).length;

const getProgress = (state) => {
  const { cards, cardIndex } = state.cards;
  if (!Number.isInteger(cardIndex)) return 0;

  return 1 + cards.filter(c => c.template !== TRANSITION).map(c => c._id).indexOf(cards[cardIndex]._id);
};

const displayProgressBar = state => !!getCard(state) && getCard(state).template !== TRANSITION;

export default {
  getCard,
  getMaxProgress,
  getProgress,
  displayProgressBar,
};
