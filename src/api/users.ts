import getEnvVars from '../../environment';
import { alenviAxios } from './ressources/alenviAxios';

export default {
  getById: async (id) => {
    const { baseURL } = getEnvVars();
    const user = await alenviAxios.get(`${baseURL}/users/${id}`);
    return user.data.data.user;
  },
};
