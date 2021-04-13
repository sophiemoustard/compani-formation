import { OPEN_QUESTION, QUESTION_ANSWER, SURVEY, TRANSITION } from '../../core/data/constants';
import { QuestionnaireAnswerType } from '../../types/store/ActivityStoreType';

const getCard = state => state.cards.cards[state.cards.cardIndex];

const getQuestionnaireAnswer = (state): QuestionnaireAnswerType | null => {
  const card = getCard(state);
  if (!card || (![SURVEY, OPEN_QUESTION, QUESTION_ANSWER].includes(card.template))) return null;
  return state.activities.questionnaireAnswersList.find(qa => qa.card === card._id) || null;
};

const getMaxProgress = state =>
  state.activities.activity.cards.filter(card => card.template !== TRANSITION).length;

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
