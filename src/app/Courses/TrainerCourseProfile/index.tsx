// @ts-nocheck

import { useState, useEffect, useCallback, Dispatch } from 'react';
import { View, ScrollView, BackHandler, ImageSourcePropType } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { useIsFocused, CompositeScreenProps } from '@react-navigation/native';
import get from 'lodash/get';
import has from 'lodash/has';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList, RootBottomTabParamList } from '@/types/NavigationType';
import Courses from '@/api/courses';
import { WHITE, GREY } from '@/styles/colors';
import commonStyles from '@/styles/common';
import { CourseType } from '@/types/CourseTypes';
import styles from './styles';
import MainActions from '@/store/main/actions';
import CourseActions from '@/store/course/actions';
import NiSecondaryButton from '@/components/form/SecondaryButton';
import CourseProfileHeader from '@/components/CourseProfileHeader';
import { FIRA_SANS_MEDIUM } from '@/styles/fonts';
import { getTitle, renderStepList } from '@/core/helpers/courseProfile/helper';
import { PEDAGOGY, TRAINER } from '@/core/data/constants';
import { StateType } from '@/types/store/StoreType';
import { ActionType } from '@/context/types';

const ADMIN_SCREEN = '/Courses/AdminCourseProfile';
const ABOUT_SCREEN = '/Explore/BlendedAbout';

interface TrainerCourseProfileProps extends CompositeScreenProps<
StackScreenProps<RootStackParamList, 'TrainerCourseProfile'>,
StackScreenProps<RootBottomTabParamList>
> {
  course: CourseType | null,
  setCourse: (course: CourseType | null) => void,
  setStatusBarVisible: (boolean: boolean) => void,
  resetCourseReducer: () => void,
}

const TrainerCourseProfile = ({
  course,
  setCourse,
  setStatusBarVisible,
  resetCourseReducer,
}: TrainerCourseProfileProps) => {
  const router = useRouter();
  const { courseId } = useLocalSearchParams<{courseId: string}>();
  const params = useLocalSearchParams<{courseId: string}>();
  const [source, setSource] =
    useState<ImageSourcePropType>(require('../../../../assets/images/authentication_background_image.webp'));
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
    router.navigate('/Home/TrainerCourses');
    resetCourseReducer();
  }, [resetCourseReducer, router]);

  const hardwareBackPress = useCallback(() => {
    goBack();
    return true;
  }, [goBack]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', hardwareBackPress);

    return () => { BackHandler.removeEventListener('hardwareBackPress', hardwareBackPress); };
  }, [hardwareBackPress]);

  const goTo = (screen: typeof ABOUT_SCREEN | typeof ADMIN_SCREEN) => {
    if (!course) return;

    if (screen === ABOUT_SCREEN) router.navigate({ pathname: screen, params: { mode: TRAINER } });
    else router.navigate({ pathname: screen, params: { courseId: course._id } });
  };

  return course && has(course, 'subProgram.program') && (
    <SafeAreaView style={commonStyles.container} edges={['top']}>
      <ScrollView nestedScrollEnabled={false} showsVerticalScrollIndicator={false}>
        <CourseProfileHeader source={source} goBack={goBack} title={title} />
        <View style={styles.buttonsContainer}>
          <NiSecondaryButton caption='Espace admin' onPress={() => goTo(ADMIN_SCREEN)} icon='folder' color={GREY[700]}
            customStyle={styles.adminButton} borderColor={GREY[200]} bgColor={GREY[200]} font={FIRA_SANS_MEDIUM.LG} />
          <NiSecondaryButton caption='A propos' onPress={() => goTo(ABOUT_SCREEN)} icon='info' borderColor={GREY[200]}
            bgColor={WHITE} font={FIRA_SANS_MEDIUM.LG} />
        </View>
        {renderStepList(course, TRAINER, params)}
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state: StateType) => ({ course: state.course.course });

const mapDispatchToProps = (dispatch: Dispatch<ActionType>) => ({
  setStatusBarVisible: (statusBarVisible: boolean) => dispatch(MainActions.setStatusBarVisible(statusBarVisible)),
  setCourse: (course: CourseType) => dispatch(CourseActions.setCourse(course)),
  resetCourseReducer: () => dispatch(CourseActions.resetCourseReducer()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrainerCourseProfile);
