import { ActivityHistoryType } from './ActivityHistoryType';
import { CardType } from './CardType';

export interface ActivityType {
  _id: string,
  name: string,
  type: 'lesson' | 'quiz' | 'sharing_experience' | 'video' | 'questionnaire',
  cards: Array<CardType>,
  activityHistories: Array<ActivityHistoryType>,
  quizCount?: number,
}
