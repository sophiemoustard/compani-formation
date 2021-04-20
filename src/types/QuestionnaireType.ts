import { CardType } from './CardType';

export interface QuestionnaireType {
  _id: string,
  name: string,
  type: 'expectations',
  cards: Array<CardType>,
}
