import { AxiosResponse } from 'axios';
import axiosLogged from './axios/logged';
import Environment from '../../environment';
import { ElearningProgramType, ProgramListResponseType } from '../types/AxiosTypes';

export default {
  getELearningPrograms: async (params: object | null = null): Promise<ElearningProgramType[]> => {
    const baseURL = await Environment.getBaseUrl();
    const response: AxiosResponse<ProgramListResponseType> =
      await axiosLogged.get(`${baseURL}/programs/e-learning`, { params });

    return response.data.data.programs;
  },
};
