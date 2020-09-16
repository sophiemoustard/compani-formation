import React from 'react';
import { View, StyleSheet } from 'react-native';
import ArrowButton from '../ArrowButton';
import { navigate } from '../../navigationRef';
import { LEFT } from '../../core/data/constants';
import { GREY, PINK, WHITE } from '../../styles/colors';
import { FIRA_SANS_MEDIUM } from '../../styles/fonts';
import { MARGIN } from '../../styles/metrics';
import Button from '../form/Button';

export const rightButtonStateType = {
  LOCKED: 'locked',
  UNLOCKED: 'unlocked',
};

interface QuestionCardFooterProps {
  index: number,
  arrowButtonColor?: string,
  rightButtonState?: typeof rightButtonStateType.LOCKED | typeof rightButtonStateType.UNLOCKED,
  rightButtonCaption?: string,
}

const QuestionCardFooter = ({
  index,
  arrowButtonColor = PINK[500],
  rightButtonState = rightButtonStateType.LOCKED,
  rightButtonCaption = 'Continuer',
}: QuestionCardFooterProps) => {
  const leftRemoved = index === 0;
  const style = styles(leftRemoved);
  const rightButtonBgColor = rightButtonState === rightButtonStateType.LOCKED ? GREY[300] : PINK[500];
  const onPressRightButton = () => {
    if (rightButtonState !== rightButtonStateType.LOCKED) return navigate(`card-${index + 1}`);

    return null;
  };

  return (
    <View style={style.container}>
      {!leftRemoved &&
        <ArrowButton color={arrowButtonColor} direction={LEFT} onPress={() => navigate(`card-${index - 1}`)} />
      }
      <Button style={style.button} bgColor={rightButtonBgColor} borderColor={rightButtonBgColor} color={WHITE}
        caption={rightButtonCaption} onPress={onPressRightButton} />
    </View>
  );
};

const styles = (leftRemoved: boolean) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: MARGIN.XL,
    marginTop: MARGIN.SM,
    marginHorizontal: MARGIN.LG,
  },
  button: {
    flexGrow: 1,
    marginLeft: leftRemoved ? 0 : MARGIN.LG,
  },
  text: {
    ...FIRA_SANS_MEDIUM.LG,
    color: WHITE,
  },
});

export default QuestionCardFooter;
