import React from 'react';
import { View, Text } from 'react-native';
import QuestionCardFooter from '../QuestionCardFooter';
import cardsStyle from '../../../styles/cards';
import styles from './styles';
import { GREY } from '../../../styles/colors';

interface QuestionCardFooterProps {
  isValidated: boolean,
  isValid: boolean,
  cardIndex: number,
  footerStyles,
  explanation: string,
  buttonDisabled?: boolean,
  onPressFooterButton?: () => void,
}

const QuizCardFooter = ({
  isValidated,
  isValid,
  cardIndex,
  footerStyles,
  explanation,
  buttonDisabled = false,
  onPressFooterButton,
}: QuestionCardFooterProps) => {
  const style = styles(footerStyles.textColor, footerStyles.backgroundColor);
  return (
    <>
      {isValidated && (
        <View style={[cardsStyle.explanation, style.explanation]}>
          <Text style={style.explanationTitle}>{isValid ? 'Bonne réponse' : 'Mauvaise réponse'}</Text>
          <Text style={style.explanationText}>{explanation}</Text>
        </View>
      )}
      <QuestionCardFooter onPressButton={onPressFooterButton} buttonCaption={isValidated ? 'Continuer' : 'Valider'}
        arrowColor={footerStyles.buttonsColor} index={cardIndex} buttonDisabled={buttonDisabled}
        buttonColor={!buttonDisabled ? footerStyles.buttonsColor : GREY[300]} />
    </>);
};

export default QuizCardFooter;
