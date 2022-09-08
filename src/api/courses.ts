import { AxiosResponse } from 'axios';
import axiosLogged from './axios/logged';
import Environment from '../../environment';
import { CourseType } from '../types/CourseTypes';
import { CourseListResponseType, CourseResponseType, PdfResponseType } from '../types/AxiosTypes';
import { MOBILE, OPERATION, BLENDED } from '../core/data/constants';

export default {
  getTrainerCourses: async (userId: string): Promise<CourseType[]> => {
    const baseURL = await Environment.getBaseUrl();
    const response: AxiosResponse<CourseListResponseType> = await axiosLogged.get(
      `${baseURL}/courses`,
      { params: { action: OPERATION, origin: MOBILE, format: BLENDED, trainer: userId } }
    );

    return response.data.data.courses;
  },
  getUserCourses: async (): Promise<CourseType[]> => {
    const baseURL = await Environment.getBaseUrl();
    const response: AxiosResponse<CourseListResponseType> = await axiosLogged.get(`${baseURL}/courses/user`);

    return response.data.data.courses;
  },
  getCourse: async (courseId): Promise<CourseType> => {
    const baseURL = await Environment.getBaseUrl();
    const response: AxiosResponse<CourseResponseType> = await axiosLogged.get(`${baseURL}/courses/${courseId}/user`);

    return response.data.data.course;
  },
  registerToELearningCourse: async (courseId): Promise<void> => {
    const baseURL = await Environment.getBaseUrl();
    await axiosLogged.post(`${baseURL}/courses/${courseId}/register-e-learning`);
  },
  downloadCertificate: async (courseId) : Promise<string> => {
    const baseURL = await Environment.getBaseUrl();
    const response: PdfResponseType = await axiosLogged.get(
      `${baseURL}/courses/${courseId}/completion-certificates`,
      { params: { origin: MOBILE }, responseType: 'arraybuffer', headers: { Accept: 'application/pdf' } }
    );

    return response.data;
  },
};
