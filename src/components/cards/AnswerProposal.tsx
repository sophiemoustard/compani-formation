import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { MARGIN, BUTTON_HEIGHT, BORDER_WIDTH, BORDER_RADIUS } from '../../styles/metrics';
import { WHITE, GREY, GREEN, ORANGE } from '../../styles/colors';
import Shadow from '../../components/style/Shadow';
import { FIRA_SANS_MEDIUM } from '../../styles/fonts';

interface AnswerProposalProps {
  item: string,
  goodAnswer,
  isPressed: boolean,
  onPress,
}

const AnswerProposal = ({ item, goodAnswer, isPressed, onPress }: AnswerProposalProps) => {
  const [color, setColor] = useState(GREY['200']);
  const [displayButton, setDisplayButton] = useState(isPressed && (item === goodAnswer));
  const setColorOnPress = () => {
    if (!isPressed) {
      onPress();
      setDisplayButton(true);
      return item === goodAnswer ? setColor(GREEN['600']) : setColor(ORANGE['600']);
    }
    return null;
  };

  const style = styles(color, displayButton);
  return (<View style={style.answerContainer} >
    <TouchableOpacity style={style.answer} onPress={() => { setColorOnPress(); } }>
      <Text style={style.text}>{item}</Text>
      <Feather style={style.icon} name={item === goodAnswer ? 'check-circle' : 'x-circle'}/>
    </TouchableOpacity>
    <Shadow backgroundColor={color} borderRadius={BORDER_RADIUS.LG}/>
  </View>);
};

const styles = (color = GREY['200'], displayButton) => StyleSheet.create({
  answerContainer: {
    marginVertical: MARGIN.XS,
  },
  answer: {
    minHeight: BUTTON_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    //justifyContent: 'flex-end',
    borderWidth: BORDER_WIDTH,
    backgroundColor: WHITE,
    borderColor: color,
    borderRadius: BORDER_RADIUS.MD,
  },
  icon: {
    display: displayButton ? 'flex' : 'none',
    color,
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
