import axiosLogged from './axios/logged';
import getEnvVars from '../../environment';
import { ActivityType } from '../types/ActivityType';

export default {
  getActivity: async (activityId): Promise<ActivityType> => {
    const { baseURL } = getEnvVars();
    const response = await axiosLogged.get(`${baseURL}/activities/${activityId}`);
    return response.data.data.activity;
  },
};
