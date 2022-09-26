import { useState, useEffect, useCallback } from 'react';
import { View, BackHandler } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import has from 'lodash/has';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../types/NavigationType';
import Courses from '../../../../api/courses';
import commonStyles from '../../../../styles/common';
import { CourseType } from '../../../../types/CourseTypes';
import styles from '../styles';
import { getTitle } from '../helper';
import CourseAboutHeader from '../../../../components/CourseAboutHeader';

interface AdminCourseProfileProps extends StackScreenProps<RootStackParamList, 'TrainerCourseProfile'> {
}

const AdminCourseProfile = ({
  route,
  navigation,
}: AdminCourseProfileProps) => {
  const [course, setCourse] = useState<CourseType | null>(null);
  const [title, setTitle] = useState<string>('');

  useEffect(() => {
    const getCourse = async () => {
      try {
        const fetchedCourse = await Courses.getCourse(route.params.courseId);
        setCourse(fetchedCourse);
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

  return course && has(course, 'subProgram.program') && (
    <SafeAreaView style={commonStyles.container} edges={['top']}>
      <View style={styles.adminHeader} />
      <CourseAboutHeader screenTitle="ESPACE INTERVENANT" courseTitle={title} onGoBack={navigation.goBack} />
    </SafeAreaView>
  );
};

export default AdminCourseProfile;
