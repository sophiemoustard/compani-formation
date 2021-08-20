import React, { useState, useEffect, useContext, useCallback } from 'react';
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
} from 'react-native';
import { connect } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import get from 'lodash/get';
import has from 'lodash/has';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { NavigationType } from '../../../types/NavigationType';
import Courses from '../../../api/courses';
import Questionnaires from '../../../api/questionnaires';
import { GREY, WHITE } from '../../../styles/colors';
import { ICON } from '../../../styles/metrics';
import OnSiteCell from '../../../components/steps/OnSiteCell';
import ELearningCell from '../../../components/ELearningCell';
import { Context as AuthContext } from '../../../context/AuthContext';
import { ON_SITE, E_LEARNING } from '../../../core/data/constants';
import commonStyles from '../../../styles/common';
import { CourseType } from '../../../types/CourseType';
import styles from './styles';
import MainActions from '../../../store/main/actions';
import CoursesActions from '../../../store/courses/actions';
import FeatherButton from '../../../components/icons/FeatherButton';
import ProgressBar from '../../../components/cards/ProgressBar';
import { getLoggedUserId } from '../../../store/main/selectors';
import QuestionnairesContainer from '../../../components/questionnaires/QuestionnairesContainer';
import { QuestionnaireType } from '../../../types/QuestionnaireType';

LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

interface CourseProfileProps {
  route: { params: { courseId: string, endedActivity?: string} },
  navigation: NavigationType,
  userId: string,
  setStatusBarVisible: (boolean) => void,
  resetCourseReducer: () => void,
}

const renderStepCell = ({ item, index }, course, route) => {
  if (item.type === ON_SITE) {
    return <OnSiteCell step={item} slots={course?.slots} index={index} profileId={route.params.courseId} />;
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
  const [questionnaires, setQuestionnaires] = useState<Array<QuestionnaireType>>([]);
  const [source, setSource] =
    useState<ImageSourcePropType>(require('../../../../assets/images/authentication_background_image.jpg'));
  const [programName, setProgramName] = useState<string>('');
  const { signOut } = useContext(AuthContext);

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
    } catch (e) {
      if (e.response.status === 401) signOut();
      setCourse(null);
    }
  }, [route.params.courseId, signOut]);

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
    navigation.navigate('Home', { screen: 'Courses', params: { screen: 'CourseList' } });
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
      navigation.navigate('ElearningAbout', { program: eLearningProgram });
    } else navigation.navigate('BlendedAbout', { course });
  };

  const renderCells = item => renderStepCell(item, course, route);

  return course && has(course, 'subProgram.program') && (
    <ScrollView style={commonStyles.container} nestedScrollEnabled={false} showsVerticalScrollIndicator={false}>
      <ImageBackground source={source} imageStyle={styles.image}
        style={{ resizeMode: 'cover' } as StyleProp<ViewStyle>}>
        <LinearGradient colors={['transparent', 'rgba(0, 0, 0, 0.4)']} style={styles.gradient} />
        <View style={styles.header}>
          <FeatherButton style={styles.arrow} onPress={goBack} name="arrow-left" color={WHITE} size={ICON.MD}
            iconStyle={styles.arrowShadow} />
          <Text style={styles.title}>{programName}{course.misc ? ` - ${course.misc}` : ''}</Text>
        </View>
      </ImageBackground>
      <View style={styles.aboutContainer}>
        <TouchableOpacity style={styles.aboutContent} onPress={goToAbout}>
          <Feather name='info' color={GREY[600]} size={ICON.MD} />
          <Text style={styles.aboutText}>A propos</Text>
        </TouchableOpacity>
      </View>
      {!!questionnaires.length && <QuestionnairesContainer questionnaires={questionnaires} profileId={course._id}/>}
      <View style={styles.progressBarContainer}>
        <Text style={styles.progressBarText}>ÉTAPES</Text>
        <ProgressBar progress={course.progress * 100} />
        <Text style={styles.progressBarText}>{(course.progress * 100).toFixed(0)}%</Text>
      </View>
      <FlatList style={styles.flatList} data={course.subProgram.steps} keyExtractor={item => item._id}
        renderItem={renderCells} ItemSeparatorComponent={renderSeparator} />
    </ScrollView>
  );
};

const mapStateToProps = state => ({ userId: getLoggedUserId(state) });

const mapDispatchToProps = dispatch => ({
  setStatusBarVisible: statusBarVisible => dispatch(MainActions.setStatusBarVisible(statusBarVisible)),
  resetCourseReducer: () => dispatch(CoursesActions.resetCourseReducer()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CourseProfile);
