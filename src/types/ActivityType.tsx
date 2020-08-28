import { CardType } from './CardType';

export interface ActivityType {
  _id: string,
  name: string,
  type: 'lesson' | 'quiz' | 'sharing_experience' | 'video',
  cards: Array<CardType>,
}
