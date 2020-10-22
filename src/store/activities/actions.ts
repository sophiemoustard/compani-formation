import { ActionWithoutPayloadType } from '../../types/store/StoreType';
import {
  SET_ACTIVITY,
  SET_CARD_INDEX,
  ADD_QUESTIONNAIRE_ANSWER,
  SetActivityType,
  SetCardIndexType,
  SetExitConfirmationModalType,
  SET_EXIT_CONFIRMATION_MODAL,
  RESET_ACTIVITY_REDUCER,
  QuestionnaireAnswerType,
  AddQuestionnaireAnswerType,
  SetQuestionnaireAnswersListType,
  SET_QUESTIONNAIRE_ANSWERS_LIST,
  INC_GOOD_ANSWERS_COUNT,
} from '../../types/store/ActivityStoreType';
import { ActivityType } from '../../types/ActivityType';

const setActivity = (activity: ActivityType): SetActivityType => ({ type: SET_ACTIVITY, payload: activity });
const setCardIndex = (index: number): SetCardIndexType => ({ type: SET_CARD_INDEX, payload: index });
const setExitConfirmationModal = (exitConfirmationModal: boolean): SetExitConfirmationModalType =>
  ({ type: SET_EXIT_CONFIRMATION_MODAL, payload: exitConfirmationModal });
const addQuestionnaireAnswer = (questionnaireAnswer: QuestionnaireAnswerType): AddQuestionnaireAnswerType =>
  ({ type: ADD_QUESTIONNAIRE_ANSWER, payload: questionnaireAnswer });
const resetActivityReducer = (): ActionWithoutPayloadType => ({ type: RESET_ACTIVITY_REDUCER });
const setQuestionnaireAnswersList = (questionnaireAnswersList: Array<QuestionnaireAnswerType>)
: SetQuestionnaireAnswersListType => ({ type: SET_QUESTIONNAIRE_ANSWERS_LIST, payload: questionnaireAnswersList });
const incGoodAnswersCount = (): ActionWithoutPayloadType => ({ type: INC_GOOD_ANSWERS_COUNT });

export default {
  setActivity,
  setCardIndex,
  setExitConfirmationModal,
  addQuestionnaireAnswer,
  resetActivityReducer,
  setQuestionnaireAnswersList,
  incGoodAnswersCount,
};
