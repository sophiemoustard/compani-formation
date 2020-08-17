import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import moment from '../../../core/helpers/moment';
import CalendarIcon from '../CalendarIcon';
import { PADDING, BORDER_RADIUS, COURSE_CELL_WIDTH } from '../../../styles/metrics';
import { TRANSPARENT_GREY } from '../../../styles/colors';
import StepCellTitle from './StepCellTitle';

const NextStepCell = ({ nextSlotsStep }) => {
  const { stepNumber, slots } = nextSlotsStep;
  const dates = Object.keys(slots, 'DD/MM/YYYY').map(date => moment(date, 'DD/MM/YYYY').toISOString());

  return (
    <View style={styles.container}>
      <CalendarIcon dates={dates} />
      <StepCellTitle index={stepNumber} step={nextSlotsStep} />
    </View>
  );
};

NextStepCell.propTypes = {
  nextSlotsStep: PropTypes.exact({
    name: PropTypes.string,
    slots: PropTypes.object,
    type: PropTypes.string,
    stepNumber: PropTypes.number,
  }),
};

const styles = StyleSheet.create({
  container: {
    borderRadius: BORDER_RADIUS.SM,
    width: COURSE_CELL_WIDTH,
    borderWidth: 1,
    borderColor: TRANSPARENT_GREY,
    flexDirection: 'row',
    padding: PADDING.MD,
  },
});

export default NextStepCell;
