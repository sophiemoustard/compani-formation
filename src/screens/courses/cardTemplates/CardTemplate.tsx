import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { StateType } from '../../../types/StoreType';
import Transition from './Transition';
import CardFooter from '../../../components/cards/CardFooter';
import { TRANSITION, TITLE_TEXT_MEDIA } from '../../../core/data/constants';
import CardHeader from '../../../components/cards/CardHeader';
import TitleTextMediaCard from './TitleTextMediaCard';
import { ActivityType } from '../../../types/ActivityType';

interface CardTemplateProps {
  index: number,
  activity: ActivityType,
  onPressExit: () => void,
}

const CardTemplate = ({ index, activity, onPressExit }: CardTemplateProps) => {
  const card = activity.cards[index];
  switch (card.template) {
    case TRANSITION:
      return <Transition card={card} index={index} onPressExitButton={onPressExit} />;
    case TITLE_TEXT_MEDIA:
      return <TitleTextMediaCard card={card} index={index} onPressExitButton={onPressExit} />;

    default:
      return (
        <View>
          <CardHeader onPress={onPressExit} />
          <Text>{card.template}</Text>
          <CardFooter template={card.template} index={index} />
        </View>
      );
  }
};

const mapStateToProps = (state: StateType) => ({ activity: state.activity });

export default connect(mapStateToProps)(CardTemplate);
