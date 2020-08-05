import React from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';
import { stepTypeOptions } from '../core/data/constants';
import commonStyles from '../styles/common';
import CalendarIcon from './CalendarIcon';
import { MARGIN, PADDING, IS_SMALL_SCREEN } from '../styles/metrics';

const SlotCell = ({ slotsByDay }) => {
  const { date, name, steps } = slotsByDay;
  const titleLimit = IS_SMALL_SCREEN ? 28 : 40;
  const truncatedProgramName = name.length > titleLimit ? `${name.slice(0, titleLimit - 3)}...` : name;

  let slotsSteps = '';
  if (steps) {
    const alreadyUsedIndexOfStep = [];
    for (const slot of slotsByDay.slots) {
      const stepType = get(slot, 'step.type');
      const stepTypeLabel = stepType ? stepTypeOptions[stepType] : '';
      const indexOfStep = steps.indexOf(get(slot, 'step._id') || '');
      if (indexOfStep < 0 || alreadyUsedIndexOfStep.indexOf(indexOfStep) >= 0) continue;
      alreadyUsedIndexOfStep.push(indexOfStep);

      slotsSteps += `${slotsSteps ? '\n' : ''}ÉTAPE ${indexOfStep + 1} - ${stepTypeLabel}`;
    }
  }
  return (
    <View style={styles.container}>
      <CalendarIcon date={date} />
      <View style={styles.textContainer}>
        <Text style={styles.programName}>{truncatedProgramName || ''}</Text>
        <Text style={styles.slotsSteps}>{slotsSteps}</Text>
      </View>
    </View>
  );
};

SlotCell.propTypes = {
  slotsByDay: PropTypes.exact({
    date: PropTypes.string,
    name: PropTypes.string,
    steps: PropTypes.arrayOf(PropTypes.string),
    slots: PropTypes.arrayOf(
      PropTypes.shape({
        step: PropTypes.shape({ type: PropTypes.string, _id: PropTypes.string })
      }),
    ),
  }),
};

const styles = StyleSheet.create({
  container: {
    ...commonStyles.courseCellContainer,
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
    color: '#766570',
    fontSize: 12,
  },
});

export default SlotCell;
