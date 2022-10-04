import { AxiosResponse } from 'axios';
import axiosLogged from './axios/logged';
import Environment from '../../environment';
import { AttendanceSheetListResponseType } from '../types/AxiosTypes';
import { AttendanceSheetType } from '../types/AttendanceSheetTypes';

export default {
  getAttendanceSheetList: async (course: string): Promise<AttendanceSheetType[]> => {
    const baseURL = await Environment.getBaseUrl();
    const response: AxiosResponse<AttendanceSheetListResponseType> = await axiosLogged.get(
      `${baseURL}/attendancesheets`,
      { params: { course } }
    );

    return response.data.data.attendanceSheets;
  },
};
