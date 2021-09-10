import { OPEN_QUESTION, QUESTION_ANSWER, SURVEY, TRANSITION } from '../../core/data/constants';
import { QuestionnaireAnswersType } from '../../types/ActivityTypes';

const getCard = state => state.cards.cards[state.cards.cardIndex];

const getQuestionnaireAnswer = (state): QuestionnaireAnswersType | null => {
  const card = getCard(state);
  if (!card || (![SURVEY, OPEN_QUESTION, QUESTION_ANSWER].includes(card.template))) return null;
  return state.cards.questionnaireAnswersList.find(qa => qa.card === card._id) || null;
};

const getMaxProgress = state => state.cards.cards.filter(card => card.template !== TRANSITION).length;

const getProgress = (state) => {
  const { cards, cardIndex } = state.cards;
  if (!Number.isInteger(cardIndex)) return 0;

  return 1 + cards.filter(c => c.template !== TRANSITION).map(c => c._id).indexOf(cards[cardIndex]._id);
};

const displayProgressBar = state => !!getCard(state) && getCard(state).template !== TRANSITION;

export default {
  getCard,
  getQuestionnaireAnswer,
  getMaxProgress,
  getProgress,
  displayProgressBar,
};
