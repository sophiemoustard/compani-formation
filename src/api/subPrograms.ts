import axiosLogged from './axios/logged';
import Environment from '../../environment';
import { SubProgramType } from '../types/CourseTypes';

export default {
  getELearningDraftSubPrograms: async (): Promise<SubProgramType[]> => {
    const baseURL = await Environment.getBaseUrl();
    const response = await axiosLogged.get(`${baseURL}/subprograms/draft-e-learning`);
    return response.data.data.subPrograms;
  },
  getSubProgram: async (courseId): Promise<SubProgramType> => {
    const baseURL = await Environment.getBaseUrl();
    const response = await axiosLogged.get(`${baseURL}/subprograms/${courseId}`);
    return response.data.data.subProgram;
  },
};
