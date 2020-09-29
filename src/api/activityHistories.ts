import { alenviAxios } from './ressources/alenviAxios';
import getEnvVars from '../../environment';
import { ActivityHistoryType } from '../types/ActivityHistoryType';

export default {
  createActivityHistories: async (payload) => {
    const { baseURL } = getEnvVars();
    await alenviAxios.post(`${baseURL}/activityhistories`, payload);
  },
  getActivityHistories: async (activityId): Promise<ActivityHistoryType> => {
    const { baseURL } = getEnvVars();
    const response = await alenviAxios.get(`${baseURL}/activityhistories/${activityId}`);
    return response.data.data.activityHistory;
  },
};
