import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { StepType } from 'types/StepType';
import { MARGIN, PADDING, BORDER_WIDTH, BORDER_RADIUS, ICON } from '../../styles/metrics';
import { GREY, PINK } from '../../styles/colors';
import IconButton from '../IconButton';
import StepCellTitle from './StepCellTitle';

interface ELearningCellProps {
  step: StepType,
  index: number,
}

const ELearningCell = ({ step, index }: ELearningCellProps) => (
  <View style={styles.container}>
    <View style={styles.featherContainer}>
      <Feather name='play-circle' size={ICON.LG} color={PINK[500]} />
    </View>
    <StepCellTitle index={index} step={step} />
    <View style={styles.iconButtonContainer}>
      <IconButton name='chevron-down' onPress={() => {}} size={ICON.SM} color={GREY[500]} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: GREY[100],
    marginHorizontal: MARGIN.MD,
    paddingHorizontal: PADDING.MD,
    paddingVertical: PADDING.LG,
    borderWidth: BORDER_WIDTH,
    borderRadius: BORDER_RADIUS.XL,
    borderColor: GREY[200],
    flexDirection: 'row',
  },
  featherContainer: {
    width: 40,
    alignSelf: 'center',
    alignItems: 'center',
  },
  iconButtonContainer: {
    width: 40,
    alignItems: 'center',
    flexDirection: 'column-reverse',
  },
});

export default ELearningCell;
