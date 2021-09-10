import { CardType } from './CardType';

export type QuestionnaireType = {
  _id: string,
  name: string,
  type: 'expectations' | 'end_of_course',
};

export type QuestionnaireWithCardsType = QuestionnaireType & { cards: CardType[] };
