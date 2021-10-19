import { AxiosResponse } from 'axios';
import axiosLogged from './axios/logged';
import Environment from '../../environment';
import { ProgramType } from '../types/CourseTypes';

type ElearningProgramType = ProgramType & { categories: { name: string }[] };

export default {
  getELearningPrograms: async (): Promise<ElearningProgramType[]> => {
    const baseURL = await Environment.getBaseUrl();
    const response: AxiosResponse<any> = await axiosLogged.get(`${baseURL}/programs/e-learning`);
    return response.data.data.programs;
  },
};
