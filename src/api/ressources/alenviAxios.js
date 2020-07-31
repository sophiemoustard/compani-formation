import axios from 'axios';
import qs from 'qs';
import { AsyncStorage } from 'react-native';

const instance = axios.create({
  paramsSerializer: params => qs.stringify(params, { indices: false }),
});

instance.interceptors.request.use(async function (config) {
  const token = await AsyncStorage.getItem('token');

  // Headers for request only to API (alenvi)
  config.headers.common['x-access-token'] = token;
  return config;
}, function (err) {
  return Promise.reject(err);
});

instance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  return Promise.reject(error.response);
});

export const alenviAxios = instance;
