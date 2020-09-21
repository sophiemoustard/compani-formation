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
  buttonvisible?: boolean,
  arrowColor: string,
  buttonColor: string,
  buttonCaption?: string,
  buttonDisabled?: boolean,
}

const QuestionCardFooter = ({
  index,
  buttonvisible = true,
  arrowColor,
  buttonColor,
  buttonCaption = 'Continuer',
  buttonDisabled = false,
}: QuestionCardFooterProps) => {
  const arrowButtonVisible = !(index === 0);
  const style = styles(arrowButtonVisible);

  return (
    <View style={style.container}>
      {arrowButtonVisible &&
        <ArrowButton color={arrowColor} direction={LEFT}
          onPress={() => navigate(`card-${index - 1}`)} />}
      {buttonvisible &&
        <View style={style.button}>
          <Button bgColor={buttonColor} color={WHITE} borderColor={buttonColor} disabled={buttonDisabled}
            caption={buttonCaption} onPress={() => navigate(`card-${index + 1}`)} />
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
    display: 'flex',
    flexGrow: 1,
    marginLeft: arrowButtonVisible ? MARGIN.LG : 0,
  },
  text: {
    ...FIRA_SANS_MEDIUM.LG,
    color: WHITE,
  },
});

export default QuestionCardFooter;
