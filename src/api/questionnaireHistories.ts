import axiosLogged from './axios/logged';
import Environment from '../../environment';
import { QuestionnaireAnswersType } from '../types/ActivityTypes';

type QuestionnaireHistoryPostPayloadType = {
  course: string,
  user: string,
  questionnaire: string,
  questionnaireAnswersList?: QuestionnaireAnswersType[],
}

export default {
  createQuestionnaireHistories: async (payload: QuestionnaireHistoryPostPayloadType): Promise<void> => {
    const baseURL = await Environment.getBaseUrl();
    await axiosLogged.post(`${baseURL}/questionnairehistories`, payload);
  },
};
