import React from 'react';
import { Text, View, ImageBackground, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import get from 'lodash/get';
import { NavigationType } from '../../types/NavigationType';
import { ProgramType } from '../../types/ProgramType';
import styles from './styles';

interface ProgramCellProps {
  courseId?: string,
  navigation?: NavigationType,
  program: ProgramType,
}

const ProgramCell = ({ courseId, navigation, program }: ProgramCellProps) => {
  const programName = program.name || '';
  const programImage = get(program, 'image.link') || '';

  const source = programImage
    ? { uri: programImage }
    : require('../../../assets/images/authentication_background_image.jpg');
  const goToCourse = () => navigation?.navigate(
    'Home',
    { screen: 'Courses', params: { screen: 'CourseProfile', params: { courseId } } }
  );

  return (
    <TouchableOpacity style={styles.courseContainer} disabled={!navigation} onPress={goToCourse}>
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

export default ProgramCell;
