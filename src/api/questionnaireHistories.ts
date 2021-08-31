import axiosLogged from './axios/logged';
import Environment from '../../environment';

export default {
  createQuestionnaireHistories: async (payload) => {
    const baseURL = await Environment.getBaseUrl();
    await axiosLogged.post(`${baseURL}/questionnairehistories`, payload);
  },
};
