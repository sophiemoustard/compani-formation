import React from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';
import { GREY } from '../styles/variables';
import { stepTypeOptions } from '../core/data/constants';
import CalendarIcon from './CalendarIcon';

const SlotCell = ({ slotsByDay }) => {
  const { date, name, steps } = slotsByDay;
  const truncatedProgramName = name.length > 40 ? `${name.slice(0, 38)}...` : name;

  let slotsSteps = '';
  if (steps) {
    const alreadyUsedIndexOfStep = [];
    for (const slot of slotsByDay.slots) {
      const stepType = get(slot, 'step.type');
      const stepTypeLabel = stepType ? stepTypeOptions[stepType] : '';
      const indexOfStep = steps.indexOf(get(slot, 'step._id') || '');
      if (indexOfStep < 0 || alreadyUsedIndexOfStep.indexOf(indexOfStep) >= 0) continue;
      alreadyUsedIndexOfStep.push(indexOfStep);

      slotsSteps += `${slotsSteps ? '\n' : ''}ÉTAPE ${indexOfStep + 1} - ${stepTypeLabel.toUpperCase()}`;
    }
  }

  return <View style={styles.container}>
    <CalendarIcon date={date} />
    <View style={styles.textContainer}>
      <Text style={styles.programName}>{truncatedProgramName || ''}</Text>
      <Text style={styles.slotsSteps}>{slotsSteps}</Text>
    </View>
  </View>;
};

SlotCell.propTypes = {
  slotsByDay: PropTypes.object,
};

const borderRadius = 10;
const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius,
    marginRight: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: GREY,
    flexDirection: 'row',
  },
  textContainer: {
    marginLeft: 10,
    maxWidth: 175,
    overflow: 'hidden',
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
