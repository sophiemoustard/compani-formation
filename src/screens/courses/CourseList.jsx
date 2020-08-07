import 'array-flat-polyfill';
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import get from 'lodash/get';
import groupBy from 'lodash/groupBy';
import pick from 'lodash/pick';
import PropTypes from 'prop-types';
import moment from '../../core/helpers/moment';
import commonStyles from '../../styles/common';
import Courses from '../../api/courses';
import CourseCell from '../../components/CourseCell';
import { MARGIN, MAIN_MARGIN_LEFT } from '../../styles/metrics';
import { PINK, YELLOW } from '../../styles/colors';
import { ScrollView } from 'react-native-gesture-handler';
import NextStepCell from '../../components/NextStepCell';

const CourseListScreen = ({ navigation }) => {
  const [courses, setCourses] = useState([]);
  const [nextEvents, setNextEvents] = useState([]);

  const getCourses = async () => {
    try {
      const userId = await AsyncStorage.getItem('user_id');
      const courses = await Courses.getUserCourses({ trainees: userId });
      setCourses(courses);

      setNextEvents(() => []);

      const futureSlots = [];
      for (const course of courses) {
        const courseSteps = get(course, 'program.steps') || [];
        const stepSlots = groupBy(course.slots, s => s.step._id);

        for (const step in stepSlots) {
          const nextSlots = stepSlots[step]
            .filter(slot => moment().isSameOrBefore(slot.startDate, 'days'))
            .sort((a, b) => moment(a.startDate).diff(b.startDate, 'days'));

          if (!nextSlots.length) continue;
          futureSlots.push({
            ...pick(course.program, ['name']),
            id: step,
            stepNumber: courseSteps.indexOf(step) + 1,
            firstSlot: nextSlots[0].startDate,
            type: nextSlots[0].step.type,
            slots: groupBy(nextSlots, s => moment(s.startDate).format('DD/MM/YYYY')),
          });
        }
      }
      const futureSlotsFiltered = futureSlots.filter(step => Object.keys(step.slots).length)
        .sort((a, b) => moment(a.firstSlot).diff(b.firstSlot, 'days'));

      setNextEvents(futureSlotsFiltered);
    } catch (e) {
      console.error(e);
      setCourses(() => []);
      setNextEvents(() => []);
    }
  };

  useEffect(() => {
    async function fetchData () { getCourses(); }
    fetchData();
  }, []);

  const isFocused = useIsFocused();
  useEffect(() => {
    async function fetchData () { getCourses(); }
    isFocused && fetchData();
  }, [isFocused]);

  const renderSeparator = () => <View style={styles.separator} />;

  return ( 
    <ScrollView style={commonStyles.container}>
      <Text style={commonStyles.title} testID='header'>Mes formations</Text>
      { nextEvents.length > 0 &&
        <>
          <View style={styles.sectionContainer}>
            <View style={styles.contentTitle}>
              <Text style={commonStyles.sectionTitle}>Prochains évènements</Text>
              <View style={{ ...styles.coursesCountContainer, ...commonStyles.countContainer }}>
                <Text style={styles.coursesCount}>{nextEvents.length}</Text>
              </View>
            </View>
            <FlatList
              horizontal
              data={nextEvents}
              keyExtractor={(item) => `${item.name} - ${item.id}`}
              renderItem={({ item }) => <NextStepCell nextSlotsStep={item} />}
              style={styles.courseContainer}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </>
      }
      <View style={styles.sectionContainer}>
        <View style={styles.contentTitle}>
          <Text style={commonStyles.sectionTitle}>Formations en cours</Text>
          <View style={{ ...styles.coursesCountContainer, ...commonStyles.countContainer }}>
            <Text style={styles.coursesCount}>{courses.length}</Text>
          </View>
        </View>
        <FlatList
          horizontal
          data={courses}
          keyExtractor={(item) => item._id}
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
    fontSize: 14,
    color:  YELLOW[800],
    fontWeight: 'bold',
  },
  nextEventsCountContainer: {
    backgroundColor: PINK[100],
  },
  nextEventsCount: {
    fontSize: 14,
    color: PINK[600],
    fontWeight: 'bold',
  },
});

export default CourseListScreen;
