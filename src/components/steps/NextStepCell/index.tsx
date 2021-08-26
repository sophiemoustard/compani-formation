import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CalendarIcon from '../../CalendarIcon';
import StepCellTitle from '../StepCellTitle';
import { StepType } from '../../../types/StepTypes';
import styles from './styles';

type NextStepCellProps = {
  nextSlotsStep: NextSlotsStepType,
}

type NextSlotsStepType = {
  _id: string,
  name: string,
  slots: Array<Date>,
  type: StepType['type'],
  stepIndex: number,
  progress: number,
  courseId: string,
}

const NextStepCell = ({ nextSlotsStep }: NextStepCellProps) => {
  const navigation = useNavigation();
  const { stepIndex, slots, progress, courseId } = nextSlotsStep;

  const goToCourse = () => navigation.navigate('CourseProfile', { courseId });

  return (
    <TouchableOpacity style={styles.container} onPress={goToCourse}>
      <CalendarIcon slots={slots} progress={progress}/>
      <StepCellTitle index={stepIndex} name={nextSlotsStep.name} type={nextSlotsStep.type} />
    </TouchableOpacity>
  );
};

export default NextStepCell;
