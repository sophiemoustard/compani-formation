import { QuestionnaireAnswerType } from './store/CardStoreType';

export interface ActivityHistoryType {
  _id: string,
  user: string,
  activity: string,
  questionnaireAnswersList?: Array<QuestionnaireAnswerType>,
  date: Date,
  score: number,
}
