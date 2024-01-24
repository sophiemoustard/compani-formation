// @ts-nocheck

import { View } from 'react-native';
import get from 'lodash/get';
import { E_LEARNING, ON_SITE, REMOTE } from '../../../core/data/constants';
import LiveCell from '../../../components/steps/LiveCell';
import ELearningCell from '../../../components/ELearningCell';
import styles from './styles';
import { BlendedCourseType } from '../../../types/CourseTypes';

const renderStepCell = (item, index, course, mode, route) => {
  if ([ON_SITE, REMOTE].includes(item.type)) {
    return <LiveCell step={item} slots={course?.slots} index={index} mode={mode} />;
  }

  if (item.type === E_LEARNING) {
    return <ELearningCell step={item} index={index} profileId={route.params.courseId}
      endedActivity={route.params.endedActivity} mode={mode} />;
  }

  return null;
};

const renderSeparator = () => <View style={styles.separator} />;

export const renderList = (course, mode, route) => <View style={styles.flatList}>
  {course.subProgram.steps.map((s, index) => <View key={s._id}>
    {index !== 0 && renderSeparator()}
    {renderStepCell(s, index, course, mode, route)}
  </View>)}
</View>;

export const getTitle = (course) => {
  if (!course) return '';
  const programName = get(course, 'subProgram.program.name') || '';
  if (course?.subProgram.isStrictlyELearning) return programName;

  const { misc } = (course as BlendedCourseType);
  return `${programName}${misc ? ` - ${misc}` : ''}`;
};
