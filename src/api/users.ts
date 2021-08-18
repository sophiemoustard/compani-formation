import getEnvVars from '../../environment';
import { MOBILE } from '../core/data/constants';
import axiosLogged from './axios/logged';
import axiosNotLogged from './axios/notLogged';

export default {
  getById: async (id) => {
    const { baseURL } = getEnvVars();
    const user = await axiosLogged.get(`${baseURL}/users/${id}`);
    return user.data.data.user;
  },
  updateById: async (userId, data) => {
    const { baseURL } = getEnvVars();
    await axiosLogged.put(`${baseURL}/users/${userId}`, data);
  },
  exists: async (params) => {
    const { baseURL } = getEnvVars();
    const exists = await axiosNotLogged.get(`${baseURL}/users/exists`, { params });
    return exists.data.data.exists;
  },
  create: async (data) => {
    const { baseURL } = getEnvVars();
    const newUser = await axiosLogged.post(`${baseURL}/users`, { ...data, origin: MOBILE });
    return newUser.data.data.user;
  },
  uploadImage: async (userId, data) => {
    const { baseURL } = getEnvVars();
    await axiosLogged.post(`${baseURL}/users/${userId}/upload`, data);
  },
  deleteImage: async (userId) => {
    const { baseURL } = getEnvVars();
    await axiosLogged.delete(`${baseURL}/users/${userId}/upload`);
  },
  addExpoToken: async (userId, formationExpoToken) => {
    const { baseURL } = getEnvVars();
    await axiosLogged.post(`${baseURL}/users/${userId}/expo-token`, { formationExpoToken });
  },
  removeExpoToken: async (userId, expoToken) => {
    const { baseURL } = getEnvVars();
    await axiosLogged.delete(`${baseURL}/users/${userId}/expo-token/${expoToken}`);
  },
};
