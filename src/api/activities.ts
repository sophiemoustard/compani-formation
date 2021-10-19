import { AxiosResponse } from 'axios';
import axiosLogged from './axios/logged';
import Environment from '../../environment';
import { ActivityWithCardsType } from '../types/ActivityTypes';

export default {
  getActivity: async (activityId): Promise<ActivityWithCardsType> => {
    const baseURL = await Environment.getBaseUrl();
    const response: AxiosResponse<any> = await axiosLogged.get(`${baseURL}/activities/${activityId}`);
    return response.data.data.activity;
  },
};
