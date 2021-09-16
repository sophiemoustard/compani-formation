import React from 'react';
import { View, Text } from 'react-native';
import QuestionCardFooter from '../QuestionCardFooter';
import cardsStyle from '../../../styles/cards';
import styles from './styles';
import { GREY } from '../../../styles/colors';

interface QuizCardFooterProps {
  isValidated: boolean,
  isValid: boolean,
  cardIndex: number | null,
  footerColors,
  explanation: string,
  buttonDisabled?: boolean,
  onPressFooterButton?: () => void,
}

const QuizCardFooter = ({
  isValidated,
  isValid,
  cardIndex,
  footerColors,
  explanation,
  buttonDisabled = false,
  onPressFooterButton,
}: QuizCardFooterProps) => {
  const style = styles(footerColors.text, footerColors.background);
  return (
    <>
      {isValidated && (
        <View style={[cardsStyle.explanation, style.explanation]}>
          <Text style={style.explanationTitle}>{isValid ? 'Bonne réponse' : 'Mauvaise réponse'}</Text>
          <Text style={style.explanationText}>{explanation}</Text>
        </View>
      )}
      <QuestionCardFooter onPressButton={onPressFooterButton} buttonCaption={isValidated ? 'Continuer' : 'Valider'}
        arrowColor={footerColors.buttons} index={cardIndex} buttonDisabled={buttonDisabled}
        buttonColor={!buttonDisabled ? footerColors.buttons : GREY[300]} />
    </>);
};

export default QuizCardFooter;
