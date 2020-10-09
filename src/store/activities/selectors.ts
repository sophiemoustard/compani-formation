import { OPEN_QUESTION, SURVEY, TRANSITION } from '../../core/data/constants';
import { QuestionnaireAnswerType } from '../../types/store/ActivityStoreType';

export const getCard = state => state.activities.activity.cards[state.activities.cardIndex];

export const getQuestionnaireAnswer = (state): QuestionnaireAnswerType | null => {
  const card = getCard(state);
  if (!card || (![SURVEY, OPEN_QUESTION].includes(card.template))) return null;
  return state.activities.questionnaireAnswersList.find(qa => qa.card === card._id) || null;
};

export const getCardsCount = state =>
  state.activities.activity.cards.filter(card => card.template !== TRANSITION).length;

export const getProgress = (state) => {
  const transitionBeforeCardCounter = state.activities.activity.cards.slice(0, state.activities.cardIndex)
    .filter(card => card.template === TRANSITION)
    .length;

  return state.activities.cardIndex - transitionBeforeCardCounter + 1;
};

export const displayProgressBar = state => getCard(state) !== undefined && getCard(state)?.template !== TRANSITION;
