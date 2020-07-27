import React from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, ImageBackground } from 'react-native';
import { GREY, WHITE } from '../styles/variables';

const NextEvent = ({ course }) => {
  const programImage = get(course, 'program.image.link') || '';

  return <View style={styles.container}>
    <View style={styles.imageContainer}>
      <ImageBackground source={{ uri: programImage }} imageStyle={styles.image} style={{ resizeMode: 'contain' }} />
    </View>
    <View style={styles.title}><Text>{course.program.name}</Text></View>
  </View>;
};

NextEvent.propTypes = {
  course: PropTypes.object,
};

const imageHeight = 100;
const borderRadius = 10;
const styles = StyleSheet.create({
  image: {
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius,
    height: imageHeight,
  },
  imageContainer: {
    height: imageHeight,
  },
  container: {
    height: 150,
    width: 200,
    borderWidth: 1,
    borderColor: GREY,
    borderRadius: borderRadius,
    marginRight: 10,
    backgroundColor: WHITE,
  },
  title: {
    padding: 5,
    backgroundColor: WHITE,
    borderBottomLeftRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
  }
});

export default NextEvent;
