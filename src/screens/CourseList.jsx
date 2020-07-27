import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import screensStyle from '../styles/screens.style';
import { MAIN_MARGIN_LEFT } from '../styles/variables.js';
import Courses from '../api/courses';
import Blob from '../components/Blob';
import CourseCard from '../components/CourseCard';

const CourseListScreen = () => {
  const [courses, setCourses] = useState([]);

  const getCourses = async () => {
    const userId = await AsyncStorage.getItem('user_id');
    const courses = await Courses.getUserCourses({ trainees: userId });
    setCourses(courses);
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
      <View style={styles.blobContainer}>
        <Blob style={styles.blob} color="#FFEA95" />
        <View style={styles.contentTitle}>
          <Text style={screensStyle.subtitle}>Formations en cours</Text>
          <Text style={styles.coursesCount}> {courses.length} </Text>
        </View>
        <FlatList
          horizontal
          data={courses}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <CourseCard course={item} />}
          style={styles.courseContainer}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  courseContainer: {
    paddingLeft: MAIN_MARGIN_LEFT,
    paddingRight: MAIN_MARGIN_LEFT,
  },
  contentTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  blobContainer: { position: 'relative' },
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
  }
});

export default CourseListScreen;
