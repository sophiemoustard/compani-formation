/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Text, View } from 'react-native';
import { CardType } from '../../../types/CardType';
import Transition from './Transition';
import CardFooter from '../../../components/cards/CardFooter';
import { TRANSITION, TITLE_TEXT_MEDIA } from '../../../core/data/constants';
import CardHeader from '../../../components/cards/CardHeader';
import TitleTextMediaCard from './TitleTextMediaCard';

interface CardTemplateProps {
  card: CardType,
  index: number,
  onPressExit: () => void,
}

const CardTemplate = ({ card, index, onPressExit }: CardTemplateProps) => {
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

export default CardTemplate;
