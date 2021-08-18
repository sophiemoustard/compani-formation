import axiosNotLogged from './axios/notLogged';
import axiosLogged from './axios/logged';
import getEnvVars from '../../environment';
import { MOBILE } from '../core/data/constants';

export default {
  authenticate: async (payload: { email: string, password: string }) => {
    const { baseURL } = getEnvVars();
    const response = await axiosNotLogged.post(`${baseURL}/users/authenticate`, { ...payload, origin: MOBILE });
    return response.data.data;
  },
  forgotPassword: async (payload: { email: string, origin: string, type: string }) => {
    const { baseURL } = getEnvVars();
    const code = await axiosNotLogged.post(`${baseURL}/users/forgot-password`, payload);
    return code.data.data.mailInfo;
  },
  updatePassword: async (userId, data, token = '') => {
    const { baseURL } = getEnvVars();
    if (!token) await axiosLogged.put(`${baseURL}/users/${userId}/password`, data);
    else {
      await axiosNotLogged.put(`${baseURL}/users/${userId}/password`, data, { headers: { 'x-access-token': token } });
    }
  },
  refreshToken: async (payload: { refreshToken: string }) => {
    const { baseURL } = getEnvVars();
    const refreshToken = await axiosNotLogged.post(`${baseURL}/users/refreshToken`, payload);
    return refreshToken.data.data;
  },
  logOut: async () => {
    const { baseURL } = getEnvVars();
    await axiosNotLogged.post(`${baseURL}/users/logout`);
  },
  passwordToken: async (email: string, token: string) => {
    const { baseURL } = getEnvVars();
    const checkToken = await axiosNotLogged.get(`${baseURL}/users/passwordtoken/${token}`, { params: { email } });
    return checkToken.data.data;
  },
};
