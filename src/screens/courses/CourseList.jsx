import 'array-flat-polyfill';
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import get from 'lodash/get';
import groupBy from 'lodash/groupBy';
import pick from 'lodash/pick';
import omit from 'lodash/omit';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native-gesture-handler';
import moment from '../../core/helpers/moment';
import commonStyles from '../../styles/common';
import Courses from '../../api/courses';
import CourseCell from '../../components/CourseCell';
import { MARGIN, MAIN_MARGIN_LEFT } from '../../styles/metrics';
import { PINK, YELLOW } from '../../styles/colors';
import NextStepCell from '../../components/steps/NextStepCell';
import { FIRA_SANS_BOLD } from '../../styles/fonts';

const formatDataForNextSteps = (courses) => {
  const futureSlots = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const course of courses) {
    const courseSteps = get(course, 'program.steps') || [];
    const stepSlots = groupBy(course.slots, s => s.step._id);

    // eslint-disable-next-line guard-for-in, no-restricted-syntax
    for (const step in stepSlots) {
      const nextSlots = stepSlots[step]
        .filter(slot => moment().isSameOrBefore(slot.startDate, 'days'))
        .sort((a, b) => moment(a.startDate).diff(b.startDate, 'days'));

      // eslint-disable-next-line no-continue
      if (!nextSlots.length) continue;
      futureSlots.push({
        ...pick(course.program, ['name']),
        stepNumber: courseSteps.indexOf(step) + 1,
        firstSlot: nextSlots[0].startDate,
        type: nextSlots[0].step.type,
        slots: groupBy(nextSlots, s => moment(s.startDate).format('DD/MM/YYYY')),
      });
    }
  }

  return futureSlots.filter(step => Object.keys(step.slots).length)
    .sort((a, b) => moment(a.firstSlot).diff(b.firstSlot, 'days'))
    .map(slot => ({ ...omit(slot, ['firstSlot']) }));
};

const CourseListScreen = ({ navigation }) => {
  const [courses, setCourses] = useState([]);

  const getCourses = async () => {
    try {
      const userId = await AsyncStorage.getItem('user_id');
      const fetchedCourses = await Courses.getUserCourses({ trainees: userId });
      setCourses(fetchedCourses);
    } catch (e) {
      console.error(e);
      setCourses(() => []);
    }
  };

  useEffect(() => {
    async function fetchData() { getCourses(); }
    fetchData();
  }, []);

  const isFocused = useIsFocused();
  useEffect(() => {
    async function fetchData() { getCourses(); }
    if (isFocused) fetchData();
  }, [isFocused]);

  const renderSeparator = () => <View style={styles.separator} />;
  const futureSlots = formatDataForNextSteps(courses);

  return (
    <ScrollView style={commonStyles.container}>
      <Text style={commonStyles.title} testID='header'>Mes formations</Text>
      {futureSlots.length > 0 &&
        <View style={styles.sectionContainer}>
          <View style={styles.contentTitle}>
            <Text style={commonStyles.sectionTitle}>Prochains évènements</Text>
            <View style={{ ...styles.nextEventsCountContainer, ...commonStyles.countContainer }}>
              <Text style={styles.coursesCount}>{futureSlots.length}</Text>
            </View>
          </View>
          <FlatList
            horizontal
            data={futureSlots}
            keyExtractor={item => `${item.name} - ${item.stepNumber}`}
            renderItem={({ item }) => <NextStepCell nextSlotsStep={item} />}
            contentContainerStyle={styles.courseContainer}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={renderSeparator}
          />
        </View>
      }
      <View style={styles.sectionContainer}>
        <View style={styles.contentTitle}>
          <Text style={commonStyles.sectionTitle}>Formations en cours</Text>
          <View style={{ ...styles.coursesCountContainer, ...commonStyles.countContainer }}>
            <Text style={styles.nextEventsCount}>{courses.length}</Text>
          </View>
        </View>
        <FlatList
          horizontal
          data={courses}
          keyExtractor={item => item._id}
          renderItem={({ item }) => <CourseCell course={item} navigation={navigation} />}
          contentContainerStyle={styles.courseContainer}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={renderSeparator}
        />
      </View>
    </ScrollView>
  );
};

CourseListScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  courseContainer: {
    paddingHorizontal: MAIN_MARGIN_LEFT,
  },
  separator: {
    marginRight: 8,
  },
  contentTitle: {
    flexDirection: 'row',
    marginBottom: MARGIN.MD,
  },
  sectionContainer: { position: 'relative', marginBottom: MARGIN.XXXL },
  blob: { position: 'absolute', top: -10 },
  coursesCountContainer: {
    backgroundColor: YELLOW[200],
  },
  coursesCount: {
    ...FIRA_SANS_BOLD.MD,
    color: YELLOW[800],
  },
  nextEventsCountContainer: {
    backgroundColor: PINK[100],
  },
  nextEventsCount: {
    ...FIRA_SANS_BOLD.MD,
    color: PINK[600],
  },
});

export default CourseListScreen;
