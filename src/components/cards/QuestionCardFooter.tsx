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

interface StylesProps {
  marginLeft,
}

const QuestionCardFooter = ({ index, color }: QuestionCardFooterProps) => {
  const leftRemoved = index === 0;

  let marginLeft;
  if (index > 0) marginLeft = MARGIN.LG;
  else marginLeft = 0;

  return (
    <>
      <View style={styles({ marginLeft }).container}>
        {!leftRemoved && <ArrowButton color={color}
          direction={LEFT} onPress={() => navigate(`card-${index - 1}`)} />}
        <Button style={styles({ marginLeft }).button} bgColor={GREY['300']} color={WHITE} borderColor={GREY['300']}
          caption='Continuer' onPress={() => navigate(`card-${index + 1}`)}/>
      </View>
    </>
  );
};

const styles = ({ marginLeft }: StylesProps) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: MARGIN.XL,
    marginTop: 10,
    marginHorizontal: MARGIN.LG,
  },
  button: {
    flexGrow: 1,
    marginLeft,
  },
  text: {
    ...FIRA_SANS_MEDIUM.LG,
    color: WHITE,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default QuestionCardFooter;
