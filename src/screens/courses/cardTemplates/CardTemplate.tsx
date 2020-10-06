import React, { useEffect } from 'react';
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

interface CardTemplateProps {
  index: number,
  activity: ActivityType,
  setCardIndex: (number) => void,
}

const CardTemplate = ({ index, activity, setCardIndex }: CardTemplateProps) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    async function fetchData() { setCardIndex(index); }
    if (isFocused) fetchData();
  }, [isFocused, setCardIndex, index]);

  const card = activity.cards[index];
  switch (card.template) {
    case TRANSITION:
      return <Transition />;
    case TITLE_TEXT_MEDIA:
      return <TitleTextMediaCard />;
    case SINGLE_CHOICE_QUESTION:
      return <SingleChoiceQuestionCard />;
    case TEXT_MEDIA:
      return <TextMediaCard />;
    case SURVEY:
      return <SurveyCard />;
    case TITLE_TEXT:
      return <TitleTextCard />;
    case MULTIPLE_CHOICE_QUESTION:
      return <MultipleChoiceQuestionCard />;
    case FLASHCARD:
      return <FlashCard />;
    case OPEN_QUESTION:
      return <OpenQuestionCard />;
    case ORDER_THE_SEQUENCE:
      return <OrderTheSequenceCard />;

    default:
      return (
        <View>
          <CardHeader />
          <Text>{card.template}</Text>
          <CardFooter template={card.template} index={index} />
        </View>
      );
  }
};

const mapStateToProps = (state: StateType) => ({ activity: state.activities.activity });
const mapDispatchToProps = (dispatch: ({ type, payload }: ActionType) => void) => ({
  setCardIndex: index => dispatch(Actions.setCardIndex(index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardTemplate);
