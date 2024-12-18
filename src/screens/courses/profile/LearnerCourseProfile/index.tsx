/* eslint-env browser */

import { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  BackHandler,
  TouchableOpacity,
  ImageSourcePropType,
  ActivityIndicator,
  LayoutChangeEvent,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused, CompositeScreenProps } from '@react-navigation/native';
import get from 'lodash/get';
import has from 'lodash/has';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as IntentLauncher from 'expo-intent-launcher';
import { Buffer } from 'buffer';
import { Feather } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList, RootBottomTabParamList } from '../../../../types/NavigationType';
import Courses from '../../../../api/courses';
import Questionnaires from '../../../../api/questionnaires';
import { WHITE, GREY } from '../../../../styles/colors';
import { ICON, SCROLL_EVENT_THROTTLE } from '../../../../styles/metrics';
import commonStyles from '../../../../styles/common';
import { CourseType, BlendedCourseType, ELearningProgramType } from '../../../../types/CourseTypes';
import styles from '../styles';
import { useGetLoggedUserId, useSetStatusBarVisible } from '../../../../store/main/hooks';
import ProgressBar from '../../../../components/cards/ProgressBar';
import CourseProfileStickyHeader from '../../../../components/CourseProfileStickyHeader';
import NiSecondaryButton from '../../../../components/form/SecondaryButton';
import QuestionnairesContainer from '../../../../components/questionnaires/QuestionnairesContainer';
import { QuestionnaireType } from '../../../../types/QuestionnaireType';
import { getCourseProgress } from '../../../../core/helpers/utils';
import CourseProfileHeader from '../../../../components/CourseProfileHeader';
import { FIRA_SANS_MEDIUM } from '../../../../styles/fonts';
import { renderStepList, getTitle } from '../helper';
import { IS_IOS, IS_WEB, LEARNER, PEDAGOGY } from '../../../../core/data/constants';

interface LearnerCourseProfileProps extends CompositeScreenProps<
StackScreenProps<RootStackParamList, 'LearnerCourseProfile'>,
StackScreenProps<RootBottomTabParamList>
>{}

const LearnerCourseProfile = ({ route, navigation }: LearnerCourseProfileProps) => {
  const setStatusBarVisible = useSetStatusBarVisible();
  const userId: string | null = useGetLoggedUserId();

  const [course, setCourse] = useState<CourseType | null>(null);
  const [questionnaires, setQuestionnaires] = useState<QuestionnaireType[]>([]);
  const [source, setSource] =
    useState<ImageSourcePropType>(require('../../../../../assets/images/authentication_background_image.webp'));
  const [isHeaderSticky, setIsHeaderSticky] = useState <boolean>(false);
  const [progressBarY, setProgressBarY] = useState <number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');

  const isFocused = useIsFocused();
  useEffect(() => {
    const getCourse = async () => {
      try {
        const fetchedCourse = await Courses.getCourse(route.params.courseId, PEDAGOGY);
        const fetchedQuestionnaires = await Questionnaires.getUserQuestionnaires({ course: route.params.courseId });
        setCourse(fetchedCourse);
        setQuestionnaires(fetchedQuestionnaires);
        setTitle(getTitle(fetchedCourse));

        const programImage = get(fetchedCourse, 'subProgram.program.image.link') || '';
        if (programImage) setSource({ uri: programImage });
      } catch (e: any) {
        console.error(e);
        setCourse(null);
      }
    };

    if (isFocused) {
      setStatusBarVisible(true);
      getCourse();
    }
  }, [isFocused, setStatusBarVisible, route.params.courseId]);

  const goBack = useCallback(() => {
    navigation.navigate('LearnerCourses');
  }, [navigation]);

  const hardwareBackPress = useCallback(() => {
    goBack();
    return true;
  }, [goBack]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', hardwareBackPress);

    return () => { BackHandler.removeEventListener('hardwareBackPress', hardwareBackPress); };
  }, [hardwareBackPress]);

  const getPdfName = (c: BlendedCourseType) => {
    const misc = c.misc ? `_${c.misc}` : '';

    return `attestation_${c.subProgram.program.name}${misc}`.replace(/[^a-zA-Zà-üÀ-Ü0-9-+]{1,}/g, '_');
  };

  const downloadCompletionCertificate = async () => {
    if (!course) return;

    setIsLoading(true);
    const data = await Courses.downloadCertificate(course._id);

    const buffer = Buffer.from(data, 'base64');
    const pdf = buffer.toString('base64');
    const pdfName = getPdfName(course as BlendedCourseType);

    if (!IS_WEB) {
      const fileUri = `${FileSystem.documentDirectory}${encodeURI(pdfName)}.pdf`;
      await FileSystem.writeAsStringAsync(fileUri, pdf, { encoding: FileSystem.EncodingType.Base64 });

      if (IS_IOS) {
        await Sharing.shareAsync(fileUri);
      } else {
        FileSystem.getContentUriAsync(fileUri).then((cUri) => {
          IntentLauncher.startActivityAsync('android.intent.action.VIEW' as IntentLauncher.ActivityAction, {
            data: cUri,
            flags: 1,
          });
        });
      }
    } else if (typeof document !== 'undefined') {
      const blob = new Blob([buffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = pdfName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
    setIsLoading(false);
  };

  const isProgressBarOnTop = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { y } = event.nativeEvent.contentOffset;
    setIsHeaderSticky(y >= progressBarY);
  };

  const getProgressBarY = (event: LayoutChangeEvent) => {
    const { layout } = event.nativeEvent;
    setProgressBarY(layout.y);
  };

  const getHeader = () => course && has(course, 'subProgram.program') && (
    <View onLayout={getProgressBarY}>
      {isHeaderSticky
        ? <CourseProfileStickyHeader progress={getCourseProgress(course)} title={title} />
        : <View style={styles.progressBarContainer}>
          <Text style={styles.progressBarText}>ÉTAPES</Text>
          <View style={commonStyles.progressBarContainer}>
            <ProgressBar progress={getCourseProgress(course) * 100} />
          </View>
          <Text style={styles.progressBarText}>{(getCourseProgress(course) * 100).toFixed(0)}%</Text>
        </View>
      }
    </View>
  );

  const goToAbout = () => {
    if (!course) return;
    if (course.subProgram.isStrictlyELearning) {
      const { program } = course.subProgram;
      const eLearningProgram = {
        ...program,
        subPrograms: [{ ...course.subProgram, courses: [{ _id: course._id, trainees: [userId!] }] }],
      };
      navigation.navigate('ElearningAbout', { program: eLearningProgram as ELearningProgramType });
    } else {
      navigation.navigate('BlendedAbout', { course: course as BlendedCourseType, mode: LEARNER });
    }
  };

  return course && has(course, 'subProgram.program') && (
    <SafeAreaView style={commonStyles.container} edges={['top']}>
      <ScrollView nestedScrollEnabled={false} showsVerticalScrollIndicator={IS_WEB}
        stickyHeaderIndices={[questionnaires.length ? 3 : 2]} scrollEventThrottle={SCROLL_EVENT_THROTTLE}
        onScroll={isProgressBarOnTop}>
        <CourseProfileHeader source={source} goBack={goBack} title={title} />
        <View style={styles.buttonsContainer}>
          <NiSecondaryButton caption='A propos' onPress={goToAbout} icon='info' borderColor={GREY[200]}
            bgColor={WHITE} font={FIRA_SANS_MEDIUM.LG} />
        </View>
        {!!questionnaires.length && <QuestionnairesContainer questionnaires={questionnaires} profileId={course._id}/>}
        {getHeader()}
        {renderStepList(course, LEARNER, route)}
        {course.areLastSlotAttendancesValidated && <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonContent} onPress={downloadCompletionCertificate}
            disabled={isLoading}>
            {isLoading
              ? <ActivityIndicator color={WHITE} size="small" />
              : <View style={styles.certificateContent}>
                <Feather name='award' color={WHITE} size={ICON.MD} />
                <Text style={styles.certificateText}>Attestation</Text>
              </View>}
          </TouchableOpacity>
        </View>}
      </ScrollView>
    </SafeAreaView>
  );
};

export default LearnerCourseProfile;
