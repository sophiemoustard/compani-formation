import React from 'react';
import { View } from 'react-native';
import ArrowButton from '../../ArrowButton';
import { navigate } from '../../../navigationRef';
import { LEFT, RIGHT } from '../../../core/data/constants';
import styles from './styles';

interface CardFooterProps {
  index: number,
  color?: string,
  removeRight?: boolean
}

const CardFooter = ({ index, color, removeRight }: CardFooterProps) => {
  const removeLeft = index === 0;

  let justifyContent;
  if (removeLeft) justifyContent = 'flex-end';
  else if (removeRight) justifyContent = 'flex-start';
  else justifyContent = 'space-between';

  return (
    <View style={styles({ justifyContent }).container}>
      {!removeLeft && <ArrowButton color={color} direction={LEFT} onPress={() => navigate(`card-${index - 1}`)} />}
      {!removeRight && <ArrowButton color={color} direction={RIGHT} onPress={() => navigate(`card-${index + 1}`)} />}
    </View>
  );
};

export default CardFooter;
