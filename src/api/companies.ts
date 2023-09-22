import { AxiosResponse } from 'axios';
import axiosNotLogged from './axios/notLogged';
import axiosLogged from './axios/logged';
import Environment from '../../environment';
import { CompanyType } from '../types/CompanyType';
import { CompanyListResponseType } from '../types/AxiosTypes';

export default {
  list: async (): Promise<CompanyType[]> => {
    const baseURL = await Environment.getBaseUrl();
    const response: AxiosResponse<CompanyListResponseType> = await axiosLogged.get(`${baseURL}/companies`);

    return response.data.data.companies;
  },
  listNotLogged: async (): Promise<CompanyType[]> => {
    const baseURL = await Environment.getBaseUrl();
    const response: AxiosResponse<CompanyListResponseType> = await axiosNotLogged.get(`${baseURL}/companies`);

    return response.data.data.companies;
  },
};
