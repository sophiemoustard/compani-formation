import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import { QuestionnaireType } from '../../../types/QuestionnaireType';
import QuestionnaireCell from '../QuestionnaireCell';
import styles from './styles';
import { AttendanceSheetType } from '../../../types/AttendanceSheetTypes';
import AttendanceSheetCell from '../AttendanceSheetCell';

interface PendingActionsContainerProps {
  questionnaires: QuestionnaireType[],
  attendanceSheets: AttendanceSheetType[],
  profileId: string,
}

const PendingActionsContainer = React.memo(
  ({ questionnaires, attendanceSheets, profileId }: PendingActionsContainerProps) => (
    <View style={styles.container}>
      <Text style={styles.header}>Vous avez des actions à compléter.</Text>
      <ScrollView style={styles.cellContainer} horizontal showsHorizontalScrollIndicator={false}>
        {!!questionnaires.length && <QuestionnaireCell questionnaires={questionnaires} profileId={profileId} />}
        {attendanceSheets.map(as => <AttendanceSheetCell key={as._id} attendanceSheet={as} />)}
      </ScrollView>
    </View>
  )
);
export default PendingActionsContainer;
