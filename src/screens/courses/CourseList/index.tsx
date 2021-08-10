import 'array-flat-polyfill';
import React, { useState, useEffect, useContext, useCallback, useMemo, useReducer } from 'react';
import { Text, View, ScrollView, Image, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import get from 'lodash/get';
import groupBy from 'lodash/groupBy';
import Courses from '../../../api/courses';
import SubPrograms from '../../../api/subPrograms';
import NextStepCell from '../../../components/steps/NextStepCell';
import ProgramCell from '../../../components/ProgramCell';
import CoursesSection, { EVENT_SECTION } from '../../../components/CoursesSection';
import { Context as AuthContext } from '../../../context/AuthContext';
import moment from '../../../core/helpers/moment';
import { companiDate } from '../../../core/helpers/dates';
import { getLoggedUserId } from '../../../store/main/selectors';
import CoursesActions from '../../../store/courses/actions';
import commonStyles from '../../../styles/common';
import { CourseType } from '../../../types/CourseType';
import { NavigationType } from '../../../types/NavigationType';
import { CourseStepType } from '../../../types/StepType';
import { ActionWithoutPayloadType } from '../../../types/store/StoreType';
import { SubProgramType } from '../../../types/SubProgramType';
import styles from './styles';

type CourseListProps = {
  setIsCourse: (value: boolean) => void,
  navigation: NavigationType,
  loggedUserId: string | null,
}

const formatCourseStep = (stepId: string, course: CourseType, stepSlots): CourseStepType => {
  const courseSteps = get(course, 'subProgram.steps') || [];
  const nextSlots = stepSlots[stepId].filter(slot => companiDate().isSameOrBefore(slot.endDate));
  const slotsSorted = stepSlots[stepId].sort((a, b) => moment(a.endDate).diff(b.endDate, 'days'));
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

const formatNextSteps = (course: CourseType): CourseStepType[] => {
  const stepSlots = groupBy(course.slots.filter(s => get(s, 'step._id')), s => s.step._id);

  return Object.keys(stepSlots)
    .filter(stepId => stepSlots[stepId].some(slot => companiDate().isSameOrBefore(slot.endDate)))
    .map(stepId => formatCourseStep(stepId, course, stepSlots));
};

const getNextSteps = (courses: CourseType[]): CourseStepType[] => courses.map(c => formatNextSteps(c))
  .flat()
  .filter(step => step.slots && step.slots.length)
  .sort((a, b) => moment(a.firstSlot).diff(b.firstSlot, 'days'));

const SET_COURSES = 'SET_COURSES';
const RESET_COURSES = 'RESET_COURSES';

const courseReducer = (state, action) => {
  switch (action.type) {
    case SET_COURSES:
      return {
        onGoing: action.payload.filter(course => course.progress < 1),
        achieved: action.payload.filter(course => course.progress === 1),
      };
    case RESET_COURSES:
      return { onGoing: [], achieved: [] };
    default:
      return state;
  }
};

const renderNexStepsItem = step => <NextStepCell nextSlotsStep={step} />;

const CourseList = ({ setIsCourse, navigation, loggedUserId }: CourseListProps) => {
  const [courses, dispatch] = useReducer(courseReducer, { onGoing: [], achieved: [] });
  const [elearningDraftSubPrograms, setElearningDraftSubPrograms] = useState<SubProgramType[]>(new Array(0));
  const { signOut } = useContext(AuthContext);

  const getCourses = useCallback(async () => {
    try {
      const fetchedCourses = await Courses.getUserCourses();
      dispatch({ type: SET_COURSES, payload: fetchedCourses });
    } catch (e) {
      if (e.status === 401) signOut();
      console.error(e);
      dispatch({ type: RESET_COURSES });
    }
  }, [signOut]);

  const getElearningDraftSubPrograms = useCallback(async () => {
    try {
      const fetchedSubPrograms = await SubPrograms.getELearningDraftSubPrograms();
      setElearningDraftSubPrograms(fetchedSubPrograms);
    } catch (e) {
      if (e.status === 401) signOut();
      console.error(e);
      setElearningDraftSubPrograms([]);
    }
  }, [signOut]);

  const isFocused = useIsFocused();

  useEffect(() => {
    async function fetchData() {
      await Promise.all([getCourses(), getElearningDraftSubPrograms()]);
    }
    if (loggedUserId && isFocused) fetchData();
  }, [loggedUserId, isFocused, getCourses, getElearningDraftSubPrograms]);

  const goToCourse = (id, isCourse) => {
    if (isCourse) navigation.navigate('CourseProfile', { courseId: id });
    else navigation.navigate('SubProgramProfile', { subProgramId: id });
  };

  const onPressProgramCell = (isCourse, id) => {
    setIsCourse(isCourse);
    goToCourse(id, isCourse);
  };

  const renderCourseItem = course => <ProgramCell program={get(course, 'subProgram.program') || {}}
    onPress={() => onPressProgramCell(true, course._id)} progress={course.progress} misc={course.misc} />;

  const renderSubProgramItem = subProgram => <ProgramCell program={get(subProgram, 'program') || {}}
    onPress={() => onPressProgramCell(false, subProgram._id)} />;

  const nextSteps = useMemo(() => getNextSteps(courses.onGoing), [courses.onGoing]);

  return (
    <ScrollView style={commonStyles.container} contentContainerStyle={styles.container}>
      <Text style={commonStyles.title} testID='header'>Mes formations</Text>
      {!!nextSteps.length &&
        <View style={styles.nextSteps}>
          <CoursesSection items={nextSteps} title='Mes prochains rendez-vous' countStyle={styles.nextEventsCount}
            renderItem={renderNexStepsItem} type={EVENT_SECTION} />
        </View>
      }
      <ImageBackground imageStyle={styles.onGoingAndDraftBackground} style={styles.sectionContainer}
        source={require('../../../../assets/images/yellow_section_background.png')}>
        <CoursesSection items={courses.onGoing} title='Mes formations en cours' renderItem={renderCourseItem}
          countStyle={styles.onGoingCoursesCount} showCatalogButton={!courses.onGoing.length} />
      </ImageBackground>
      {!!courses.achieved.length &&
        <ImageBackground imageStyle={styles.achievedBackground} style={styles.sectionContainer}
          source={require('../../../../assets/images/green_section_background.png')}>
          <CoursesSection items={courses.achieved} title='Mes formations terminées' renderItem={renderCourseItem}
            countStyle={styles.achievedCoursesCount} />
        </ImageBackground>
      }
      {!!elearningDraftSubPrograms.length &&
        <ImageBackground imageStyle={styles.onGoingAndDraftBackground} style={styles.sectionContainer}
          source={require('../../../../assets/images/purple_section_background.png')}>
          <CoursesSection items={elearningDraftSubPrograms} title='Mes formations à tester'
            countStyle={styles.subProgramsCount} renderItem={renderSubProgramItem} />
        </ImageBackground>
      }
      <View style={styles.footer}>
        <Image style={styles.elipse} source={require('../../../../assets/images/log_out_background.png')} />
        <Image source={require('../../../../assets/images/pa_aidant_balade.png')} style={styles.fellow} />
      </View>
    </ScrollView>
  );
};

const mapStateToProps = state => ({ loggedUserId: getLoggedUserId(state) });

const mapDispatchToProps = (dispatch: ({ type }: ActionWithoutPayloadType) => void) => ({
  setIsCourse: (isCourse: boolean) => dispatch(CoursesActions.setIsCourse(isCourse)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CourseList);
