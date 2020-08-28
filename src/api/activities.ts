import { alenviAxios } from './ressources/alenviAxios';
import getEnvVars from '../../environment';
import { ActivityType } from '../types/ActivityType';

export default {
  getActivity: async (activityId): Promise<ActivityType> => {
    const { baseURL } = getEnvVars();
    const response = await alenviAxios.get(`${baseURL}/activities/${activityId}`);
    return response.data.data.activity;
  },
};
