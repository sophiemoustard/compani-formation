import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import moment from '../../../core/helpers/moment';
import CalendarIcon from '../CalendarIcon';
import { PADDING, BORDER_WIDTH } from '../../../styles/metrics';
import { GREY } from '../../../styles/colors';
import StepCellTitle from './StepCellTitle';

const OnSiteCell = ({ step, slots, index }) => {
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

OnSiteCell.propTypes = {
  step: PropTypes.object,
  slots: PropTypes.array,
  index: PropTypes.number,
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
