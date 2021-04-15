import { CardType } from '../CardType';

export const RESET_CARD_REDUCER = 'RESET_CARD_REDUCER';
export const SET_CARDS = 'SET_CARDS';
export const SET_CARD_INDEX = 'SET_CARD_INDEX';
export const ADD_QUESTIONNAIRE_ANSWER = 'ADD_QUESTIONNAIRE_ANSWER';
export const REMOVE_QUESTIONNAIRE_ANSWER = 'REMOVE_QUESTIONNAIRE_ANSWER';
export const SET_QUESTIONNAIRE_ANSWERS_LIST = 'SET_QUESTIONNAIRE_ANSWERS_LIST';
export const INC_GOOD_ANSWERS_COUNT = 'INC_GOOD_ANSWERS_COUNT';
export const SET_EXIT_CONFIRMATION_MODAL = 'SET_EXIT_CONFIRMATION_MODAL';

// STATE
export interface CardStateType {
  cards: Array<CardType>,
  cardIndex: number | null,
  questionnaireAnswersList: Array<QuestionnaireAnswerType>,
  score: number,
  exitConfirmationModal: boolean,
}

// ACTIONS
export interface ResetCardReducerType { type: typeof RESET_CARD_REDUCER }

export interface SetCardsType { type: typeof SET_CARDS, payload: Array<CardType> }

export interface SetCardIndexType { type: typeof SET_CARD_INDEX, payload: number }

export interface QuestionnaireAnswerType { _id?: string, card: string, answerList: Array<string> }

export interface AddQuestionnaireAnswerType { type: typeof ADD_QUESTIONNAIRE_ANSWER, payload: QuestionnaireAnswerType }

export interface RemoveQuestionnaireAnswerType { type: typeof REMOVE_QUESTIONNAIRE_ANSWER, payload: string }

export interface SetQuestionnaireAnswersListType {
  type: typeof SET_QUESTIONNAIRE_ANSWERS_LIST,
  payload: Array<QuestionnaireAnswerType>,
}

export interface IncGoodAnswersCountType { type: typeof INC_GOOD_ANSWERS_COUNT }

export interface SetExitConfirmationModalType { type: typeof SET_EXIT_CONFIRMATION_MODAL, payload: boolean }

export type CardActionType =
SetCardsType |
SetCardIndexType |
AddQuestionnaireAnswerType |
SetQuestionnaireAnswersListType |
RemoveQuestionnaireAnswerType |
SetExitConfirmationModalType;

export type CardActionWithoutPayloadType = ResetCardReducerType | IncGoodAnswersCountType;
