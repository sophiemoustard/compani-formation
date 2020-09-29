import { OPEN_QUESTION, SURVEY } from '../../core/data/constants';
import { QuestionnaireAnswerType } from '../../types/store/ActivityStoreType';

export const getCard = state => state.activities.activity.cards[state.activities.cardIndex];

export const getQuestionnaireAnswer = (state): QuestionnaireAnswerType | null => {
  const card = getCard(state);
  if (!card || (![SURVEY, OPEN_QUESTION].includes(card.template))) return null;
  return state.activities.questionnaireAnswersList.find(qa => qa.card === card._id) || null;
};
