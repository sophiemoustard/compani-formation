import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CalendarIcon from '../../CalendarIcon';
import StepCellTitle from '../StepCellTitle';
import { CourseModeType } from '../../../types/CourseTypes';
import { NextSlotsStepType } from '../../../types/StepTypes';
import { LEARNER } from '../../../core/data/constants';
import styles from './styles';

type NextStepCellProps = {
  nextSlotsStep: NextSlotsStepType,
  mode: CourseModeType,
}

const NextStepCell = ({ nextSlotsStep, mode }: NextStepCellProps) => {
  const { stepIndex, slots, progress, courseId, name, type, misc } = nextSlotsStep;
  const navigation = useNavigation();

  const goToCourse = () => {
    navigation.navigate(mode === LEARNER ? 'LearnerCourseProfile' : 'TrainerCourseProfile', { courseId });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={goToCourse}>
      <CalendarIcon slots={slots} progress={progress?.live} mode={mode} />
      <StepCellTitle index={stepIndex} name={name} type={type} misc={misc} mode={mode} />
    </TouchableOpacity>
  );
};

export default NextStepCell;
