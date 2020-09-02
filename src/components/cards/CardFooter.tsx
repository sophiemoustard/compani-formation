import React from 'react';
import { View, StyleSheet } from 'react-native';
import ArrowButton from '../ArrowButton';
import { navigate } from '../../navigationRef';
import { CARD_TEMPLATES, QUIZ, LEFT, RIGHT } from '../../core/data/constants';

interface CardFooterProps {
  index: number,
  template: string,
}

const CardFooter = ({ index, template }: CardFooterProps) => {
  const cardTemplate = CARD_TEMPLATES.find(card => card.value === template);
  const disabled = cardTemplate?.type === QUIZ;

  return (
    <View style={styles.container}>
      <ArrowButton direction={LEFT} disabled={disabled} onPress={() => navigate(`card-${index - 1}`)} />
      <ArrowButton direction={RIGHT} disabled={disabled} onPress={() => navigate(`card-${index + 1}`)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default CardFooter;
