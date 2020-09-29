import React from 'react';
import { View, StyleSheet } from 'react-native';
import ArrowButton from '../ArrowButton';
import { navigate } from '../../navigationRef';
import { LEFT } from '../../core/data/constants';
import { WHITE } from '../../styles/colors';
import { FIRA_SANS_MEDIUM } from '../../styles/fonts';
import { MARGIN } from '../../styles/metrics';
import Button from '../form/Button';

interface QuestionCardFooterProps {
  index: number,
  buttonVisible?: boolean,
  arrowColor: string,
  buttonColor: string,
  buttonCaption?: string,
  buttonDisabled?: boolean,
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

  return (
    <View style={style.container}>
      {arrowButtonVisible &&
        <ArrowButton color={arrowColor} direction={LEFT}
          onPress={() => navigate(`card-${index - 1}`)} />}
      {buttonVisible &&
        <View style={style.button}>
          <Button bgColor={buttonColor} color={WHITE} borderColor={buttonColor} disabled={buttonDisabled}
            caption={buttonCaption} onPress={onPress} />
        </View>
      }
    </View>
  );
};

const styles = (arrowButtonVisible: boolean) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: MARGIN.XL,
    marginTop: MARGIN.LG,
    marginHorizontal: MARGIN.LG,
  },
  button: {
    flexGrow: 1,
    marginLeft: arrowButtonVisible ? MARGIN.LG : 0,
  },
  text: {
    ...FIRA_SANS_MEDIUM.LG,
    color: WHITE,
  },
});

export default QuestionCardFooter;
