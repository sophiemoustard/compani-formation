import { CardType } from '../CardType';
import { QuestionnaireAnswersType } from '../ActivityTypes';

export const RESET_CARD_REDUCER = 'RESET_CARD_REDUCER';
export const SET_CARDS = 'SET_CARDS';
export const SET_CARD_INDEX = 'SET_CARD_INDEX';
export const ADD_QUESTIONNAIRE_ANSWER = 'ADD_QUESTIONNAIRE_ANSWER';
export const REMOVE_QUESTIONNAIRE_ANSWER = 'REMOVE_QUESTIONNAIRE_ANSWER';
export const SET_QUESTIONNAIRE_ANSWERS_LIST = 'SET_QUESTIONNAIRE_ANSWERS_LIST';
export const INC_GOOD_ANSWERS_COUNT = 'INC_GOOD_ANSWERS_COUNT';
export const SET_EXIT_CONFIRMATION_MODAL = 'SET_EXIT_CONFIRMATION_MODAL';

// STATE
export type CardStateType = {
  cards: CardType[],
  cardIndex: number | null,
  questionnaireAnswersList: QuestionnaireAnswersType[],
  score: number,
  exitConfirmationModal: boolean,
}

// ACTIONS
export type ResetCardReducerType = { type: typeof RESET_CARD_REDUCER }

export type SetCardsType = { type: typeof SET_CARDS, payload: CardType[] }

export type SetCardIndexType = { type: typeof SET_CARD_INDEX, payload: number | null }

export type AddQuestionnaireAnswerType = { type: typeof ADD_QUESTIONNAIRE_ANSWER, payload: QuestionnaireAnswersType }

export type RemoveQuestionnaireAnswerType = { type: typeof REMOVE_QUESTIONNAIRE_ANSWER, payload: string }

export type SetQuestionnaireAnswersListType = {
  type: typeof SET_QUESTIONNAIRE_ANSWERS_LIST,
  payload: QuestionnaireAnswersType[],
}

export type IncGoodAnswersCountType = { type: typeof INC_GOOD_ANSWERS_COUNT }

export type SetExitConfirmationModalType = { type: typeof SET_EXIT_CONFIRMATION_MODAL, payload: boolean }

export type CardActionType =
SetCardsType |
SetCardIndexType |
AddQuestionnaireAnswerType |
SetQuestionnaireAnswersListType |
RemoveQuestionnaireAnswerType |
SetExitConfirmationModalType;

export type CardActionWithoutPayloadType = ResetCardReducerType | IncGoodAnswersCountType;
