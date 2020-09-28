import React, { useState } from 'react';
import {
  Keyboard,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import Shadow from '../../../components/style/Shadow';
import { GREY, PINK, TRANSPARENT_PINK, WHITE } from '../../../styles/colors';
import { BORDER_RADIUS, BORDER_WIDTH, MARGIN, PADDING } from '../../../styles/metrics';
import { FIRA_SANS_MEDIUM } from '../../../styles/fonts';

interface AnswerQuestionProps {
  answer: string,
  onChangeText: (string) => void,
  onSelect: (boolean) => void,
}

const AnswerTextArea = ({ onChangeText, onSelect, answer }: AnswerQuestionProps) => {
  const [isSelected, setIsSelected] = useState(false);
  const [placeholder, setPlaceHolder] = useState('Votre réponse...');
  const focusFieldSize = { top: -3, bottom: -3, right: -3, left: -3 };

  const keyboardDidHide = () => { Keyboard.dismiss(); };

  Keyboard.addListener('keyboardDidHide', keyboardDidHide);

  const style = styles(isSelected);

  const actionOnField = (action: string) => {
    if (action === 'select') {
      setIsSelected(true);
      setPlaceHolder('Tapez votre réponse...');
      onSelect(true);
    } else {
      setIsSelected(false);
      setPlaceHolder('Votre réponse...');
      onSelect(false);
    }
  };

  return (
    <View style={style.container}>
      <TextInput
        style={style.input}
        placeholder={placeholder}
        onChangeText={(text) => { onChangeText(text); }}
        value={answer}
        multiline={true}
        onTouchStart={() => { actionOnField('select'); }}
        onBlur={() => { actionOnField('unselect'); }}
      />
      <Shadow backgroundColor = {isSelected ? TRANSPARENT_PINK : GREY[200]}
        relativePosition = {isSelected ? focusFieldSize : undefined} />
    </View>
  );
};

const styles = (isSelected: boolean) => StyleSheet.create({
  container: {
    flexGrow: 1,
    maxHeight: isSelected ? 192 : undefined,
    marginBottom: MARGIN.MD,
  },

  input: {
    backgroundColor: WHITE,
    borderRadius: BORDER_RADIUS.SM,
    borderWidth: BORDER_WIDTH,
    borderColor: isSelected ? PINK[500] : GREY[200],
    paddingHorizontal: PADDING.LG,
    ...FIRA_SANS_MEDIUM.MD,
    color: GREY[900],
    textAlignVertical: 'top',
    flexGrow: 1,
  },
});

export default AnswerTextArea;
