import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import CompaniDate from '../../core/helpers/dates/companiDates';
import { capitalize } from '../../core/helpers/utils';
import Shadow from '../design/Shadow';
import styles from './styles';
import ProgressPieChart from '../ProgressPieChart';

interface CalendarIconProps {
  slots: Date[],
  progress: number,
  color: string,
}

const CalendarIcon = ({ slots, progress = 0, color }: CalendarIconProps) => {
  const [dayOfWeek, setDayOfWeek] = useState<string>('');
  const [dayOfMonth, setDayOfMonth] = useState<string>('');
  const [month, setMonth] = useState<string>('');
  const [dates, setDates] = useState<string[]>([]);
  const style = styles(color);
  const dateFormat = 'dd/LL/yyyy';

  useEffect(() => {
    if (slots.length) {
      const slotsDates = [...new Set(slots.map(date => CompaniDate(date).format(dateFormat)))];
      const nextSlots = slots.filter(slot => CompaniDate().isSameOrBefore(slot));
      const date = nextSlots.length ? nextSlots[0] : slots[0];

      setDayOfWeek(capitalize(CompaniDate(date).format('ccc')));
      setDayOfMonth(capitalize(CompaniDate(date).format('d')));
      setMonth(capitalize(CompaniDate(date).format('LLL')));
      setDates(slotsDates);
    }
  }, [slots]);

  const renderProgress = () => {
    if (!progress && dates.length <= 1) return null;

    if (!progress) {
      return (
        <View style={style.datesLengthContainer}>
          <Text style={style.datesLength}>{dates.length}</Text>
        </View>
      );
    }

    return (
      <View style={progress < 1 ? style.progressContainer : style.finishedContainer}>
        <ProgressPieChart progress={progress} />
      </View>
    );
  };

  return (
    <View style={style.container}>
      <View style={style.dateContainer}>
        {dates.length
          ? <>
            <Text style={style.dayOfWeek}>{dayOfWeek}</Text>
            <Text style={style.dayOfMonth}>{dayOfMonth}</Text>
            <Text style={style.month}>{month}</Text>
          </>
          : <>
            <View style={style.dayOfWeek} />
            <Text style={style.toPlan}>?</Text>
          </> }
      </View>
      {dates.length > 1
        ? <>
          <Shadow customStyle={style.shadowHeader} relativePosition={{ top: 3, left: 3, right: -3, bottom: 0 }}/>
          <Shadow customStyle={style.manyDatesShadow} relativePosition={{ top: 3, left: 3, right: -3, bottom: -3 }} />
        </>
        : <Shadow customStyle={style.shadow} />}
      {renderProgress()}
    </View>
  );
};

export default CalendarIcon;
