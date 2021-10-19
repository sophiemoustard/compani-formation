import { AxiosResponse } from 'axios';
import axiosNotLogged from './axios/notLogged';
import axiosLogged from './axios/logged';
import Environment from '../../environment';
import { MOBILE } from '../core/data/constants';

type AuthenticationType = {
  token: string,
  tokenExpireDate: Date,
  refreshToken: string,
  user: { _id: string },
};

type ForgotPasswordType = { phone: string } | void;

type PasswordTokenType = { token: string, user: { _id: string, email: string } };

export default {
  authenticate: async (payload: { email: string, password: string }): Promise<AuthenticationType> => {
    const baseURL = await Environment.getBaseUrl({ email: payload.email });
    const response: AxiosResponse<any> = await axiosNotLogged.post(
      `${baseURL}/users/authenticate`,
      { ...payload, origin: MOBILE }
    );
    return response.data.data;
  },
  forgotPassword: async (payload: { email: string, origin: string, type: string }): Promise<ForgotPasswordType> => {
    const baseURL = await Environment.getBaseUrl({ email: payload.email });
    const code: AxiosResponse<any> = await axiosNotLogged.post(`${baseURL}/users/forgot-password`, payload);
    return code.data.data.mailInfo;
  },
  updatePassword: async (userId, data, token = ''): Promise<void> => {
    const baseURL = await Environment.getBaseUrl({ userId });
    if (!token) await axiosLogged.put(`${baseURL}/users/${userId}/password`, data);
    else {
      await axiosNotLogged.put(`${baseURL}/users/${userId}/password`, data, { headers: { 'x-access-token': token } });
    }
  },
  refreshToken: async (payload: { refreshToken: string }): Promise<AuthenticationType> => {
    const baseURL = await Environment.getBaseUrl();
    const refreshToken: AxiosResponse<any> = await axiosNotLogged.post(`${baseURL}/users/refreshToken`, payload);
    return refreshToken.data.data;
  },
  logOut: async (): Promise<void> => {
    const baseURL = await Environment.getBaseUrl();
    await axiosNotLogged.post(`${baseURL}/users/logout`);
  },
  passwordToken: async (email: string, token: string): Promise<PasswordTokenType> => {
    const baseURL = await Environment.getBaseUrl({ email });
    const checkToken: AxiosResponse<any> = await axiosNotLogged.get(
      `${baseURL}/users/passwordtoken/${token}`,
      { params: { email } }
    );
    return checkToken.data.data;
  },
};
