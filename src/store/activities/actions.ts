import { ActionWithoutPayloadType } from '../../types/store/StoreType';
import {
  SET_ACTIVITY,
  SetActivityType,
  SET_CARD_INDEX,
  SetCardIndexType,
  SET_EXIT_CONFIRMATION_MODAL,
  SetExitConfirmationModalType,
  ADD_QUESTIONNAIRE_ANSWER,
  AddQuestionnaireAnswerType,
  REMOVE_QUESTIONNAIRE_ANSWER,
  RemoveQuestionnaireAnswerType,
  SET_QUESTIONNAIRE_ANSWERS_LIST,
  SetQuestionnaireAnswersListType,
  SET_ACTIVITY_HISTORIES,
  SetActivityHistories,
  QuestionnaireAnswerType,
  RESET_ACTIVITY_REDUCER,
  INC_GOOD_ANSWERS_COUNT,
} from '../../types/store/ActivityStoreType';
import { ActivityType } from '../../types/ActivityType';
import { ActivityHistoryType } from '../../types/ActivityHistoryType';

const setActivity = (activity: ActivityType): SetActivityType => ({ type: SET_ACTIVITY, payload: activity });
const setCardIndex = (index: number): SetCardIndexType => ({ type: SET_CARD_INDEX, payload: index });
const setExitConfirmationModal = (exitConfirmationModal: boolean): SetExitConfirmationModalType =>
  ({ type: SET_EXIT_CONFIRMATION_MODAL, payload: exitConfirmationModal });
const addQuestionnaireAnswer = (questionnaireAnswer: QuestionnaireAnswerType): AddQuestionnaireAnswerType =>
  ({ type: ADD_QUESTIONNAIRE_ANSWER, payload: questionnaireAnswer });
const removeQuestionnaireAnswer = (card: string): RemoveQuestionnaireAnswerType =>
  ({ type: REMOVE_QUESTIONNAIRE_ANSWER, payload: card });
const resetActivityReducer = (): ActionWithoutPayloadType => ({ type: RESET_ACTIVITY_REDUCER });
const setQuestionnaireAnswersList =
(questionnaireAnswersList: Array<QuestionnaireAnswerType>) : SetQuestionnaireAnswersListType =>
  ({ type: SET_QUESTIONNAIRE_ANSWERS_LIST, payload: questionnaireAnswersList });
const incGoodAnswersCount = (): ActionWithoutPayloadType => ({ type: INC_GOOD_ANSWERS_COUNT });
const setActivityHistories = (activityHistories: Array<ActivityHistoryType>): SetActivityHistories =>
  ({ type: SET_ACTIVITY_HISTORIES, payload: activityHistories });

export default {
  setActivity,
  setCardIndex,
  setExitConfirmationModal,
  addQuestionnaireAnswer,
  removeQuestionnaireAnswer,
  resetActivityReducer,
  setQuestionnaireAnswersList,
  incGoodAnswersCount,
  setActivityHistories,
};
