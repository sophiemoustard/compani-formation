import { ActivityHistoryType } from './ActivityHistoryType';
import { CardType } from './CardType';

export type ActivityType = {
  _id: string,
  name: string,
  type: 'lesson' | 'quiz' | 'sharing_experience' | 'video',
  cards: Array<CardType>,
  activityHistories: Array<ActivityHistoryType>,
  quizCount?: number,
}
