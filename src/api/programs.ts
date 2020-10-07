import { alenviAxios } from './ressources/alenviAxios';
import getEnvVars from '../../environment';

export default {
  getPrograms: async (params): Promise<any> => {
    const { baseURL } = getEnvVars();
    const response = await alenviAxios.get(`${baseURL}/programs`, { params });
    return response.data.data.programs;
  },
};
