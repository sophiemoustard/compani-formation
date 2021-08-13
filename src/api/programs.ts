import axiosLogged from './axios/logged';
import getEnvVars from '../../environment';

export default {
  getELearningPrograms: async (): Promise<any> => {
    const { baseURL } = getEnvVars();
    const response = await axiosLogged.get(`${baseURL}/programs/e-learning`);
    return response.data.data.programs;
  },
};
