import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  ImageBackground,
  FlatList,
  ScrollView,
  StyleProp,
  ViewStyle,
  LogBox,
} from 'react-native';
import { connect } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import get from 'lodash/get';
import groupBy from 'lodash/groupBy';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationType } from '../../../types/NavigationType';
import Courses from '../../../api/courses';
import { WHITE } from '../../../styles/colors';
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
import IconButton from '../../../components/IconButton';
import moment from '../../../core/helpers/moment';
import ProgressBar from '../../../components/cards/ProgressBar';
import { CourseSlotType } from '../../../types/CourseSlotType';

LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

interface CourseProfileProps {
  route: { params: { courseId: string } },
  navigation: NavigationType,
  setStatusBarVisible: (boolean) => void,
  resetCourseReducer: () => void,
}

const CourseProfile = ({ route, navigation, setStatusBarVisible, resetCourseReducer }: CourseProfileProps) => {
  const [course, setCourse] = useState<CourseType | null>(null);
  const [totalProgress, setTotalProgress] = useState<number>(0);
  const { signOut } = useContext(AuthContext);

  const getCourse = async () => {
    try {
      const fetchedCourse = await Courses.getCourse(route.params.courseId);
      setCourse(fetchedCourse);
    } catch (e) {
      if (e.status === 401) signOut();
      setCourse(null);
    }
  };

  const elearningStepProgress = (step) => {
    const progress = step.activities.filter(activity => activity.activityHistories.length > 0).length;
    const maxProgress = step.activities.length;

    return maxProgress ? progress / maxProgress : 0;
  };

  const onSiteSlotsProgress = (slots) => {
    const nextSlots = slots.filter(slot => moment().isSameOrBefore(slot.endDate));

    return slots.length ? 1 - nextSlots.length / slots.length : 0;
  };

  const reducer = (accumulator, currentValue) => accumulator + currentValue;

  useEffect(() => {
    async function fetchData() { await getCourse(); }
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isFocused = useIsFocused();
  useEffect(() => {
    async function fetchData() { await getCourse(); }
    if (isFocused) {
      setStatusBarVisible(true);
      fetchData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  useEffect(() => {
    if (isFocused && course) {
      const { steps } = course.subProgram;
      const eLearningAchievedSteps = steps
        .filter(step => step.type === E_LEARNING)
        .map(step => elearningStepProgress(step)).reduce(reducer, 0);
      const slotsByStep: Array<CourseSlotType[]> = groupBy(course.slots.filter(s => get(s, 'step')), s => s.step);
      const onSiteAchievedSteps = Object.values(slotsByStep).map(slot => onSiteSlotsProgress(slot)).reduce(reducer, 0);
      const achievedSteps = eLearningAchievedSteps + onSiteAchievedSteps;

      setTotalProgress(steps.length ? (achievedSteps / steps.length) * 100 : 0);
    }
  }, [course, isFocused]);

  const programImage = get(course, 'subProgram.program.image.link') || '';
  const programName = get(course, 'subProgram.program.name') || '';
  const source = programImage
    ? { uri: programImage }
    : require('../../../../assets/images/authentication_background_image.jpg');
  const goBack = () => {
    resetCourseReducer();
    navigation.navigate('Home', { screen: 'Courses', params: { screen: 'CourseList' } });
  };

  const renderCells = ({ item, index }) => {
    if (item.type === ON_SITE) return <OnSiteCell step={item} slots={course?.slots} index={index} />;

    if (item.type === E_LEARNING) {
      return <ELearningCell step={item} index={index} navigation={navigation} id={route.params.courseId} />;
    }

    return null;
  };

  const renderSeparator = () => <View style={styles.separator} />;

  return course && (
    <ScrollView style={commonStyles.container} nestedScrollEnabled={false} showsVerticalScrollIndicator={false}>
      <ImageBackground source={source} imageStyle={styles.image}
        style={{ resizeMode: 'cover' } as StyleProp<ViewStyle>}>
        <LinearGradient colors={['transparent', 'rgba(0, 0, 0, 0.4)']} style={styles.gradient} />
        <View style={styles.header}>
          <IconButton style={styles.arrow} onPress={goBack} name="arrow-left" color={WHITE} size={ICON.MD}/>
          <Text style={styles.title}>{programName}</Text>
        </View>
      </ImageBackground>
      <View style={styles.progressBarContainer}>
        <Text style={styles.progressBarText}>ÉTAPES</Text>
        <ProgressBar progress={totalProgress} />
        <Text style={styles.progressBarText}>{totalProgress.toFixed(0)}%</Text>
      </View>
      <FlatList style={styles.flatList} data={course.subProgram.steps} keyExtractor={item => item._id}
        renderItem={renderCells} ItemSeparatorComponent={renderSeparator} />
    </ScrollView>
  );
};

const mapDispatchToProps = dispatch => ({
  setStatusBarVisible: statusBarVisible => dispatch(MainActions.setStatusBarVisible(statusBarVisible)),
  resetCourseReducer: () => dispatch(CoursesActions.resetCourseReducer()),
});

export default connect(null, mapDispatchToProps)(CourseProfile);
