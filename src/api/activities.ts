import axiosLogged from './axios/logged';
import getEnvVars from '../../environment';
import { ActivityWithCardsType } from '../types/ActivityTypes';

export default {
  getActivity: async (activityId): Promise<ActivityWithCardsType> => {
    const { baseURL } = getEnvVars();
    const response = await axiosLogged.get(`${baseURL}/activities/${activityId}`);
    return response.data.data.activity;
  },
};
