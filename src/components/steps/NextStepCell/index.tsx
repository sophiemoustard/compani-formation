import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CalendarIcon from '../../CalendarIcon';
import StepCellTitle from '../StepCellTitle';
import { NextSlotsStepType } from '../../../types/StepTypes';
import styles from './styles';

type NextStepCellProps = {
  nextSlotsStep: NextSlotsStepType,
  color: string,
}

const NextStepCell = ({ nextSlotsStep, color }: NextStepCellProps) => {
  const { stepIndex, slots, progress, courseId, name, type } = nextSlotsStep;
  const navigation = useNavigation();

  const goToCourse = () => navigation.navigate('CourseProfile', { courseId });

  return (
    <TouchableOpacity style={styles.container} onPress={goToCourse}>
      <CalendarIcon slots={slots} progress={progress?.live} color={color}/>
      <StepCellTitle index={stepIndex} name={name} type={type} />
    </TouchableOpacity>
  );
};

export default NextStepCell;
