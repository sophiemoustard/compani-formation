import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { connect } from 'react-redux';
import { StateType, ActionType } from '../../../../types/store/StoreType';
import Transition from '../Transition';
import CardFooter from '../../../../components/cards/CardFooter';
import {
  TRANSITION,
  TITLE_TEXT_MEDIA,
  SINGLE_CHOICE_QUESTION,
  TEXT_MEDIA,
  SURVEY,
  TITLE_TEXT,
  MULTIPLE_CHOICE_QUESTION,
  FLASHCARD,
  OPEN_QUESTION,
  ORDER_THE_SEQUENCE,
  FILL_THE_GAPS,
  QUESTION_ANSWER,
} from '../../../../core/data/constants';
import CardHeader from '../../../../components/cards/CardHeader';
import TitleTextMediaCard from '../TitleTextMediaCard';
import TextMediaCard from '../TextMediaCard';
import { CardType } from '../../../../types/CardType';
import Actions from '../../../../store/cards/actions';
import SingleChoiceQuestionCard from '../SingleChoiceQuestionCard';
import SurveyCard from '../SurveyCard';
import TitleTextCard from '../TitleTextCard';
import MultipleChoiceQuestionCard from '../MultipleChoiceQuestionCard';
import FlashCard from '../FlashCard';
import OpenQuestionCard from '../OpenQuestionCard';
import OrderTheSequenceCard from '../OrderTheSequenceCard';
import FillTheGapCard from '../FillTheGapCard';
import QuestionAnswerCard from '../QuestionAnswerCard';

interface CardTemplateProps {
  index: number,
  cards: CardType[],
  setCardIndex: (index : number | null) => void,
  setIsRightSwipeEnabled: (boolean) => void,
  setIsLeftSwipeEnabled: (boolean) => void,
}

const CardTemplate = ({
  index,
  cards,
  setCardIndex,
  setIsRightSwipeEnabled,
  setIsLeftSwipeEnabled,
}: CardTemplateProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    setIsLoading(true);
    async function fetchData() { setCardIndex(index); }
    if (isFocused) fetchData().then(() => setIsLoading(false));
  }, [isFocused, setCardIndex, index, setIsLoading]);

  const card = cards[index];
  switch (card.template) {
    case FLASHCARD:
      return <FlashCard isLoading={isLoading} setIsRightSwipeEnabled={setIsRightSwipeEnabled} />;
    case FILL_THE_GAPS:
      return <FillTheGapCard isLoading={isLoading} setIsRightSwipeEnabled={setIsRightSwipeEnabled} />;
    case MULTIPLE_CHOICE_QUESTION:
      return <MultipleChoiceQuestionCard isLoading={isLoading} setIsRightSwipeEnabled={setIsRightSwipeEnabled} />;
    case OPEN_QUESTION:
      return <OpenQuestionCard isLoading={isLoading} setIsRightSwipeEnabled={setIsRightSwipeEnabled} />;
    case ORDER_THE_SEQUENCE:
      return <OrderTheSequenceCard isLoading={isLoading} setIsRightSwipeEnabled={setIsRightSwipeEnabled} />;
    case QUESTION_ANSWER:
      return <QuestionAnswerCard isLoading={isLoading} setIsRightSwipeEnabled={setIsRightSwipeEnabled} />;
    case SINGLE_CHOICE_QUESTION:
      return <SingleChoiceQuestionCard isLoading={isLoading} setIsRightSwipeEnabled={setIsRightSwipeEnabled} />;
    case SURVEY:
      return <SurveyCard isLoading={isLoading} setIsRightSwipeEnabled={setIsRightSwipeEnabled} />;
    case TEXT_MEDIA:
      return <TextMediaCard isLoading={isLoading} setIsRightSwipeEnabled={setIsRightSwipeEnabled}
        setIsLeftSwipeEnabled={setIsLeftSwipeEnabled} />;
    case TITLE_TEXT:
      return <TitleTextCard isLoading={isLoading} setIsRightSwipeEnabled={setIsRightSwipeEnabled} />;
    case TITLE_TEXT_MEDIA:
      return <TitleTextMediaCard isLoading={isLoading} setIsRightSwipeEnabled={setIsRightSwipeEnabled}
        setIsLeftSwipeEnabled={setIsLeftSwipeEnabled} />;
    case TRANSITION:
      return <Transition isLoading={isLoading} setIsRightSwipeEnabled={setIsRightSwipeEnabled} />;

    default:
      return (
        <View>
          <CardHeader />
          <Text>{card.template}</Text>
          <CardFooter index={index} />
        </View>
      );
  }
};

const mapStateToProps = (state: StateType) => ({ cards: state.cards.cards });

const mapDispatchToProps = (dispatch: ({ type, payload }: ActionType) => void) => ({
  setCardIndex: (index: number | null) => dispatch(Actions.setCardIndex(index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardTemplate);
