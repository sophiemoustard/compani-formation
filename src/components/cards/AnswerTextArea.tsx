import React, { useState } from 'react';
import {
  Keyboard,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import Shadow from '../style/Shadow';
import { GREY, PINK, TRANSPARENT_PINK, WHITE } from '../../styles/colors';
import { BORDER_RADIUS, BORDER_WIDTH, MARGIN, PADDING, TEXT_AREA_HEIGHT } from '../../styles/metrics';
import { FIRA_SANS_MEDIUM, FIRA_SANS_REGULAR } from '../../styles/fonts';

interface AnswerQuestionProps {
  answer: string,
  onChangeText: (string) => void,
  onSelect: (boolean) => void,
  scrollTo: (number) => void,
}

const AnswerTextArea = ({ onChangeText, onSelect, scrollTo, answer }: AnswerQuestionProps) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);
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

  return (
    <View style={style.container}>
      <TextInput style={!answer.length ? [style.input, style.placeholder] : style.input}
        placeholder={'Votre réponse...'} placeholderTextColor={GREY[300]} value={answer} multiline={true}
        onChangeText={onChangeText} onTouchStart={onTouchStart} onBlur={onBlur}
        onContentSizeChange={(event) => { scrollTo(event.nativeEvent.contentSize.height); }}/>
      <Shadow customStyle={style.shadow} />
    </View>
  );
};

const styles = (isSelected: boolean) => StyleSheet.create({
  container: {
    flexGrow: 1,
    maxHeight: isSelected ? TEXT_AREA_HEIGHT : undefined,
    marginBottom: MARGIN.XS,
  },
  input: {
    backgroundColor: WHITE,
    borderRadius: BORDER_RADIUS.SM,
    borderWidth: BORDER_WIDTH,
    borderColor: isSelected ? PINK[500] : GREY[200],
    padding: PADDING.LG,
    ...FIRA_SANS_MEDIUM.MD,
    color: GREY[900],
    textAlignVertical: 'top',
    flexGrow: 1,
  },
  placeholder: {
    ...FIRA_SANS_REGULAR.MD,
  },
  shadow: {
    backgroundColor: isSelected ? TRANSPARENT_PINK : GREY[200],
    top: isSelected ? -3 : 0,
    bottom: -3,
    right: isSelected ? -3 : 0,
    left: isSelected ? -3 : 0,
    borderRadius: BORDER_RADIUS.SM,
  },
});

export default AnswerTextArea;
