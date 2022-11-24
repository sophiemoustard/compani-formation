import axiosLogged from './axios/logged';
import Environment from '../../environment';

type ActivityHistoryPostPayloadType = {
  activity: string,
  user: string,
  questionnaireAnswersList?: {
    card: string,
    answerList: string[],
  }[],
}

export default {
  createActivityHistories: async (payload: ActivityHistoryPostPayloadType): Promise<void> => {
    const baseURL = await Environment.getBaseUrl();
    await axiosLogged.post(`${baseURL}/activityhistories`, payload);
  },
};
