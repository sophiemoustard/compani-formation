// @ts-nocheck

import { AxiosResponse } from 'axios';
import Environment from '../../environment';
import { MOBILE } from '../core/data/constants';
import { UserType } from '../types/UserType';
import axiosLogged from './axios/logged';
import axiosNotLogged from './axios/notLogged';
import {
  ExistsType,
  UserCreationType,
  UserResponseType,
  ExistsResponseType,
} from '../types/AxiosTypes';
import { FormDataType } from '../types/FileType';

export default {
  getById: async (userId: string): Promise<UserType> => {
    const baseURL = await Environment.getBaseUrl({ userId });
    const user: AxiosResponse<UserResponseType> = await axiosLogged.get(`${baseURL}/users/${userId}`);

    return user.data.data.user;
  },
  updateById: async (userId: string, data): Promise<void> => {
    const baseURL = await Environment.getBaseUrl({ userId });
    await axiosLogged.put(`${baseURL}/users/${userId}`, data);
  },
  exists: async (params: { email: string }): Promise<ExistsType> => {
    const baseURL = await Environment.getBaseUrl();
    const exists: AxiosResponse<ExistsResponseType> = await axiosNotLogged.get(`${baseURL}/users/exists`, { params });

    return exists.data.data.exists;
  },
  create: async (data: UserCreationType): Promise<UserType> => {
    const baseURL = await Environment.getBaseUrl();
    const newUser: AxiosResponse<UserResponseType> =
      await axiosLogged.post(`${baseURL}/users`, { ...data, origin: MOBILE });

    return newUser.data.data.user;
  },
  uploadImage: async (userId: string, data: FormDataType): Promise<void> => {
    const baseURL = await Environment.getBaseUrl({ userId });
    const headers = { 'Content-Type': 'multipart/form-data' };
    await axiosLogged.post(`${baseURL}/users/${userId}/upload`, data, { headers });
  },
  deleteImage: async (userId: string): Promise<void> => {
    const baseURL = await Environment.getBaseUrl({ userId });
    await axiosLogged.delete(`${baseURL}/users/${userId}/upload`);
  },
  addExpoToken: async (userId: string, formationExpoToken: string): Promise<void> => {
    const baseURL = await Environment.getBaseUrl({ userId });
    await axiosLogged.post(`${baseURL}/users/${userId}/expo-token`, { formationExpoToken });
  },
  removeExpoToken: async (userId: string, expoToken: string): Promise<void> => {
    const baseURL = await Environment.getBaseUrl({ userId });
    await axiosLogged.delete(`${baseURL}/users/${userId}/expo-token/${expoToken}`);
  },
  deleteAccount: async (userId: string): Promise<void> => {
    const baseURL = await Environment.getBaseUrl({ userId });
    await axiosLogged.delete(`${baseURL}/users/${userId}`);
  },
};
