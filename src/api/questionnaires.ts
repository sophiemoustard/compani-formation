import { AxiosResponse } from 'axios';
import axiosLogged from './axios/logged';
import Environment from '../../environment';
import { QuestionnaireType, QuestionnaireWithCardsType } from '../types/QuestionnaireType';
import { QuestionnaireListResponseType, QuestionnaireResponseType } from '../types/AxiosTypes';

export default {
  getUserQuestionnaires: async (params: { course: string }): Promise<QuestionnaireType[]> => {
    const baseURL = await Environment.getBaseUrl();
    const user: AxiosResponse<QuestionnaireListResponseType> =
      await axiosLogged.get(`${baseURL}/questionnaires/user`, { params });

    return user.data.data.questionnaires;
  },
  getQuestionnaire: async (questionnaireId: string): Promise<QuestionnaireWithCardsType> => {
    const baseURL = await Environment.getBaseUrl();
    const response: AxiosResponse<QuestionnaireResponseType> =
      await axiosLogged.get(`${baseURL}/questionnaires/${questionnaireId}`);

    return response.data.data.questionnaire;
  },
  list: async (params: { status: string }): Promise<QuestionnaireType[]> => {
    const baseURL = await Environment.getBaseUrl();
    const response: AxiosResponse<QuestionnaireListResponseType> =
      await axiosLogged.get(`${baseURL}/questionnaires`, { params });

    return response.data.data.questionnaires;
  },
  getQRCode: async (questionnaireId: string, params: { course: string }): Promise<string> => {
    const baseURL = await Environment.getBaseUrl();

    const response: AxiosResponse<any> =
      await axiosLogged.get(`${baseURL}/questionnaires/${questionnaireId}/qrcode`, { params });

    return response.data.data.qrCode;
  },
};
