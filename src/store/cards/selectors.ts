import { OPEN_QUESTION, QUESTION_ANSWER, SURVEY } from '../../core/data/constants';
import { QuestionnaireAnswerType } from '../../types/store/CardStoreType';

const getCard = state => state.cards.cards[state.cards.cardIndex];

const getQuestionnaireAnswer = (state): QuestionnaireAnswerType | null => {
  const card = getCard(state);
  if (!card || (![SURVEY, OPEN_QUESTION, QUESTION_ANSWER].includes(card.template))) return null;
  return state.cards.questionnaireAnswersList.find(qa => qa.card === card._id) || null;
};

export default {
  getCard,
  getQuestionnaireAnswer,
};
