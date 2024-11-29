// @ts-nocheck

import {
  FILL_THE_GAPS,
  MULTIPLE_CHOICE_QUESTION,
  OPEN_QUESTION,
  ORDER_THE_SEQUENCE,
  QUESTION_ANSWER,
  SINGLE_CHOICE_QUESTION,
  SURVEY,
  TRANSITION,
} from '../../core/data/constants';
import { QuestionnaireAnswersType, QuizzAnswersType } from '../../types/ActivityTypes';
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

export const getQuizzAnswersList = (state: StateType) => state.cards.quizzAnswersList;

export const getQuizzAnswer = (state: StateType): QuizzAnswersType | null => {
  const card = getCard(state);
  const QUIZZ_TEMPLATES = [MULTIPLE_CHOICE_QUESTION, SINGLE_CHOICE_QUESTION, ORDER_THE_SEQUENCE, FILL_THE_GAPS];
  if (!card || (!QUIZZ_TEMPLATES.includes(card.template))) return null;
  return state.cards.quizzAnswersList.find(qa => qa.card === card._id) || null;
};

export const getViewedFlashCards = (state: StateType) => state.cards.viewedFlashCards;
