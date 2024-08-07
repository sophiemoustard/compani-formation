import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CardType } from '../../types/CardType';
import { QuestionnaireAnswersType, QuizzAnswersType } from '../../types/ActivityTypes';
import { resetAllReducers } from '../actions';

export type CardStateType = {
  cards: CardType[],
  cardIndex: number | null,
  questionnaireAnswersList: QuestionnaireAnswersType[],
  quizzAnswersList: QuizzAnswersType[],
  score: number,
  exitConfirmationModal: boolean,
}
const initialState: CardStateType = {
  cards: [],
  cardIndex: null,
  questionnaireAnswersList: [],
  quizzAnswersList: [],
  score: 0,
  exitConfirmationModal: false,
};

const resetReducer = () => initialState;

const setCardList = (state: CardStateType, action: PayloadAction<CardType[]>) => ({ ...state, cards: action.payload });

const setIndex = (state: CardStateType, action: PayloadAction<number | null>) => (
  { ...state, cardIndex: action.payload }
);

const setQAList = (state: CardStateType, action: PayloadAction<QuestionnaireAnswersType[]>) => (
  { ...state, questionnaireAnswersList: action.payload }
);

const applyAddQuestionnaireAnswer = (state: CardStateType, action: PayloadAction<QuestionnaireAnswersType>) => {
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

const applyRemoveQuestionnaireAnswer = (state: CardStateType, action: PayloadAction<string>) => {
  const card = action.payload;
  return { ...state, questionnaireAnswersList: state.questionnaireAnswersList.filter(qa => qa.card !== card) };
};

const applyAddQuizzAnswer = (state: CardStateType, action: PayloadAction<QuizzAnswersType>) => {
  const quizzAnswer = action.payload;
  const indexOfAnswer = state.quizzAnswersList
    .findIndex((qa => qa.card === quizzAnswer.card));

  if (indexOfAnswer !== -1) {
    const newQuizzAnswersList = [...state.quizzAnswersList];
    newQuizzAnswersList[indexOfAnswer] = quizzAnswer;

    return { ...state, quizzAnswersList: newQuizzAnswersList };
  }

  return { ...state, quizzAnswersList: [...state.quizzAnswersList, quizzAnswer] };
};

const incCount = (state: CardStateType) => ({ ...state, score: state.score + 1 });

const setExitModal = (state: CardStateType, action: PayloadAction<boolean>) => (
  { ...state, exitConfirmationModal: action.payload }
);

const cardSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setCards: setCardList,
    setCardIndex: setIndex,
    addQuestionnaireAnswer: applyAddQuestionnaireAnswer,
    removeQuestionnaireAnswer: applyRemoveQuestionnaireAnswer,
    addQuizzAnswer: applyAddQuizzAnswer,
    setQuestionnaireAnswersList: setQAList,
    incGoodAnswersCount: incCount,
    setExitConfirmationModal: setExitModal,
    resetCardReducer: resetReducer,
  },
  extraReducers: (builder) => { builder.addCase(resetAllReducers, () => initialState); },
});

export const {
  setCards,
  setCardIndex,
  addQuestionnaireAnswer,
  removeQuestionnaireAnswer,
  addQuizzAnswer,
  setQuestionnaireAnswersList,
  incGoodAnswersCount,
  setExitConfirmationModal,
  resetCardReducer,
} = cardSlice.actions;

export default cardSlice.reducer;
