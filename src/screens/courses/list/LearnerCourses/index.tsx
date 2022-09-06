import 'array-flat-polyfill';
import { useState, useEffect, useCallback, useMemo, useReducer } from 'react';
import { Text, View, ScrollView, Image, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { useIsFocused, CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import get from 'lodash/get';
import groupBy from 'lodash/groupBy';
import Courses from '../../../../api/courses';
import SubPrograms from '../../../../api/subPrograms';
import NextStepCell from '../../../../components/steps/NextStepCell';
import ProgramCell from '../../../../components/ProgramCell';
import CoursesSection, { EVENT_SECTION } from '../../../../components/CoursesSection';
import CompaniDate from '../../../../core/helpers/dates/companiDates';
import { ascendingSort } from '../../../../core/helpers/dates/utils';
import { getLoggedUserId } from '../../../../store/main/selectors';
import CoursesActions from '../../../../store/courses/actions';
import commonStyles from '../../../../styles/common';
import { RootBottomTabParamList, RootStackParamList } from '../../../../types/NavigationType';
import { CourseType, BlendedCourseType, SubProgramType } from '../../../../types/CourseTypes';
import { NextSlotsStepType } from '../../../../types/StepTypes';
import { ActionWithoutPayloadType } from '../../../../types/store/StoreType';
import styles from '../styles';
import { getCourseProgress, getTheoreticalHours } from '../../../../core/helpers/utils';
import { E_LEARNING } from '../../../../core/data/constants';

interface LearnerCoursesProps extends CompositeScreenProps<
StackScreenProps<RootBottomTabParamList>,
StackScreenProps<RootStackParamList>
> {
  setIsCourse: (value: boolean) => void,
  loggedUserId: string | null,
}

const formatCourseStep = (stepId: string, course: CourseType, stepSlots): NextSlotsStepType => {
  const courseSteps = get(course, 'subProgram.steps') || [];
  const nextSlots = stepSlots[stepId].filter(slot => CompaniDate().isSameOrBefore(slot.endDate));
  const slotsSorted = stepSlots[stepId].sort(ascendingSort('endDate'));
  const stepIndex = courseSteps.map(step => step._id).indexOf(stepId);

  return {
    name: get(course, 'subProgram.program.name'),
    stepIndex,
    firstSlot: nextSlots[0].endDate,
    type: nextSlots[0].step.type,
    slots: slotsSorted.map(s => s.endDate),
    _id: slotsSorted[0]._id,
    progress: courseSteps[stepIndex].progress,
    courseId: course._id,
  };
};

const formatNextSteps = (course: CourseType): NextSlotsStepType[] => {
  if (course.subProgram.isStrictlyELearning) return [];

  const { slots } = course as BlendedCourseType;
  const stepSlots = groupBy(slots.filter(s => get(s, 'step._id')), s => s.step._id);

  return Object.keys(stepSlots)
    .filter(stepId => stepSlots[stepId].some(slot => CompaniDate().isSameOrBefore(slot.endDate)))
    .map(stepId => formatCourseStep(stepId, course, stepSlots));
};

const getNextSteps = (courses: CourseType[]): NextSlotsStepType[] => courses.map(formatNextSteps)
  .flat()
  .filter(step => step.slots && step.slots.length)
  .sort(ascendingSort('firstSlot'));

const SET_COURSES = 'SET_COURSES';
const RESET_COURSES = 'RESET_COURSES';

const courseReducer = (state, action) => {
  switch (action.type) {
    case SET_COURSES:
      return {
        onGoing: action.payload.filter(course => getCourseProgress(course) < 1),
        achieved: action.payload.filter(course => getCourseProgress(course) === 1),
      };
    case RESET_COURSES:
      return { onGoing: [], achieved: [] };
    default:
      return state;
  }
};

const renderNextStepsItem = step => <NextStepCell nextSlotsStep={step} />;

const LearnerCourses = ({ setIsCourse, navigation, loggedUserId }: LearnerCoursesProps) => {
  const [courses, dispatch] = useReducer(courseReducer, { onGoing: [], achieved: [] });
  const [elearningDraftSubPrograms, setElearningDraftSubPrograms] = useState<SubProgramType[]>(new Array(0));

  const getCourses = useCallback(async () => {
    try {
      const fetchedCourses = await Courses.getUserCourses();
      dispatch({ type: SET_COURSES, payload: fetchedCourses });
    } catch (e: any) {
      console.error(e);
      dispatch({ type: RESET_COURSES });
    }
  }, []);

  const getElearningDraftSubPrograms = useCallback(async () => {
    try {
      const fetchedSubPrograms = await SubPrograms.getELearningDraftSubPrograms();
      setElearningDraftSubPrograms(fetchedSubPrograms);
    } catch (e: any) {
      console.error(e);
      setElearningDraftSubPrograms([]);
    }
  }, []);

  const isFocused = useIsFocused();

  useEffect(() => {
    async function fetchData() {
      await Promise.all([getCourses(), getElearningDraftSubPrograms()]);
    }
    if (loggedUserId && isFocused) fetchData();
  }, [loggedUserId, isFocused, getCourses, getElearningDraftSubPrograms]);

  const goToCourse = (id: string, isCourse: boolean) => {
    if (isCourse) navigation.navigate('CourseProfile', { courseId: id });
    else navigation.navigate('SubProgramProfile', { subProgramId: id });
  };

  const onPressProgramCell = (id: string, isCourse: boolean) => {
    setIsCourse(isCourse);
    goToCourse(id, isCourse);
  };

  const getElearningSteps = steps => steps.filter(step => step.type === E_LEARNING);

  const renderCourseItem = course => <ProgramCell program={get(course, 'subProgram.program') || {}} misc={course.misc}
    theoreticalHours={getTheoreticalHours(getElearningSteps(get(course, 'subProgram.steps')))}
    progress={getCourseProgress(course)} onPress={() => onPressProgramCell(course._id, true)} />;

  const renderSubProgramItem = subProgram => <ProgramCell onPress={() => onPressProgramCell(subProgram._id, false)}
    theoreticalHours={getTheoreticalHours(getElearningSteps(subProgram.steps))}
    program={get(subProgram, 'program') || {}} />;

  const nextSteps = useMemo(() => getNextSteps(courses.onGoing), [courses.onGoing]);

  return (
    <SafeAreaView style={commonStyles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={commonStyles.title} testID='header'>Mes formations</Text>
        {!!nextSteps.length &&
          <View style={styles.nextSteps}>
            <CoursesSection items={nextSteps} title='Mes prochains rendez-vous' countStyle={styles.nextEventsCount}
              renderItem={renderNextStepsItem} type={EVENT_SECTION} />
          </View>
        }
        <ImageBackground imageStyle={styles.onGoingAndDraftBackground} style={styles.sectionContainer}
          source={require('../../../../../assets/images/yellow_section_background.png')}>
          <CoursesSection items={courses.onGoing} title='Mes formations en cours' renderItem={renderCourseItem}
            countStyle={styles.onGoingCoursesCount} showCatalogButton={!courses.onGoing.length} />
        </ImageBackground>
        {!!courses.achieved.length &&
          <ImageBackground imageStyle={styles.achievedBackground} style={styles.sectionContainer}
            source={require('../../../../../assets/images/green_section_background.png')}>
            <CoursesSection items={courses.achieved} title='Mes formations terminées' renderItem={renderCourseItem}
              countStyle={styles.achievedCoursesCount} />
          </ImageBackground>
        }
        {!!elearningDraftSubPrograms.length &&
          <ImageBackground imageStyle={styles.onGoingAndDraftBackground} style={styles.sectionContainer}
            source={require('../../../../../assets/images/purple_section_background.png')}>
            <CoursesSection items={elearningDraftSubPrograms} title='Mes formations à tester'
              countStyle={styles.subProgramsCount} renderItem={renderSubProgramItem} />
          </ImageBackground>
        }
        <View style={styles.footer}>
          <Image style={styles.elipse} source={require('../../../../../assets/images/log_out_background.png')} />
          <Image source={require('../../../../../assets/images/pa_aidant_balade_rose.png')} style={styles.fellow} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({ loggedUserId: getLoggedUserId(state) });

const mapDispatchToProps = (dispatch: ({ type }: ActionWithoutPayloadType) => void) => ({
  setIsCourse: (isCourse: boolean) => dispatch(CoursesActions.setIsCourse(isCourse)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LearnerCourses);
