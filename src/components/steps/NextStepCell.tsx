import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CourseSlotType } from '../../types/CourseSlotType';
import moment from '../../core/helpers/moment';
import CalendarIcon from '../CalendarIcon';
import { PADDING, BORDER_RADIUS, COURSE_CELL_WIDTH, BORDER_WIDTH } from '../../styles/metrics';
import { TRANSPARENT_GREY } from '../../styles/colors';
import StepCellTitle from './StepCellTitle';

interface NextStepCellProps {
  nextSlotsStep: NextSlotsStepType,
}

interface NextSlotsStepType {
  _id: string,
  name: string,
  slots: Array<CourseSlotType>,
  type: string,
  stepIndex: number,
}

const NextStepCell = ({ nextSlotsStep }: NextStepCellProps) => {
  const { stepIndex, slots } = nextSlotsStep;
  const dates = Object.keys(slots).map(date => moment(date, 'DD/MM/YYYY').toDate());

  return (
    <View style={styles.container}>
      <CalendarIcon dates={dates} />
      <StepCellTitle index={stepIndex} step={nextSlotsStep} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: BORDER_RADIUS.SM,
    width: COURSE_CELL_WIDTH,
    borderWidth: BORDER_WIDTH,
    borderColor: TRANSPARENT_GREY,
    flexDirection: 'row',
    padding: PADDING.MD,
  },
});

export default NextStepCell;
