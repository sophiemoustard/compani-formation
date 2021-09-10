import axiosLogged from './axios/logged';
import Environment from '../../environment';
import { QuestionnaireType, QuestionnaireWithCardsType } from '../types/QuestionnaireType';

export default {
  getUserQuestionnaires: async (params): Promise<QuestionnaireType[]> => {
    const baseURL = await Environment.getBaseUrl();
    const user = await axiosLogged.get(`${baseURL}/questionnaires/user`, { params });
    return user.data.data.questionnaires;
  },
  getQuestionnaire: async (questionnaireId): Promise<QuestionnaireWithCardsType> => {
    const baseURL = await Environment.getBaseUrl();
    const response = await axiosLogged.get(`${baseURL}/questionnaires/${questionnaireId}`);
    return response.data.data.questionnaire;
  },
};
