import { CardType } from './CardType';

export interface QuestionnaireType {
  _id: string,
  title: string,
  type: 'expectations',
  cards: Array<CardType>,
}
