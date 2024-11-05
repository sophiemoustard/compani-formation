import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  setCards,
  setCardIndex,
  addQuestionnaireAnswer,
  removeQuestionnaireAnswer,
  setQuestionnaireAnswersList,
  incGoodAnswersCount,
  setExitConfirmationModal,
  resetCardReducer,
  addQuizzAnswer,
  setViewedFlashCards,
} from './slice';
import {
  getCard,
  getQuestionnaireAnswer,
  getMaxProgress,
  getProgress,
  displayProgressBar,
  getCards,
  getCardIndex,
  getExitConfirmationModal,
  getScore,
  getQuestionnaireAnswersList,
  getQuizzAnswer,
  getQuizzAnswersList,
  getViewedFlashCards,
} from './selectors';
import { CardType } from '../../types/CardType';
import { QuestionnaireAnswersType, QuizzAnswersType } from '../../types/ActivityTypes';

export const useSetCards = () => {
  const dispatch = useAppDispatch();

  return useCallback((cards: CardType[]) => dispatch(setCards(cards)), [dispatch]);
};

export const useSetCardIndex = () => {
  const dispatch = useAppDispatch();

  return useCallback((index: number | null) => dispatch(setCardIndex(index)), [dispatch]);
};

export const useAddQuestionnaireAnswer = () => {
  const dispatch = useAppDispatch();

  return useCallback((answer: QuestionnaireAnswersType) => dispatch(addQuestionnaireAnswer(answer)), [dispatch]);
};

export const useRemoveQuestionnaireAnswer = () => {
  const dispatch = useAppDispatch();

  return useCallback((card: string) => dispatch(removeQuestionnaireAnswer(card)), [dispatch]);
};

export const useAddQuizzAnswer = () => {
  const dispatch = useAppDispatch();

  return useCallback((answer: QuizzAnswersType) => dispatch(addQuizzAnswer(answer)), [dispatch]);
};

export const useSetQuestionnaireAnswersList = () => {
  const dispatch = useAppDispatch();

  return useCallback((list: QuestionnaireAnswersType[]) => dispatch(setQuestionnaireAnswersList(list)), [dispatch]);
};

export const useIncGoodAnswersCount = () => {
  const dispatch = useAppDispatch();

  return useCallback(() => dispatch(incGoodAnswersCount()), [dispatch]);
};

export const useSetExitConfirmationModal = () => {
  const dispatch = useAppDispatch();

  return useCallback((visible: boolean) => dispatch(setExitConfirmationModal(visible)), [dispatch]);
};

export const useResetCardReducer = () => {
  const dispatch = useAppDispatch();

  return useCallback(() => dispatch(resetCardReducer()), [dispatch]);
};

export const useSetViewedFlashCards = () => {
  const dispatch = useAppDispatch();

  return useCallback((_id: string) => dispatch(setViewedFlashCards(_id)), [dispatch]);
};

export const useGetCard = () => useAppSelector(getCard);

export const useGetQuestionnaireAnswer = () => useAppSelector(getQuestionnaireAnswer);

export const useGetMaxProgress = () => useAppSelector(getMaxProgress);

export const useGetProgress = () => useAppSelector(getProgress);

export const useDisplayProgressBar = () => useAppSelector(displayProgressBar);

export const useGetCards = () => useAppSelector(getCards);

export const useGetCardIndex = () => useAppSelector(getCardIndex);

export const useGetExitConfirmationModal = () => useAppSelector(getExitConfirmationModal);

export const useGetScore = () => useAppSelector(getScore);

export const useGetQuestionnaireAnswersList = () => useAppSelector(getQuestionnaireAnswersList);

export const useGetQuizzAnswersList = () => useAppSelector(getQuizzAnswersList);

export const useGetQuizzAnswer = () => useAppSelector(getQuizzAnswer);

export const useGetViewedFlashCards = () => useAppSelector(getViewedFlashCards);
