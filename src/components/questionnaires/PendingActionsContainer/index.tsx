import { View, Text } from 'react-native';
import { QuestionnaireType } from '../../../types/QuestionnaireType';
import QuestionnaireCell from '../QuestionnaireCell';
import styles from './styles';
import { AttendanceSheetType } from '../../../types/AttendanceSheetTypes';
import LearnerAttendanceSheetCell from '../LearnerAttendanceSheetCell';

interface PendingActionsContainerProps {
  questionnaires: QuestionnaireType[],
  attendanceSheets: AttendanceSheetType[],
  profileId: string,
}

const PendingActionsContainer = ({ questionnaires, attendanceSheets, profileId }: PendingActionsContainerProps) => (
  <View style={styles.container}>
    <Text style={styles.header}>Vous avez des actions à compléter.</Text>
    <View style={styles.cellContainer}>
      {!!questionnaires.length && <QuestionnaireCell questionnaires={questionnaires} profileId={profileId} />}
      {attendanceSheets.map(as => <LearnerAttendanceSheetCell key={as._id} attendanceSheet={as} />)}
    </View>
  </View>
);

export default PendingActionsContainer;
