import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { connect } from 'react-redux';
import { StateType, ActionType } from '../../../types/StoreType';
import Transition from './Transition';
import CardFooter from '../../../components/cards/CardFooter';
import { TRANSITION, TITLE_TEXT_MEDIA } from '../../../core/data/constants';
import CardHeader from '../../../components/cards/CardHeader';
import TitleTextMediaCard from './TitleTextMediaCard';
import { ActivityType } from '../../../types/ActivityType';
import Actions from '../../../store/actions';

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

const mapStateToProps = (state: StateType) => ({ activity: state.activity });
const mapDispatchToProps = (dispatch: ({ type, payload }: ActionType) => void) => ({
  setCardIndex: index => dispatch(Actions.setCardIndex(index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardTemplate);
