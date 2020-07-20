import { alenviAxios } from './ressources/alenviAxios';
import getEnvVars from '../../environment';

export default {
  get: async (params) => {
    const { baseURL } = getEnvVars();
    const response = await alenviAxios.get(`${baseURL}/courses`, { params });
    return response.data.data.courses;
  },
};
