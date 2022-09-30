import 'array-flat-polyfill';
import { useState, useEffect, useCallback } from 'react';
import { Text, View, ScrollView, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { useIsFocused, CompositeScreenProps } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';
import get from 'lodash/get';
import Courses from '../../../../api/courses';
import CoursesSection, { EVENT_SECTION } from '../../../../components/CoursesSection';
import NextStepCell from '../../../../components/steps/NextStepCell';
import ProgramCell from '../../../../components/ProgramCell';
import HomeScreenFooter from '../../../../components/HomeScreenFooter';
import { getTheoreticalHours } from '../../../../core/helpers/utils';
import { BlendedCourseType } from '../../../../types/CourseTypes';
import { NextSlotsStepType } from '../../../../types/StepTypes';
import { RootBottomTabParamList, RootStackParamList } from '../../../../types/NavigationType';
import { getLoggedUserId } from '../../../../store/main/selectors';
import commonStyles from '../../../../styles/common';
import { BLENDED, OPERATIONS, TRAINER } from '../../../../core/data/constants';
import styles from '../styles';
import { isInProgress, isForthcoming, isCompleted, getElearningSteps, formatNextSteps } from '../helper';
import { CourseDisplayType } from '../types';
import TrainerEmptyState from '../TrainerEmptyState';
import { ActionWithoutPayloadType } from '../../../../types/store/StoreType';
import { CourseModeType } from '../../../../types/store/CourseStoreType';
import CoursesActions from '../../../../store/courses/actions';

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

const renderNextStepsItem = (step: NextSlotsStepType) => <NextStepCell nextSlotsStep={step} />;

interface TrainerCoursesProps extends CompositeScreenProps<
StackScreenProps<RootBottomTabParamList>,
StackScreenProps<RootStackParamList>
> {
  setMode: (value: CourseModeType) => void,
  loggedUserId: string | null,
}

const TrainerCourses = ({ setMode, navigation, loggedUserId }: TrainerCoursesProps) => {
  const [coursesDisplays, setCoursesDisplays] = useState<CourseDisplayType[]>([]);
  const [nextSteps, setNextSteps] = useState<NextSlotsStepType[]>([]);
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

        const formatedNextSteps = formatNextSteps(fetchedCourses);
        setNextSteps(formatedNextSteps);
      }
    } catch (e: any) {
      console.error(e);
      setCoursesDisplays([]);
    }
  }, [loggedUserId]);

  const goToCourse = (id: string) => {
    navigation.navigate('TrainerCourseProfile', { courseId: id });
  };

  const renderItem = (course: BlendedCourseType) => <ProgramCell program={get(course, 'subProgram.program') || {}}
    misc={course.misc} theoreticalHours={getTheoreticalHours(getElearningSteps(get(course, 'subProgram.steps')))}
    onPress={() => goToCourse(course._id)} />;

  useEffect(() => {
    if (isFocused) {
      getCourses();
      setMode(TRAINER);
    }
  }, [isFocused, getCourses, loggedUserId, setMode]);

  return (
    <SafeAreaView style={commonStyles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={commonStyles.title} testID='header'>Espace intervenant</Text>
        {!!nextSteps.length &&
          <View style={styles.nextSteps}>
            <CoursesSection items={nextSteps} title="Les prochaines sessions que j'anime"
              countStyle={styles.purpleCount} renderItem={renderNextStepsItem} type={EVENT_SECTION} />
          </View>
        }
        {coursesDisplays.length
          ? coursesDisplays.map(content => (
            <ImageBackground imageStyle={content.imageStyle} style={styles.sectionContainer}
              key={content.title} source={content.source}>
              <CoursesSection items={content.courses} title={content.title}
                countStyle={content.countStyle} renderItem={renderItem} />
            </ImageBackground>
          ))
          : <TrainerEmptyState />
        }
        <HomeScreenFooter source={require('../../../../../assets/images/pa_aidant_balade_bleu.png')} />
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({ loggedUserId: getLoggedUserId(state) });

const mapDispatchToProps = (dispatch: ({ type }: ActionWithoutPayloadType) => void) => ({
  setMode: (value: CourseModeType) => dispatch(CoursesActions.setMode(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrainerCourses);
