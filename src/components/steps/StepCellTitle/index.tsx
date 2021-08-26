import React from 'react';
import { View, Text } from 'react-native';
import { StepType } from '../../../types/StepTypes';
import { stepTypeOptions } from '../../../core/data/constants';
import styles from './styles';

type StepCellTitleProps = {
  name: StepType['name'],
  type: StepType['type'],
  index: number,
}

const StepCellTitle = ({ name, type, index }: StepCellTitleProps) => (
  <View style={styles.textContainer}>
    <Text style={styles.stepType}>{`ÉTAPE ${index + 1} - ${stepTypeOptions[type]}`}</Text>
    <Text lineBreakMode={'tail'} numberOfLines={2} style={styles.stepName}>{name}</Text>
  </View>
);

export default StepCellTitle;
