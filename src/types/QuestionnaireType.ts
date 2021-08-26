import { CardType } from './CardType';

export interface QuestionnaireType {
  _id: string,
  name: string,
  type: 'expectations' | 'end_of_course',
  cards: CardType[],
}
