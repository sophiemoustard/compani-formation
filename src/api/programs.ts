import axiosLogged from './axios/logged';
import Environment from '../../environment';

export default {
  getELearningPrograms: async (): Promise<any> => {
    const baseURL = await Environment.getBaseUrl();
    const response = await axiosLogged.get(`${baseURL}/programs/e-learning`);
    return response.data.data.programs;
  },
};
