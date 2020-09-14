/* eslint-disable no-param-reassign */
import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import asyncStorage from '../../core/helpers/asyncStorage';
import alenvi from '../../core/helpers/alenvi';

const instance = axios.create({
  paramsSerializer: params => qs.stringify(params, { indices: false }),
});

instance.interceptors.request.use(async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
  const { alenviToken, alenviTokenExpiryDate } = await asyncStorage.getAlenviToken();
  if (asyncStorage.isTokenValid(alenviToken, alenviTokenExpiryDate)) {
    config.headers.common['x-access-token'] = alenviToken;

    return config;
  }

  const { refreshToken, refreshTokenExpiryDate } = await asyncStorage.getRefreshToken();
  if (asyncStorage.isTokenValid(refreshToken, refreshTokenExpiryDate)) {
    await alenvi.refreshAlenviCookies();
    const newToken = await asyncStorage.getAlenviToken();
    if (asyncStorage.isTokenValid(newToken.alenviToken, newToken.alenviTokenExpiryDate)) {
      config.headers.common['x-access-token'] = newToken.alenviToken;

      return config;
    }
  }

  return config;
}, err => Promise.reject(err));

instance.interceptors.response.use(response => response, error => Promise.reject(error.response));

export const alenviAxios = instance;
