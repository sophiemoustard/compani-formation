import { View, Text } from 'react-native';
import AttendanceCell from '../AttendancesCell';
import styles from './styles';

interface AttendancesContainerProps {
  slots: any[],
  profileId: string,
}

const AttendancesContainer = ({ slots, profileId }: AttendancesContainerProps) => (
  <View style={styles.container}>
    <Text style={styles.header}>Vous avez des créneaux à émarger.</Text>
    <AttendanceCell slots={slots} profileId={profileId} />
  </View>
);

export default AttendancesContainer;
