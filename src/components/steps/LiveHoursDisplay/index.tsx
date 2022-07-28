import { Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ICON } from '../../../styles/metrics';
import { GREY } from '../../../styles/colors';
import companiDate from '../../../core/helpers/dates';
import { SlotType } from '../../../types/CourseTypes';
import styles from './styles';

type LiveHoursDisplayProps = {
  startDate: SlotType['startDate'],
  endDate: SlotType['endDate'],
}

const LiveHoursDisplay = ({ startDate, endDate }: LiveHoursDisplayProps) => (
  <View style={styles.datesAndArrowContainer}>
    <Text style={styles.hours}>{companiDate(startDate).format('HH:mm')}</Text>
    <View style={styles.arrow}>
      <Feather name="arrow-right" size={ICON.XS} color={GREY[400]} />
    </View>
    <Text style={styles.hours}>{companiDate(endDate).format('HH:mm')}</Text>
  </View>
);

export default LiveHoursDisplay;
