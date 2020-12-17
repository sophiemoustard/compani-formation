import 'array-flat-polyfill';
import React, { useState, useEffect, useContext } from 'react';
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
import { getLoggedUserId, getUserVendorRole } from '../../../store/main/selectors';
import CoursesActions from '../../../store/courses/actions';
import commonStyles from '../../../styles/common';
import styles from './styles';
import { NavigationType } from '../../../types/NavigationType';
import SubPrograms from '../../../api/subPrograms';
import { TRAINING_ORGANISATION_MANAGER, VENDOR_ADMIN } from '../../../core/data/constants';
import { ActionWithoutPayloadType } from '../../../types/store/StoreType';
import CoursesSection from '../../../components/CoursesSection';

interface CourseListProps {
  setIsCourse: (value: boolean) => void,
  navigation: NavigationType,
  loggedUserId: string | null,
  userVendorRole: string,
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

const CourseList = ({ setIsCourse, navigation, loggedUserId, userVendorRole }: CourseListProps) => {
  const [onGoingCourses, setOnGoingCourses] = useState(new Array(0));
  const [achievedCourses, setAchievedCourses] = useState(new Array(0));
  const [elearningDraftSubPrograms, setElearningDraftSubPrograms] = useState(new Array(0));
  const { signOut } = useContext(AuthContext);

  const getCourses = async () => {
    try {
      const fetchedCourses = await Courses.getUserCourses();
      setOnGoingCourses(fetchedCourses.filter(course => course.progress < 1));
      setAchievedCourses(fetchedCourses.filter(course => course.progress === 1));
    } catch (e) {
      if (e.status === 401) signOut();
      console.error(e);
      setOnGoingCourses(() => []);
      setAchievedCourses(() => []);
    }
  };

  const getElearningDraftSubPrograms = async () => {
    if ([VENDOR_ADMIN, TRAINING_ORGANISATION_MANAGER].includes(userVendorRole)) {
      try {
        const fetchedSubPrograms = await SubPrograms.getELearningDraftSubPrograms();
        setElearningDraftSubPrograms(fetchedSubPrograms);
      } catch (e) {
        if (e.status === 401) signOut();
        console.error(e);
        setElearningDraftSubPrograms(() => []);
      }
    }
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    async function fetchData() {
      await Promise.all([getCourses(), getElearningDraftSubPrograms()]);
    }
    if (loggedUserId && isFocused) fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedUserId, isFocused]);

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

  const renderNexStepsItem = step => <NextStepCell nextSlotsStep={step} navigation={navigation} />;

  const nextSteps = formatNextSteps(onGoingCourses);

  return (
    <ScrollView style={commonStyles.container} contentContainerStyle={styles.container}>
      <Text style={commonStyles.title} testID='header'>Mes formations</Text>
      {nextSteps.length > 0 &&
        <View style={styles.nextSteps}>
          <CoursesSection items={nextSteps} title='Mes prochains rendez-vous' countStyle={styles.nextEventsCount}
            renderItem={renderNexStepsItem} type={'ÉVÉNEMENT'} />
        </View>
      }
      <ImageBackground imageStyle={styles.onGoingAndDraftBackground} style={styles.sectionContainer}
        source={require('../../../../assets/images/ongoing_background.png')}>
        <CoursesSection items={onGoingCourses} title='Mes formations en cours' renderItem={renderCourseItem}
          countStyle={styles.onGoingCoursesCount} showCatalogButton={!onGoingCourses.length} />
      </ImageBackground>
      {achievedCourses.length > 0 &&
        <ImageBackground imageStyle={styles.achievedBackground} style={styles.sectionContainer}
          source={require('../../../../assets/images/green_section_background.png')}>
          <CoursesSection items={achievedCourses} title='Mes formations terminées' renderItem={renderCourseItem}
            countStyle={styles.achievedCoursesCount} />
        </ImageBackground>
      }
      {[VENDOR_ADMIN, TRAINING_ORGANISATION_MANAGER].includes(userVendorRole) &&
        <ImageBackground imageStyle={styles.onGoingAndDraftBackground} style={styles.sectionContainer}
          source={require('../../../../assets/images/purple_section_background.png')}>
          <CoursesSection items={elearningDraftSubPrograms} title='Mes formations à tester'
            countStyle={styles.subProgramsCount} renderItem={renderSubProgramItem} />
        </ImageBackground>
      }
      <View style={styles.footer}>
        <Image style={styles.elipse} source={require('../../../../assets/images/log_out_background.png')} />
        <Image source={require('../../../../assets/images/pa-aidant-balade.png')} style={styles.fellow} />
      </View>
    </ScrollView>
  );
};

const mapStateToProps = state => ({ loggedUserId: getLoggedUserId(state), userVendorRole: getUserVendorRole(state) });

const mapDispatchToProps = (dispatch: ({ type }: ActionWithoutPayloadType) => void) => ({
  setIsCourse: (isCourse: boolean) => dispatch(CoursesActions.setIsCourse(isCourse)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CourseList);
