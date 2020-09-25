import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
} from 'react-native';
import Shadow from '../../../components/style/Shadow';
import { GREY, PINK, TRANSPARENT_PINK, WHITE } from '../../../styles/colors';
import { BORDER_RADIUS, BORDER_WIDTH } from '../../../styles/metrics';
import { FIRA_SANS_MEDIUM } from '../../../styles/fonts';

interface AnswerQuestionProps {
  onChangeText,
  onSelect
}

const AnswerField = ({ onChangeText, onSelect }: AnswerQuestionProps) => {
  const [isSelected, setIsSelected] = useState(false);
  const [placeholder, setPlaceHolder] = useState('Votre réponse...');

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
    <>
      {/* <KeyboardAvoidingView behavior={isIOS ? 'padding' : 'height'} style={{ flex: 1 }} > */}
      <TextInput
        style={style.input}
        placeholder={placeholder}
        onChangeText={(text) => { onChangeText(text); }}
        multiline={true}
        onTouchStart={() => { actionOnField('select'); }}
        onBlur={() => { actionOnField('unselect'); }}
      />
      {!isSelected &&
      <Shadow />
      }
      {/* </KeyboardAvoidingView> */}
    </>
  );
};

const styles = (isSelected: boolean) => StyleSheet.create({
  input: {
    backgroundColor: WHITE,
    borderRadius: BORDER_RADIUS.SM,
    borderWidth: BORDER_WIDTH,
    borderColor: isSelected ? PINK['500'] : GREY[200],
    paddingHorizontal: 16,
    ...FIRA_SANS_MEDIUM.MD,
    color: GREY['900'],
    textAlignVertical: 'top',
    flexGrow: 1,
    maxHeight: isSelected ? 192 : null,
  },
});

export default AnswerField;
