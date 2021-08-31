import axiosLogged from './axios/logged';
import Environment from '../../environment';

export default {
  createActivityHistories: async (payload) => {
    const baseURL = await Environment.getBaseUrl();
    await axiosLogged.post(`${baseURL}/activityhistories`, payload);
  },
};
