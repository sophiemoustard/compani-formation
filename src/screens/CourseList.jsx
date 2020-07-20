import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import screensStyle from '../styles/screens.style';
import { MAIN_MARGIN_LEFT } from '../styles/variables.js';
import Courses from '../api/courses';
import Blob from '../components/Blob';
import AsyncStorage from '@react-native-community/async-storage';

class CourseListScreen extends Component {
  constructor(props) {
    super(props);

    this.state = { courses: [] };
  }

  async componentDidMount () {
    try {
      const userId = await AsyncStorage.getItem('user_id');
      const courses = await Courses.get({ trainees: userId });

      this.setState({ courses });
    } catch (e) {
      this.setState({ courses: [] });
    }
  }

  render () {
    return (
      <View style={screensStyle.container}>
        <Text style={screensStyle.title} testID='header'>Mes formations</Text>
        <View style={styles.blobContainer}>
          <Blob style={styles.blob} color="#FFEA95" />
        </View>
        <Text style={screensStyle.subtitle}>Formations en cours ({this.state.courses.length})</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  nextEventContainer: {
    paddingLeft: MAIN_MARGIN_LEFT,
  },
  blobContainer: { position: 'relative' },
  blob: { position: 'absolute', top: -10 }
});

export default CourseListScreen;
