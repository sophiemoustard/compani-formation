// @ts-nocheck

import { OPEN_QUESTION, QUESTION_ANSWER, SURVEY, TRANSITION } from '../../core/data/constants';
import { QuestionnaireAnswersType } from '../../types/ActivityTypes';
import { StateType } from '../store';

export const getCard = (state: StateType) => state.cards.cards[state.cards.cardIndex];

export const getQuestionnaireAnswer = (state: StateType): QuestionnaireAnswersType | null => {
  const card = getCard(state);
  if (!card || (![SURVEY, OPEN_QUESTION, QUESTION_ANSWER].includes(card.template))) return null;
  return state.cards.questionnaireAnswersList.find(qa => qa.card === card._id) || null;
};

export const getMaxProgress = (state: StateType) =>
  state.cards.cards.filter(card => card.template !== TRANSITION).length;

export const getProgress = (state: StateType) => {
  const { cards, cardIndex } = state.cards;
  if (!Number.isInteger(cardIndex)) return 0;

  return 1 + cards.filter(c => c.template !== TRANSITION).map(c => c._id).indexOf(cards[cardIndex]._id);
};

export const displayProgressBar = (state: StateType) =>
  !!getCard(state) && getCard(state).template !== TRANSITION;

export const getCards = (state: StateType) => state.cards.cards;

export const getCardIndex = (state: StateType) => state.cards.cardIndex;

export const getExitConfirmationModal = (state: StateType) => state.cards.exitConfirmationModal;

export const getScore = (state: StateType) => state.cards.score;

export const getQuestionnaireAnswersList = (state: StateType) => state.cards.questionnaireAnswersList;
