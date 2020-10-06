import { ActionType, ResetType } from '../../types/store/StoreType';
import {
  ActivityStateType,
  SET_ACTIVITY,
  SET_CARD_INDEX,
  SET_EXIT_CONFIRMATION_MODAL,
  RESET_ACTIVITY_REDUCER,
  ADD_QUESTIONNAIRE_ANSWER,
  SET_QUESTIONNAIRE_ANSWERS_LIST,
  INC_GOOD_ANSWERS_COUNT,
  IncGoodAnswersCountType,
} from '../../types/store/ActivityStoreType';

const initialState: ActivityStateType = {
  activity: null,
  cardIndex: null,
  exitConfirmationModal: false,
  questionnaireAnswersList: [],
  score: 0,
};

const applyAddQuestionnaireAnswer = (state, action) => {
  const questionnaireAnswer = action.payload;
  const indexOfQuestionnaireAnswer = state.questionnaireAnswersList.findIndex((qa =>
    qa.card === questionnaireAnswer.card));

  if (indexOfQuestionnaireAnswer !== -1) {
    const newQuestionnaireAnswersList = [...state.questionnaireAnswersList];
    newQuestionnaireAnswersList[indexOfQuestionnaireAnswer] = questionnaireAnswer;

    return { ...state, questionnaireAnswersList: newQuestionnaireAnswersList };
  }

  return { ...state, questionnaireAnswersList: [...state.questionnaireAnswersList, questionnaireAnswer] };
};

export const activities = (
  state: ActivityStateType = initialState,
  action: ActionType | ResetType | IncGoodAnswersCountType
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
    case SET_QUESTIONNAIRE_ANSWERS_LIST:
      return { ...state, questionnaireAnswersList: action.payload };
    case INC_GOOD_ANSWERS_COUNT:
      return { ...state, score: state.score + 1 };
    default:
      return state;
  }
};
