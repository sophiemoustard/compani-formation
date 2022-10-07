import { AxiosResponse } from 'axios';
import axiosLogged from './axios/logged';
import Environment from '../../environment';
import { AttendanceSheetListResponseType } from '../types/AxiosTypes';
import { AttendanceSheetType } from '../types/AttendanceSheetTypes';

export default {
  getAttendanceSheetList: async (params): Promise<AttendanceSheetType[]> => {
    const baseURL = await Environment.getBaseUrl();
    const response: AxiosResponse<AttendanceSheetListResponseType> = await axiosLogged.get(
      `${baseURL}/attendancesheets`,
      { params }
    );

    return response.data.data.attendanceSheets;
  },
  upload: async (data): Promise<void> => {
    const baseURL = await Environment.getBaseUrl();
    const headers = { 'Content-Type': 'multipart/form-data' };
    await axiosLogged.post(`${baseURL}/attendancesheets`, data, { headers });
  },
};
