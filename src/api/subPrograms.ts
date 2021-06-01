import { alenviAxios } from './ressources/alenviAxios';
import getEnvVars from '../../environment';
import { SubProgramType } from '../types/SubProgramType';

export default {
  getELearningDraftSubPrograms: async (): Promise<SubProgramType[]> => {
    const { baseURL } = getEnvVars();
    const response = await alenviAxios.get(`${baseURL}/subprograms/draft-e-learning`);
    return response.data.data.subPrograms;
  },
  getSubProgram: async (courseId): Promise<SubProgramType> => {
    const { baseURL } = getEnvVars();
    const response = await alenviAxios.get(`${baseURL}/subprograms/${courseId}`);
    return response.data.data.subProgram;
  },
};
