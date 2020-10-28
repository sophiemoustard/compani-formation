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
    const nextDates = datesFormatted.filter(date => moment().isSameOrBefore(moment(date, dateFormat), 'day'));
    const date = nextDates.length ? nextDates[0] : datesFormatted[0];

    dayOfWeek = capitalize(moment(date, dateFormat).format('ddd'));
    dayOfMonth = capitalize(moment(date, dateFormat).format('D'));
    month = capitalize(moment(date, dateFormat).format('MMM'));
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
        ? <>
          <Shadow customStyle={styles.manyDatesShadow} relativePosition={{ top: 3, left: 3, right: -3, bottom: -3 }} />
          <View style={styles.datesLengthContainer}><Text style={styles.datesLength}>{dates.length}</Text></View>
        </>
        : <Shadow customStyle={styles.shadow} />}
    </View>
  );
};

export default CalendarIcon;
