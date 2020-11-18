import getEnvVars from '../../environment';
import { alenviAxios } from './ressources/alenviAxios';

export default {
  getById: async (id) => {
    const { baseURL } = getEnvVars();
    const user = await alenviAxios.get(`${baseURL}/users/${id}`);
    return user.data.data.user;
  },
  updateById: async (userId, data) => {
    const { baseURL } = getEnvVars();
    await alenviAxios.put(`${baseURL}/users/${userId}`, data);
  },
  updatePassword: async (userId, data) => {
    const { baseURL } = getEnvVars();
    await alenviAxios.put(`${baseURL}/users/${userId}/password`, data);
  },
};
