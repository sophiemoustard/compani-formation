import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { CardType } from '../../types/CardType';
import { GREY } from '../../styles/colors';
import IconButton from '../../components/IconButton';
import { ICON, MARGIN } from '../../styles/metrics';
import TransitionCard from '../cards/TransitionCard';

interface CardTemplateProps {
  card: CardType,
  onPressExit: () => void,
  onPressNext: () => void,
  onPressBack: () => void,
}

const CardTemplate = ({ card, onPressExit, onPressNext, onPressBack }: CardTemplateProps) => {
  if (card.template === 'transition') {
    return <TransitionCard card={card} onPressExitbutton={onPressExit}
      onPressNext={onPressNext} onPressBack={onPressBack} />;
  }

  return (
    <View>
      <IconButton name='x-circle' onPress={onPressExit} size={ICON.LG}
        color={GREY['700']} style={styles.closeButton} />
      <Text>{card.template}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardScreen: {
    display: 'flex',
    flex: 1,
    backgroundColor: GREY[100],
  },
  closeButton: {
    margin: MARGIN.MD,
  },
});

export default CardTemplate;
