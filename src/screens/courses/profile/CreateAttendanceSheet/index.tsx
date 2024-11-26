import { useEffect, useMemo, useReducer, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { uniqBy } from 'lodash';
import FeatherButton from '../../../../components/icons/FeatherButton';
import { ICON } from '../../../../styles/metrics';
import { RootStackParamList, RootCreateAttendanceSheetParamList } from '../../../../types/NavigationType';
import Courses from '../../../../api/courses';
import { GREY } from '../../../../styles/colors';
import { BlendedCourseType } from '../../../../types/CourseTypes';
import {
  DD_MM_YYYY,
  INTER_B2B,
  INTRA,
  INTRA_HOLDING,
  LONG_FIRSTNAME_LONG_LASTNAME,
  OPERATIONS,
} from '../../../../core/data/constants';
import AttendanceSheets from '../../../../api/attendanceSheets';
import {
  AttendanceSheetType,
  InterAttendanceSheetType,
  IntraOrIntraHoldingAttendanceSheetType,
} from '../../../../types/AttendanceSheetTypes';
import { formatIdentity } from '../../../../core/helpers/utils';
import CompaniDate from '../../../../core/helpers/dates/companiDates';
import styles from './styles';
import { errorReducer, initialErrorState, RESET_ERROR, SET_ERROR } from '../../../../reducers/error';
import AttendanceSheetDataSelectionForm from '../../../../components/AttendanceSheetDataSelectionForm';
import UploadMethods from '../../../../components/UploadMethods';

interface CreateAttendanceSheetProps extends CompositeScreenProps<
StackScreenProps<RootStackParamList, 'CreateAttendanceSheet'>,
StackScreenProps<RootCreateAttendanceSheetParamList>
> {}

const CreateAttendanceSheet = ({ route, navigation }: CreateAttendanceSheetProps) => {
  const [savedAttendanceSheets, setSavedAttendanceSheets] = useState<AttendanceSheetType[]>([]);
  const [course, setCourse] = useState<BlendedCourseType | null>(null);
  const [title, setTitle] = useState<string>('');
  const [attendanceSheetToAdd, setAttendanceSheetToAdd] = useState<string>('');
  const [error, dispatchError] = useReducer(errorReducer, initialErrorState);
  const missingAttendanceSheets = useMemo(() => {
    if (!course?.slots.length) return [];

    if ([INTRA, INTRA_HOLDING].includes(course?.type)) {
      const intraOrIntraHoldingCourseSavedSheets = savedAttendanceSheets as IntraOrIntraHoldingAttendanceSheetType[];
      const savedDates = intraOrIntraHoldingCourseSavedSheets
        .map(sheet => CompaniDate(sheet.date).startOf('day').toISO());

      return uniqBy(
        course.slots
          .map(slot => ({
            value: CompaniDate(slot.startDate).startOf('day').toISO(),
            label: CompaniDate(slot.startDate).format(DD_MM_YYYY),
          }))
          .filter(date => !savedDates.includes(date.value) && CompaniDate().isSameOrAfter(date.value)),
        'value'
      );
    }

    const interCourseSavedSheets = savedAttendanceSheets as InterAttendanceSheetType[];
    const savedTrainees = interCourseSavedSheets.map(sheet => sheet.trainee?._id);

    return [...new Set(
      course?.trainees?.map(t => ({ value: t._id, label: formatIdentity(t.identity, LONG_FIRSTNAME_LONG_LASTNAME) }))
        .filter(trainee => !savedTrainees.includes(trainee.value))
    )];
  }, [course, savedAttendanceSheets]);

  const refreshAttendanceSheets = async (courseId: string) => {
    const fetchedAttendanceSheets = await AttendanceSheets.getAttendanceSheetList({ course: courseId });
    setSavedAttendanceSheets(fetchedAttendanceSheets);
  };

  useEffect(() => {
    const getCourse = async () => {
      try {
        const fetchedCourse = await Courses.getCourse(route.params.courseId, OPERATIONS);
        await refreshAttendanceSheets(route.params.courseId);

        setCourse(fetchedCourse as BlendedCourseType);
        setTitle(
          fetchedCourse.type === INTER_B2B
            ? 'Pour quel stagiaire souhaitez-vous charger une feuille d\'émargement ?'
            : 'Pour quelle date souhaitez-vous charger une feuille d\'émargement ?'
        );
      } catch (e: any) {
        console.error(e);
        setCourse(null);
      }
    };

    getCourse();
  }, [route.params.courseId]);

  const goBack = () => navigation.goBack();

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
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen key={0} name={'attendance-sheet-data-selection'}>{renderDataSelection}</Stack.Screen>
      <Stack.Screen key={1} name={'upload-method-selection'}>{renderUploadMethod}</Stack.Screen>
    </Stack.Navigator>
  );
};

export default CreateAttendanceSheet;
