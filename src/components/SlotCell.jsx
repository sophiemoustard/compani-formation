import moment from 'moment';
import React from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';
import { GREY, PRIMARY_COLOR, WHITE } from '../styles/variables';

const SlotCell = ({ slotsByDay }) => {
  const { date, name, steps } = slotsByDay;
  const truncatedProgramName = name.length > 40 ? `${name.slice(0, 38)}...` : name;

  let slotsSteps = '';
  if (steps) {
    for (const slot of slotsByDay.slots) {
      const stepName = get(slot, 'step.name') || '';
      const truncatedStepName = stepName.length > 15 ? `${stepName.slice(0, 13)}...` : stepName;
      const indexOfStep = steps.indexOf(get(slot, 'step._id') || '');
      if (indexOfStep < 0) continue;

      slotsSteps += `${slotsSteps ? '\n' : ''}ÉTAPE ${indexOfStep + 1} - ${truncatedStepName.toUpperCase()}`;
    }
  }

  const dateFormat = moment(date, 'DD/MM/YYYY');

  return <View style={styles.container}>
    <View style={styles.dateContainer}>
      <Text style={styles.dayOfWeek}>{dateFormat.format('ddd')}</Text>
      <Text style={styles.dayOfMonth}>{dateFormat.format('D')}</Text>
      <Text style={styles.month}>{dateFormat.format('MMM')}</Text>
    </View>
    <View style={styles.textContainer}>
      <View><Text style={styles.programName}>{truncatedProgramName || ''}</Text></View>
      <View><Text style={styles.slotsSteps}>{slotsSteps}</Text></View>
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
    borderRadius: borderRadius,
    maxWidth: 175,
    overflow: 'hidden',
  },
  programName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  slotsSteps: {
    color: '#766570',
    fontSize: 12,
  },
  dateContainer: {
    width: 50,
    borderWidth: 1,
    borderRadius: borderRadius,
    borderColor: PRIMARY_COLOR,
    alignItems: 'center',
  },
  dayOfWeek: {
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius,
    backgroundColor: PRIMARY_COLOR,
    color: WHITE,
    width: 50,
    textAlign: 'center',
    fontSize: 12,
  },
  dayOfMonth: {
    fontSize: 18,
  },
  month: {
    color: PRIMARY_COLOR,
    fontSize: 14,
    paddingBottom: 3,
  }
});

export default SlotCell;
