import { AxiosResponse } from 'axios';
import axiosLogged from './axios/logged';
import Environment from '../../environment';
import { CourseType } from '../types/CourseTypes';

export default {
  getUserCourses: async (): Promise<CourseType[]> => {
    const baseURL = await Environment.getBaseUrl();
    const response: AxiosResponse<any> = await axiosLogged.get(`${baseURL}/courses/user`);
    return response.data.data.courses;
  },
  getCourse: async (courseId): Promise<CourseType> => {
    const baseURL = await Environment.getBaseUrl();
    const response: AxiosResponse<any> = await axiosLogged.get(`${baseURL}/courses/${courseId}/user`);
    return response.data.data.course;
  },
  registerToELearningCourse: async (courseId): Promise<void> => {
    const baseURL = await Environment.getBaseUrl();
    await axiosLogged.post(`${baseURL}/courses/${courseId}/register-e-learning`);
  },
};
