import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { CourseSlotType } from 'types/CourseSlotType';
import { StepType } from 'types/StepType';
import moment from '../../../core/helpers/moment';
import CalendarIcon from '../CalendarIcon';
import { PADDING, BORDER_WIDTH } from '../../../styles/metrics';
import { GREY } from '../../../styles/colors';
import StepCellTitle from './StepCellTitle';

interface OnSiteCellProps {
  step: StepType,
  slots: Array<CourseSlotType>,
  index: number,
}

const OnSiteCell = ({ step, slots, index }: OnSiteCellProps) => {
  const stepSlots = slots.filter(slot => slot.step === step._id);
  const dates = stepSlots.length
    ? stepSlots.map(stepSlot => stepSlot.startDate).sort((a, b) => moment(a).diff(b, 'days'))
    : [];

  return (
    <View style={styles.container}>
      <CalendarIcon dates={dates} />
      <StepCellTitle index={index} step={step} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: GREY[100],
    flexDirection: 'row',
    padding: PADDING.LG,
    borderWidth: BORDER_WIDTH,
    borderColor: GREY[200],
  },
});

export default OnSiteCell;
