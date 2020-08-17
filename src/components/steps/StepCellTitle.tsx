import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StepType } from 'types/StepType';
import { stepTypeOptions } from '../../core/data/constants';
import { MARGIN } from '../../styles/metrics';
import { GREY } from '../../styles/colors';
import { NUNITO_SEMI, FIRA_SANS_MEDIUM } from '../../styles/fonts';

interface StepCellTitleProps {
  step: StepType,
  index: number,
}

const StepCellTitle = ({ step, index }: StepCellTitleProps) => (
  <View style={styles.textContainer}>
    <Text style={styles.stepType}>{`ÉTAPE ${index + 1} - ${stepTypeOptions[step.type]}`}</Text>
    <Text lineBreakMode={'tail'} numberOfLines={2} style={styles.stepName}>{step.name}</Text>
  </View>
);

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    marginLeft: MARGIN.MD,
  },
  stepType: {
    ...NUNITO_SEMI.XS,
    color: GREY[600],
  },
  stepName: {
    ...FIRA_SANS_MEDIUM.MD,
    color: GREY[800],
  },
});

export default StepCellTitle;
