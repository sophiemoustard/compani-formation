import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';
import moment from '../core/helpers/moment';
import { stepTypeOptions } from '../core/data/constants';
import CalendarIcon from './CalendarIcon';
import { MARGIN, PADDING, BORDER_RADIUS, COURSE_CELL_WIDTH } from '../styles/metrics';
import { GREY, TRANSPARENT_GREY } from '../styles/colors';

const NextStepCell = ({ nextSlotsStep }) => {
  const { name, type, stepNumber, slots } = nextSlotsStep;
  const slotsSteps = `ÉTAPE ${stepNumber} - ${stepTypeOptions[type]}`;
  const dates = Object.keys(slots, 'DD/MM/YYYY').map(date => moment(date, 'DD/MM/YYYY').toISOString());

  return (
    <View style={styles.container}>
      <CalendarIcon dates={dates} />
      <View style={styles.textContainer}>
        <Text lineBreakMode={'tail'} numberOfLines={1} style={styles.slotsSteps}>{slotsSteps}</Text>
        <Text lineBreakMode={'tail'} numberOfLines={2} style={styles.programName}>{name || ''}</Text>
      </View>
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
  textContainer: {
    marginLeft: MARGIN.SM,
    flex: 1,
  },
  programName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  slotsSteps: {
    color: GREY[600],
    fontSize: 12,
  },
});

export default NextStepCell;
