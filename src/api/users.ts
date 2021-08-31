import Environment from '../../environment';
import { MOBILE } from '../core/data/constants';
import axiosLogged from './axios/logged';
import axiosNotLogged from './axios/notLogged';

export default {
  getById: async (userId: string) => {
    const baseURL = await Environment.getBaseUrl({ userId });
    const user = await axiosLogged.get(`${baseURL}/users/${userId}`);
    return user.data.data.user;
  },
  updateById: async (userId: string, data) => {
    const baseURL = await Environment.getBaseUrl({ userId });
    await axiosLogged.put(`${baseURL}/users/${userId}`, data);
  },
  exists: async (params) => {
    const baseURL = await Environment.getBaseUrl();
    const exists = await axiosNotLogged.get(`${baseURL}/users/exists`, { params });
    return exists.data.data.exists;
  },
  create: async (data) => {
    const baseURL = await Environment.getBaseUrl();
    const newUser = await axiosLogged.post(`${baseURL}/users`, { ...data, origin: MOBILE });
    return newUser.data.data.user;
  },
  uploadImage: async (userId: string, data) => {
    const baseURL = await Environment.getBaseUrl({ userId });
    await axiosLogged.post(`${baseURL}/users/${userId}/upload`, data);
  },
  deleteImage: async (userId: string) => {
    const baseURL = await Environment.getBaseUrl({ userId });
    await axiosLogged.delete(`${baseURL}/users/${userId}/upload`);
  },
  addExpoToken: async (userId: string, formationExpoToken) => {
    const baseURL = await Environment.getBaseUrl({ userId });
    await axiosLogged.post(`${baseURL}/users/${userId}/expo-token`, { formationExpoToken });
  },
  removeExpoToken: async (userId: string, expoToken) => {
    const baseURL = await Environment.getBaseUrl({ userId });
    await axiosLogged.delete(`${baseURL}/users/${userId}/expo-token/${expoToken}`);
  },
};
