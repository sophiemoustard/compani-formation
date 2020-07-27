import React from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, ImageBackground } from 'react-native';
import { GREY, WHITE } from '../styles/variables';

const CourseCell = ({ course }) => {
  const programImage = get(course, 'program.image.link') || '';
  const source = programImage ? { uri: programImage } : require('../../assets/authentication_background_image.jpg');
  const programName = course.program.name.length > 50 ? `${course.program.name.slice(0, 48)}...` : course.program.name;

  return <View style={styles.container}>
    <View style={styles.imageContainer}>
      <ImageBackground source={source} imageStyle={styles.image} style={{ resizeMode: 'contain' }} />
    </View>
    <View style={styles.title}><Text>{programName}</Text></View>
  </View>;
};

CourseCell.propTypes = {
  course: PropTypes.object,
};

const imageHeight = 100;
const borderRadius = 10;
const styles = StyleSheet.create({
  image: {
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius,
    height: imageHeight,
    borderWidth: 1,
    borderColor: GREY,
  },
  imageContainer: {
    height: imageHeight,
  },
  container: {
    height: 150,
    width: 200,
    borderRadius: borderRadius,
    marginRight: 10,
  },
  title: {
    padding: 5,
    backgroundColor: WHITE,
    borderBottomLeftRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
    height: 50,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: GREY,
  }
});

export default CourseCell;
