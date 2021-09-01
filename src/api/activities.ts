import axiosLogged from './axios/logged';
import Environment from '../../environment';
import { ActivityWithCardsType } from '../types/ActivityTypes';

export default {
  getActivity: async (activityId): Promise<ActivityWithCardsType> => {
    const baseURL = await Environment.getBaseUrl();
    const response = await axiosLogged.get(`${baseURL}/activities/${activityId}`);
    return response.data.data.activity;
  },
};
