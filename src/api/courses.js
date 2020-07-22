import { alenviAxios } from './ressources/alenviAxios';
import getEnvVars from '../../environment';

export default {
  getUserCourses: async (params) => {
    const { baseURL } = getEnvVars();
    const response = await alenviAxios.get(`${baseURL}/courses/user`, { params });
    return response.data.data.courses;
  },
};
