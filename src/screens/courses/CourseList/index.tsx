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
import commonStyles from '../../../styles/common';
import { NavigationType } from '../../../types/NavigationType';
import styles from './styles';
import subPrograms from '../../../api/subPrograms';
import { TRAINING_ORGANISATION_MANAGER, VENDOR_ADMIN } from '../../../core/data/constants';

interface CourseListProps {
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

      return nextSlots.length
        ? { name: programName, stepIndex: courseSteps.indexOf(stepId), ...formatFutureSlot(slotsSorted, nextSlots) }
        : null;
    })
    .filter(step => !!step);
};

const formatNextSteps = courses => courses.map(formatCourseStep).flat()
  .filter(step => step.slots.length)
  .sort((a, b) => moment(a.firstSlot).diff(b.firstSlot, 'days'));

const formatElearningDraftSubPrograms = subprograms => subprograms.map(subProgram => ({
  _id: subProgram._id, subProgram,
}));

const CourseList = ({ navigation, loggedUserId, userRole }: CourseListProps) => {
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
    try {
      const fetchedSubPrograms = await subPrograms.getELearningDraftSubPrograms();
      setElearningDraftSubPrograms(fetchedSubPrograms);
    } catch (e) {
      if (e.status === 401) signOut();
      console.error(e);
      setElearningDraftSubPrograms(() => []);
    }
  };

  useEffect(() => {
    async function fetchData() { getCourses(); }
    if (loggedUserId) fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedUserId]);

  const isFocused = useIsFocused();
  useEffect(() => {
    async function fetchData() { getCourses(); }
    if (isFocused) fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  useEffect(() => {
    async function fetchData() { getElearningDraftSubPrograms(); }
    if (loggedUserId && isFocused) fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedUserId, isFocused]);

  const goToCourse = (id, isCourse) => navigation?.navigate(
    'Home',
    { screen: 'Courses', params: { screen: 'CourseProfile', params: { courseId: id, isCourse } } }
  );

  const renderSeparator = () => <View style={styles.separator} />;

  const renderItem = (course, isCourse) => <ProgramCell program={get(course, 'subProgram.program') || {}}
    onPress={() => goToCourse(course._id, isCourse)} />;

<<<<<<< HEAD
  const nextSteps = formatNextSteps(courses);
=======
  const nextStep = formatNextSteps(courses);
  const formatedSubPrograms = formatElearningDraftSubPrograms(elearningDraftSubPrograms);
>>>>>>> COM-1598: can visualize test subprograms

  return (
    <ScrollView style={commonStyles.container}>
      <Text style={commonStyles.title} testID='header'>Mes formations</Text>
      {nextSteps.length > 0 &&
        <View style={commonStyles.sectionContainer}>
          <View style={commonStyles.sectionTitle}>
            <Text style={commonStyles.sectionTitleText}>Mes prochains rendez-vous</Text>
            <View style={{ ...styles.nextEventsCountContainer, ...commonStyles.countContainer }}>
              <Text style={styles.nextEventsCount}>{nextSteps.length}</Text>
            </View>
          </View>
          <FlatList horizontal data={nextSteps} keyExtractor={item => item._id} showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => <NextStepCell nextSlotsStep={item} />} ItemSeparatorComponent={renderSeparator}
            contentContainerStyle={styles.courseContainer} />
        </View>
      }
      <View style={commonStyles.sectionContainer}>
        <View style={commonStyles.sectionTitle}>
          <Text style={commonStyles.sectionTitleText}>Mes formations en cours</Text>
          <View style={{ ...styles.coursesCountContainer, ...commonStyles.countContainer }}>
            <Text style={styles.coursesCount}>{courses.length}</Text>
          </View>
        </View>
        <FlatList horizontal data={courses} keyExtractor={item => item._id}
          renderItem={({ item }) => renderItem(item, true)} contentContainerStyle={styles.courseContainer}
          showsHorizontalScrollIndicator={false} ItemSeparatorComponent={renderSeparator} />
      </View>
      {(userRole === VENDOR_ADMIN || userRole === TRAINING_ORGANISATION_MANAGER) &&
        <View style={commonStyles.sectionContainer}>
          <View style={commonStyles.sectionTitle}>
            <Text style={commonStyles.sectionTitleText}>Mes formations à tester</Text>
            <View style={{ ...styles.coursesCountContainer, ...commonStyles.countContainer }}>
              <Text style={styles.coursesCount}>{courses.length}</Text>
            </View>
          </View>
          <FlatList horizontal data={formatedSubPrograms} keyExtractor={item => item._id}
            renderItem={({ item }) => renderItem(item, false)} contentContainerStyle={styles.courseContainer}
            showsHorizontalScrollIndicator={false} ItemSeparatorComponent={renderSeparator} />
        </View>
      }
    </ScrollView>
  );
};

const mapStateToProps = state => ({ loggedUserId: getLoggedUserId(state), userRole: getUserRole(state) });

export default connect(mapStateToProps)(CourseList);
