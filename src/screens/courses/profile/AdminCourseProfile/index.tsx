import { useState, useEffect, useCallback, useMemo } from 'react';
import { View, BackHandler, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { CameraCapturedPicture } from 'expo-camera';
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
import styles from './styles';
import { getTitle } from '../helper';
import CourseAboutHeader from '../../../../components/CourseAboutHeader';
import { INTRA, OPERATIONS } from '../../../../core/data/constants';
import CompaniDate from '../../../../core/helpers/dates/companiDates';
import PersonCell from '../../../../components/PersonCell';
import ContactInfoContainer from '../../../../components/ContactInfoContainer';
import { AttendanceSheetType } from '../../../../types/AttendanceSheetTypes';
import UploadButton from '../../../../components/form/UploadButton';
import ImagePickerManager from '../../../../components/ImagePickerManager';
import PictureModal from '../../../../components/PictureModal';
import CameraModal from '../../../../components/camera/CameraModal';
import { formatImage, formatPayload } from '../../../../core/helpers/pictures';

interface AdminCourseProfileProps extends StackScreenProps<RootStackParamList, 'TrainerCourseProfile'> {
}

const AdminCourseProfile = ({ route, navigation }: AdminCourseProfileProps) => {
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
  const [pictureModal, setPictureModal] = useState<boolean>(false);
  const [attendanceSheetDateToAdd, setAttendanceSheetDateToAdd] = useState<string>('');
  const [camera, setCamera] = useState<boolean>(false);
  const [imagePickerManager, setImagePickerManager] = useState<boolean>(false);

  useEffect(() => {
    const getCourse = async () => {
      try {
        const fetchedCourse = await Courses.getCourse(route.params.courseId, OPERATIONS);
        if (fetchedCourse.type === INTRA) {
          const fetchedAttendanceSheets = await AttendanceSheets.getAttendanceSheetList({ course: fetchedCourse._id });
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

  const savePicture = async (picture: CameraCapturedPicture) => {
    try {
      if (course) {
        const file = await formatImage(picture, `emargement-${attendanceSheetDateToAdd}`);
        const data = await formatPayload({ file, course: course._id, date: attendanceSheetDateToAdd });
        await AttendanceSheets.upload(data);
        const fetchedAttendanceSheets = await AttendanceSheets.getAttendanceSheetList({ course: course._id });
        setSavedAttendanceSheets(fetchedAttendanceSheets);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setAttendanceSheetDateToAdd('');
    }
  };

  const open = (sheetToUpload) => {
    setPictureModal(true);
    setAttendanceSheetDateToAdd(sheetToUpload);
  };

  return course && has(course, 'subProgram.program') && (
    <SafeAreaView style={commonStyles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <CourseAboutHeader screenTitle="ESPACE INTERVENANT" courseTitle={title} goBack={navigation.goBack} />
        <View style={styles.attendancesContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.sectionTitle}>Emargements</Text>
            {!attendanceSheetsToUpload.length && !savedAttendanceSheets.length &&
            <Text style={styles.italicText}>Il n&apos;y a aucun créneau pour cette formation.</Text>}
          </View>
          {!!attendanceSheetsToUpload.length && <View style={styles.sectionContainer}>
            <Text style={styles.italicText}>Chargez vos feuilles d&apos;émargements quand elles sont complètes.</Text>
            {attendanceSheetsToUpload.map(sheetToUpload =>
              <UploadButton title={CompaniDate(sheetToUpload).format('dd/LL/yyyy')} key={sheetToUpload}
                style={styles.uploadButton} onPress={() => open(sheetToUpload)}/>)}
          </View>}
          {!!savedAttendanceSheets.length &&
            <ScrollView style={styles.savedSheetContainer} horizontal showsHorizontalScrollIndicator={false}>
              {savedAttendanceSheets.map(sheet =>
                <View key={sheet._id} style={styles.savedSheetContent}>
                  <TouchableOpacity>
                    <Feather name='file-text' size={ICON.XXL} color={GREY[900]} />
                    <View style={styles.editButton}><Feather name='edit-2' size={ICON.SM} color={PINK[500]} /></View>
                  </TouchableOpacity>
                  <Text style={styles.savedSheetText}>{CompaniDate(sheet.date).format('dd/LL/yyyy')}</Text>
                </View>)}
            </ScrollView>}
        </View>
        <View style={styles.sectionContainer}>
          <View style={commonStyles.sectionDelimiter} />
          <Text style={styles.sectionTitle}>Stagiaires</Text>
          {!course.trainees?.length &&
          <Text style={styles.italicText}>Il n&apos;y a aucun stagiaire pour cette formation.</Text>
          }
          <FlatList data={course.trainees} keyExtractor={item => item._id}
            renderItem={({ item }) => renderTrainee(item)} style={ styles.listContainer} />
        </View>
        <View style={styles.sectionContainer}>
          <View style={commonStyles.sectionDelimiter} />
          <ContactInfoContainer contact={course.companyRepresentative}
            title={'Votre référent structure pour cette formation'} />
        </View>
        <View style={styles.footer} />
      </ScrollView>
      <PictureModal visible={pictureModal} closePictureModal={() => setPictureModal(false)}
        openCamera={() => setCamera(true)} openImagePickerManager={() => setImagePickerManager(true)} />
      <CameraModal onRequestClose={() => setCamera(false)} savePicture={savePicture} visible={camera} />
      {imagePickerManager && <ImagePickerManager onRequestClose={() => setImagePickerManager(false)}
        savePicture={savePicture} />}
    </SafeAreaView>
  );
};

export default AdminCourseProfile;
