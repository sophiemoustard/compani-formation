// @ts-nocheck

import { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, BackHandler, ImageSourcePropType } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused, CompositeScreenProps } from '@react-navigation/native';
import get from 'lodash/get';
import has from 'lodash/has';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList, RootBottomTabParamList } from '../../../../types/NavigationType';
import Courses from '../../../../api/courses';
import { WHITE, GREY } from '../../../../styles/colors';
import commonStyles from '../../../../styles/common';
import { CourseType, BlendedCourseType } from '../../../../types/CourseTypes';
import styles from '../styles';
import { useSetStatusBarVisible } from '../../../../store/main/hooks';
import NiSecondaryButton from '../../../../components/form/SecondaryButton';
import CourseProfileHeader from '../../../../components/CourseProfileHeader';
import { FIRA_SANS_MEDIUM } from '../../../../styles/fonts';
import { getTitle, renderStepList } from '../helper';
import { PEDAGOGY, TRAINER } from '../../../../core/data/constants';

const ADMIN_SCREEN = 'AdminCourseProfile';
const ABOUT_SCREEN = 'BlendedAbout';

interface TrainerCourseProfileProps extends CompositeScreenProps<
StackScreenProps<RootStackParamList, 'TrainerCourseProfile'>,
StackScreenProps<RootBottomTabParamList>
> {
}

const TrainerCourseProfile = ({
  route,
  navigation,
}: TrainerCourseProfileProps) => {
  const setStatusBarVisible = useSetStatusBarVisible();

  const [course, setCourse] = useState<CourseType | null>(null);
  const [source, setSource] =
    useState<ImageSourcePropType>(require('../../../../../assets/images/authentication_background_image.webp'));
  const [title, setTitle] = useState<string>('');

  const isFocused = useIsFocused();
  useEffect(() => {
    const getCourse = async () => {
      try {
        const fetchedCourse = await Courses.getCourse(route.params.courseId, PEDAGOGY);
        setCourse(fetchedCourse);
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
  }, [isFocused, route.params.courseId, setStatusBarVisible]);

  const goBack = useCallback(() => {
    navigation.navigate('TrainerCourses');
  }, [navigation]);

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

    if (screen === ABOUT_SCREEN) navigation.navigate(screen, { course: course as BlendedCourseType, mode: TRAINER });
    else navigation.navigate(screen, { courseId: course._id });
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
        {renderStepList(course, TRAINER, route)}
      </ScrollView>
    </SafeAreaView>
  );
};

export default TrainerCourseProfile;
