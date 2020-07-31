import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import get from 'lodash/get';
import groupBy from 'lodash/groupBy';
import omit from 'lodash/omit';
import PropTypes from 'prop-types';
import screensStyle from '../styles/screens.style';
import { MAIN_MARGIN_LEFT, PRIMARY_LIGHT, PRIMARY_DARK } from '../styles/variables.js';
import Courses from '../api/courses';
import Blob from '../components/Blob';
import CourseCell from '../components/CourseCell';
import SlotCell from '../components/SlotCell';

const CourseListScreen = ({ navigation }) => {
  const [courses, setCourses] = useState([]);
  const [nextEvents, setNextEvents] = useState([]);

  const getCourses = async () => {
    const userId = await AsyncStorage.getItem('user_id');
    const courses = await Courses.getUserCourses({ trainees: userId });
    setCourses(courses);

    setNextEvents(() => []);
    const futureSlots = courses.map(course => ({
        name: get(course, 'program.name') || '',
        steps: get(course, 'program.steps') || [],
        slots: course.slots.filter(slot => moment().isBefore(slot.startDate)),
      }))
      .filter(course => course.slots.length)
      .map(course => {
        const slotsByDate = [];
        const groupedBySlots = groupBy(course.slots, s => moment(s.startDate).format('DD/MM/YYYY'));
        for (const date in groupedBySlots) {
          slotsByDate.push({ ...omit(course, ['slots']), date, slots: groupedBySlots[date] });
        }
        return slotsByDate;
      })
      .flat();
    futureSlots.sort((a, b) => moment(a.date, 'DD/MM/YYYY').diff(moment(b.date, 'DD/MM/YYYY'), 'days'));
    setNextEvents(futureSlots);
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
    <View style={screensStyle.container}>
      <Text style={screensStyle.title} testID='header'>Mes formations</Text>
      <View style={styles.sectionContainer}>
        <View style={styles.contentTitle}>
          <Text style={screensStyle.subtitle}>Prochains évènements</Text>
          <Text style={styles.nextEventsCount}> {Object.keys(nextEvents).length} </Text>
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
      <View style={styles.sectionContainer}>
        <Blob style={styles.blob} color="#FFEA95" />
        <View style={styles.contentTitle}>
          <Text style={screensStyle.subtitle}>Formations en cours</Text>
          <Text style={styles.coursesCount}> {courses.length} </Text>
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
    marginLeft: MAIN_MARGIN_LEFT,
    marginRight: MAIN_MARGIN_LEFT,
  },
  contentTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionContainer: { position: 'relative', marginBottom: 100 },
  blob: { position: 'absolute', top: -10 },
  coursesCount: {
    fontSize: 14,
    marginBottom: 10,
    backgroundColor: '#FFF9DF',
    color: '#D5AD0A',
    fontWeight: 'bold',
    padding: 2,
    marginLeft: 8,
    borderRadius: 8,
  },
  nextEventsCount: {
    fontSize: 14,
    marginBottom: 10,
    backgroundColor: PRIMARY_LIGHT,
    color: PRIMARY_DARK,
    fontWeight: 'bold',
    padding: 2,
    marginLeft: 8,
    borderRadius: 8,
  }
});

export default CourseListScreen;
