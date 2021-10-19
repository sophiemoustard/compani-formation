import { AxiosResponse } from 'axios';
import Environment from '../../environment';
import { MOBILE } from '../core/data/constants';
import { UserType } from '../types/UserType';
import axiosLogged from './axios/logged';
import axiosNotLogged from './axios/notLogged';

type ExistsType = { exists: boolean, user: { _id?: string, company?: string, role?: string } };
type UserCreationType = {
  identity: { lastname: UserType['identity']['lastname'], firstname?: UserType['identity']['firstname'] }
  contact: UserType['contact'],
  local: UserType['local'] & { password: string },
};

export default {
  getById: async (userId: string): Promise<UserType> => {
    const baseURL = await Environment.getBaseUrl({ userId });
    const user: AxiosResponse<any> = await axiosLogged.get(`${baseURL}/users/${userId}`);
    return user.data.data.user;
  },
  updateById: async (userId: string, data): Promise<void> => {
    const baseURL = await Environment.getBaseUrl({ userId });
    await axiosLogged.put(`${baseURL}/users/${userId}`, data);
  },
  exists: async (params: { email: string }): Promise<ExistsType> => {
    const baseURL = await Environment.getBaseUrl();
    const exists: AxiosResponse<any> = await axiosNotLogged.get(`${baseURL}/users/exists`, { params });
    return exists.data.data.exists;
  },
  create: async (data: UserCreationType): Promise<UserType> => {
    const baseURL = await Environment.getBaseUrl();
    const newUser: AxiosResponse<any> = await axiosLogged.post(`${baseURL}/users`, { ...data, origin: MOBILE });
    return newUser.data.data.user;
  },
  uploadImage: async (userId: string, data): Promise<void> => {
    const baseURL = await Environment.getBaseUrl({ userId });
    await axiosLogged.post(`${baseURL}/users/${userId}/upload`, data);
  },
  deleteImage: async (userId: string): Promise<void> => {
    const baseURL = await Environment.getBaseUrl({ userId });
    await axiosLogged.delete(`${baseURL}/users/${userId}/upload`);
  },
  addExpoToken: async (userId: string, formationExpoToken): Promise<void> => {
    const baseURL = await Environment.getBaseUrl({ userId });
    await axiosLogged.post(`${baseURL}/users/${userId}/expo-token`, { formationExpoToken });
  },
  removeExpoToken: async (userId: string, expoToken): Promise<void> => {
    const baseURL = await Environment.getBaseUrl({ userId });
    await axiosLogged.delete(`${baseURL}/users/${userId}/expo-token/${expoToken}`);
  },
};
