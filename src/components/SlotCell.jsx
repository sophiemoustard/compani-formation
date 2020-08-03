import moment from 'moment/min/moment-with-locales';
import React from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';
import { GREY, PRIMARY_COLOR, WHITE } from '../styles/variables';
import { capitalize } from '../core/helpers/utils';
import { stepTypeOptions } from '../core/data/constants';

const SlotCell = ({ slotsByDay }) => {
  const { date, name, steps } = slotsByDay;
  const truncatedProgramName = name.length > 40 ? `${name.slice(0, 38)}...` : name;

  let slotsSteps = '';
  if (steps) {
    for (const slot of slotsByDay.slots) {
      const stepType = get(slot, 'step.type');
      const stepTypeLabel = stepType ? stepTypeOptions[stepType] : '';
      const indexOfStep = steps.indexOf(get(slot, 'step._id') || '');
      if (indexOfStep < 0) continue;

      slotsSteps += `${slotsSteps ? '\n' : ''}ÉTAPE ${indexOfStep + 1} - ${stepTypeLabel.toUpperCase()}`;
    }
  }

  const formattedDate = moment(date, 'DD/MM/YYYY');

  return <View style={styles.container}>
    <View style={styles.dateContainer}>
      <View style={styles.dayOfWeekContainer}>
        <Text style={styles.dayOfWeek}>{capitalize(formattedDate.format('ddd'))}</Text>
      </View>
      <Text style={styles.dayOfMonth}>{capitalize(formattedDate.format('D'))}</Text>
      <Text style={styles.month}>{capitalize(formattedDate.format('MMM'))}</Text>
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
  dayOfWeekContainer: {
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius,
    backgroundColor: PRIMARY_COLOR,
    width: 50,
  },
  dayOfWeek: {
    color: WHITE,
    fontSize: 12,
    textAlign: 'center',
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
