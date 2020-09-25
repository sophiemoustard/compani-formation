import { ActionType, ResetType } from '../../types/store/StoreType';
import {
  ActivityStateType,
  SET_ACTIVITY,
  SET_CARD_INDEX,
  SET_EXIT_CONFIRMATION_MODAL,
  RESET_ACTIVITY_REDUCER,
  ADD_QUESTIONNAIRE_ANSWER,
} from '../../types/store/ActivityStoreType';

const initialState: ActivityStateType = {
  activity: null,
  cardIndex: null,
  exitConfirmationModal: false,
  allQuestionnaireAnswers: [],
};

const applyAddQuestionnaireAnswer = (state, action) => {
  const questionnaireAnswer = action.payload;
  const indexOfQuestionnaireAnswer = state.allQuestionnaireAnswers.findIndex((qa => qa.id === questionnaireAnswer.id));

  if (indexOfQuestionnaireAnswer !== -1) {
    const newAllQuestionnaireAnswers = [...state.allQuestionnaireAnswers];
    newAllQuestionnaireAnswers[indexOfQuestionnaireAnswer] = questionnaireAnswer;

    return { ...state, allQuestionnaireAnswers: newAllQuestionnaireAnswers };
  }

  return { ...state, allQuestionnaireAnswers: [...state.allQuestionnaireAnswers, questionnaireAnswer] };
};

export const activities = (
  state: ActivityStateType = initialState,
  action: ActionType | ResetType
): ActivityStateType => {
  switch (action.type) {
    case SET_ACTIVITY:
      return { ...state, activity: action.payload };
    case SET_CARD_INDEX:
      return { ...state, cardIndex: action.payload };
    case SET_EXIT_CONFIRMATION_MODAL:
      return { ...state, exitConfirmationModal: action.payload };
    case ADD_QUESTIONNAIRE_ANSWER:
      return applyAddQuestionnaireAnswer(state, action);
    case RESET_ACTIVITY_REDUCER:
      return initialState;
    default:
      return state;
  }
};
