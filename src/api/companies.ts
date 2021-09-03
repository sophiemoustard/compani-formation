import axiosLogged from './axios/logged';
import Environment from '../../environment';
import { CompanyType } from '../types/CompanyType';

export default {
  list: async (): Promise<CompanyType[]> => {
    const baseURL = await Environment.getBaseUrl();
    const response = await axiosLogged.get(`${baseURL}/companies`);
    return response.data.data.companies;
  },
};
