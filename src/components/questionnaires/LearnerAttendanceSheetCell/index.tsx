import { Text, View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import CompaniDate from '../../../core/helpers/dates/companiDates';
import { AttendanceSheetType } from '../../../types/AttendanceSheetTypes';
import Shadow from '../../design/Shadow';
import { DD_MM_YYYY } from '../../../core/data/constants';
import { ICON } from '../../../styles/metrics';
import { GREY } from '../../../styles/colors';
import styles from './styles';

interface LearnerAttendanceSheetCellProps {
  attendanceSheet: AttendanceSheetType,
}

const LearnerAttendanceSheetCell = ({ attendanceSheet }: LearnerAttendanceSheetCellProps) => (
  <View style={styles.container}>
    <TouchableOpacity style={styles.iconContainer}>
      <View style={styles.icon}>
        <Feather name='pen-tool' size={ICON.LG} color={GREY[700]} />
      </View>
      <Shadow customStyle={styles.shadow} />
    </TouchableOpacity>
    <Text style={styles.AttendanceSheetName} lineBreakMode={'tail'} numberOfLines={2}>
      À signer {[
        ...new Set(attendanceSheet.slots!.map(slot => CompaniDate(slot.startDate).format(DD_MM_YYYY)))].join(', ')
      }
    </Text>
  </View>
);

export default LearnerAttendanceSheetCell;
