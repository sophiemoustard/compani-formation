import { CardType, QcmAnswerType } from './CardType';
import { LESSON, VIDEO, QUIZ, SHARING_EXPERIENCE } from '../core/data/constants';

export type QuestionnaireAnswersType = { _id?: string, card: string, answerList: string[] };

export type QuizzAnswersType = { _id?: string, card: string, answerList: QcmAnswerType[] };

type BaseActivityType = {
  _id: string,
  name: string,
  cards: { _id: string, template: string }[],
  quizCount: number,
  activityHistories: {
    questionnaireAnswersList: QuestionnaireAnswersType[],
    score: number,
  }[],
};

type QuizActivityType = BaseActivityType & { type: typeof QUIZ };

type VideoActivityType = BaseActivityType & { type: typeof VIDEO };

type SharingExperienceActivityType = BaseActivityType & { type: typeof SHARING_EXPERIENCE };

type LessonActivityType = BaseActivityType & { type: typeof LESSON };

export type ActivityType = QuizActivityType | VideoActivityType | SharingExperienceActivityType | LessonActivityType;
export type ActivityWithCardsType = ActivityType & { cards: CardType[] };
