import { AxiosResponse } from 'axios';
import Constants from 'expo-constants';
import axiosNotLogged from './axios/notLogged';
import Environment from '../../environment';
import { APP_NAME } from '../../src/core/data/constants';

type ShouldUpdateType = { mustUpdate: boolean };

export default {
  shouldUpdate: async (): Promise<ShouldUpdateType> => {
    const baseURL = await Environment.getBaseUrl();
    const params = { mobileVersion: Constants.manifest?.version, appName: APP_NAME };

    const response: AxiosResponse<any> = await axiosNotLogged.get(`${baseURL}/version/should-update`, { params });
    return response.data.data;
  },
};
