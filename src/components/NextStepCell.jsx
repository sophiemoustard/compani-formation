import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';
import moment from '../core/helpers/moment';
import { stepTypeOptions } from '../core/data/constants';
import CalendarIcon from './CalendarIcon';
import { MARGIN, PADDING, IS_SMALL_SCREEN, BORDER_RADIUS, COURSE_CELL_WIDTH } from '../styles/metrics';
import { GREY, TRANSPARENT_GREY } from '../styles/colors';
import { truncate } from '../core/helpers/utils';

const NextStepCell = ({ nextSlotsStep }) => {
  const { name, type, stepNumber } = nextSlotsStep;
  const titleLimit = IS_SMALL_SCREEN ? 28 : 40;
  const truncatedProgramName = truncate(name, titleLimit);
  let slotsSteps = `ÉTAPE ${stepNumber} - ${stepTypeOptions[type]}`;
  const dates = Object.keys(nextSlotsStep.slots, 'DD/MM/YYYY').map(date => moment(date, 'DD/MM/YYYY').toISOString());

  return (
    <View style={styles.container}>
      <CalendarIcon dates={dates} />
      <View style={styles.textContainer}>
        <Text style={styles.programName}>{truncatedProgramName || ''}</Text>
        <Text style={styles.slotsSteps}>{slotsSteps}</Text>
      </View>
    </View>
  );
};

NextStepCell.propTypes = {
  nextSlotsStep: PropTypes.exact({
    firstSlot: PropTypes.string,
    id: PropTypes.string,
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
    width: '70%',
    justifyContent: 'space-between',
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
