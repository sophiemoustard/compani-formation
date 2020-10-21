import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { connect } from 'react-redux';
import { StateType, ActionType } from '../../../types/store/StoreType';
import Transition from './Transition';
import CardFooter from '../../../components/cards/CardFooter';
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
} from '../../../core/data/constants';
import CardHeader from '../../../components/cards/CardHeader';
import TitleTextMediaCard from './TitleTextMediaCard';
import TextMediaCard from './TextMediaCard';
import { ActivityType } from '../../../types/ActivityType';
import Actions from '../../../store/activities/actions';
import SingleChoiceQuestionCard from './SingleChoiceQuestionCard';
import SurveyCard from './SurveyCard';
import TitleTextCard from './TitleTextCard';
import MultipleChoiceQuestionCard from './MultipleChoiceQuestionCard';
import FlashCard from './FlashCard';
import OpenQuestionCard from './OpenQuestionCard';
import OrderTheSequenceCard from './OrderTheSequenceCard';
import FillTheGapCard from './FillTheGapCard';
import QuestionAnswerCard from './QuestionAnswerCard';

interface CardTemplateProps {
  index: number,
  activity: ActivityType,
  setCardIndex: (number) => void,
}

const CardTemplate = ({ index, activity, setCardIndex }: CardTemplateProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    setIsLoading(true);
    async function fetchData() { setCardIndex(index); }
    if (isFocused) fetchData().then(() => setIsLoading(false));
  }, [isFocused, setCardIndex, index, setIsLoading]);

  if (isLoading) return null;

  const card = activity.cards[index];
  switch (card.template) {
    case TRANSITION:
      return <Transition isFocused={isFocused} />;
    case TITLE_TEXT_MEDIA:
      return <TitleTextMediaCard isFocused={isFocused} />;
    case SINGLE_CHOICE_QUESTION:
      return <SingleChoiceQuestionCard isFocused={isFocused} />;
    case TEXT_MEDIA:
      return <TextMediaCard isFocused={isFocused} />;
    case SURVEY:
      return <SurveyCard isFocused={isFocused} />;
    case TITLE_TEXT:
      return <TitleTextCard isFocused={isFocused} />;
    case MULTIPLE_CHOICE_QUESTION:
      return <MultipleChoiceQuestionCard isFocused={isFocused} />;
    case FLASHCARD:
      return <FlashCard isFocused={isFocused} />;
    case OPEN_QUESTION:
      return <OpenQuestionCard isFocused={isFocused} />;
    case ORDER_THE_SEQUENCE:
      return <OrderTheSequenceCard isFocused={isFocused} />;
    case FILL_THE_GAPS:
      return <FillTheGapCard isFocused={isFocused} />;
    case QUESTION_ANSWER:
      return <QuestionAnswerCard isFocused={isFocused} />;

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

const mapStateToProps = (state: StateType) => ({ activity: state.activities.activity });
const mapDispatchToProps = (dispatch: ({ type, payload }: ActionType) => void) => ({
  setCardIndex: index => dispatch(Actions.setCardIndex(index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardTemplate);
