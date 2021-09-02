import axiosLogged from './axios/logged';
import Environment from '../../environment';

export default {
  createCompanyLinkRequest: async (payload: { company: string }): Promise<void> => {
    const baseURL = await Environment.getBaseUrl();
    await axiosLogged.post(`${baseURL}/companylinkrequests`, payload);
  },
};
