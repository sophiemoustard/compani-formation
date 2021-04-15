import { alenviAxios } from './ressources/alenviAxios';
import getEnvVars from '../../environment';

export default {
  getUserQuestionnaires: async (params) => {
    const { baseURL } = getEnvVars();
    const user = await alenviAxios.get(`${baseURL}/questionnaires/user`, { params });
    return user.data.data.questionnaires;
  },
};
