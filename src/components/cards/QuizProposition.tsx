import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { MARGIN, BORDER_WIDTH, BORDER_RADIUS, ICON, PADDING, BUTTON_HEIGHT } from '../../styles/metrics';
import { WHITE, GREY, GREEN, ORANGE, PINK } from '../../styles/colors';
import Shadow from '../style/Shadow';
import { FIRA_SANS_MEDIUM } from '../../styles/fonts';

interface QuizPropositionProps {
  item: string,
  isGoodAnswer: boolean,
  index: number,
  isValidated: boolean,
  isSelected: boolean,
  onPress: (index: number) => void,
}

const QuizProposition = ({
  item,
  isGoodAnswer,
  index,
  isValidated = false,
  isSelected,
  onPress,
}: QuizPropositionProps) => {
  const [color, setColor] = useState<string>(GREY['200']);

  useEffect(() => {
    if (isSelected && isGoodAnswer && isValidated) return setColor(GREEN['600']);
    if (isSelected && isValidated) return setColor(ORANGE['600']);
    if (isSelected) return setColor(PINK[500]);
    return setColor(GREY['500']);
  }, [isGoodAnswer, isSelected, isValidated]);

  const setColorOnPress = () => {
    if (!isValidated) onPress(index);
  };

  const isMarkerVisible = (isValidated && isGoodAnswer) || (isSelected && isValidated);
  const style = styles(color, isSelected, isGoodAnswer, isValidated);

  return (
    <View style={style.answerContainer}>
      <TouchableOpacity style={style.answer} onPress={() => { setColorOnPress(); }} disabled={isValidated}>
        <View style={style.textContainer}>
          <Text style={style.text}>{item}</Text>
        </View>
        {isMarkerVisible &&
        <View style={style.markerContainer}>
          <Feather style={style.marker} name={isGoodAnswer && isValidated ? 'check-circle' : 'x-circle'} />
        </View>
        }
      </TouchableOpacity>
      <Shadow customStyle={style.shadow} borderRadius={BORDER_RADIUS.LG} />
    </View>
  );
};

const styles = (color: string, isSelected: boolean, isGoodAnswer: boolean, isValidated: boolean) => StyleSheet.create({
  answerContainer: {
    marginBottom: MARGIN.SM,
  },
  answer: {
    flexDirection: 'row',
    minHeight: BUTTON_HEIGHT,
    borderWidth: BORDER_WIDTH,
    backgroundColor: !isValidated || isSelected || (isValidated && isGoodAnswer) ? WHITE : GREY['100'],
    borderColor: isSelected ? color : GREY['200'],
    borderRadius: BORDER_RADIUS.MD,
    alignItems: 'center',

  },
  markerContainer: {
    marginHorizontal: MARGIN.SM,
    position: 'absolute',
    right: 0,
    height: '100%',
    borderRadius: BORDER_RADIUS.MD,
    backgroundColor: WHITE,
    justifyContent: 'center',
  },
  marker: {
    color: isGoodAnswer ? GREEN['600'] : ORANGE['600'],
    fontSize: ICON.MD,
    alignSelf: 'center',
    padding: PADDING.MD,
    backgroundColor: !isValidated || isSelected || (isValidated && isGoodAnswer) ? WHITE : GREY['100'],
  },
  textContainer: {
    alignItems: 'center',
    flex: 1,
  },
  text: {
    ...FIRA_SANS_MEDIUM.MD,
    color: !isValidated || (!isSelected && isGoodAnswer) ? GREY['800'] : color,
    marginVertical: MARGIN.LG / 2,
    marginHorizontal: MARGIN.MD,
  },
  shadow: {
    backgroundColor: isSelected ? color : GREY['200'],
  },
});

export default QuizProposition;
