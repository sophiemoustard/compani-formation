import { useCallback, useEffect, useReducer, useState } from 'react';
import { BackHandler, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import { CompositeScreenProps, useNavigationState } from '@react-navigation/native';
import FeatherButton from '../../../../components/icons/FeatherButton';
import { ICON } from '../../../../styles/metrics';
import { RootStackParamList, RootCreateAttendanceSheetParamList } from '../../../../types/NavigationType';
import { GREY } from '../../../../styles/colors';
import { INTER_B2B } from '../../../../core/data/constants';
import styles from './styles';
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
  const currentScreen = useNavigationState((state) => {
    const nestedState = state.routes.find(route => route.name === 'CreateAttendanceSheet')?.state;

    if (nestedState) return nestedState.routes[nestedState.index!].name;

    return null;
  });
  useEffect(() => {
    setTitle(
      course?.type === INTER_B2B
        ? 'Pour quel stagiaire souhaitez-vous charger une feuille d\'émargement ?'
        : 'Pour quelle date souhaitez-vous charger une feuille d\'émargement ?'
    );
  }, [course]);

  const goBack = useCallback(() => {
    if (currentScreen === 'upload-method-selection') navigation.navigate('attendance-sheet-data-selection');
    else navigation.goBack();
  }, [navigation, currentScreen]);

  const hardwareBackPress = useCallback(() => {
    goBack();
    return true;
  }, [goBack]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', hardwareBackPress);

    return () => { BackHandler.removeEventListener('hardwareBackPress', hardwareBackPress); };
  }, [hardwareBackPress]);

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
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <FeatherButton name='arrow-left' onPress={goBack} size={ICON.MD} color={GREY[600]} />
      </View>
      <AttendanceSheetDataSelectionForm title={title} options={missingAttendanceSheets} setOption={setOption}
        goToNextScreen={goToNextScreen} error={error} />
    </SafeAreaView>
  );

  const renderUploadMethod = () => (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <FeatherButton name='arrow-left' onPress={() => navigation.navigate('attendance-sheet-data-selection')}
          size={ICON.MD} color={GREY[600]} />
      </View>
      <UploadMethods course={course!} goBack={goBack} attendanceSheetToAdd={attendanceSheetToAdd} />
    </SafeAreaView>
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
