import React, { useState } from 'react';
import {
  Keyboard,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import Shadow from '../../../components/style/Shadow';
import { GREY, PINK, TRANSPARENT_PINK, WHITE } from '../../../styles/colors';
import { BORDER_RADIUS, BORDER_WIDTH, MARGIN, PADDING, TEXT_AREA_HEIGHT } from '../../../styles/metrics';
import { FIRA_SANS_MEDIUM } from '../../../styles/fonts';

interface AnswerQuestionProps {
  answer: string,
  onChangeText: (string) => void,
  onSelect: (boolean) => void,
}

const AnswerTextArea = ({ onChangeText, onSelect, answer }: AnswerQuestionProps) => {
  const [isSelected, setIsSelected] = useState(false);
  const focusFieldSize = { top: -3, bottom: -3, right: -3, left: -3 };

  const keyboardDidHide = () => Keyboard.dismiss();

  Keyboard.addListener('keyboardDidHide', keyboardDidHide);

  const style = styles(isSelected);

  const onTouchStart = () => {
    setIsSelected(true);
    onSelect(true);
  };

  const onBlur = () => {
    setIsSelected(false);
    onSelect(false);
  };

  const actionOnField = (action: string) => {
    if (action === 'select') onTouchStart();
    else onBlur();
  };

  return (
    <View style={style.container}>
      <TextInput style={style.input} placeholder={'Votre réponse...'} value={answer} multiline={true}
        onChangeText={text => onChangeText(text)} onTouchStart={() => actionOnField('select')}
        onBlur={() => actionOnField('unselect')}
      />
      <Shadow backgroundColor={isSelected ? TRANSPARENT_PINK : GREY[200]}
        relativePosition={isSelected ? focusFieldSize : undefined} />
    </View>
  );
};

const styles = (isSelected: boolean) => StyleSheet.create({
  container: {
    flexGrow: 1,
    maxHeight: isSelected ? TEXT_AREA_HEIGHT : undefined,
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
