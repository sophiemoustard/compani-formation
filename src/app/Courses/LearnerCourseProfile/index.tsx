// @ts-nocheck
import { useState, useEffect, useCallback, Dispatch } from 'react';
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
import { connect } from 'react-redux';
import { useIsFocused, CompositeScreenProps } from '@react-navigation/native';
import get from 'lodash/get';
import has from 'lodash/has';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as IntentLauncher from 'expo-intent-launcher';
import { Buffer } from 'buffer';
import { Feather } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { RootStackParamList, RootBottomTabParamList } from '@/types/NavigationType';
import Courses from '@/api/courses';
import Questionnaires from '@/api/questionnaires';
import { WHITE, GREY } from '@/styles/colors';
import { ICON, SCROLL_EVENT_THROTTLE } from '@/styles/metrics';
import commonStyles from '@/styles/common';
import { CourseType, BlendedCourseType, ProgramType } from '@/types/CourseTypes';
import styles from './styles';
import MainActions from '@/store/main/actions';
import CourseActions from '@/store/course/actions';
import ProgramActions from '@/store/program/actions';
import ProgressBar from '@/components/cards/ProgressBar';
import CourseProfileStickyHeader from '@/components/CourseProfileStickyHeader';
import NiSecondaryButton from '@/components/form/SecondaryButton';
import { getLoggedUserId } from '@/store/main/selectors';
import QuestionnairesContainer from '@/components/questionnaires/QuestionnairesContainer';
import { QuestionnaireType } from '@/types/QuestionnaireType';
import { getCourseProgress } from '@/core/helpers/utils';
import CourseProfileHeader from '@/components/CourseProfileHeader';
import { FIRA_SANS_MEDIUM } from '@/styles/fonts';
import { renderStepList, getTitle } from '@/core/helpers/courseProfile/helper';
import { isIOS, LEARNER, PEDAGOGY } from '@/core/data/constants';
import { StateType } from '@/types/store/StoreType';
import { ActionType } from '@/context/types';

interface LearnerCourseProfileProps extends CompositeScreenProps<
StackScreenProps<RootStackParamList, 'LearnerCourseProfile'>,
StackScreenProps<RootBottomTabParamList>
> {
  userId: string,
  course: CourseType | null,
  setCourse: (course: CourseType | null) => void,
  setProgram: (program: ProgramType | null) => void,
  setStatusBarVisible: (boolean: boolean) => void,
  resetCourseReducer: () => void,
  resetProgramReducer: () => void,
}

const LearnerCourseProfile = ({
  userId,
  course,
  setCourse,
  setProgram,
  setStatusBarVisible,
  resetCourseReducer,
  resetProgramReducer,
}: LearnerCourseProfileProps) => {
  const router = useRouter();
  const { courseId } = useLocalSearchParams<{courseId: string}>();
  const params = useLocalSearchParams<{courseId: string}>();
  const [questionnaires, setQuestionnaires] = useState<QuestionnaireType[]>([]);
  const [source, setSource] =
    useState<ImageSourcePropType>(require('../../../../assets/images/authentication_background_image.webp'));
  const [isHeaderSticky, setIsHeaderSticky] = useState <boolean>(false);
  const [progressBarY, setProgressBarY] = useState <number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');

  const isFocused = useIsFocused();
  useEffect(() => {
    const getCourse = async () => {
      try {
        let fetchedCourse = course;
        if (!fetchedCourse) {
          fetchedCourse = await Courses.getCourse(courseId, PEDAGOGY);
          setCourse(fetchedCourse);
        }
        setTitle(getTitle(fetchedCourse));

        const programImage = get(fetchedCourse, 'subProgram.program.image.link') || '';
        if (programImage) setSource({ uri: programImage });
        const fetchedQuestionnaires = await Questionnaires.getUserQuestionnaires({ course: courseId });
        setQuestionnaires(fetchedQuestionnaires);
      } catch (e: any) {
        console.error(e);
        setCourse(null);
      }
    };

    if (isFocused) {
      setStatusBarVisible(true);
      getCourse();
    }
  }, [isFocused, setStatusBarVisible, courseId, setCourse, course]);

  const goBack = useCallback(() => {
    router.navigate('/Home/LearnerCourses');
    resetCourseReducer();
    resetProgramReducer();
  }, [resetCourseReducer, resetProgramReducer, router]);

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
    const pdfName = getPdfName(course);
    const fileUri = `${FileSystem.documentDirectory}${encodeURI(pdfName)}.pdf`;
    await FileSystem.writeAsStringAsync(fileUri, pdf, { encoding: FileSystem.EncodingType.Base64 });

    if (isIOS) {
      await Sharing.shareAsync(fileUri);
    } else {
      FileSystem.getContentUriAsync(fileUri).then((cUri) => {
        IntentLauncher.startActivityAsync('android.intent.action.VIEW' as IntentLauncher.ActivityAction, {
          data: cUri,
          flags: 1,
        });
      });
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
        subPrograms: [{ ...course.subProgram, courses: [{ _id: course._id, trainees: [userId] }] }],
      };
      setProgram(eLearningProgram);
      router.navigate('/Explore/ELearningAbout');
    } else {
      router.navigate({ pathname: '/Explore/BlendedAbout', params: { mode: LEARNER } });
    }
  };

  return course && has(course, 'subProgram.program') && (
    <SafeAreaView style={commonStyles.container} edges={['top']}>
      <ScrollView nestedScrollEnabled={false} showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[questionnaires.length ? 3 : 2]} scrollEventThrottle={SCROLL_EVENT_THROTTLE}
        onScroll={isProgressBarOnTop}>
        <CourseProfileHeader source={source} goBack={goBack} title={title} />
        <View style={styles.buttonsContainer}>
          <NiSecondaryButton caption='A propos' onPress={goToAbout} icon='info' borderColor={GREY[200]}
            bgColor={WHITE} font={FIRA_SANS_MEDIUM.LG} />
        </View>
        {!!questionnaires.length && <QuestionnairesContainer questionnaires={questionnaires} profileId={course._id}/>}
        {getHeader()}
        {renderStepList(course, LEARNER, params)}
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

const mapStateToProps = (state: StateType) => ({ userId: getLoggedUserId(state), course: state.course.course });

const mapDispatchToProps = (dispatch: Dispatch<ActionType>) => ({
  setStatusBarVisible: (statusBarVisible: boolean) => dispatch(MainActions.setStatusBarVisible(statusBarVisible)),
  setCourse: (course: CourseType | null) => dispatch(CourseActions.setCourse(course)),
  setProgram: (program: ProgramType | null) => dispatch(ProgramActions.setProgram(program)),
  resetCourseReducer: () => dispatch(CourseActions.resetCourseReducer()),
  resetProgramReducer: () => dispatch(ProgramActions.resetProgramReducer()),

});

export default connect(mapStateToProps, mapDispatchToProps)(LearnerCourseProfile);
