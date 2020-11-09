import 'array-flat-polyfill';
import React, { useState, useEffect, useContext } from 'react';
import { Text, View, FlatList, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import get from 'lodash/get';
import groupBy from 'lodash/groupBy';
import Courses from '../../../api/courses';
import NextStepCell from '../../../components/steps/NextStepCell';
import ProgramCell from '../../../components/ProgramCell';
import { Context as AuthContext } from '../../../context/AuthContext';
import moment from '../../../core/helpers/moment';
import { getLoggedUserId, getUserRole } from '../../../store/main/selectors';
import CoursesActions from '../../../store/courses/actions';
import commonStyles from '../../../styles/common';
import { NavigationType } from '../../../types/NavigationType';
import styles from './styles';
import SubPrograms from '../../../api/subPrograms';
import { TRAINING_ORGANISATION_MANAGER, VENDOR_ADMIN } from '../../../core/data/constants';
import { ActionWithoutPayloadType } from '../../../types/store/StoreType';

interface CourseListProps {
  setIsCourse: (value: boolean) => void,
  navigation: NavigationType,
  loggedUserId: string | null,
  userRole: string | null,
}

const formatFutureSlot = (slotsSorted, nextSlots) => ({
  firstSlot: nextSlots[0].endDate,
  type: nextSlots[0].step.type,
  slots: slotsSorted.map(s => s.endDate),
  _id: slotsSorted[0]._id,
});

const formatCourseStep = (course) => {
  const courseSteps = get(course, 'subProgram.steps') || [];
  const stepSlots = groupBy(course.slots.filter(s => get(s, 'step._id')), s => s.step._id);
  const programName = get(course, 'subProgram.program.name');

  return Object.keys(stepSlots)
    .map((stepId) => {
      const nextSlots = stepSlots[stepId].filter(slot => moment().isSameOrBefore(slot.endDate));
      const slotsSorted = stepSlots[stepId].sort((a, b) => moment(a.endDate).diff(b.endDate, 'days'));
      const stepIndex = courseSteps.map(step => step._id).indexOf(stepId);

      return nextSlots.length
        ? {
          name: programName,
          stepIndex,
          ...formatFutureSlot(slotsSorted, nextSlots),
          progress: courseSteps[stepIndex].progress,
        }
        : null;
    })
    .filter(step => !!step);
};

const formatNextSteps = courses => courses.map(formatCourseStep).flat()
  .filter(step => step.slots.length)
  .sort((a, b) => moment(a.firstSlot).diff(b.firstSlot, 'days'));

const CourseList = ({ setIsCourse, navigation, loggedUserId, userRole }: CourseListProps) => {
  const [courses, setCourses] = useState(new Array(0));
  const [elearningDraftSubPrograms, setElearningDraftSubPrograms] = useState(new Array(0));
  const { signOut } = useContext(AuthContext);

  const getCourses = async () => {
    try {
      const fetchedCourses = await Courses.getUserCourses();
      setCourses(fetchedCourses);
    } catch (e) {
      if (e.status === 401) signOut();
      console.error(e);
      setCourses(() => []);
    }
  };

  const getElearningDraftSubPrograms = async () => {
    if (userRole === VENDOR_ADMIN || userRole === TRAINING_ORGANISATION_MANAGER) {
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
      getCourses();
      getElearningDraftSubPrograms();
    }
    if (loggedUserId && isFocused) fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedUserId, isFocused]);

  const goToCourse = (id, isCourse) => {
    if (isCourse) {
      navigation.navigate(
        'Home',
        { screen: 'Courses', params: { screen: 'CourseProfile', params: { courseId: id } } }
      );
    } else {
      navigation.navigate(
        'Home',
        { screen: 'Courses', params: { screen: 'SubProgramProfile', params: { subProgramId: id } } }
      );
    }
  };

  const renderSeparator = () => <View style={styles.separator} />;

  const onPressProgramCell = (isCourse, id) => {
    setIsCourse(isCourse);
    goToCourse(id, isCourse);
  };

  const getCourseProgress = (steps) => {
    const progressSum = steps.map(step => step.progress).reduce((acc, value) => acc + value, 0);

    return steps.length ? (progressSum / steps.length) : 0;
  };

  const renderCourseItem = course => <ProgramCell program={get(course, 'subProgram.program') || {}}
    onPress={() => onPressProgramCell(true, course._id)} progress={getCourseProgress(course.subProgram.steps)}/>;

  const renderSubProgramItem = subProgram => <ProgramCell program={get(subProgram, 'program') || {}}
    onPress={() => onPressProgramCell(false, subProgram._id)} />;

  const nextSteps = formatNextSteps(courses);

  return (
    <ScrollView style={commonStyles.container}>
      <Text style={commonStyles.title} testID='header'>Mes formations</Text>
      {nextSteps.length > 0 &&
        <View style={commonStyles.sectionContainer}>
          <View style={commonStyles.sectionTitle}>
            <Text style={commonStyles.sectionTitleText}>Mes prochains rendez-vous</Text>
            <Text style={[styles.nextEventsCount, commonStyles.countContainer]}>{nextSteps.length}</Text>
          </View>
          <FlatList horizontal data={nextSteps} keyExtractor={item => item._id} showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => <NextStepCell nextSlotsStep={item} />} ItemSeparatorComponent={renderSeparator}
            contentContainerStyle={styles.courseContainer} />
        </View>
      }
      <View style={commonStyles.sectionContainer}>
        <View style={commonStyles.sectionTitle}>
          <Text style={commonStyles.sectionTitleText}>Mes formations en cours</Text>
          <Text style={[styles.coursesCount, commonStyles.countContainer]}>{courses.length}</Text>
        </View>
        <FlatList horizontal data={courses} keyExtractor={item => item._id}
          renderItem={({ item }) => renderCourseItem(item)} contentContainerStyle={styles.courseContainer}
          showsHorizontalScrollIndicator={false} ItemSeparatorComponent={renderSeparator} />
      </View>
      {(userRole === VENDOR_ADMIN || userRole === TRAINING_ORGANISATION_MANAGER) &&
        <View style={commonStyles.sectionContainer}>
          <View style={commonStyles.sectionTitle}>
            <Text style={commonStyles.sectionTitleText}>Mes formations à tester</Text>
            <Text style={[styles.subProgramsCount, commonStyles.countContainer]}>
              {elearningDraftSubPrograms.length}
            </Text>
          </View>
          <FlatList horizontal data={elearningDraftSubPrograms} keyExtractor={item => item._id}
            renderItem={({ item }) => renderSubProgramItem(item)} contentContainerStyle={styles.courseContainer}
            showsHorizontalScrollIndicator={false} ItemSeparatorComponent={renderSeparator} />
        </View>
      }
    </ScrollView>
  );
};

const mapStateToProps = state => ({ loggedUserId: getLoggedUserId(state), userRole: getUserRole(state) });

const mapDispatchToProps = (dispatch: ({ type }: ActionWithoutPayloadType) => void) => ({
  setIsCourse: (isCourse: boolean) => dispatch(CoursesActions.setIsCourse(isCourse)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CourseList);
