import { ActivityType } from '../ActivityType';

// Actions types
export const SET_ACTIVITY = 'SET_ACTIVITY';
export const SET_CARD_INDEX = 'SET_CARD_INDEX';
export const SET_EXIT_CONFIRMATION_MODAL = 'SET_EXIT_CONFIRMATION_MODAL';
export const ADD_QUESTIONNAIRE_ANSWER = 'ADD_QUESTIONNAIRE_ANSWER';
export const RESET_ACTIVITY_REDUCER = 'RESET_ACTIVITY_REDUCER';
export const SET_QUESTIONNAIRE_ANSWERS_LIST = 'SET_QUESTIONNAIRE_ANSWERS_LIST';
export const INC_GOOD_ANSWERS_COUNT = 'INC_GOOD_ANSWERS_COUNT';

export interface SetActivityType {
  type: typeof SET_ACTIVITY,
  payload: ActivityType,
}
export interface SetCardIndexType {
  type: typeof SET_CARD_INDEX,
  payload: number,
}
export interface SetExitConfirmationModalType {
  type: typeof SET_EXIT_CONFIRMATION_MODAL,
  payload: boolean,
}

export interface AddQuestionnaireAnswerType {
  type: typeof ADD_QUESTIONNAIRE_ANSWER,
  payload: QuestionnaireAnswerType,
}

export interface SetQuestionnaireAnswersListType {
  type: typeof SET_QUESTIONNAIRE_ANSWERS_LIST,
  payload: Array<QuestionnaireAnswerType>,
}

export interface ResetActivityReducer {
  type: typeof RESET_ACTIVITY_REDUCER,
}

export interface IncGoodAnswersCountType {
  type: typeof INC_GOOD_ANSWERS_COUNT,
}

export type ActivityActionType =
SetActivityType |
SetCardIndexType |
SetExitConfirmationModalType |
AddQuestionnaireAnswerType |
SetQuestionnaireAnswersListType;

export type ActivityActionWithoutPayloadType = ResetActivityReducer | IncGoodAnswersCountType;

export interface QuestionnaireAnswerType {
  _id?: string,
  card: string,
  answerList: Array<string>,
}

export interface ActivityStateType {
  activity: ActivityType | null,
  cardIndex: number | null,
  exitConfirmationModal: boolean,
  questionnaireAnswersList: Array<QuestionnaireAnswerType>,
  score: number
}
