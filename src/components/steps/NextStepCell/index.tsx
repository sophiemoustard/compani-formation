import React from 'react';
import { View } from 'react-native';
import { CourseSlotType } from '../../../types/CourseSlotType';
import moment from '../../../core/helpers/moment';
import CalendarIcon from '../../CalendarIcon';
import StepCellTitle from '../StepCellTitle';
import styles from './styles';

interface NextStepCellProps {
  nextSlotsStep: NextSlotsStepType,
}

interface NextSlotsStepType {
  _id: string,
  name: string,
  slots: Array<Date>,
  type: string,
  stepIndex: number,
}

const NextStepCell = ({ nextSlotsStep }: NextStepCellProps) => {
  const { stepIndex, slots } = nextSlotsStep;

  return (
    <View style={styles.container}>
      <CalendarIcon slots={slots} />
      <StepCellTitle index={stepIndex} step={nextSlotsStep} />
    </View>
  );
};

export default NextStepCell;
