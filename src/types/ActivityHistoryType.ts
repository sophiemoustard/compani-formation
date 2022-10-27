import { QuestionnaireAnswersType } from './ActivityTypes';

export interface ActivityHistoryType {
  _id?: string,
  user: string,
  activity: string,
  questionnaireAnswersList?: QuestionnaireAnswersType[],
  date: Date,
  score: number,
}
