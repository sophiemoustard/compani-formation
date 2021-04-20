import axios from 'axios';
import getEnvVars from '../../environment';
import { MOBILE } from '../core/data/constants';

export default {
  authenticate: async (payload: { email: string, password: string }) => {
    const { baseURL } = getEnvVars();
    const response = await axios.post(`${baseURL}/users/authenticate`, { ...payload, origin: MOBILE });
    return response.data.data;
  },
  forgotPassword: async (payload: { email: string, origin: string, type: string }) => {
    const { baseURL } = getEnvVars();
    const code = await axios.post(`${baseURL}/users/forgot-password`, payload);
    return code.data.data.mailInfo;
  },
  refreshToken: async (payload: { refreshToken: string }) => {
    const { baseURL } = getEnvVars();
    const refreshToken = await axios.post(`${baseURL}/users/refreshToken`, payload);
    return refreshToken.data.data;
  },
  logOut: async () => {
    const { baseURL } = getEnvVars();
    await axios.post(`${baseURL}/users/logout`);
  },
  passwordToken: async (email: string, token: string) => {
    const { baseURL } = getEnvVars();
    const checkToken = await axios.get(`${baseURL}/users/passwordtoken/${token}`, { params: { email } });
    return checkToken.data.data;
  },
};
