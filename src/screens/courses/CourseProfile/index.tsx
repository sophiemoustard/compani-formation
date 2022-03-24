import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ImageBackground,
  FlatList,
  ScrollView,
  StyleProp,
  ViewStyle,
  LogBox,
  BackHandler,
  TouchableOpacity,
  ImageSourcePropType,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import { useIsFocused, CompositeScreenProps } from '@react-navigation/native';
import get from 'lodash/get';
import has from 'lodash/has';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as IntentLauncher from 'expo-intent-launcher';
import { Buffer } from 'buffer';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, Ionicons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList, RootBottomTabParamList } from '../../../types/NavigationType';
import Courses from '../../../api/courses';
import Questionnaires from '../../../api/questionnaires';
import { GREY, WHITE } from '../../../styles/colors';
import { ICON, SCROLL_EVENT_THROTTLE } from '../../../styles/metrics';
import LiveCell from '../../../components/steps/LiveCell';
import ELearningCell from '../../../components/ELearningCell';
import { ON_SITE, E_LEARNING, REMOTE } from '../../../core/data/constants';
import commonStyles from '../../../styles/common';
import { CourseType, BlendedCourseType, ELearningProgramType } from '../../../types/CourseTypes';
import styles from './styles';
import MainActions from '../../../store/main/actions';
import CoursesActions from '../../../store/courses/actions';
import FeatherButton from '../../../components/icons/FeatherButton';
import ProgressBar from '../../../components/cards/ProgressBar';
import CourseProfileStickyHeader from '../../../components/CourseProfileStickyHeader';
import { getLoggedUserId } from '../../../store/main/selectors';
import QuestionnairesContainer from '../../../components/questionnaires/QuestionnairesContainer';
import { QuestionnaireType } from '../../../types/QuestionnaireType';
import { getCourseProgress } from '../../../core/helpers/utils';

LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

interface CourseProfileProps extends CompositeScreenProps<
StackScreenProps<RootStackParamList, 'CourseProfile'>,
StackScreenProps<RootBottomTabParamList>
> {
  userId: string,
  setStatusBarVisible: (boolean) => void,
  resetCourseReducer: () => void,
}

const renderStepCell = ({ item, index }, course, route) => {
  if ([ON_SITE, REMOTE].includes(item.type)) {
    return <LiveCell step={item} slots={course?.slots} index={index} profileId={route.params.courseId} />;
  }

  if (item.type === E_LEARNING) {
    return <ELearningCell step={item} index={index} profileId={route.params.courseId}
      endedActivity={route.params.endedActivity} />;
  }

  return null;
};

const renderSeparator = () => <View style={styles.separator} />;

const CourseProfile = ({ route, navigation, userId, setStatusBarVisible, resetCourseReducer }: CourseProfileProps) => {
  const [course, setCourse] = useState<CourseType | null>(null);
  const [questionnaires, setQuestionnaires] = useState<QuestionnaireType[]>([]);
  const [source, setSource] =
    useState<ImageSourcePropType>(require('../../../../assets/images/authentication_background_image.jpg'));
  const [programName, setProgramName] = useState<string>('');
  const [isHeaderSticky, setIsHeaderSticky] = useState <boolean>(false);
  const [progressBarY, setProgressBarY] = useState <number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setProgramName(get(course, 'subProgram.program.name') || '');

    const programImage = get(course, 'subProgram.program.image.link') || '';
    if (programImage) setSource({ uri: programImage });
    else setSource(require('../../../../assets/images/authentication_background_image.jpg'));
  }, [course]);

  const getCourse = useCallback(async () => {
    try {
      const fetchedCourse = await Courses.getCourse(route.params.courseId);
      const fetchedQuestionnaires = await Questionnaires.getUserQuestionnaires({ course: route.params.courseId });
      setCourse(fetchedCourse);
      setQuestionnaires(fetchedQuestionnaires);
    } catch (e: any) {
      console.error(e);
      setCourse(null);
    }
  }, [route.params.courseId]);

  useEffect(() => { getCourse(); }, [getCourse]);

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      setStatusBarVisible(true);
      getCourse();
    }
  }, [isFocused, getCourse, setStatusBarVisible]);

  const goBack = useCallback(() => {
    resetCourseReducer();
    navigation.navigate('Courses');
  }, [navigation, resetCourseReducer]);

  const hardwareBackPress = useCallback(() => {
    goBack();
    return true;
  }, [goBack]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', hardwareBackPress);

    return () => { BackHandler.removeEventListener('hardwareBackPress', hardwareBackPress); };
  }, [hardwareBackPress]);

  const goToAbout = () => {
    if (!course) return;
    if (course.subProgram.isStrictlyELearning) {
      const { program } = course.subProgram;
      const eLearningProgram = {
        ...program,
        subPrograms: [{ ...course.subProgram, courses: [{ _id: course._id, trainees: [userId] }] }],
      };
      navigation.navigate('ElearningAbout', { program: eLearningProgram as ELearningProgramType });
    } else {
      navigation.navigate('BlendedAbout', { course: course as BlendedCourseType });
    }
  };

  const downloadCompletionCertificate = async () => {
    if (!course) return;

    setIsLoading(true);
    const data = await Courses.downloadCertificate(course._id);

    const buffer = Buffer.from(data, 'base64');
    const pdf = buffer.toString('base64');
    const fileUri = `${FileSystem.documentDirectory}${encodeURI('attestation')}.pdf`;
    await FileSystem.writeAsStringAsync(fileUri, pdf, { encoding: FileSystem.EncodingType.Base64 });

    if (Platform.OS === 'ios') {
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

  const renderCells = item => renderStepCell(item, course, route);

  const getTitle = () => {
    if (!course) return '';
    if (!course?.subProgram.isStrictlyELearning) return programName;

    const { misc } = (course as BlendedCourseType);
    return `${programName}${misc ? `- ${misc}` : ''}`;
  };

  const isProgressBarOnTop = (event) => {
    const { y } = event.nativeEvent.contentOffset;
    setIsHeaderSticky(y >= progressBarY);
  };

  const getProgressBarY = (event) => {
    const { layout } = event.nativeEvent;
    setProgressBarY(layout.y);
  };

  const getHeader = () => course && has(course, 'subProgram.program') && (
    <View onLayout={getProgressBarY}>
      {isHeaderSticky
        ? <CourseProfileStickyHeader progress={getCourseProgress(course)} title={getTitle()} />
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

  return course && has(course, 'subProgram.program') && (
    <ScrollView style={commonStyles.container} nestedScrollEnabled={false} showsVerticalScrollIndicator={false}
      stickyHeaderIndices={[questionnaires.length ? 3 : 2]} scrollEventThrottle={SCROLL_EVENT_THROTTLE}
      onScroll={isProgressBarOnTop}>
      <ImageBackground source={source} imageStyle={styles.image}
        style={{ resizeMode: 'cover' } as StyleProp<ViewStyle>}>
        <LinearGradient colors={['transparent', 'rgba(0, 0, 0, 0.4)']} style={styles.gradient} />
        <View style={styles.header}>
          <FeatherButton style={styles.arrow} onPress={goBack} name="arrow-left" color={WHITE} size={ICON.MD}
            iconStyle={styles.arrowShadow} />
          <Text style={styles.title}>{getTitle()}</Text>
        </View>
      </ImageBackground>
      <View style={styles.aboutContainer}>
        <TouchableOpacity style={styles.aboutContent} onPress={goToAbout}>
          <Feather name='info' color={GREY[600]} size={ICON.MD} />
          <Text style={styles.aboutText}>A propos</Text>
        </TouchableOpacity>
      </View>
      {!!questionnaires.length && <QuestionnairesContainer questionnaires={questionnaires} profileId={course._id}/>}
      {getHeader()}
      <FlatList style={styles.flatList} data={course.subProgram.steps} keyExtractor={item => item._id}
        renderItem={renderCells} ItemSeparatorComponent={renderSeparator} />
      {!course.subProgram.isStrictlyELearning && !!get(course, 'slots.length') && <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonContent} onPress={downloadCompletionCertificate}
          disabled={isLoading}>
          {isLoading
            ? <ActivityIndicator color={WHITE} size="small" />
            : <View style={styles.certificateContent}>
              <Ionicons name='ribbon' color={WHITE} size={ICON.MD} />
              <Text style={styles.certificateText}>Attestation</Text>
            </View>}
        </TouchableOpacity>
      </View>}
    </ScrollView>
  );
};

const mapStateToProps = state => ({ userId: getLoggedUserId(state) });

const mapDispatchToProps = dispatch => ({
  setStatusBarVisible: statusBarVisible => dispatch(MainActions.setStatusBarVisible(statusBarVisible)),
  resetCourseReducer: () => dispatch(CoursesActions.resetCourseReducer()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CourseProfile);
