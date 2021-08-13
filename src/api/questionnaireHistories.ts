import axiosLogged from './axios/logged';
import getEnvVars from '../../environment';

export default {
  createQuestionnaireHistories: async (payload) => {
    const { baseURL } = getEnvVars();
    await axiosLogged.post(`${baseURL}/questionnairehistories`, payload);
  },
};
