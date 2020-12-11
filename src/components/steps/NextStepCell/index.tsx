import React from 'react';
import { TouchableOpacity } from 'react-native';
import { NavigationType } from '../../../types/NavigationType';
import CalendarIcon from '../../CalendarIcon';
import StepCellTitle from '../StepCellTitle';
import styles from './styles';

interface NextStepCellProps {
  navigation: NavigationType,
  nextSlotsStep: NextSlotsStepType,
}

interface NextSlotsStepType {
  _id: string,
  name: string,
  slots: Array<Date>,
  type: string,
  stepIndex: number,
  progress: number,
  courseId: string,
}

const NextStepCell = ({ navigation, nextSlotsStep }: NextStepCellProps) => {
  const { stepIndex, slots, progress, courseId } = nextSlotsStep;

  const goToCourse = () => navigation.navigate('CourseProfile', { courseId });

  return (
    <TouchableOpacity style={styles.container} onPress={goToCourse}>
      <CalendarIcon slots={slots} progress={progress}/>
      <StepCellTitle index={stepIndex} step={nextSlotsStep} />
    </TouchableOpacity>
  );
};

export default NextStepCell;
