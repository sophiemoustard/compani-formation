import { alenviAxios } from './ressources/alenviAxios';
import getEnvVars from '../../environment';

export default {
  postActivityHistories: async (payload) => {
    const { baseURL } = getEnvVars();
    await alenviAxios.post(`${baseURL}/activityHistories`, payload);
  },
};
