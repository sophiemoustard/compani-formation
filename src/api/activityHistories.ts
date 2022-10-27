import axiosLogged from './axios/logged';
import Environment from '../../environment';
import { ActivityHistoryType } from '../types/ActivityHistoryType';

export default {
  createActivityHistories: async (payload: ActivityHistoryType): Promise<void> => {
    const baseURL = await Environment.getBaseUrl();
    await axiosLogged.post(`${baseURL}/activityhistories`, payload);
  },
};
