import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import moment from '../core/helpers/moment';
import { capitalize } from '../core/helpers/utils';
import { BORDER_RADIUS, PADDING, BORDER_WIDTH } from '../styles/metrics';
import { PINK, WHITE, GREY } from '../styles/colors';
import { NUNITO_SEMI, NUNITO_REGULAR } from '../styles/fonts';

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
      <View style={styles.shadow} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minWidth: 50,
    height: 63,
  },
  dateContainer: {
    height: 60,
    // Do not merge the borderWidths params, avoid an unwanted line in android
    borderTopWidth: BORDER_WIDTH,
    borderBottomWidth: BORDER_WIDTH,
    borderLeftWidth: BORDER_WIDTH,
    borderRightWidth: BORDER_WIDTH,
    backgroundColor: WHITE,
    borderRadius: BORDER_RADIUS.SM,
    borderColor: PINK[500],
    alignItems: 'center',
    paddingBottom: PADDING.SM,
    overflow: 'hidden',
  },
  dayOfWeekContainer: {
    backgroundColor: PINK[500],
    width: '100%',
    paddingHorizontal: PADDING.MD,
    justifyContent: 'center',
  },
  dayOfWeek: {
    ...NUNITO_SEMI.XS,
    color: WHITE,
    textAlign: 'center',
  },
  dayOfMonth: {
    ...NUNITO_REGULAR.MD,
    height: 22,
    paddingHorizontal: PADDING.SM,
  },
  month: {
    ...NUNITO_SEMI.SM,
    color: PINK[500],
    height: 18,
    paddingHorizontal: PADDING.SM,
  },
  toPlan: {
    ...NUNITO_REGULAR.XL,
    height: 40,
  },
  shadow: {
    minWidth: 50,
    height: BORDER_RADIUS.SM + 3,
    backgroundColor: GREY[200],
    top: -BORDER_RADIUS.SM,
    zIndex: -1,
    borderBottomLeftRadius: BORDER_RADIUS.SM,
    borderBottomRightRadius: BORDER_RADIUS.SM,
  },
});

export default CalendarIcon;
