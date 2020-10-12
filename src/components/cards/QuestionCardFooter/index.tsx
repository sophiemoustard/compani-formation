import React from 'react';
import { View } from 'react-native';
import ArrowButton from '../../ArrowButton';
import { navigate } from '../../../navigationRef';
import { LEFT } from '../../../core/data/constants';
import { WHITE } from '../../../styles/colors';
import Button from '../../form/Button';
import styles from './styles';

interface QuestionCardFooterProps {
  index: number,
  buttonVisible?: boolean,
  arrowColor: string,
  buttonColor: string,
  buttonCaption?: string,
  buttonDisabled?: boolean,
  onPressArrow?: () => void,
  validateCard?: () => void,
  onPressButton?: () => void,
}

const QuestionCardFooter = ({
  index,
  buttonVisible = true,
  arrowColor,
  buttonColor,
  buttonCaption = 'Continuer',
  buttonDisabled = false,
  onPressArrow,
  validateCard,
  onPressButton,
}: QuestionCardFooterProps) => {
  const arrowButtonVisible = !(index === 0);
  const style = styles(arrowButtonVisible);

  const onPress = () => {
    if (onPressButton) onPressButton();
    else {
      if (validateCard) validateCard();
      navigate(`card-${index + 1}`);
    }
  };

  const goBack = () => {
    if (onPressArrow) onPressArrow();
    navigate(`card-${index - 1}`);
  };

  return (
    <View style={style.container}>
      {arrowButtonVisible &&
        <ArrowButton color={arrowColor} direction={LEFT}
          onPress={goBack} />}
      {buttonVisible &&
        <View style={style.button}>
          <Button bgColor={buttonColor} color={WHITE} borderColor={buttonColor} disabled={buttonDisabled}
            caption={buttonCaption} onPress={onPress} />
        </View>
      }
    </View>
  );
};

export default QuestionCardFooter;
