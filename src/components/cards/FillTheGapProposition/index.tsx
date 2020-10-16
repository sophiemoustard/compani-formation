import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { GREY, GREEN, ORANGE } from '../../../styles/colors';
import Shadow from '../../design/Shadow';
import styles from './styles';

interface FillTheGapPropositionProps {
  item: string,
  isGoodAnswer: boolean,
  answers: Array<string>,
  isValidated: boolean,
  isSelected: boolean,
  isGap: boolean,
}

const FillTheGapProposition = ({
  item,
  isGoodAnswer,
  answers,
  isValidated = false,
  isSelected,
  isGap,
}: FillTheGapPropositionProps) => {
  const [color, setColor] = useState<string>(GREY[200]);

  useEffect(() => {
    if (isGoodAnswer && isValidated) return setColor(GREEN[600]);
    if (isSelected && isValidated) return setColor(ORANGE[600]);
    return undefined;
  }, [isGoodAnswer, isSelected, isValidated]);

  const style = styles(color, isGoodAnswer, isSelected, isValidated, isGap);

  return (
    <>
      <View style={!answers.includes(item) || isGap ? style.textContainer : { opacity: 0 }}>
        <Text style={style.answer}>{item}</Text>
      </View>
      <Shadow customStyle={style.shadow} />
    </>
  );
};

export default FillTheGapProposition;
