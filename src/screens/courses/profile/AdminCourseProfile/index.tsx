// @ts-nocheck

import { useState, useEffect, useCallback, useMemo } from 'react';
import { View, BackHandler, Text, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import pick from 'lodash/pick';
import uniqBy from 'lodash/uniqBy';
import get from 'lodash/get';
import has from 'lodash/has';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../types/NavigationType';
import Courses from '../../../../api/courses';
import AttendanceSheets from '../../../../api/attendanceSheets';
import Questionnaires from '../../../../api/questionnaires';
import commonStyles from '../../../../styles/common';
import { ICON } from '../../../../styles/metrics';
import { GREY, PINK } from '../../../../styles/colors';
import { BlendedCourseType, SlotType, TraineeType } from '../../../../types/CourseTypes';
import { PictureType } from '../../../../types/PictureTypes';
import styles from './styles';
import { getTitle } from '../helper';
import CourseAboutHeader from '../../../../components/CourseAboutHeader';
import {
  DD_MM_YYYY,
  IMAGE,
  INTRA,
  INTER_B2B,
  INTRA_HOLDING,
  LONG_FIRSTNAME_LONG_LASTNAME,
  OPERATIONS,
  PDF,
  SHORT_FIRSTNAME_LONG_LASTNAME,
} from '../../../../core/data/constants';
import CompaniDate from '../../../../core/helpers/dates/companiDates';
import { ascendingSort } from '../../../../core/helpers/dates/utils';
import PersonCell from '../../../../components/PersonCell';
import ContactInfoContainer from '../../../../components/ContactInfoContainer';
import {
  AttendanceSheetType,
  InterAttendanceSheetType,
  IntraOrIntraHoldingAttendanceSheetType,
  isIntraOrIntraHolding,
} from '../../../../types/AttendanceSheetTypes';
import UploadButton from '../../../../components/form/UploadButton';
import ImagePickerManager from '../../../../components/ImagePickerManager';
import PictureModal from '../../../../components/PictureModal';
import CameraModal from '../../../../components/camera/CameraModal';
import { formatImage, formatPayload } from '../../../../core/helpers/pictures';
import { formatIdentity, sortStrings } from '../../../../core/helpers/utils';
import ImagePreview from '../../../../components/ImagePreview';
import QuestionnaireQRCodeCell from '../../../../components/QuestionnaireQRCodeCell';

interface AdminCourseProfileProps extends StackScreenProps<RootStackParamList, 'TrainerCourseProfile'> {
}

interface imagePreviewProps {
  visible: boolean,
  id: string,
  link: string,
  type: string,
}

const AdminCourseProfile = ({ route, navigation }: AdminCourseProfileProps) => {
  const [course, setCourse] = useState<BlendedCourseType | null>(null);
  const [savedAttendanceSheets, setSavedAttendanceSheets] = useState<AttendanceSheetType[]>([]);
  const [title, setTitle] = useState<string>('');
  const [firstSlot, setFirstSlot] = useState<SlotType>(null);
  const [noAttendancesMessage, setNoAttendancesMessage] = useState<string>('');
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

    if (CompaniDate().isBefore(firstSlot.startDate)) return [];
    const interCourseSavedSheets = savedAttendanceSheets as InterAttendanceSheetType[];
    const savedTrainees = interCourseSavedSheets.map(sheet => sheet.trainee?._id);

    return [...new Set(
      course?.trainees?.map(t => ({ value: t._id, label: formatIdentity(t.identity, LONG_FIRSTNAME_LONG_LASTNAME) }))
        .filter(trainee => !savedTrainees.includes(trainee.value))
    )];
  }, [course, firstSlot, savedAttendanceSheets]);
  const [pictureModal, setPictureModal] = useState<boolean>(false);
  const [attendanceSheetToAdd, setAttendanceSheetToAdd] = useState<string>('');
  const [camera, setCamera] = useState<boolean>(false);
  const [imagePickerManager, setImagePickerManager] = useState<boolean>(false);
  const [imagePreview, setImagePreview] =
    useState<imagePreviewProps>({ visible: false, id: '', link: '', type: '' });
  const [questionnaireQRCode, setQuestionnaireQRCode] = useState('');
  const [questionnairesType, setQuestionnairesType] = useState([]);

  const refreshAttendanceSheets = async (courseId: string) => {
    const fetchedAttendanceSheets = await AttendanceSheets.getAttendanceSheetList({ course: courseId });
    setSavedAttendanceSheets(fetchedAttendanceSheets);
  };

  const getQuestionnaireQRCode = async (courseId: string) => {
    try {
      const publishedQuestionnaires = await Questionnaires.list({ course: courseId });
      setQuestionnairesType(publishedQuestionnaires.map(q => q.type).sort((a, b) => sortStrings(a, b)));

      if (publishedQuestionnaires.length) {
        const qrCode = await Questionnaires.getQRCode({ course: courseId });
        setQuestionnaireQRCode(qrCode);
      }
    } catch (e: any) {
      console.error(e);
      setQuestionnaireQRCode([]);
    }
  };

  useEffect(() => {
    const getCourse = async () => {
      try {
        const fetchedCourse = await Courses.getCourse(route.params.courseId, OPERATIONS);
        await refreshAttendanceSheets(fetchedCourse._id);
        await getQuestionnaireQRCode(fetchedCourse._id);

        if (fetchedCourse.slots.length) setFirstSlot([...fetchedCourse.slots].sort(ascendingSort('startDate'))[0]);
        setCourse(fetchedCourse as BlendedCourseType);
        setTitle(getTitle(fetchedCourse));
      } catch (e: any) {
        console.error(e);
        setCourse(null);
      }
    };

    getCourse();
  }, [route.params.courseId]);

  useEffect(() => {
    if (!firstSlot) setNoAttendancesMessage('Veuillez ajouter des créneaux pour émarger la formation.');
    else if (CompaniDate().isBefore(firstSlot.startDate)) {
      setNoAttendancesMessage('L\'émargement sera disponible une fois le premier créneau passé.');
    } else if (course?.type === INTER_B2B && !course?.trainees.length) {
      setNoAttendancesMessage('Veuillez ajouter des stagiaires pour émarger la formation.');
    }
  }, [course, firstSlot]);

  const hardwareBackPress = useCallback(() => {
    navigation.goBack();
    return true;
  }, [navigation]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', hardwareBackPress);

    return () => { BackHandler.removeEventListener('hardwareBackPress', hardwareBackPress); };
  }, [hardwareBackPress]);

  const renderTrainee = (person: TraineeType) => <PersonCell person={person} />;

  const savePicture = async (picture: PictureType) => {
    try {
      if (course) {
        const file = await formatImage(picture, `emargement-${attendanceSheetToAdd}`);
        const data = formatPayload({
          file,
          course: course._id,
          ...(course.type === INTER_B2B ? { trainee: attendanceSheetToAdd } : { date: attendanceSheetToAdd }),
        });
        await AttendanceSheets.upload(data);
        await refreshAttendanceSheets(course._id);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setAttendanceSheetToAdd('');
    }
  };

  const openPictureModal = (sheetToUpload) => {
    setPictureModal(true);
    setAttendanceSheetToAdd(sheetToUpload);
  };

  const deleteAttendanceSheets = async () => {
    try {
      await AttendanceSheets.delete(imagePreview.id);
      await refreshAttendanceSheets(get(course, '_id'));
    } catch (error) {
      console.error(error);
    }
  };

  const openImagePreview = async (id: string, link: string) => {
    await new Promise(() => {
      Image.getSize(
        link || '',
        (image) => { setImagePreview({ visible: true, id, link: link || '', type: image ? IMAGE : PDF }); },
        () => setImagePreview({ visible: true, id, link, type: PDF })
      );
    });
  };

  const resetImagePreview = () => setImagePreview({ visible: false, id: '', link: '', type: '' });

  const renderSavedAttendanceSheets = (sheet: AttendanceSheetType) => {
    const label = isIntraOrIntraHolding(sheet)
      ? CompaniDate(sheet.date).format(DD_MM_YYYY)
      : formatIdentity(sheet.trainee.identity, SHORT_FIRSTNAME_LONG_LASTNAME);

    return (
      <View key={sheet._id} style={styles.savedSheetContent}>
        <TouchableOpacity onPress={() => openImagePreview(sheet._id, sheet.file.link)}>
          <Feather name='file-text' size={ICON.XXL} color={GREY[900]} />
          <View style={styles.editButton}><Feather name='edit-2' size={ICON.SM} color={PINK[500]} /></View>
        </TouchableOpacity>
        <Text style={styles.savedSheetText} numberOfLines={2}>{label}</Text>
      </View>);
  };

  return course && has(course, 'subProgram.program') && (
    <SafeAreaView style={commonStyles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <CourseAboutHeader screenTitle="ESPACE INTERVENANT" courseTitle={title} goBack={navigation.goBack} />
        <View style={styles.attendancesContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.sectionTitle}>Emargements</Text>
            {!missingAttendanceSheets.length && !savedAttendanceSheets.length &&
              <Text style={styles.italicText}>{noAttendancesMessage}</Text>}
          </View>
          {!!missingAttendanceSheets.length && !course.archivedAt && <View style={styles.sectionContainer}>
            <Text style={styles.italicText}>Chargez vos feuilles d&apos;émargements quand elles sont complètes.</Text>
            <View style={styles.listContainer}>
              {missingAttendanceSheets.map(sheetToUpload =>
                <UploadButton title={sheetToUpload.label} key={sheetToUpload.value} disabled={!course.companies.length}
                  style={styles.uploadButton} onPress={() => openPictureModal(sheetToUpload.value)} />)}
              {!course.companies.length &&
                <Text style={styles.italicText}>
                  Au moins une structure doit être rattachée à la formation pour pouvoir ajouter une feuille
                  d&apos;émargement.
                </Text>
              }
            </View>
          </View>}
          {!!savedAttendanceSheets.length &&
          <FlatList data={savedAttendanceSheets} keyExtractor={item => item._id} showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => renderSavedAttendanceSheets(item)} style={styles.listContainer} horizontal />}
        </View>
        <View style={styles.sectionContainer}>
          <View style={commonStyles.sectionDelimiter} />
          <Text style={styles.sectionTitle}>Stagiaires</Text>
          {!course.trainees?.length &&
          <Text style={styles.italicText}>Il n&apos;y a aucun stagiaire pour cette formation.</Text>
          }
          {!!course.trainees && course.trainees.map(item => <View key={item._id}>{renderTrainee(item)}</View>)}
        </View>
        {!!questionnaireQRCode && <View style={styles.sectionContainer}>
          <View style={commonStyles.sectionDelimiter} />
          <Text style={styles.sectionTitle}>Questionnaires</Text>
          <QuestionnaireQRCodeCell img={questionnaireQRCode} types={questionnairesType}
            courseId={course._id} />
        </View>}
        {course.type !== INTER_B2B && <View style={styles.sectionContainer}>
          <View style={commonStyles.sectionDelimiter} />
          <ContactInfoContainer contact={course.companyRepresentative}
            title={'Votre chargé de formation structure'} />
        </View>}
        <View style={styles.footer} />
      </ScrollView>
      <PictureModal visible={pictureModal} closePictureModal={() => setPictureModal(false)}
        openCamera={() => setCamera(true)} openImagePickerManager={() => setImagePickerManager(true)} />
      {camera && <CameraModal onRequestClose={() => setCamera(false)} savePicture={savePicture} visible={camera} />}
      {imagePickerManager && <ImagePickerManager onRequestClose={() => setImagePickerManager(false)}
        savePicture={savePicture} />}
      {imagePreview.visible && <ImagePreview source={pick(imagePreview, ['link', 'type'])}
        onRequestClose={resetImagePreview} deleteFile={deleteAttendanceSheets} showButton={!course.archivedAt}/>}
    </SafeAreaView>
  );
};

export default AdminCourseProfile;
