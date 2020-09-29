import { QuestionnaireAnswerType } from './store/ActivityStoreType';

export interface ActivityHistoryType {
  _id: string,
  user: string,
  activity: string,
  questionnaireAnswersList?: Array<QuestionnaireAnswerType>,
  date: Date,
}
