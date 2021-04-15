import axios from 'axios';
import getEnvVars from '../../environment';

export default {
  getUserQuestionnaires: async (params) => {
    const { baseURL } = getEnvVars();
    const user = await axios.get(`${baseURL}/questionnaires/user`, { params });
    return user.data.data.questionnaires;
  },
};
