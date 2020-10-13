import React from 'react';
import { View, Text } from 'react-native';
import { StepType } from '../../../types/StepType';
import { stepTypeOptions } from '../../../core/data/constants';
import styles from './styles';

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

export default StepCellTitle;
