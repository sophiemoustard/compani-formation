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
import { MAIN_MARGIN_LEFT, PRIMARY_COLOR_LIGHT, PRIMARY_COLOR_DARK } from '../../styles/variables.js';
import Courses from '../../api/courses';
import Blob from '../../components/Blob';
import CourseCell from '../../components/CourseCell';
import SlotCell from '../../components/SlotCell';
import { MARGIN, PADDING, BORDER_RADIUS } from '../../styles/metrics';

const CourseListScreen = ({ navigation }) => {
  const [courses, setCourses] = useState([]);
  const [nextEvents, setNextEvents] = useState([]);

  const getCourses = async () => {
    try {
      const userId = await AsyncStorage.getItem('user_id');
      const courses = await Courses.getUserCourses({ trainees: userId });
      setCourses(courses);

      setNextEvents(() => []);
      const futureSlots = courses.map(course => ({
          name: get(course, 'program.name') || '',
          steps: get(course, 'program.steps') || [],
          slots: course.slots.filter(slot => moment().isSameOrBefore(slot.startDate, 'days')),
        }))
        .filter(course => course.slots.length)
        .map(course => {
          const slotsByDate = [];
          const groupedBySlots = groupBy(course.slots, s => moment(s.startDate).format('DD/MM/YYYY'));
          for (const date in groupedBySlots) {
            slotsByDate.push({
              ...pick(course, ['name', 'steps']),
              date: moment(date, 'DD/MM/YYYY').toISOString(),
              slots: groupedBySlots[date].map((slot => slot.step ? ({ step: slot.step }) : ({}) )),
            });
          }
          return slotsByDate;
        })
        .flat();

      futureSlots.sort((a, b) => moment(a.date, 'DD/MM/YYYY').diff(moment(b.date, 'DD/MM/YYYY'), 'days'));
      setNextEvents(futureSlots);
    } catch (e) {
      console.log(e);
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


  return ( 
    <View style={commonStyles.container}>
      <Text style={commonStyles.title} testID='header'>Mes formations</Text>
      {Object.keys(nextEvents).length > 0 &&
        <View style={styles.sectionContainer}>
          <View style={styles.contentTitle}>
            <Text style={commonStyles.subtitle}>Prochains évènements</Text>
            <View style={{ ...styles.nextEventsCountContainer, ...commonStyles.countContainer }}>
              <Text style={styles.nextEventsCount}>{Object.keys(nextEvents).length}</Text>
            </View>
          </View>
          <FlatList
            horizontal
            data={nextEvents}
            keyExtractor={(item) => item.date}
            renderItem={({ item }) => <SlotCell slotsByDay={item} />}
            style={styles.courseContainer}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      }
      <View style={styles.sectionContainer}>
        <Blob style={styles.blob} color="#FFEA95" />
        <View style={styles.contentTitle}>
          <Text style={commonStyles.subtitle}>Formations en cours</Text>
          <View style={{ ...styles.coursesCountContainer, ...commonStyles.countContainer }}>
            <Text style={styles.coursesCount}>{courses.length}</Text>
          </View>
        </View>
        <FlatList
          horizontal
          data={courses}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <CourseCell course={item} navigation={navigation} />}
          style={styles.courseContainer}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

CourseListScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  courseContainer: {
    paddingLeft: MAIN_MARGIN_LEFT,
    paddingRight: MAIN_MARGIN_LEFT,
  },
  contentTitle: {
    flexDirection: 'row',
    marginBottom: MARGIN.MD,
  },
  sectionContainer: { position: 'relative', marginBottom: MARGIN.XXXL },
  blob: { position: 'absolute', top: -10 },
  coursesCountContainer: {
    backgroundColor: '#FFF9DF',
  },
  coursesCount: {
    fontSize: 14,
    color: '#D5AD0A',
    fontWeight: 'bold',
  },
  nextEventsCountContainer: {
    backgroundColor: PRIMARY_COLOR_LIGHT,
  },
  nextEventsCount: {
    fontSize: 14,
    color: PRIMARY_COLOR_DARK,
    fontWeight: 'bold',
  },
});

export default CourseListScreen;
