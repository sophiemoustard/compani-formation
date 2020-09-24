import React from 'react';
import { View, StyleSheet } from 'react-native';
import ArrowButton from '../ArrowButton';
import { navigate } from '../../navigationRef';
import { MARGIN } from '../../styles/metrics';

import { CARD_TEMPLATES, QUIZ, LEFT, RIGHT } from '../../core/data/constants';

interface CardFooterProps {
  index: number,
  template: string,
  color?: string,
  removeRight?: boolean
}

interface StylesProps {
  justifyContent: 'flex-end' | 'space-between' | 'flex-start',
}

const CardFooter = ({ index, template, color, removeRight }: CardFooterProps) => {
  const cardTemplate = CARD_TEMPLATES.find(card => card.value === template);
  const leftRemoved = index === 0;
  const rightRemoved = cardTemplate?.type === QUIZ || removeRight;

  let justifyContent;
  if (leftRemoved) justifyContent = 'flex-end';
  else if (rightRemoved) justifyContent = 'flex-start';
  else justifyContent = 'space-between';

  return (
    <View style={styles({ justifyContent }).container}>
      {!leftRemoved && <ArrowButton color={color} direction={LEFT} onPress={() => navigate(`card-${index - 1}`)} />}
      {!rightRemoved && <ArrowButton color={color} direction={RIGHT} onPress={() => navigate(`card-${index + 1}`)} />}
    </View>
  );
};

const styles = ({ justifyContent }: StylesProps) => StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent,
    marginBottom: MARGIN.XL,
    marginTop: MARGIN.LG,
    marginHorizontal: MARGIN.LG,
  },
});

export default CardFooter;
