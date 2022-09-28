import { AxiosResponse } from 'axios';
import axiosLogged from './axios/logged';
import Environment from '../../environment';
import { CourseType, BlendedCourseType, actionQueryCourseType } from '../types/CourseTypes';
import {
  CourseListResponseType,
  BlendedCourseListResponseType,
  CourseResponseType,
  PdfResponseType,
} from '../types/AxiosTypes';
import { MOBILE, OPERATIONS } from '../core/data/constants';

type GetCourseListType = {
  action: actionQueryCourseType,
  format?: string,
  trainer?: string
}

export default {
  getCourseList: async (params: GetCourseListType): Promise<BlendedCourseType[]> => {
    const baseURL = await Environment.getBaseUrl();
    const response: AxiosResponse<BlendedCourseListResponseType> = await axiosLogged.get(
      `${baseURL}/courses`,
      { params: { ...params, origin: MOBILE } }
    );

    return response.data.data.courses;
  },
  getUserCourses: async (): Promise<CourseType[]> => {
    const baseURL = await Environment.getBaseUrl();
    const response: AxiosResponse<CourseListResponseType> = await axiosLogged.get(`${baseURL}/courses/user`);

    return response.data.data.courses;
  },
  getCourse: async (courseId: string, action: actionQueryCourseType): Promise<CourseType> => {
    const baseURL = await Environment.getBaseUrl();
    const response: AxiosResponse<CourseResponseType> = await axiosLogged.get(
      `${baseURL}/courses/${courseId}`,
      { params: { action, ...(action === OPERATIONS && { origin: MOBILE }) } }
    );

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
