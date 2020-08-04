import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';
import { PRIMARY_COLOR, WHITE } from '../styles/variables';
import moment from '../core/helpers/moment';
import { capitalize } from '../core/helpers/utils';

const CalendarIcon = ({ date }) => {
  const formattedDate = moment(date, 'DD/MM/YYYY');

  return <View style={styles.dateContainer}>
    <View style={styles.dayOfWeekContainer}>
      <Text style={styles.dayOfWeek}>{capitalize(formattedDate.format('ddd'))}</Text>
    </View>
    <Text style={styles.dayOfMonth}>{capitalize(formattedDate.format('D'))}</Text>
    <Text style={styles.month}>{capitalize(formattedDate.format('MMM'))}</Text>
  </View>;
};

CalendarIcon.propTypes = {
  date: PropTypes.string,
};

const borderRadius = 10;
const styles = StyleSheet.create({
  dateContainer: {
    width: 50,
    height: 60,
    borderWidth: 1,
    borderRadius: borderRadius,
    borderColor: PRIMARY_COLOR,
    alignItems: 'center',
    paddingBottom: 5,
  },
  dayOfWeekContainer: {
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius,
    backgroundColor: PRIMARY_COLOR,
    width: 50,
    height: 15,
  },
  dayOfWeek: {
    color: WHITE,
    fontSize: 12,
    textAlign: 'center',
  },
  dayOfMonth: {
    fontSize: 18,
    height: 22,
  },
  month: {
    color: PRIMARY_COLOR,
    fontSize: 14,
    height: 18,
  }
});

export default CalendarIcon;
