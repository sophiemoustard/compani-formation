import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';
import moment from '../core/helpers/moment';
import { capitalize } from '../core/helpers/utils';
import { BORDER_RADIUS, PADDING, BORDER_WIDTH } from '../styles/metrics';
import { PINK, WHITE } from '../styles/colors';

const CalendarIcon = ({ dates }) => {
  let daysOfWeek, daysOfMonth, months;
  const dateFormat = 'DD/MM/YYY';
  if (dates.length) {
    const datesFormatted = [...new Set(dates.map(date => moment(date).format(dateFormat)))];
    const firstDate = moment(datesFormatted[0], dateFormat);

    daysOfWeek = capitalize(moment(firstDate, dateFormat).format('ddd'));
    daysOfMonth = capitalize(moment(firstDate, dateFormat).format('D'));
    months = capitalize(moment(firstDate, dateFormat).format('MMM'));

    if (datesFormatted.length > 1) {
      const secondDate = moment(datesFormatted[1], dateFormat);
      daysOfWeek += `, ${capitalize(moment(secondDate, dateFormat).format('ddd'))}`;
      daysOfMonth += `, ${capitalize(moment(secondDate, dateFormat).format('D'))}`;
      const month = capitalize(moment(secondDate, dateFormat).format('MMM'));
      if (!months.match(month)) months += `, ${month}`;
    }

    if (datesFormatted.length > 2) {
      daysOfWeek += '...';
      daysOfMonth += '...';
      const monthsSet = [... new Set(datesFormatted.map(date => capitalize(moment(date, dateFormat).format('MMM'))))];
      if (monthsSet.length > 2) months += '...';
    }
  }

  return (
    <View style={styles.dateContainer}>
      <View style={styles.dayOfWeekContainer}>
        <Text style={styles.dayOfWeek}>{dates.length ? daysOfWeek : '' }</Text>
      </View>
      { dates.length
        ? <>
          <Text style={styles.dayOfMonth}>{daysOfMonth}</Text>
          <Text style={styles.month}>{months}</Text>
        </>
        : <Text style={styles.toPlan}>?</Text>
      }
    </View>
  );
};

CalendarIcon.propTypes = {
  dates: PropTypes.arrayOf(PropTypes.string),
};

const styles = StyleSheet.create({
  dateContainer: {
    minWidth: 50,
    height: 60,
    borderWidth: BORDER_WIDTH,
    borderRadius: BORDER_RADIUS.SM,
    borderColor: PINK[500],
    alignItems: 'center',
    paddingBottom: PADDING.SM,
    overflow: 'hidden',
  },
  dayOfWeekContainer: {
    borderTopLeftRadius: BORDER_RADIUS.SM,
    borderTopRightRadius: BORDER_RADIUS.SM,
    backgroundColor: PINK[500],
    width: '100%',
    height: 15,
    paddingHorizontal: 10,
  },
  dayOfWeek: {
    color: WHITE,
    fontSize: 12,
    textAlign: 'center',
  },
  dayOfMonth: {
    fontSize: 18,
    height: 22,
    paddingHorizontal: 5,
  },
  month: {
    color: PINK[500],
    fontSize: 14,
    height: 18,
    paddingHorizontal: 5,
  },
  toPlan: {
    fontSize: 24,
    height: 40,
  }
});

export default CalendarIcon;
