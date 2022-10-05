import { useState, useEffect, useCallback, useMemo } from 'react';
import { View, BackHandler, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';
import has from 'lodash/has';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../types/NavigationType';
import Courses from '../../../../api/courses';
import AttendanceSheets from '../../../../api/attendanceSheets';
import commonStyles from '../../../../styles/common';
import { ICON } from '../../../../styles/metrics';
import { GREY, PINK } from '../../../../styles/colors';
import { BlendedCourseType, TraineeType } from '../../../../types/CourseTypes';
import styles from '../styles';
import { getTitle } from '../helper';
import CourseAboutHeader from '../../../../components/CourseAboutHeader';
import { INTRA, OPERATIONS } from '../../../../core/data/constants';
import CompaniDate from '../../../../core/helpers/dates/companiDates';
import PersonCell from '../../../../components/PersonCell';
import ContactInfoContainer from '../../../../components/ContactInfoContainer';
import { AttendanceSheetType } from '../../../../types/AttendanceSheetTypes';
import UploadButton from '../../../../components/form/UploadButton';

interface AdminCourseProfileProps extends StackScreenProps<RootStackParamList, 'TrainerCourseProfile'> {
}

const AdminCourseProfile = ({
  route,
  navigation,
}: AdminCourseProfileProps) => {
  const [course, setCourse] = useState<BlendedCourseType | null>(null);
  const [savedAttendanceSheets, setSavedAttendanceSheets] = useState<AttendanceSheetType[]>([]);
  const [title, setTitle] = useState<string>('');
  const attendanceSheetsToUpload = useMemo(() => {
    if (course?.type === INTRA) {
      const savedDates = savedAttendanceSheets.map(sheet => CompaniDate(sheet.date).toISO());
      return [...new Set(
        course.slots
          .map(slot => CompaniDate(slot.startDate).startOf('day').toISO())
          .filter(date => !savedDates.includes(date))
      )];
    }
    return [];
  }, [savedAttendanceSheets, course]);

  useEffect(() => {
    const getCourse = async () => {
      try {
        const fetchedCourse = await Courses.getCourse(route.params.courseId, OPERATIONS);
        if (fetchedCourse.type === INTRA) {
          const fetchedAttendanceSheets = await AttendanceSheets.getAttendanceSheetList(fetchedCourse._id);
          setSavedAttendanceSheets(fetchedAttendanceSheets);
        }
        setCourse(fetchedCourse as BlendedCourseType);
        setTitle(getTitle(fetchedCourse));
      } catch (e: any) {
        console.error(e);
        setCourse(null);
      }
    };

    getCourse();
  }, [route.params.courseId]);

  const hardwareBackPress = useCallback(() => {
    navigation.goBack();
    return true;
  }, [navigation]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', hardwareBackPress);

    return () => { BackHandler.removeEventListener('hardwareBackPress', hardwareBackPress); };
  }, [hardwareBackPress]);

  const renderTrainee = (person: TraineeType) => <PersonCell person={person} />;

  return course && has(course, 'subProgram.program') && (
    <SafeAreaView style={commonStyles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <CourseAboutHeader screenTitle="ESPACE INTERVENANT" courseTitle={title} goBack={navigation.goBack} />
        {!!(attendanceSheetsToUpload.length || savedAttendanceSheets.length) && <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Emargements</Text>
          {!!attendanceSheetsToUpload.length &&
          <Text style={styles.italicText}>Chargez vos feuilles d&apos;émargements quand elles sont complètes.</Text>}
          {attendanceSheetsToUpload.map(sheetToUpload =>
            <UploadButton title={CompaniDate(sheetToUpload).format('dd/LL/yyyy')} key={sheetToUpload}
              style={styles.uploadButton}/>)}
          <View style={styles.savedSheetContainer}>
            {savedAttendanceSheets.map(sheet =>
              <View key={sheet._id}>
                <TouchableOpacity style={styles.savedSheetContent}>
                  <Feather name='file-text' size={ICON.XXL} color={GREY[900]} />
                  <View style={styles.editButton}><Feather name='edit-2' size={ICON.SM} color={PINK[500]} /></View>
                </TouchableOpacity>
                <Text style={styles.savedSheetText}>{CompaniDate(sheet.date).format('dd/LL/yyyy')}</Text>
              </View>)}
          </View>
        </View>}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Stagiaires</Text>
          <FlatList data={course.trainees} keyExtractor={item => item._id}
            renderItem={({ item }) => renderTrainee(item)}/>
        </View>
        {!!course.companyRepresentative?.identity && <View style={styles.sectionContainer}>
          <View style={commonStyles.sectionDelimiter} />
          <ContactInfoContainer contact={course.companyRepresentative}
            title={'Votre référent structure pour cette formation'} />
        </View>}
        <View style={styles.footer} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AdminCourseProfile;
