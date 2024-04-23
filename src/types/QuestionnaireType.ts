import { END_OF_COURSE, EXPECTATIONS, SELF_POSITIONNING } from '../core/data/constants';
import { CardType } from './CardType';

export type QuestionnaireType = {
  _id: string,
  name: string,
  type: typeof EXPECTATIONS | typeof END_OF_COURSE | typeof SELF_POSITIONNING,
};

export type QuestionnaireWithCardsType = QuestionnaireType & { cards: CardType[] };
