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
  let dayOfWeek;
  let dayOfMonth;
  let month;
  const dateFormat = 'DD/MM/YYY';
  if (dates.length) {
    const datesFormatted = [...new Set(dates.map(date => moment(date).format(dateFormat)))];

    dayOfWeek = capitalize(moment(datesFormatted[0], dateFormat).format('ddd'));
    dayOfMonth = capitalize(moment(datesFormatted[0], dateFormat).format('D'));
    month = capitalize(moment(datesFormatted[0], dateFormat).format('MMM'));
  }

  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        {dates.length
          ? <>
            <View style={styles.dayOfWeekContainer}>
              <Text style={styles.dayOfWeek}>{dayOfWeek}</Text>
            </View>
            <Text style={styles.dayOfMonth}>{dayOfMonth}</Text>
            <Text style={styles.month}>{month}</Text>
          </>
          : <>
            <View style={styles.dayOfWeekContainer} />
            <Text style={styles.toPlan}>?</Text>
          </> }
      </View>
      {dates.length > 1
        ? <Shadow customStyle={styles.manyDatesShadow} relativePosition={{ top: 3, left: 3, right: -3, bottom: -3 }} />
        : <Shadow customStyle={styles.shadow} />}
    </View>
  );
};

export default CalendarIcon;
