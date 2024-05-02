import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { GREY, GREEN, ORANGE } from '../../../styles/colors';
import Shadow from '../../design/Shadow';
import styles from './styles';
import { FillTheGapAnswers } from '@/components/cardTemplates/FillTheGapCard';

interface FillTheGapPropositionProps {
  item: FillTheGapAnswers,
  isGoodAnswer: boolean,
  isValidated: boolean,
  isSelected: boolean,
}

const FillTheGapProposition = ({ item, isGoodAnswer, isValidated, isSelected }: FillTheGapPropositionProps) => {
  const [color, setColor] = useState<string>(GREY[200]);

  useEffect(() => {
    if (isGoodAnswer && isValidated) return setColor(GREEN[600]);
    if (isSelected && isValidated) return setColor(ORANGE[600]);
    return undefined;
  }, [isGoodAnswer, isSelected, isValidated]);

  const style = styles({ color, isGoodAnswer, isSelected, isValidated });

  return (
    <>
      <View style={item.visible ? style.textContainer : { opacity: 0 }}>
        <Text style={style.text}>{item.text}</Text>
      </View>
      <Shadow customStyle={style.shadow} />
    </>
  );
};

export default FillTheGapProposition;
