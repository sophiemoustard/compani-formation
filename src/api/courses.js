import { alenviAxios } from './ressources/alenviAxios';
import getEnvVars from '../../environment';

export default {
  getByUser: async (payload) => {
    const { baseURL } = getEnvVars();
    const response = await alenviAxios.get(`${baseURL}/courses`, payload);
    return response.data.data.courses;
  },
};
