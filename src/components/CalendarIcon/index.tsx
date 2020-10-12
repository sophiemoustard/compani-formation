import React from 'react';
import { Text, View } from 'react-native';
import moment from '../../core/helpers/moment';
import { capitalize } from '../../core/helpers/utils';
import Shadow from '../design/Shadow';
import styles from './styles';

interface CalendarIconProps {
  dates: Array<Date>,
}

const CalendarIcon = ({ dates }: CalendarIconProps) => {
  let daysOfWeek;
  let daysOfMonth;
  let months;
  const dateFormat = 'DD/MM/YYY';
  if (dates.length) {
    const datesFormatted = [...new Set(dates.map(date => moment(date).format(dateFormat)))];

    daysOfWeek = capitalize(moment(datesFormatted[0], dateFormat).format('ddd'));
    daysOfMonth = capitalize(moment(datesFormatted[0], dateFormat).format('D'));
    months = capitalize(moment(datesFormatted[0], dateFormat).format('MMM'));

    if (datesFormatted.length > 1) {
      daysOfWeek += `, ${capitalize(moment(datesFormatted[1], dateFormat).format('ddd'))}`;
      daysOfMonth += `, ${capitalize(moment(datesFormatted[1], dateFormat).format('D'))}`;
      const month = capitalize(moment(datesFormatted[1], dateFormat).format('MMM'));
      if (!months.match(month)) months += `, ${month}`;
    }

    if (datesFormatted.length > 2) {
      daysOfWeek += '...';
      daysOfMonth += '...';
      const monthsSet = [...new Set(datesFormatted.map(date => capitalize(moment(date, dateFormat).format('MMM'))))];
      if (monthsSet.length > 2) months += '...';
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <View style={styles.dayOfWeekContainer}>
          <Text style={styles.dayOfWeek}>{dates.length ? daysOfWeek : '' }</Text>
        </View>
        {dates.length
          ? <>
            <Text style={styles.dayOfMonth}>{daysOfMonth}</Text>
            <Text style={styles.month}>{months}</Text>
          </>
          : <Text style={styles.toPlan}>?</Text>
        }
      </View>
      <Shadow customStyle={styles.shadow} />
    </View>
  );
};

export default CalendarIcon;
