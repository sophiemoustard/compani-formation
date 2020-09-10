import { alenviAxios } from './ressources/alenviAxios';
import getEnvVars from '../../environment';

export default {
  postActivityHistories: async (payload) => {
    const { baseURL } = getEnvVars();
    const response = await alenviAxios.post(`${baseURL}/activity-histories`, payload);
    return response.data.message;
  },
};
