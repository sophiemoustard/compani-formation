import { SURVEY } from '../../core/data/constants';
import { QuestionnaireAnswerType } from '../../types/store/ActivityStoreType';

export const getCard = state => state.activities.activity.cards[state.activities.cardIndex];

export const getQuestionnaireAnswer = (state): QuestionnaireAnswerType | null => {
  const card = getCard(state);
  if (!card || card.template !== SURVEY) return null;
  return state.activities.questionnaireAnswersList.find(qa => qa.card === card._id) || null;
};
