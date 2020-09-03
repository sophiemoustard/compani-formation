import React from 'react';
import { Text, View } from 'react-native';
import { CardType } from '../../../types/CardType';
import Transition from './Transition';
import CardFooter from '../../../components/cards/CardFooter';
import { TRANSITION, CARD_TEMPLATES, QUIZ, QUESTIONNAIRE } from '../../../core/data/constants';
import CardHeader from '../../../components/cards/CardHeader';

interface CardTemplateProps {
  card: CardType,
  index: number,
  onPressExit: () => void,
  allowSwipe: (isAllowed: boolean) => void,
}

const CardTemplate = ({ card, index, onPressExit, allowSwipe }: CardTemplateProps) => {
  const onFocus = () => {
    const templatesWithoutSwipe = CARD_TEMPLATES
      .filter(t => [QUIZ, QUESTIONNAIRE].includes(t.type))
      .map(t => t.value);
    if (templatesWithoutSwipe.includes(card.template)) allowSwipe(false);
    else allowSwipe(true);
  };

  switch (card.template) {
    case TRANSITION:
      return <Transition card={card} index={index} onPressExitButton={onPressExit} onFocus={onFocus}/>;

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
