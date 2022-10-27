import axiosLogged from './axios/logged';
import Environment from '../../environment';

// #TODO
type ActivityHistoryPostPayloadType = {
  user: string,
  activity: string,
  questionnaireAnswersList: {
    card: string,
    answerList: string[],
  }[],
  score: number,
}

export default {
  createActivityHistories: async (payload: ActivityHistoryPostPayloadType): Promise<void> => {
    const baseURL = await Environment.getBaseUrl();
    await axiosLogged.post(`${baseURL}/activityhistories`, payload);
  },
};
