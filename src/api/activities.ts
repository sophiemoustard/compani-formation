import { AxiosResponse } from 'axios';
import axiosLogged from './axios/logged';
import Environment from '../../environment';
import { ActivityWithCardsType } from '../types/ActivityTypes';
import { ActivityResponseType } from '../types/AxiosTypes';

export default {
  getActivity: async (activityId: string): Promise<ActivityWithCardsType> => {
    const baseURL = await Environment.getBaseUrl();
    const response: AxiosResponse<ActivityResponseType> = await axiosLogged.get(`${baseURL}/activities/${activityId}`);

    return response.data.data.activity;
  },
};
