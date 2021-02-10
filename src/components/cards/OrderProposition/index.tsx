import React, { useState, useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
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
  const [dragButtonColor, setDragButtonColor] = useState<string>(GREY[500]);
  const [isGoodPosition, setIsGoodPosition] = useState<boolean>(item.goodPosition === item.tempPosition);

  useEffect(() => {
    if (isGoodPosition && isValidated) {
      setDragButtonColor(GREEN[800]);
      return setColor(GREEN[600]);
    }
    if (!isGoodPosition && isValidated) {
      setDragButtonColor(ORANGE[800]);
      return setColor(ORANGE[600]);
    }

    setDragButtonColor(GREY[500]);
    return setColor(GREY[500]);
  }, [isGoodPosition, isValidated]);

  useEffect(() => {
    setIsGoodPosition(item.goodPosition === item.tempPosition);
  }, [item]);

  const style = styles(color, isValidated);

  return (
    <View style={style.container}>
      <View style={style.contentContainer}>
        <TouchableOpacity style={style.indexContainer} disabled={isValidated} onLongPress={drag} delayLongPress={0}
          activeOpacity={1}>
          <View style={style.index}>
            <MaterialCommunityIcons name="drag" size={30} color={dragButtonColor} />
            <Text style={style.indexText}>{item.tempPosition + 1}</Text>
          </View>
          <Shadow customStyle={style.indexShadow} />
        </TouchableOpacity>
        <TouchableOpacity style={style.answerContainer} disabled={isValidated} onLongPress={drag} delayLongPress={100}>
          <View style={style.answer}>
            <Text style={style.answerText}>{item.label}</Text>
          </View>
          <Shadow customStyle={style.answerShadow} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OrderProposition;
