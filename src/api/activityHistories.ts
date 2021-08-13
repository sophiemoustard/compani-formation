import axiosLogged from './axios/logged';
import getEnvVars from '../../environment';

export default {
  createActivityHistories: async (payload) => {
    const { baseURL } = getEnvVars();
    await axiosLogged.post(`${baseURL}/activityhistories`, payload);
  },
};
