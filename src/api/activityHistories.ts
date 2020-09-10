import { alenviAxios } from './ressources/alenviAxios';
import getEnvVars from '../../environment';
import { ActivityHistoryType } from '../types/ActivityHistoryType';

export default {
  postActivityHistories: async (payload): Promise<ActivityHistoryType> => {
    const { baseURL } = getEnvVars();
    const response = await alenviAxios.post(`${baseURL}/activity-histories`, payload);
    return response.data.data.activityHistories;
  },
};
