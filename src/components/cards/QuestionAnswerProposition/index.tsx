import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { GREY, PINK } from '../../../styles/colors';
import Shadow from '../../design/Shadow';
import styles from './styles';

interface QuestionAnswerPropositionProps {
  item: string,
  index: number,
  isValidated: boolean,
  isSelected: boolean,
  onPress: (index: number) => void,
  disabled: boolean,
}

const QuestionAnswerProposition = ({
  item,
  index,
  isValidated = false,
  isSelected,
  onPress,
  disabled,
}: QuestionAnswerPropositionProps) => {
  const [color, setColor] = useState<string>(GREY[200]);

  useEffect(() => {
    if (isSelected) return setColor(PINK[500]);
    return setColor(GREY[500]);
  }, [isSelected]);

  const setColorOnPress = () => {
    if (!isValidated) onPress(index);
  };

  const style = styles(color, isSelected, isValidated);

  return (
    <View style={style.answerContainer}>
      <TouchableOpacity style={style.answer} onPress={() => { setColorOnPress(); }} disabled={disabled}>
        <View style={style.textContainer}>
          <Text style={style.text}>{item}</Text>
        </View>
      </TouchableOpacity>
      <Shadow customStyle={style.shadow} />
    </View>
  );
};

export default QuestionAnswerProposition;
