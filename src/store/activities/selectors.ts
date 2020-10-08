import { OPEN_QUESTION, SURVEY, TRANSITION } from '../../core/data/constants';
import { QuestionnaireAnswerType } from '../../types/store/ActivityStoreType';

export const getCard = state => state.activities.activity.cards[state.activities.cardIndex];

export const getQuestionnaireAnswer = (state): QuestionnaireAnswerType | null => {
  const card = getCard(state);
  if (!card || (![SURVEY, OPEN_QUESTION].includes(card.template))) return null;
  return state.activities.questionnaireAnswersList.find(qa => qa.card === card._id) || null;
};

export const getTotalCards = state =>
  state.activities.activity.cards.filter(card => card.template !== TRANSITION).length;

export const getIndexCard = (state) => {
  const transitionsIndexes = state.activities.activity.cards.map((card, index) => ({ template: card.template, index }))
    .filter(card => card.template === TRANSITION);
  let transitionBeforeCardCounter = 0;
  transitionsIndexes.forEach(({ index }) => {
    if (index < state.activities.cardIndex) transitionBeforeCardCounter += 1;
  });

  return state.activities.cardIndex - transitionBeforeCardCounter + 1;
};
