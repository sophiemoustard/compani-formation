import axios from 'axios';
import getEnvVars from '../../environment';

export default {
  authenticate: async (payload) => {
    const { baseURL } = getEnvVars();
    const response = await axios.post(`${baseURL}/users/authenticate`, payload);
    return response.data.data;
  },
  forgotPassword: async (payload) => {
    const { baseURL } = getEnvVars();
    const mailInfo = await axios.post(`${baseURL}/users/forgot-password`, payload);
    return mailInfo.data.data.mailInfo;
  },
  refreshToken: async (payload) => {
    const { baseURL } = getEnvVars();
    const refreshToken = await axios.post(`${baseURL}/users/refreshToken`, payload);
    return refreshToken.data.data.refreshToken;
  },
};
