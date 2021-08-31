import axiosNotLogged from './axios/notLogged';
import axiosLogged from './axios/logged';
import Environment from '../../environment';
import { MOBILE } from '../core/data/constants';

export default {
  authenticate: async (payload: { email: string, password: string }) => {
    const baseURL = await Environment.getBaseUrl({ email: payload.email });
    const response = await axiosNotLogged.post(`${baseURL}/users/authenticate`, { ...payload, origin: MOBILE });
    return response.data.data;
  },
  forgotPassword: async (payload: { email: string, origin: string, type: string }) => {
    const baseURL = await Environment.getBaseUrl({ email: payload.email });
    const code = await axiosNotLogged.post(`${baseURL}/users/forgot-password`, payload);
    return code.data.data.mailInfo;
  },
  updatePassword: async (userId, data, token = '') => {
    const baseURL = await Environment.getBaseUrl({ userId });
    if (!token) await axiosLogged.put(`${baseURL}/users/${userId}/password`, data);
    else {
      await axiosNotLogged.put(`${baseURL}/users/${userId}/password`, data, { headers: { 'x-access-token': token } });
    }
  },
  refreshToken: async (payload: { refreshToken: string }) => {
    const baseURL = await Environment.getBaseUrl();
    const refreshToken = await axiosNotLogged.post(`${baseURL}/users/refreshToken`, payload);
    return refreshToken.data.data;
  },
  logOut: async () => {
    const baseURL = await Environment.getBaseUrl();
    await axiosNotLogged.post(`${baseURL}/users/logout`);
  },
  passwordToken: async (email: string, token: string) => {
    const baseURL = await Environment.getBaseUrl({ email });
    const checkToken = await axiosNotLogged.get(`${baseURL}/users/passwordtoken/${token}`, { params: { email } });
    return checkToken.data.data;
  },
};
