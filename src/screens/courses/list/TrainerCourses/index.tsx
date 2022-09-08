import 'array-flat-polyfill';
import { useState, useEffect, useCallback } from 'react';
import { Text, View, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';
import { useIsFocused, CompositeScreenProps } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';
import { getLoggedUserId } from '../../../../store/main/selectors';
import Courses from '../../../../api/courses';
import commonStyles from '../../../../styles/common';
import { CourseType } from '../../../../types/CourseTypes';
import { RootBottomTabParamList, RootStackParamList } from '../../../../types/NavigationType';
import styles from '../styles';

interface TrainerCoursesProps extends CompositeScreenProps<
StackScreenProps<RootBottomTabParamList>,
StackScreenProps<RootStackParamList>
> {
  loggedUserId: string | null,
}

const TrainerCourses = ({ loggedUserId }: TrainerCoursesProps) => {
  const [courses, setCourses] = useState<CourseType[]>([]);
  const isFocused = useIsFocused();

  const getCourses = useCallback(async () => {
    try {
      if (loggedUserId) {
        const fetchedCourses: CourseType[] = await Courses.getTrainerCourses(loggedUserId);
        setCourses(fetchedCourses);
      }
    } catch (e: any) {
      console.error(e);
      // dispatch({ type: RESET_COURSES });
    }
  }, [loggedUserId]);

  useEffect(() => {
    if (isFocused) getCourses();
  }, [isFocused, getCourses, loggedUserId]);

  return (
    <SafeAreaView style={commonStyles.container} edges={['top']}>
      <Text>{JSON.stringify(courses)}</Text>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={commonStyles.title} testID='header'>Espace intervenant</Text>
        <View style={styles.footer}>
          <Image style={styles.elipse} source={require('../../../../../assets/images/log_out_background.png')} />
          <Image source={require('../../../../../assets/images/pa_aidant_balade_bleu.png')} style={styles.fellow} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({ loggedUserId: getLoggedUserId(state) });

export default connect(mapStateToProps)(TrainerCourses);
