import { AxiosHeaders, AxiosResponse } from 'axios';
import axiosNotLogged from './axios/notLogged';
import axiosLogged from './axios/logged';
import Environment from '../../environment';
import { MOBILE } from '../core/data/constants';
import {
  AuthenticationType,
  ForgotPasswordType,
  PasswordTokenType,
  AuthenticationResponseType,
  ForgotPasswordResponseType,
  PasswordTokenResponseType,
} from '../types/AxiosTypes';
import { AuthenticationPayloadType } from '../types/AuthenticationTypes';

type UpdatePasswordPayloadType = {
  local: { password: string },
  isConfirmed?: boolean,
}

type PasswordTokenParamsType = {
  email?: string,
  firstname?: string,
  lastname?: string,
  company?: string,
}

export default {
  authenticate: async (payload: AuthenticationPayloadType): Promise<AuthenticationType> => {
    const baseURL = await Environment.getBaseUrl({ email: payload.email });
    const response: AxiosResponse<AuthenticationResponseType> =
      await axiosNotLogged.post(`${baseURL}/users/authenticate`, { ...payload, origin: MOBILE });

    return response.data.data;
  },
  forgotPassword: async (payload: { email: string, origin: string, type: string }): Promise<ForgotPasswordType> => {
    const baseURL = await Environment.getBaseUrl({ email: payload.email });
    const code: AxiosResponse<ForgotPasswordResponseType> =
      await axiosNotLogged.post(`${baseURL}/users/forgot-password`, payload);

    return code.data.data.mailInfo;
  },
  updatePassword: async (userId: string, data: UpdatePasswordPayloadType, token: string = ''): Promise<void> => {
    const baseURL = await Environment.getBaseUrl({ userId });
    if (!token) await axiosLogged.put(`${baseURL}/users/${userId}/password`, data);
    else {
      const headers = new AxiosHeaders({ 'x-access-token': token });
      await axiosNotLogged.put(`${baseURL}/users/${userId}/password`, data, { headers });
    }
  },
  refreshToken: async (payload: { refreshToken: string }): Promise<AuthenticationType> => {
    const baseURL = await Environment.getBaseUrl();
    const refreshToken: AxiosResponse<AuthenticationResponseType> =
      await axiosNotLogged.post(`${baseURL}/users/refreshToken`, payload);

    return refreshToken.data.data;
  },
  logOut: async (): Promise<void> => {
    const baseURL = await Environment.getBaseUrl();
    await axiosNotLogged.post(`${baseURL}/users/logout`);
  },
  passwordToken: async (params: PasswordTokenParamsType, token: string): Promise<PasswordTokenType> => {
    const { email } = params;
    const baseURL = await Environment.getBaseUrl(email ? { email } : {});
    const checkToken: AxiosResponse<PasswordTokenResponseType> =
      await axiosNotLogged.get(`${baseURL}/users/passwordtoken/${token}`, { params });

    return checkToken.data.data;
  },
};
