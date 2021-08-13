import axiosLogged from './axios/logged';
import getEnvVars from '../../environment';
import { CourseType } from '../types/CourseType';

export default {
  getUserCourses: async (): Promise<CourseType[]> => {
    const { baseURL } = getEnvVars();
    const response = await axiosLogged.get(`${baseURL}/courses/user`);
    return response.data.data.courses;
  },
  getCourse: async (courseId): Promise<CourseType> => {
    const { baseURL } = getEnvVars();
    const response = await axiosLogged.get(`${baseURL}/courses/${courseId}/user`);
    return response.data.data.course;
  },
  registerToELearningCourse: async (courseId) => {
    const { baseURL } = getEnvVars();
    await axiosLogged.post(`${baseURL}/courses/${courseId}/register-e-learning`);
  },
};
