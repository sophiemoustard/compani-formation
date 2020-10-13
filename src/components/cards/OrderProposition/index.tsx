import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { GREY, GREEN, ORANGE } from '../../../styles/colors';
import Shadow from '../../design/Shadow';
import styles from './styles';

interface OrderPropositionProps {
  item: {
    label: string,
    goodPosition: number,
    tempPosition: number
  },
  isValidated: boolean,
  drag: () => void,
}

const OrderProposition = ({ item, isValidated = false, drag }: OrderPropositionProps) => {
  const [color, setColor] = useState<string>(GREY[200]);
  const [isGoodPosition, setIsGoodPosition] = useState<boolean>(item.goodPosition === item.tempPosition);

  useEffect(() => {
    if (isGoodPosition && isValidated) return setColor(GREEN[600]);
    if (!isGoodPosition && isValidated) return setColor(ORANGE[600]);
    return setColor(GREY[500]);
  }, [isGoodPosition, isValidated]);

  useEffect(() => {
    setIsGoodPosition(item.goodPosition === item.tempPosition);
  }, [item]);

  const style = styles(color, isValidated);

  return (
    <View style={style.container}>
      <TouchableOpacity style={style.contentContainer} disabled={isValidated} onLongPress={drag} >
        <View style= {style.indexContainer}>
          <View style={style.index}>
            <Text style={style.indexText}>{item.tempPosition + 1}</Text>
          </View>
          <Shadow customStyle={style.indexShadow} />
        </View>
        <View style={style.answerContainer}>
          <View style={style.answer}>
            <Text style={style.answerText}>{item.label}</Text>
          </View>
          <Shadow customStyle={style.answerShadow} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default OrderProposition;
