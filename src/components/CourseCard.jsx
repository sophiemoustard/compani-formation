import React from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, ImageBackground } from 'react-native';
import { GREY, WHITE } from '../styles/variables';

const NextEvent = ({ course }) => {
  const programImage = get(course, 'program.image.link') || '';

  return <View style={{...styles.container, ...styles.imageContainer}}>
    <View>
      <ImageBackground source={{ uri: programImage }} imageStyle={styles.image}
        style={styles.imageContainer}>
        <Text>{course.program.name}</Text>
      </ImageBackground>
    </View>
    <View style={{ backgroundColor: WHITE }}><Text>{course.program.name}</Text></View>
  </View>;
};

NextEvent.propTypes = {
  course: PropTypes.object,
};
const styles = StyleSheet.create({
  image: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: 120,
  },
  imageContainer: {
    width: 200,
    resizeMode: 'contain'
  },
  container: {
    height: 150,
    borderWidth: 1,
    borderColor: GREY,
    borderRadius: 10,
    marginRight: 10,
    backgroundColor: WHITE,
  },
  title: {
    padding: 5,
  }
});

export default NextEvent;
