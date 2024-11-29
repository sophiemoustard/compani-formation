import { useEffect, useReducer, useState } from 'react';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { RootStackParamList, RootCreateAttendanceSheetParamList } from '../../../../types/NavigationType';
import { INTER_B2B } from '../../../../core/data/constants';
import { errorReducer, initialErrorState, RESET_ERROR, SET_ERROR } from '../../../../reducers/error';
import AttendanceSheetDataSelectionForm from '../../../../components/AttendanceSheetDataSelectionForm';
import UploadMethods from '../../../../components/UploadMethods';
import { useGetCourse, useGetMissingAttendanceSheets } from '../../../../store/attendanceSheets/hooks';

interface CreateAttendanceSheetProps extends CompositeScreenProps<
StackScreenProps<RootStackParamList, 'CreateAttendanceSheet'>,
StackScreenProps<RootCreateAttendanceSheetParamList>
> {}

const CreateAttendanceSheet = ({ navigation }: CreateAttendanceSheetProps) => {
  const course = useGetCourse();
  const missingAttendanceSheets = useGetMissingAttendanceSheets();
  const [title, setTitle] = useState<string>('');
  const [attendanceSheetToAdd, setAttendanceSheetToAdd] = useState<string>('');
  const [error, dispatchError] = useReducer(errorReducer, initialErrorState);

  useEffect(() => {
    setTitle(
      course?.type === INTER_B2B
        ? 'Pour quel stagiaire souhaitez-vous charger une feuille d\'émargement ?'
        : 'Pour quelle date souhaitez-vous charger une feuille d\'émargement ?'
    );
  }, [course]);

  const setOption = (option: string) => {
    setAttendanceSheetToAdd(option);
    if (option) dispatchError({ type: RESET_ERROR });
  };

  const goToNextScreen = () => {
    if (!attendanceSheetToAdd) {
      dispatchError({
        type: SET_ERROR,
        payload: course?.type === INTER_B2B ? 'Veuillez sélectionner un stagiaire' : 'Veuillez sélectionner une date',
      });
    } else {
      dispatchError({ type: RESET_ERROR });
      navigation.navigate('upload-method-selection');
    }
  };

  const renderDataSelection = () => (
    <AttendanceSheetDataSelectionForm title={title} options={missingAttendanceSheets} setOption={setOption}
      goToNextScreen={goToNextScreen} error={error} />
  );

  const renderUploadMethod = () => (
    <UploadMethods course={course!} goToParent={navigation.goBack} attendanceSheetToAdd={attendanceSheetToAdd} />
  );

  const Stack = createStackNavigator<RootCreateAttendanceSheetParamList>();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='attendance-sheet-data-selection'>
      <Stack.Screen key={0} name={'attendance-sheet-data-selection'}>{renderDataSelection}</Stack.Screen>
      <Stack.Screen key={1} name={'upload-method-selection'}>{renderUploadMethod}</Stack.Screen>
    </Stack.Navigator>
  );
};

export default CreateAttendanceSheet;
