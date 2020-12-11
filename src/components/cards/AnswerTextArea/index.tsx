import React, { useState, useEffect } from 'react';
import { Keyboard, TextInput, View } from 'react-native';
import Shadow from '../../design/Shadow';
import { GREY } from '../../../styles/colors';
import styles from './styles';

interface AnswerQuestionProps {
  answer: string,
  onChangeText: (string) => void,
  onSelect: (boolean) => void,
  scrollTo: (number) => void,
}

const AnswerTextArea = ({ onChangeText, onSelect, scrollTo, answer }: AnswerQuestionProps) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const keyboardDidHide = () => Keyboard.dismiss();

  const style = styles(isSelected);

  useEffect(() => {
    Keyboard.addListener('keyboardDidHide', keyboardDidHide);
    return () => {
      Keyboard.removeListener('keyboardDidHide', keyboardDidHide);
    };
  });

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

export default AnswerTextArea;
