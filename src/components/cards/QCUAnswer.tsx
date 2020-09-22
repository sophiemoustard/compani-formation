import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { MARGIN, BUTTON_HEIGHT, BORDER_WIDTH, BORDER_RADIUS, ICON, PADDING } from '../../styles/metrics';
import { WHITE, GREY, GREEN, ORANGE } from '../../styles/colors';
import Shadow from '../style/Shadow';
import { FIRA_SANS_MEDIUM } from '../../styles/fonts';

interface QCUAnswerProps {
  item: string,
  isGoodAnswer: boolean,
  index: number,
  isPressed: boolean,
  onPress: (index: number) => void,
  isSelected: boolean,
}

const QCUAnswer = ({
  item,
  isGoodAnswer,
  isPressed = false,
  onPress,
  index,
  isSelected,
}: QCUAnswerProps) => {
  const [color, setColor] = useState(GREY['200']);

  useEffect(() => {
    if (isSelected) {
      if (isGoodAnswer) return setColor(GREEN['600']);
      return setColor(ORANGE['600']);
    }
    return setColor(GREY['200']);
  }, [isGoodAnswer, isSelected]);

  const setColorOnPress = () => {
    if (!isPressed) onPress(index);
  };

  const style = styles(color, isSelected, isGoodAnswer, isPressed);

  return (
    <View style={style.answerContainer}>
      <TouchableOpacity style={style.answer} onPress={() => { setColorOnPress(); } }>
        <View style={style.textContainer}>
          <Text style={style.text}>{item}</Text>
        </View>
        <View style={style.iconContainer}>
          <Feather style={style.icon} name={isGoodAnswer && isPressed ? 'check-circle' : 'x-circle'}/>
        </View>
      </TouchableOpacity>
      <Shadow backgroundColor={color} borderRadius={BORDER_RADIUS.LG}/>
    </View>
  );
};

const styles = (color: string, isSelected: boolean, isGoodAnswer: boolean, isPressed: boolean) => StyleSheet.create({
  answerContainer: {
    marginVertical: MARGIN.XS,
  },
  answer: {
    minHeight: BUTTON_HEIGHT,
    flexDirection: 'row',
    borderWidth: BORDER_WIDTH,
    backgroundColor: WHITE,
    borderColor: color,
    borderRadius: BORDER_RADIUS.MD,

  },
  iconContainer: {
    display: (isGoodAnswer && isPressed) || isSelected ? 'flex' : 'none',
    justifyContent: 'center',
  },
  icon: {
    position: 'absolute',
    right: 0,
    color: isGoodAnswer ? GREEN['600'] : ORANGE['600'],
    fontSize: ICON.MD,
    marginHorizontal: MARGIN.XS + MARGIN.SM,
    alignSelf: 'center',
  },
  textContainer: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: isSelected ? PADDING.MD + PADDING.SM : 0,
  },
  text: {
    ...FIRA_SANS_MEDIUM.MD,
    color: isSelected ? color : GREY['800'],
    marginVertical: MARGIN.XS + MARGIN.SM,
    marginHorizontal: MARGIN.MD,
  },
});

export default QCUAnswer;
