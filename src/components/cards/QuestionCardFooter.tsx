import React from 'react';
import { View, StyleSheet } from 'react-native';
import ArrowButton from '../ArrowButton';
import { navigate } from '../../navigationRef';
import { LEFT } from '../../core/data/constants';
import { GREY, WHITE } from '../../styles/colors';
import { FIRA_SANS_MEDIUM } from '../../styles/fonts';
import { MARGIN } from '../../styles/metrics';
import Button from '../form/Button';

interface QuestionCardFooterProps {
  index: number,
  color?: string,
}

const QuestionCardFooter = ({ index, color }: QuestionCardFooterProps) => {
  const leftRemoved = index === 0;
  const style = styles(index);

  return (
    <View style={style.container}>
      {!leftRemoved && <ArrowButton color={color} direction={LEFT} onPress={() => navigate(`card-${index - 1}`)} />}
      <Button style={style.button} bgColor={GREY['300']} color={WHITE} borderColor={GREY['300']}
        caption='Continuer' onPress={() => navigate(`card-${index + 1}`)}/>
    </View>
  );
};

const styles = (index: number) => StyleSheet.create({
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
    marginLeft: index > 0 ? MARGIN.LG : 0,
  },
  text: {
    ...FIRA_SANS_MEDIUM.LG,
    color: WHITE,
  },
});

export default QuestionCardFooter;
