import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { MARGIN, BUTTON_HEIGHT, BORDER_WIDTH, BORDER_RADIUS, ICON } from '../../styles/metrics';
import { WHITE, GREY, GREEN, ORANGE } from '../../styles/colors';
import Shadow from '../../components/style/Shadow';
import { FIRA_SANS_MEDIUM } from '../../styles/fonts';

interface AnswerProposalProps {
  item: string,
  goodAnswer?: string,
  index: number,
  isPressed: boolean,
  onPress: any,
  selectedAnswerIndex: number,
  onSelectedAnswerIndex: any,
}

const AnswerProposal = ({ item, goodAnswer, isPressed = false,
  onPress, index, selectedAnswerIndex, onSelectedAnswerIndex }: AnswerProposalProps) => {
  const [color, setColor] = useState(GREY['200']);
  const expectedColor = item === goodAnswer ? GREEN['600'] : ORANGE['600'];
  const setColorOnPress = () => {
    if (!isPressed) {
      onPress();
      onSelectedAnswerIndex(index);
      return item === goodAnswer ? setColor(GREEN['600']) : setColor(ORANGE['600']);
    }
    return null;
  };

  const style = styles(color, expectedColor, item, isPressed, selectedAnswerIndex, index, goodAnswer);
  return (<View style={style.answerContainer} >
    <TouchableOpacity style={style.answer} onPress={() => { setColorOnPress(); } }>
      <Text style={style.text}>{item}</Text>
      <Feather style={style.icon} name={item === goodAnswer ? 'check-circle' : 'x-circle'}/>
    </TouchableOpacity>
    <Shadow
      backgroundColor={(isPressed && item === goodAnswer) || (selectedAnswerIndex === index) ? expectedColor : color}
      borderRadius={BORDER_RADIUS.LG}/>
  </View>);
};

const styles =
(color, expectedColor, item: string, isPressed: boolean, clickedIndex: number, index: number, goodAnswer?: string) =>
  StyleSheet.create({
    answerContainer: {
      marginVertical: MARGIN.XS,
    },
    answer: {
      minHeight: BUTTON_HEIGHT,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: BORDER_WIDTH,
      backgroundColor: WHITE,
      borderColor: (isPressed && item === goodAnswer) || (clickedIndex === index) ? expectedColor : color,
      borderRadius: BORDER_RADIUS.MD,
    },
    icon: {
      display: (isPressed && item === goodAnswer) || (clickedIndex === index) ? 'flex' : 'none',
      color: (isPressed && item === goodAnswer) || (clickedIndex === index) ? expectedColor : color,
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

export default AnswerProposal;
