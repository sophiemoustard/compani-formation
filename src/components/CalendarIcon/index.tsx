import React from 'react';
import { Text, View } from 'react-native';
import { ProgressCircle } from 'react-native-svg-charts';
import { Feather } from '@expo/vector-icons';
import moment from '../../core/helpers/moment';
import { capitalize } from '../../core/helpers/utils';
import Shadow from '../design/Shadow';
import styles from './styles';
import { ICON, BORDER_RADIUS } from '../../styles/metrics';
import { YELLOW, WHITE } from '../../styles/colors';

interface CalendarIconProps {
  dates: Array<Date>,
}

const CalendarIcon = ({ dates }: CalendarIconProps) => {
  let dayOfWeek;
  let dayOfMonth;
  let month;
  const dateFormat = 'DD/MM/YYY';
  let progress = 0;
  if (dates.length) {
    const datesFormatted = [...new Set(dates.map(date => moment(date).format(dateFormat)))];
    const nextDates = datesFormatted.filter(date => moment().isSameOrBefore(moment(date, dateFormat), 'day'));
    const date = nextDates.length ? nextDates[0] : datesFormatted[0];

    progress = 1 - nextDates.length / datesFormatted.length;

    dayOfWeek = capitalize(moment(date, dateFormat).format('ddd'));
    dayOfMonth = capitalize(moment(date, dateFormat).format('D'));
    month = capitalize(moment(date, dateFormat).format('MMM'));
  }

  const renderInfo = () => {
    if (!progress && dates.length > 1) {
      return <View style={styles.datesLengthContainer}>
        <Text style={styles.datesLength}>{dates.length}</Text>
      </View>;
    }
    if (!progress) return null;
    if (progress < 1) {
      return <View style={styles.inProgressContainer}>
        <ProgressCircle style={{ height: ICON.XS, widht: ICON.XS }} progress={progress} progressColor={YELLOW[500]}
          strokeWidth={4} cornerRadius={BORDER_RADIUS.LG} backgroundColor={WHITE} />
      </View>;
    }
    return <View style={styles.finishedContainer}>
      <Feather name='check' size={ICON.XS} color={WHITE} />
    </View>;
  };

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
        </>
        : <Shadow customStyle={styles.shadow} />}
      {renderInfo()}
    </View>
  );
};

export default CalendarIcon;
