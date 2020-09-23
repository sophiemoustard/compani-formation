import { ResetType } from '../../types/store/StoreType';
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
} from '../../types/store/ActivityStoreType';
import { ActivityType } from '../../types/ActivityType';

const setActivity = (activity: ActivityType): SetActivityType => ({ type: SET_ACTIVITY, payload: activity });
const setCardIndex = (index: number): SetCardIndexType => ({ type: SET_CARD_INDEX, payload: index });
const setExitConfirmationModal = (exitConfirmationModal: boolean): SetExitConfirmationModalType =>
  ({ type: SET_EXIT_CONFIRMATION_MODAL, payload: exitConfirmationModal });
const addQuestionnaireAnswer = (questionnaireAnswer: QuestionnaireAnswerType): AddQuestionnaireAnswerType =>
  ({ type: ADD_QUESTIONNAIRE_ANSWER, payload: questionnaireAnswer });
const resetActivityReducer = (): ResetType => ({ type: RESET_ACTIVITY_REDUCER });

export default {
  setActivity,
  setCardIndex,
  setExitConfirmationModal,
  addQuestionnaireAnswer,
  resetActivityReducer,
};
