import 'array-flat-polyfill';
import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Text, View, ScrollView, Image, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import get from 'lodash/get';
import groupBy from 'lodash/groupBy';
import Courses from '../../../api/courses';
import NextStepCell from '../../../components/steps/NextStepCell';
import ProgramCell from '../../../components/ProgramCell';
import { Context as AuthContext } from '../../../context/AuthContext';
import moment from '../../../core/helpers/moment';
import { getLoggedUserId } from '../../../store/main/selectors';
import CoursesActions from '../../../store/courses/actions';
import commonStyles from '../../../styles/common';
import styles from './styles';
import { NavigationType } from '../../../types/NavigationType';
import SubPrograms from '../../../api/subPrograms';
import { ActionWithoutPayloadType } from '../../../types/store/StoreType';
import CoursesSection from '../../../components/CoursesSection';

interface CourseListProps {
  setIsCourse: (value: boolean) => void,
  navigation: NavigationType,
  loggedUserId: string | null,
}

const formatCourseStep = (course) => {
  const courseSteps = get(course, 'subProgram.steps') || [];
  const stepSlots = groupBy(course.slots.filter(s => get(s, 'step._id')), s => s.step._id);
  const programName = get(course, 'subProgram.program.name');

  return Object.keys(stepSlots)
    .map((stepId) => {
      const nextSlots = stepSlots[stepId].filter(slot => moment().isSameOrBefore(slot.endDate));
      const slotsSorted = stepSlots[stepId].sort((a, b) => moment(a.endDate).diff(b.endDate, 'days'));
      const stepIndex = courseSteps.map(step => step._id).indexOf(stepId);

      if (!nextSlots.length) return null;

      return {
        name: programName,
        stepIndex,
        firstSlot: nextSlots[0].endDate,
        type: nextSlots[0].step.type,
        slots: slotsSorted.map(s => s.endDate),
        _id: slotsSorted[0]._id,
        progress: courseSteps[stepIndex].progress,
        courseId: course._id,
      };
    })
    .filter(step => !!step);
};

const formatNextSteps = courses => courses.map(formatCourseStep).flat()
  .filter(step => step.slots.length)
  .sort((a, b) => moment(a.firstSlot).diff(b.firstSlot, 'days'));

const CourseList = ({ setIsCourse, navigation, loggedUserId }: CourseListProps) => {
  const [onGoingCourses, setOnGoingCourses] = useState(new Array(0));
  const [achievedCourses, setAchievedCourses] = useState(new Array(0));
  const [elearningDraftSubPrograms, setElearningDraftSubPrograms] = useState(new Array(0));
  const { signOut } = useContext(AuthContext);

  const getCourses = useCallback(async () => {
    try {
      const fetchedCourses = await Courses.getUserCourses();
      setOnGoingCourses(fetchedCourses.filter(course => course.progress < 1));
      setAchievedCourses(fetchedCourses.filter(course => course.progress === 1));
    } catch (e) {
      if (e.status === 401) signOut();
      console.error(e);
      setOnGoingCourses([]);
      setAchievedCourses([]);
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
    if (loggedUserId && isFocused) Promise.all([getCourses(), getElearningDraftSubPrograms()]);
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
    onPress={() => onPressProgramCell(true, course._id)} progress={course.progress}
    misc={course.misc} />;

  const renderSubProgramItem = subProgram => <ProgramCell program={get(subProgram, 'program') || {}}
    onPress={() => onPressProgramCell(false, subProgram._id)} />;

  const renderNexStepsItem = step => <NextStepCell nextSlotsStep={step} />;

  const nextSteps = formatNextSteps(onGoingCourses);

  return (
    <ScrollView style={commonStyles.container} contentContainerStyle={styles.container}>
      <Text style={commonStyles.title} testID='header'>Mes formations</Text>
      {!!nextSteps.length &&
        <View style={styles.nextSteps}>
          <CoursesSection items={nextSteps} title='Mes prochains rendez-vous' countStyle={styles.nextEventsCount}
            renderItem={renderNexStepsItem} type={'ÉVÉNEMENT'} />
        </View>
      }
      <ImageBackground imageStyle={styles.onGoingAndDraftBackground} style={styles.sectionContainer}
        source={require('../../../../assets/images/yellow_section_background.png')}>
        <CoursesSection items={onGoingCourses} title='Mes formations en cours' renderItem={renderCourseItem}
          countStyle={styles.onGoingCoursesCount} showCatalogButton={!onGoingCourses.length} />
      </ImageBackground>
      {!!achievedCourses.length &&
        <ImageBackground imageStyle={styles.achievedBackground} style={styles.sectionContainer}
          source={require('../../../../assets/images/green_section_background.png')}>
          <CoursesSection items={achievedCourses} title='Mes formations terminées' renderItem={renderCourseItem}
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
