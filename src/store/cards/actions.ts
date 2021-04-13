import {
  SetCardsType,
  SetCardIndexType,
  AddQuestionnaireAnswerType,
  RemoveQuestionnaireAnswerType,
  SetQuestionnaireAnswersListType,
  QuestionnaireAnswerType,
  SET_CARDS,
  RESET_CARD_REDUCER,
  SET_CARD_INDEX,
  ADD_QUESTIONNAIRE_ANSWER,
  REMOVE_QUESTIONNAIRE_ANSWER,
  SET_QUESTIONNAIRE_ANSWERS_LIST,
  INC_GOOD_ANSWERS_COUNT,
} from '../../types/store/CardStoreType';
import { CardType } from '../../types/CardType';
import { ActionWithoutPayloadType } from '../../types/store/StoreType';

const resetCardReducer = (): ActionWithoutPayloadType => ({ type: RESET_CARD_REDUCER });
const setCards = (cards: Array<CardType>): SetCardsType => ({ type: SET_CARDS, payload: cards });
const setCardIndex = (index: number): SetCardIndexType => ({ type: SET_CARD_INDEX, payload: index });

const setQuestionnaireAnswersList =
(questionnaireAnswersList: Array<QuestionnaireAnswerType>): SetQuestionnaireAnswersListType =>
  ({ type: SET_QUESTIONNAIRE_ANSWERS_LIST, payload: questionnaireAnswersList });
const addQuestionnaireAnswer = (questionnaireAnswer: QuestionnaireAnswerType): AddQuestionnaireAnswerType =>
  ({ type: ADD_QUESTIONNAIRE_ANSWER, payload: questionnaireAnswer });
const removeQuestionnaireAnswer = (card: string): RemoveQuestionnaireAnswerType =>
  ({ type: REMOVE_QUESTIONNAIRE_ANSWER, payload: card });

const incGoodAnswersCount = (): ActionWithoutPayloadType => ({ type: INC_GOOD_ANSWERS_COUNT });

export default {
  setCards,
  resetCardReducer,
  setCardIndex,
  addQuestionnaireAnswer,
  removeQuestionnaireAnswer,
  setQuestionnaireAnswersList,
  incGoodAnswersCount,
};
