import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';
import moment from '../core/helpers/moment';
import { capitalize } from '../core/helpers/utils';
import { BORDER_RADIUS, PADDING, BORDER_WIDTH } from '../styles/metrics';
import { ALT_PINK, WHITE } from '../styles/colors';

const CalendarIcon = ({ date }) => {
  return (
    <View style={styles.dateContainer}>
      <View style={styles.dayOfWeekContainer}>
        <Text style={styles.dayOfWeek}>{date && capitalize(moment(date).format('ddd'))}</Text>
      </View>
      { !date
        ? <Text style={styles.toPlan}>?</Text>
        : <>
          <Text style={styles.dayOfMonth}>{capitalize(moment(date).format('D'))}</Text>
          <Text style={styles.month}>{capitalize(moment(date).format('MMM'))}</Text>
        </>
      }
    </View>
  );
};

CalendarIcon.propTypes = {
  date: PropTypes.string,
};

const width = 50;
const styles = StyleSheet.create({
  dateContainer: {
    width,
    height: 60,
    borderWidth: BORDER_WIDTH,
    borderRadius: BORDER_RADIUS.SM,
    borderColor: ALT_PINK[500],
    alignItems: 'center',
    paddingBottom: PADDING.SM,
  },
  dayOfWeekContainer: {
    borderTopLeftRadius: BORDER_RADIUS.SM,
    borderTopRightRadius: BORDER_RADIUS.SM,
    backgroundColor: ALT_PINK[500],
    width,
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
    color: ALT_PINK[500],
    fontSize: 14,
    height: 18,
  },
  toPlan: {
    fontSize: 24,
    height: 40,
  }
});

export default CalendarIcon;
