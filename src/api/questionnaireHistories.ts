import { alenviAxios } from './ressources/alenviAxios';
import getEnvVars from '../../environment';

export default {
  createQuestionnaireHistories: async (payload) => {
    const { baseURL } = getEnvVars();
    await alenviAxios.post(`${baseURL}/questionnairehistories`, payload);
  },
};
