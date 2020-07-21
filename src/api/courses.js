import { alenviAxios } from './ressources/alenviAxios';
import getEnvVars from '../../environment';

export default {
  getMyCourses: async (params) => {
    const { baseURL } = getEnvVars();
    const response = await alenviAxios.get(`${baseURL}/courses/mine`, { params });
    return response.data.data.courses;
  },
};
