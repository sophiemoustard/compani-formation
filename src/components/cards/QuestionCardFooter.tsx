import React from 'react';
import { View, StyleSheet } from 'react-native';
import ArrowButton from '../ArrowButton';
import { navigate } from '../../navigationRef';
import { LEFT } from '../../core/data/constants';
import { WHITE, PINK, GREY } from '../../styles/colors';
import { FIRA_SANS_MEDIUM } from '../../styles/fonts';
import { MARGIN } from '../../styles/metrics';
import Button from '../form/Button';

interface QuestionCardFooterProps {
  index: number,
  expectedColor,
  isPressed: boolean,
}

const QuestionCardFooter = ({ index, expectedColor, isPressed }: QuestionCardFooterProps) => {
  const leftRemoved = index === 0;
  const color = { arrowButton: PINK['500'], button: GREY['300'] };
  const style = styles(index, isPressed);

  return (
    <View style={style.container}>
      {!leftRemoved && <ArrowButton color={isPressed ? expectedColor.inputs : color.arrowButton} direction={LEFT}
        onPress={() => navigate(`card-${index - 1}`)} />}
      <View style={style.button}>
        <Button bgColor={isPressed ? expectedColor.inputs : color.button}
          color={WHITE} borderColor={isPressed ? expectedColor.inputs : color.button}
          caption='Continuer' onPress={() => navigate(`card-${index + 1}`)}/>
      </View>
    </View>
  );
};

const styles = (index: number, isPressed: boolean) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: MARGIN.XL,
    marginTop: MARGIN.SM,
    marginHorizontal: MARGIN.LG,
  },
  button: {
    display: isPressed ? 'flex' : 'none',
    flexGrow: 1,
    marginLeft: index > 0 ? MARGIN.LG : 0,
  },
  text: {
    ...FIRA_SANS_MEDIUM.LG,
    color: WHITE,
  },
});

export default QuestionCardFooter;
