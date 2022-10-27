import { OPEN_QUESTION, QUESTION_ANSWER, SURVEY, TRANSITION } from '../../core/data/constants';
import { QuestionnaireAnswersType } from '../../types/ActivityTypes';
import { CardStateType } from '../../types/store/CardStoreType';

const getCard = (state: { cards: CardStateType}) => state.cards.cards[state.cards.cardIndex];

const getQuestionnaireAnswer = (state: { cards: CardStateType}): QuestionnaireAnswersType | null => {
  const card = getCard(state);
  if (!card || (![SURVEY, OPEN_QUESTION, QUESTION_ANSWER].includes(card.template))) return null;
  return state.cards.questionnaireAnswersList.find(qa => qa.card === card._id) || null;
};

const getMaxProgress = (state: { cards: CardStateType}) =>
  state.cards.cards.filter(card => card.template !== TRANSITION).length;

const getProgress = (state: { cards: CardStateType}) => {
  const { cards, cardIndex } = state.cards;
  if (!Number.isInteger(cardIndex)) return 0;

  return 1 + cards.filter(c => c.template !== TRANSITION).map(c => c._id).indexOf(cards[cardIndex]._id);
};

const displayProgressBar = (state: { cards: CardStateType}) =>
  !!getCard(state) && getCard(state).template !== TRANSITION;

export default {
  getCard,
  getQuestionnaireAnswer,
  getMaxProgress,
  getProgress,
  displayProgressBar,
};
