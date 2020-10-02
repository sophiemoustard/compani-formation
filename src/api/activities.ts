import { alenviAxios } from './ressources/alenviAxios';
import getEnvVars from '../../environment';
import { ActivityType } from '../types/ActivityType';
import { ActivityHistoryType } from '../types/ActivityHistoryType';

export default {
  getActivity: async (activityId): Promise<ActivityType> => {
    const { baseURL } = getEnvVars();
    const response = await alenviAxios.get(`${baseURL}/activities/${activityId}`);
    return response.data.data.activity;
  },
  getActivityHistory: async (activityId): Promise<ActivityHistoryType> => {
    const { baseURL } = getEnvVars();
    const response = await alenviAxios.get(`${baseURL}/activities/${activityId}/activityhistory`);
    return response.data.data.activityHistory;
  },
};
