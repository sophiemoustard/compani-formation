import React from 'react';
import { View, Text } from 'react-native';
import { CourseType } from '../../types/CourseTypes';
import ProgressBar from '../cards/ProgressBar';
import styles from './styles';

interface CourseProfileStickyHeaderProps {
  course: CourseType,
  getTitle: () => string
}

const CourseProfileStickyHeader = ({ course, getTitle }: CourseProfileStickyHeaderProps) => {
  const getStepRatio = steps =>
    `${steps.filter(step => step.progress === 1).length}/${course.subProgram.steps.length}`;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{getTitle()}</Text>
      <View style={styles.progressBarContainer}>
        <Text style={styles.stepRatio}>{getStepRatio(course.subProgram.steps)}</Text>
        <View style={styles.progressBar}>
          <ProgressBar progress={course.progress * 100} />
        </View>
      </View>
    </View>
  );
};

export default CourseProfileStickyHeader;
