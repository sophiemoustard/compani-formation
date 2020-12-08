import { alenviAxios } from './ressources/alenviAxios';
import getEnvVars from '../../environment';

export default {
  getELearningPrograms: async (): Promise<any> => {
    const { baseURL } = getEnvVars();
    const response = await alenviAxios.get(`${baseURL}/programs/e-learning`);
    return response.data.data.programs;
  },
};
