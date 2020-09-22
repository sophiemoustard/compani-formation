import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { MARGIN, BORDER_WIDTH, BORDER_RADIUS, ICON, PADDING } from '../../styles/metrics';
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
    return setColor(GREY['500']);
  }, [isGoodAnswer, isSelected]);

  const setColorOnPress = () => {
    if (!isPressed) onPress(index);
  };

  const isMarkerVisible = (isGoodAnswer && isPressed) || isSelected;
  const style = styles(color, isSelected, isGoodAnswer, isPressed);

  return (
    <View style={style.answerContainer}>
      <TouchableOpacity style={style.answer} onPress={() => { setColorOnPress(); } }>
        <View style={style.textContainer}>
          <Text style={style.text}>{item}</Text>
        </View>
        { isMarkerVisible &&
        <View style={style.iconContainer}>
          <Feather style={style.icon} name={isGoodAnswer && isPressed ? 'check-circle' : 'x-circle'}/>
        </View>
        }
      </TouchableOpacity>
      <Shadow backgroundColor={isSelected ? color : GREY['200']} borderRadius={BORDER_RADIUS.LG}/>
    </View>
  );
};

const styles = (color: string, isSelected: boolean, isGoodAnswer: boolean, isPressed: boolean) => StyleSheet.create({
  answerContainer: {
    marginBottom: MARGIN.SM,
  },
  answer: {
    flexDirection: 'row',
    borderWidth: BORDER_WIDTH,
    backgroundColor: !isPressed || isSelected || (isPressed && isGoodAnswer) ? WHITE : GREY['100'],
    borderColor: isSelected ? color : GREY['200'],
    borderRadius: BORDER_RADIUS.MD,
    alignItems: 'center',

  },
  iconContainer: {
    marginHorizontal: MARGIN.SM,
    position: 'absolute',
    right: 0,

  },
  icon: {
    color: isGoodAnswer ? GREEN['600'] : ORANGE['600'],
    fontSize: ICON.MD,
    alignSelf: 'center',
    paddingVertical: PADDING.SM,
    backgroundColor: !isPressed || isSelected || (isPressed && isGoodAnswer) ? WHITE : GREY['100'],
  },
  textContainer: {
    alignItems: 'center',
    flex: 1,
  },
  text: {
    ...FIRA_SANS_MEDIUM.MD,
    color: !isPressed || (!isSelected && isGoodAnswer) ? GREY['800'] : color,
    marginVertical: MARGIN.XS + MARGIN.SM,
    marginHorizontal: MARGIN.MD,
  },
});

export default QCUAnswer;
