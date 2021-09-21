import React from 'react';
import { View, Text } from 'react-native';
import ProgressBar from '../cards/ProgressBar';
import styles from './styles';

interface CourseProfileStickyHeaderProps {
  progress: number,
  title: string
}

const CourseProfileStickyHeader = ({ progress, title }: CourseProfileStickyHeaderProps) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    <View style={styles.progressBarContainer}>
      <Text style={styles.progressPercentage}>{(progress * 100).toFixed(0)}%</Text>
      <View style={styles.progressBar}>
        <ProgressBar progress={progress * 100} />
      </View>
    </View>
  </View>
);

export default CourseProfileStickyHeader;
