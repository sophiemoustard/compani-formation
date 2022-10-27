import axiosLogged from './axios/logged';
import Environment from '../../environment';

type QuestionnaireHistoryPostPayloadType = {
  course: string,
  user: string,
  questionnaire: string,
  questionnaireAnswersList: [{
    card: string,
    answerList: [string],
  }],
}

export default {
  createQuestionnaireHistories: async (payload: QuestionnaireHistoryPostPayloadType): Promise<void> => {
    const baseURL = await Environment.getBaseUrl();
    await axiosLogged.post(`${baseURL}/questionnairehistories`, payload);
  },
};
