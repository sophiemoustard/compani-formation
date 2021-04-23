import { alenviAxios } from './ressources/alenviAxios';
import getEnvVars from '../../environment';
import { QuestionnaireType } from '../types/QuestionnaireType';

export default {
  getUserQuestionnaires: async (params) => {
    const { baseURL } = getEnvVars();
    const user = await alenviAxios.get(`${baseURL}/questionnaires/user`, { params });
    return user.data.data.questionnaires;
  },
  getQuestionnaire: async (questionnaireId): Promise<QuestionnaireType> => {
    const { baseURL } = getEnvVars();
    const response = await alenviAxios.get(`${baseURL}/questionnaires/${questionnaireId}`);
    return response.data.data.questionnaire;
  },
};
