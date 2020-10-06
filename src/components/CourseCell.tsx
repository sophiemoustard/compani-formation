import React from 'react';
import get from 'lodash/get';
import { Text, View, StyleSheet, ImageBackground, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { connect } from 'react-redux';
import { CourseType } from '../types/CourseType';
import { NavigationType } from '../types/NavigationType';
import { getLoggedUserId } from '../store/main/selectors';
import { WHITE, TRANSPARENT_GREY } from '../styles/colors';
import { BORDER_RADIUS, PADDING, COURSE_CELL_WIDTH, BORDER_WIDTH } from '../styles/metrics';
import { FIRA_SANS_MEDIUM } from '../styles/fonts';

interface CourseCellProps {
  course: CourseType,
  navigation: NavigationType,
  loggedUserId: string | null,
}

const CourseCell = ({ course, navigation, loggedUserId }: CourseCellProps) => {
  const programImage = get(course, 'subProgram.program.image.link') || '';
  const programName = get(course, 'subProgram.program.name') || '';
  const disableNavigation = !(loggedUserId && course?.trainees?.includes(loggedUserId));
  const source = programImage
    ? { uri: programImage }
    : require('../../assets/images/authentication_background_image.jpg');
  const goToCourse = () => navigation.navigate(
    'Home',
    { screen: 'Courses', params: { screen: 'CourseProfile', params: { courseId: course._id } } }
  );

  return (
    <TouchableOpacity style={styles.courseContainer} disabled={disableNavigation} onPress={goToCourse}>
      <View style={styles.imageContainer}>
        <ImageBackground source={source} imageStyle={styles.image}
          style={{ resizeMode: 'contain' } as StyleProp<ViewStyle>} />
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
    borderWidth: BORDER_WIDTH,
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

const mapStateToProps = state => ({ loggedUserId: getLoggedUserId(state) });

export default connect(mapStateToProps)(CourseCell);
