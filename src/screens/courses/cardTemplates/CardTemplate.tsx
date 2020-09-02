import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { CardType } from '../../../types/CardType';
import { GREY } from '../../../styles/colors';
import IconButton from '../../../components/IconButton';
import { ICON, MARGIN } from '../../../styles/metrics';
import TransitionCard from './TransitionCard';
import Footer from '../../../components/cards/Footer';
import { TRANSITION } from '../../../core/data/constants';

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
        <IconButton name='x-circle' onPress={onPressExit} size={ICON.LG}
          color={GREY['700']} style={styles.closeButton} />
        <Text>{card.template}</Text>
        <Footer template={card.template} index={index} />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  closeButton: {
    margin: MARGIN.MD,
  },
});

export default CardTemplate;
