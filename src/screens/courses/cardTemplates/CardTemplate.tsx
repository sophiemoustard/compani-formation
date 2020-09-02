import React from 'react';
import { Text, View } from 'react-native';
import { CardType } from '../../../types/CardType';
import TransitionCard from './TransitionCard';
import CardFooter from '../../../components/cards/CardFooter';
import { TRANSITION } from '../../../core/data/constants';
import CardHeader from '../../../components/cards/CardHeader';

interface CardTemplateProps {
  card: CardType,
  index: number,
  onPressExit: () => void,
  allowSwipe: (isAllowed: boolean) => void,
}

const CardTemplate = ({ card, index, onPressExit, allowSwipe }: CardTemplateProps) => {
  const onFocus = (type) => {
    if (type === TRANSITION) allowSwipe(false);
    else allowSwipe(true); // NE PAS OUBLIER DE GERER VOTRE SWIPE ICI - CF TRANSITIONCARD -
  };

  switch (card.template) {
    case TRANSITION:
      return <TransitionCard card={card} index={index} onPressExitButton={onPressExit} onFocus={onFocus}/>;

    default: return (
      <View>
        <CardHeader onPress={onPressExit} />
        <Text>{card.template}</Text>
        <CardFooter template={card.template} index={index} />
      </View>
    );
  }
};

export default CardTemplate;
