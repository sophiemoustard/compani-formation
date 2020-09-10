import axios from 'axios';
import qs from 'qs';
import { AsyncStorage } from 'react-native';

const instance = axios.create({
  paramsSerializer: params => qs.stringify(params, { indices: false }),
});

instance.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('alenvi_token');

  // Headers for request only to API (alenvi)
  // eslint-disable-next-line no-param-reassign
  config.headers.common['x-access-token'] = token;
  return config;
}, err => Promise.reject(err));

instance.interceptors.response.use(response => response, error => Promise.reject(error.response));

export const alenviAxios = instance;
