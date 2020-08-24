import React from 'react';
import get from 'lodash/get';
import { Text, View, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { CourseType } from '../types/CourseType';
import { NavigationType } from '../types/NavigationType';
import { WHITE, TRANSPARENT_GREY } from '../styles/colors';
import { BORDER_RADIUS, PADDING, COURSE_CELL_WIDTH } from '../styles/metrics';
import { FIRA_SANS_MEDIUM } from '../styles/fonts';

interface CourseCellProps {
  course: CourseType,
  navigation: NavigationType,
}

const CourseCell = ({ course, navigation }: CourseCellProps) => {
  const programImage = get(course, 'subProgram.program.image.link') || '';
  const programName = get(course, 'subProgram.program.name') || '';
  const source = programImage
    ? { uri: programImage }
    : require('../../assets/images/authentication_background_image.jpg');
  const goToCourse = () => navigation.navigate(
    'Home',
    { screen: 'Courses', params: { screen: 'CourseProfile', params: { courseId: course._id } } }
  );

  return (
    <TouchableOpacity style={styles.courseContainer} onPress={goToCourse}>
      <View style={styles.imageContainer}>
        <ImageBackground source={source} imageStyle={styles.image} style={{ resizeMode: 'contain' }} />
      </View>
      <View style={styles.title}>
        <Text lineBreakMode={'tail'} numberOfLines={2}>{programName}</Text>
      </View>
    </TouchableOpacity>
  );
};

const imageHeight = 100;
const styles = StyleSheet.create({
  courseContainer: {
    borderRadius: BORDER_RADIUS.SM,
    width: COURSE_CELL_WIDTH,
    borderWidth: 1,
    borderColor: TRANSPARENT_GREY,
    overflow: 'hidden',
  },
  image: {
    height: imageHeight,
  },
  imageContainer: {
    height: imageHeight,
  },
  title: {
    ...FIRA_SANS_MEDIUM.MD,
    padding: PADDING.MD,
    backgroundColor: WHITE,
    borderBottomLeftRadius: BORDER_RADIUS.SM,
    borderBottomRightRadius: BORDER_RADIUS.SM,
  },
});

export default CourseCell;
