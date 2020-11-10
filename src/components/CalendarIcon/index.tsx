import React, { useEffect, useState } from 'react';
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
  slots: Array<Date>,
  progress: number,
}

const CalendarIcon = ({ slots, progress = 0 }: CalendarIconProps) => {
  const [dayOfWeek, setDayOfWeek] = useState<string>('');
  const [dayOfMonth, setDayOfMonth] = useState<string>('');
  const [month, setMonth] = useState<string>('');
  const [dates, setDates] = useState<Array<string>>([]);
  const dateFormat = 'DD/MM/YYY';

  useEffect(() => {
    if (slots.length) {
      const slotsDates = [...new Set(slots.map(date => moment(date).format(dateFormat)))];
      const nextSlots = slots.filter(slot => moment().isSameOrBefore(slot));
      const date = nextSlots.length ? moment(nextSlots[0]).format(dateFormat) : slotsDates[0];

      setDayOfWeek(capitalize(moment(date, dateFormat).format('ddd')));
      setDayOfMonth(capitalize(moment(date, dateFormat).format('D')));
      setMonth(capitalize(moment(date, dateFormat).format('MMM')));
      setDates(slotsDates);
    }
  }, [slots]);

  const renderProgress = () => {
    if (!progress && dates.length <= 1) return null;

    if (!progress) {
      return (
        <View style={styles.datesLengthContainer}>
          <Text style={styles.datesLength}>{dates.length}</Text>
        </View>
      );
    }

    if (progress < 1) {
      return (
        <View style={styles.progressContainer}>
          <ProgressCircle style={styles.progress} progress={progress} progressColor={YELLOW[500]}
            strokeWidth={4} cornerRadius={BORDER_RADIUS.LG} backgroundColor={WHITE} />
        </View>
      );
    }

    return (
      <View style={styles.finishedContainer}>
        <Feather name='check' size={ICON.XS} color={WHITE} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        {dates.length
          ? <>
            <Text style={styles.dayOfWeek}>{dayOfWeek}</Text>
            <Text style={styles.dayOfMonth}>{dayOfMonth}</Text>
            <Text style={styles.month}>{month}</Text>
          </>
          : <>
            <View style={styles.dayOfWeek} />
            <Text style={styles.toPlan}>?</Text>
          </> }
      </View>
      {dates.length > 1
        ? <>
          <Shadow customStyle={styles.shadowHeader} relativePosition={{ top: 3, left: 3, right: -3, bottom: 0 }}/>
          <Shadow customStyle={styles.manyDatesShadow} relativePosition={{ top: 3, left: 3, right: -3, bottom: -3 }} />
        </>
        : <Shadow customStyle={styles.shadow} />}
      {renderProgress()}
    </View>
  );
};

export default CalendarIcon;
