import axios from 'axios';
import getEnvVars from '../../environment';
import { MOBILE } from '../core/data/constants';

export default {
  authenticate: async (payload) => {
    const { baseURL } = getEnvVars();
    const response = await axios.post(`${baseURL}/users/authenticate`, { ...payload, origin: MOBILE });
    return response.data.data;
  },
  forgotPassword: async (payload) => {
    const { baseURL } = getEnvVars();
    const code = await axios.post(`${baseURL}/users/forgot-password`, payload);
    return code.data.data.mailInfo;
  },
  refreshToken: async (payload) => {
    const { baseURL } = getEnvVars();
    const refreshToken = await axios.post(`${baseURL}/users/refreshToken`, payload);
    return refreshToken.data.data;
  },
  logOut: async () => {
    const { baseURL } = getEnvVars();
    await axios.post(`${baseURL}/users/logout`);
  },
  passwordToken: async (email, token) => {
    const { baseURL } = getEnvVars();
    const checkToken = await axios.get(`${baseURL}/users/passwordtoken/${token}`, { params: { email } });
    return checkToken.data.data;
  },
};
