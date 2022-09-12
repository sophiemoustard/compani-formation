import 'array-flat-polyfill';
import { useState, useEffect, useCallback } from 'react';
import { Text, View, ScrollView, Image, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { useIsFocused, CompositeScreenProps } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';
import get from 'lodash/get';
import Courses from '../../../../api/courses';
import CoursesSection from '../../../../components/CoursesSection';
import ProgramCell from '../../../../components/ProgramCell';
import { getTheoreticalHours } from '../../../../core/helpers/utils';
import { BlendedCourseType } from '../../../../types/CourseTypes';
import { RootBottomTabParamList, RootStackParamList } from '../../../../types/NavigationType';
import { getLoggedUserId } from '../../../../store/main/selectors';
import commonStyles from '../../../../styles/common';
import { BLENDED, OPERATIONS } from '../../../../core/data/constants';
import styles from '../styles';
import { isInProgress, isForthcoming, isCompleted, getElearningSteps } from '../helper';
import { CourseDisplayType } from '../types';

const formatCoursesDiplaysContent = (courses: BlendedCourseType[]) => {
  const coursesInProgress = courses.filter(c => isInProgress(c));
  const forthcomingCourses = courses.filter(c => isForthcoming(c));
  const completedCourses = courses.filter(c => isCompleted(c));

  const contents: CourseDisplayType[] = [
    {
      title: 'En cours',
      source: require('../../../../../assets/images/yellow_section_background.png'),
      imageStyle: styles.leftBackground,
      countStyle: styles.yellowCount,
      courses: coursesInProgress,
    },
    {
      title: 'À venir',
      source: require('../../../../../assets/images/purple_section_background.png'),
      imageStyle: styles.rightBackground,
      countStyle: styles.purpleCount,
      courses: forthcomingCourses,
    },
    {
      title: 'Terminées',
      source: require('../../../../../assets/images/green_section_background.png'),
      imageStyle: styles.leftBackground,
      countStyle: styles.greenCount,
      courses: completedCourses,
    },
  ];

  return contents.filter(section => section.courses.length);
};

const renderCourseItem = (course: BlendedCourseType) => <ProgramCell program={get(course, 'subProgram.program') || {}}
  misc={course.misc} theoreticalHours={getTheoreticalHours(getElearningSteps(get(course, 'subProgram.steps')))}
  onPress={() => {}} />;

interface TrainerCoursesProps extends CompositeScreenProps<
StackScreenProps<RootBottomTabParamList>,
StackScreenProps<RootStackParamList>
> {
  loggedUserId: string | null,
}

const TrainerCourses = ({ loggedUserId }: TrainerCoursesProps) => {
  const [coursesDisplays, setCoursesDisplays] = useState<CourseDisplayType[]>([]);
  const isFocused = useIsFocused();

  const getCourses = useCallback(async () => {
    try {
      if (loggedUserId) {
        const fetchedCourses = await Courses.getCourseList({
          action: OPERATIONS,
          format: BLENDED,
          trainer: loggedUserId,
        });
        const formatedCourses = formatCoursesDiplaysContent(fetchedCourses);
        setCoursesDisplays(formatedCourses);
      }
    } catch (e: any) {
      console.error(e);
      setCoursesDisplays([]);
    }
  }, [loggedUserId]);

  useEffect(() => {
    if (isFocused) getCourses();
  }, [isFocused, getCourses, loggedUserId]);

  return (
    <SafeAreaView style={commonStyles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={commonStyles.title} testID='header'>Espace intervenant</Text>
        {coursesDisplays.map(content => (
          <ImageBackground imageStyle={content.imageStyle} style={styles.sectionContainer}
            key={content.title} source={content.source}>
            <CoursesSection items={content.courses} title={content.title}
              countStyle={content.countStyle} renderItem={renderCourseItem} />
          </ImageBackground>
        ))}
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
