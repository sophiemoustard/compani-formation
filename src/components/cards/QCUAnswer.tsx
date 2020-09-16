import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { MARGIN, BUTTON_HEIGHT, BORDER_WIDTH, BORDER_RADIUS, ICON } from '../../styles/metrics';
import { WHITE, GREY, GREEN, ORANGE } from '../../styles/colors';
import Shadow from '../style/Shadow';
import { FIRA_SANS_MEDIUM } from '../../styles/fonts';

interface QCUAnswerProps {
  item: string,
  isGoodAnswerAndPressed: boolean,
  index: number,
  isPressed: boolean,
  onPress: (index: number) => void,
  isSelected: boolean,
}

const QCUAnswer = ({
  item,
  isGoodAnswerAndPressed,
  isPressed = false,
  onPress,
  index,
  isSelected,
}: QCUAnswerProps) => {
  const [color, setColor] = useState(GREY['200']);

  useEffect(() => {
    if (isGoodAnswerAndPressed) return setColor(GREEN['600']);
    if (isSelected) return setColor(ORANGE['600']);
    return setColor(GREY['200']);
  }, [isGoodAnswerAndPressed, isSelected]);

  const setColorOnPress = () => {
    if (!isPressed) onPress(index);
  };

  const style = styles(color, isSelected, isGoodAnswerAndPressed);

  return (
    <View style={style.answerContainer}>
      <TouchableOpacity style={style.answer} onPress={() => { setColorOnPress(); } }>
        <Text style={style.text}>{item}</Text>
        <Feather style={style.icon} name={isGoodAnswerAndPressed ? 'check-circle' : 'x-circle'}/>
      </TouchableOpacity>
      <Shadow backgroundColor={color} borderRadius={BORDER_RADIUS.LG}/>
    </View>
  );
};

const styles = (color: string, isSelected: boolean, isGoodAnswerAndPressed: boolean) => StyleSheet.create({
  answerContainer: {
    marginVertical: MARGIN.XS,
  },
  answer: {
    minHeight: BUTTON_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: BORDER_WIDTH,
    backgroundColor: WHITE,
    borderColor: color,
    borderRadius: BORDER_RADIUS.MD,
  },
  icon: {
    display: isGoodAnswerAndPressed || isSelected ? 'flex' : 'none',
    color,
    fontSize: ICON.MD,
    margin: MARGIN.MD,
  },
  text: {
    ...FIRA_SANS_MEDIUM.LG,
    color: GREY['800'],
    textAlign: 'center',
    alignSelf: 'center',
    flex: 1,
  },
});

export default QCUAnswer;
