import React from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { WHITE, TRANSPARENT_GREY } from '../styles/colors';
import { BORDER_RADIUS, PADDING, IS_SMALL_SCREEN, COURSE_CELL_WIDTH } from '../styles/metrics';

const CourseCell = ({ course, navigation }) => {
  const programImage = get(course, 'program.image.link') || '';
  const source = programImage ? { uri: programImage } : require('../../assets/authentication_background_image.jpg');
  const titleLimit = IS_SMALL_SCREEN ? 45 : 60;
  const programName = course.program.name.length > titleLimit
    ? `${course.program.name.slice(0, titleLimit - 3)}...`
    : course.program.name;
  const goToCourse = () => navigation.navigate(
    'Home',
    { screen: 'Courses', params: { screen: 'CourseProfile', params: { courseId: course._id } } }
  );

  return (
    <TouchableOpacity style={styles.courseContainer} onPress={goToCourse}>
      <View style={styles.imageContainer}>
        <ImageBackground source={source} imageStyle={styles.image} style={{ resizeMode: 'contain' }} />
      </View>
      <View style={styles.title}><Text>{programName}</Text></View>
    </TouchableOpacity>
  );
};

CourseCell.propTypes = {
  course: PropTypes.object,
  navigation: PropTypes.object,
};

const imageHeight = 100;
const styles = StyleSheet.create({
  courseContainer: {
    borderRadius: BORDER_RADIUS.SM,
    width: COURSE_CELL_WIDTH,
    borderWidth: 1,
    borderColor: TRANSPARENT_GREY,
  },
  image: {
    borderTopLeftRadius: BORDER_RADIUS.SM,
    borderTopRightRadius: BORDER_RADIUS.SM,
    height: imageHeight,
  },
  imageContainer: {
    height: imageHeight,
  },
  title: {
    padding: PADDING.MD,
    backgroundColor: WHITE,
    borderBottomLeftRadius: BORDER_RADIUS.SM,
    borderBottomRightRadius: BORDER_RADIUS.SM,
  }
});

export default CourseCell;
