import {
  CardStateType,
  CardActionType,
  SET_CARDS,
  RESET_CARD_REDUCER,
  SET_CARD_INDEX,
  ADD_QUESTIONNAIRE_ANSWER,
  SET_QUESTIONNAIRE_ANSWERS_LIST,
  REMOVE_QUESTIONNAIRE_ANSWER,
  INC_GOOD_ANSWERS_COUNT,
  SET_EXIT_CONFIRMATION_MODAL,
  CardActionWithoutPayloadType,
} from '../../types/store/CardStoreType';
import { defaultAction, DefaultActionType } from '../../types/store/StoreType';

const initialState: CardStateType = {
  cards: [],
  cardIndex: null,
  questionnaireAnswersList: [],
  score: 0,
  exitConfirmationModal: false,
};

const applyAddQuestionnaireAnswer = (state, action) => {
  const questionnaireAnswer = action.payload;
  const indexOfAnswer = state.questionnaireAnswersList
    .findIndex((qa => qa.card === questionnaireAnswer.card));

  if (indexOfAnswer !== -1) {
    const newQuestionnaireAnswersList = [...state.questionnaireAnswersList];
    newQuestionnaireAnswersList[indexOfAnswer] = questionnaireAnswer;

    return { ...state, questionnaireAnswersList: newQuestionnaireAnswersList };
  }

  return { ...state, questionnaireAnswersList: [...state.questionnaireAnswersList, questionnaireAnswer] };
};

const applyRemoveQuestionnaireAnswer = (state, action) => {
  const card = action.payload;
  return { ...state, questionnaireAnswersList: state.questionnaireAnswersList.filter(qa => qa.card !== card) };
};

export const cards = (
  state: CardStateType = initialState,
  action: CardActionType | CardActionWithoutPayloadType | DefaultActionType = defaultAction
) => {
  switch (action.type) {
    case SET_CARDS:
      return { ...state, cards: action.payload };
    case SET_CARD_INDEX:
      return { ...state, cardIndex: action.payload };
    case ADD_QUESTIONNAIRE_ANSWER:
      return applyAddQuestionnaireAnswer(state, action);
    case REMOVE_QUESTIONNAIRE_ANSWER:
      return applyRemoveQuestionnaireAnswer(state, action);
    case SET_QUESTIONNAIRE_ANSWERS_LIST:
      return { ...state, questionnaireAnswersList: action.payload };
    case INC_GOOD_ANSWERS_COUNT:
      return { ...state, score: state.score + 1 };
    case SET_EXIT_CONFIRMATION_MODAL:
      return { ...state, exitConfirmationModal: action.payload };
    case RESET_CARD_REDUCER:
      return initialState;
    default:
      return state;
  }
};
