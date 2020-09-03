/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { CardType } from '../../../types/CardType';
import Transition from './Transition';
import CardFooter from '../../../components/cards/CardFooter';
import { TRANSITION, CARD_TEMPLATES, LESSON } from '../../../core/data/constants';
import CardHeader from '../../../components/cards/CardHeader';

interface CardTemplateProps {
  card: CardType,
  index: number,
  onPressExit: () => void,
  allowSwipe: (isAllowed: boolean) => void,
}

const CardTemplate = ({ card, index, onPressExit, allowSwipe }: CardTemplateProps) => {
  const isSwipeAllowed = (): boolean => {
    const templatesWithSwipe = CARD_TEMPLATES.filter(t => LESSON === t.type).map(t => t.value);
    return templatesWithSwipe.includes(card.template);
  };

  const isFocused = useIsFocused();
  useEffect(() => {
    async function onFocus() { allowSwipe(isSwipeAllowed()); }
    onFocus();
  }, []);

  useEffect(() => {
    async function onFocus() { allowSwipe(isSwipeAllowed()); }
    if (isFocused) onFocus();
  }, [isFocused]);

  switch (card.template) {
    case TRANSITION:
      return <Transition card={card} index={index} onPressExitButton={onPressExit} />;

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
