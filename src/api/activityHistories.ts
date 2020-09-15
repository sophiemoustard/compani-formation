import { alenviAxios } from './ressources/alenviAxios';
import getEnvVars from '../../environment';

export default {
  createActivityHistories: async (payload) => {
    const { baseURL } = getEnvVars();
    await alenviAxios.post(`${baseURL}/activityhistories`, payload);
  },
};
