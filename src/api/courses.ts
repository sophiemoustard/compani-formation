import { alenviAxios } from './ressources/alenviAxios';
import getEnvVars from '../../environment';
import { CourseType } from '../types/CourseType';

export default {
  getCourses: async (params): Promise<[CourseType]> => {
    const { baseURL } = getEnvVars();
    const response = await alenviAxios.get(`${baseURL}/courses`, { params });
    return response.data.data.courses;
  },
  getUserCourses: async (): Promise<[CourseType]> => {
    const { baseURL } = getEnvVars();
    const response = await alenviAxios.get(`${baseURL}/courses/user`);
    return response.data.data.courses;
  },
  getCourse: async (courseId): Promise<CourseType> => {
    const { baseURL } = getEnvVars();
    const response = await alenviAxios.get(`${baseURL}/courses/${courseId}/user`);
    return response.data.data.course;
  },
};
